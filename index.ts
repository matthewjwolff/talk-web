import Vue from 'vue'
import ArrayMap from './arraymap'

interface Dictionary<T> {
    [key: string]: T;
}

interface User {
    displayName?:string;
    id:string;
    connection: RTCPeerConnection | null
}

var users: ArrayMap<string, User> = new ArrayMap(u => u.id)

var app = new Vue({
    el: '#vue-context',
    data: {
        users:users.array
    }
})


// promt user for media permissions
const constraints = {
    'video': false,
    'audio': true
}

// TODO: change to nongoogle server
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

const audioHolder: HTMLElement = document.getElementById("audioDiv")!

/*
TODO: handle rooms, use this url stuff to construct the websocket url
var wsURL = new URL(document.location.href)
wsURL.protocol = "wss"
wsURL.port = 8080
wsURL.toString()
*/

var ws:WebSocket;

document.getElementById("submit-username-button")!.onclick = (ev) => {
    ws.send(JSON.stringify({
        type:"set-username",
        data:(document.getElementById("username") as HTMLInputElement).value
    }))
}


navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        // get a websocket
        ws = new WebSocket("ws://localhost:8081/")

        ws.onmessage = async (e) => {
            // TODO: use typescript to put types on this message
            var m = e.data
            var message = JSON.parse(m)
            // TODO: async/await
            // TODO: break this up

            if (message.type == "new-user") {
                // being told about existing users
                for(var id in message.data) {
                    users.add({
                        id:id,
                        displayName:message.data[id],
                        connection:null
                    })
                }
            } else if (message.type == "user-join") {
                // a user joined
                // make a rtcconnection for them and send it to them

                // start negotiating a webrtc call
                const peerConnection = new RTCPeerConnection(configuration);
                // store this connection as the offer for this user
                users.add({
                    id:message.data,
                    connection: peerConnection
                })

                // peer connection init
                rtcInit(peerConnection, stream, ws, message.data as string)

                // create an offer
                const offer = await peerConnection.createOffer();
                // set this offer as the local connection
                // don't really need to await this
                /*await*/ peerConnection.setLocalDescription(offer);
                // send this offer to the server
                ws.send(JSON.stringify({
                    "type": "send-offer",
                    "target": message.data,
                    "data": offer
                }))
            } else if (message.type == "user-leave") {
                // a user left
                users.remove(users.map.get(message.data)!)
                var element = document.getElementById(message.data)
                element!.parentNode!.removeChild(element!)
            } else if (message.type == "receive-offer") {
                var user = users.map.get(message.from)
                if(!user) {
                    // don't know about this caller
                    user = {
                        id:message.from,
                        connection: null
                    }
                    users.add(user)
                }
                var callerConnection: RTCPeerConnection = user.connection!
                if (!callerConnection) {
                    callerConnection = new RTCPeerConnection(configuration)
                    rtcInit(callerConnection, stream, ws, message.from as string)
                    users.map.get(message.from)!.connection = callerConnection
                }
                var offer = message.data
                callerConnection.setRemoteDescription(new RTCSessionDescription(offer))
                const answer = await callerConnection.createAnswer();
                /*await*/ callerConnection.setLocalDescription(answer);
                ws.send(JSON.stringify({
                    "type": "send-answer",
                    "target": message.from,
                    "data": answer
                }))
            } else if (message.type == "receive-answer") {
                // we are the caller and we got an answer
                var thisConn: RTCPeerConnection = users.map.get(message.from)!.connection!
                const remoteDesc = new RTCSessionDescription(message.data);
                /*await*/ thisConn.setRemoteDescription(remoteDesc);
            }
            // end RTC connection establishment
            // now ICE
            else if (message.type == "ice-candidate") {
                var senderConn: RTCPeerConnection = users.map.get(message.from)!.connection!
                /*await*/ senderConn.addIceCandidate(message.data)
            } else if (message.type == "set-username") {
                var from:string = message.from
                var sender = users.map.get(from)!
                sender.displayName = message.data
            }
        }

        // we can use WebAudio too, see MediaStreamAudioSourceNode and MediaStreamAudioDestinationNode
        ws.onclose = (e) => {
            console.log(e);
        }
        ws.onerror = (e) => {
            console.log(e);
        }
        ws.onopen = (e) => {
            console.log(e);
        }
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

    // common code needed to initialize an rtc connection
function rtcInit(peerConnection: RTCPeerConnection, stream: MediaStream, ws: WebSocket, iceTarget: string) {
    peerConnection.addTrack(stream.getAudioTracks()[0])
    // set up the ice callback
    peerConnection.onicecandidate = (e) => {
        // e.candidate is null if no further candidates
        if (e.candidate) {
            ws.send(JSON.stringify({
                'type': "ice-candidate",
                // uuid captured from join message
                'target': iceTarget,
                "data": e.candidate
            }))
        }
    }
    peerConnection.onconnectionstatechange = e => {
        if (peerConnection.connectionState === 'connected') {
            // Peers connected!
            console.log("peers connected")
        }
    }
    // set up a track for the remote user
    const remoteStream = new MediaStream()
    // TODO: maybe better to use webaudio
    const remoteAudio = document.createElement('audio')
    remoteAudio.srcObject = remoteStream
    remoteAudio.setAttribute("id", iceTarget)
    audioHolder.appendChild(remoteAudio)
    peerConnection.addEventListener('track', async (event) => {
        // when we get the remote track, add it to our stream
        remoteStream.addTrack(event.track)
    })
}

