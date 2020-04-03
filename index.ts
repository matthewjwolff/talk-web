interface Dictionary<T> {
    [key: string]: T;
}

interface User {
    displayName:string;
    id:string
}

var users: Dictionary<RTCPeerConnection> = {}

var me = null // id given by the server

// promt user for media permissions
const constraints = {
    'video': false,
    'audio': true
}

// TODO: change to nongoogle server
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

const audioHolder: HTMLElement = document.getElementById("audioDiv")

/*
TODO: handle rooms, use this url stuff to construct the websocket url
var wsURL = new URL(document.location.href)
wsURL.protocol = "wss"
wsURL.port = 8080
wsURL.toString()
*/


navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        // get a websocket
        var ws = new WebSocket("wss://testsrv.wolff.io/")



        ws.onmessage = async (e) => {
            var m = e.data
            var message = JSON.parse(m)
            // TODO: async/await
            // TODO: break this up

            // common code needed to initialize an rtc connection
            // TODO: move elsewhere
            var rtcInit = (peerConnection, iceTarget) => {
                // add our track to the connection
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
                const remoteStream = new MediaStream();
                // TODO: maybe better to use webaudio
                const remoteAudio = document.createElement('audio')
                remoteAudio.srcObject = remoteStream;
                remoteAudio.setAttribute("id", iceTarget)
                audioHolder.appendChild(remoteAudio)

                peerConnection.addEventListener('track', async (event) => {
                    // when we get the remote track, add it to our stream
                    remoteStream.addTrack(event.track);
                });
            }

            if (message.type == "new-user") {
                me = message.data // this is my id
            } else if (message.type == "user-join") {
                // a user joined
                // make a rtcconnection for them and send it to them
                // TODO: make sure we don't have to check that this message isn't about me

                // start negotiating a webrtc call
                const peerConnection = new RTCPeerConnection(configuration);
                // store this connection as the offer for this user
                users[message.data] = peerConnection

                // peer connection init
                rtcInit(peerConnection, message.data)

                // create an offer
                const offer = await peerConnection.createOffer();
                // set this offer as the local connection
                await peerConnection.setLocalDescription(offer);
                // send this offer to the server
                ws.send(JSON.stringify({
                    "type": "send-offer",
                    "target": message.data,
                    "data": offer
                }))
            } else if (message.type == "user-leave") {
                // a user left
                delete users[message.data]
                var element = document.getElementById(message.data)
                element.parentNode.removeChild(element)
            } else if (message.type == "receive-offer") {
                var callerConnection = users[message.from]
                if (!callerConnection) {
                    // we do not know about this caller
                    // TODO: pretty sure this is always the case
                    // TODO: have to init this connection too
                    callerConnection = new RTCPeerConnection(configuration)
                    rtcInit(callerConnection, message.from)
                    users[message.from] = callerConnection
                }
                var offer = message.data
                callerConnection.setRemoteDescription(new RTCSessionDescription(message.data))
                const answer = await callerConnection.createAnswer();
                /*await*/ callerConnection.setLocalDescription(answer);
                ws.send(JSON.stringify({
                    "type": "send-answer",
                    "target": message.from,
                    "data": answer
                }))
            } else if (message.type == "receive-answer") {
                // we are the caller and we got an answer
                var thisConn = users[message.from]
                const remoteDesc = new RTCSessionDescription(message.data);
                await thisConn.setRemoteDescription(remoteDesc);
            }
            // end RTC connection establishment
            // now ICE
            else if (message.type == "ice-candidate") {
                var senderConn = users[message.from]
                await senderConn.addIceCandidate(message.data)
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

