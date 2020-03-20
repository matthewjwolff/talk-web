


// promt user for media permissions
const constraints = {
    'video': false,
    'audio': true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        // get a websocket
        var ws = new WebSocket("ws://localhost:8081/")

        // start negotiating a webrtc call
        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        const peerConnection = new RTCPeerConnection(configuration);

        ws.onmessage = async (e) => {
            var m = e.data
            var message = JSON.parse(m)
            // TODO: async/await
            if(message.type == "get-offer") {
                if(message.data == null) {
                    // create an offer
                    const offer = await peerConnection.createOffer();
                    // set this offer as the local connection
                    await peerConnection.setLocalDescription(offer);
                    // send this offer to the server
                    ws.send(JSON.stringify({
                        "type": "set-offer",
                        "data": offer
                    }))
                } else {
                    peerConnection.setRemoteDescription(new RTCSessionDescription(message.data))
                    const answer = await peerConnection.createAnswer();
                    /*await*/ peerConnection.setLocalDescription(answer);
                    // TODO: send the answer back
                    ws.send(JSON.stringify({
                        "type": "answer",
                        "data": answer
                    }))
                }
            } else if(message.type == "answer") {
                // we are the caller and we got an answer
                const remoteDesc = new RTCSessionDescription(message.data);
                await peerConnection.setRemoteDescription(remoteDesc);
            } else if(message.type == "ice-candidate") {
                // when we learn the other person's ICE candidate, add it to our own
                await peerConnection.addIceCandidate(message.data)
            }
        }

        // set up event handlers for the webrtc negotiation

        // as we learn our own ice candidates, tell the other person
        peerConnection.onicecandidate = e => {
            if(e.candidate) {
                ws.send(JSON.stringify({'type': "ice-candidate", "data": e.candidate}))

            }
        }

        peerConnection.onconnectionstatechange = e => {
            if (peerConnection.connectionState === 'connected') {
                // Peers connected!
                console.log("peers connected")
            }
        }

        // TODO: handle tracks 
        // add our track to the connection
        peerConnection.addTrack(stream.getAudioTracks()[0])

        peerConnection.ontrack = e => {
            // a track has been sent to us
            e.track
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


        // init the communication flow
        ws.onopen = e => {
            ws.send(JSON.stringify({"type":"get-offer"}))
        }
        
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

