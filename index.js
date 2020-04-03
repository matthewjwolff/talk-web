var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var users = {};
var me = null; // id given by the server
// promt user for media permissions
var constraints = {
    'video': false,
    'audio': true
};
// TODO: change to nongoogle server
var configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };
var audioHolder = document.getElementById("audioDiv");
/*
TODO: handle rooms, use this url stuff to construct the websocket url
var wsURL = new URL(document.location.href)
wsURL.protocol = "wss"
wsURL.port = 8080
wsURL.toString()
*/
navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
    // get a websocket
    var ws = new WebSocket("wss://testsrv.wolff.io/");
    ws.onmessage = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var m, message, rtcInit, peerConnection, offer_1, element, callerConnection, offer, answer, thisConn, remoteDesc, senderConn;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    m = e.data;
                    message = JSON.parse(m);
                    rtcInit = function (peerConnection, iceTarget) {
                        // add our track to the connection
                        peerConnection.addTrack(stream.getAudioTracks()[0]);
                        // set up the ice callback
                        peerConnection.onicecandidate = function (e) {
                            // e.candidate is null if no further candidates
                            if (e.candidate) {
                                ws.send(JSON.stringify({
                                    'type': "ice-candidate",
                                    // uuid captured from join message
                                    'target': iceTarget,
                                    "data": e.candidate
                                }));
                            }
                        };
                        peerConnection.onconnectionstatechange = function (e) {
                            if (peerConnection.connectionState === 'connected') {
                                // Peers connected!
                                console.log("peers connected");
                            }
                        };
                        // set up a track for the remote user
                        var remoteStream = new MediaStream();
                        // TODO: maybe better to use webaudio
                        var remoteAudio = document.createElement('audio');
                        remoteAudio.srcObject = remoteStream;
                        remoteAudio.setAttribute("id", iceTarget);
                        audioHolder.appendChild(remoteAudio);
                        peerConnection.addEventListener('track', function (event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // when we get the remote track, add it to our stream
                                remoteStream.addTrack(event.track);
                                return [2 /*return*/];
                            });
                        }); });
                    };
                    if (!(message.type == "new-user")) return [3 /*break*/, 1];
                    me = message.data; // this is my id
                    return [3 /*break*/, 11];
                case 1:
                    if (!(message.type == "user-join")) return [3 /*break*/, 4];
                    peerConnection = new RTCPeerConnection(configuration);
                    // store this connection as the offer for this user
                    users[message.data] = peerConnection;
                    // peer connection init
                    rtcInit(peerConnection, message.data);
                    return [4 /*yield*/, peerConnection.createOffer()];
                case 2:
                    offer_1 = _a.sent();
                    // set this offer as the local connection
                    return [4 /*yield*/, peerConnection.setLocalDescription(offer_1)];
                case 3:
                    // set this offer as the local connection
                    _a.sent();
                    // send this offer to the server
                    ws.send(JSON.stringify({
                        "type": "send-offer",
                        "target": message.data,
                        "data": offer_1
                    }));
                    return [3 /*break*/, 11];
                case 4:
                    if (!(message.type == "user-leave")) return [3 /*break*/, 5];
                    // a user left
                    delete users[message.data];
                    element = document.getElementById(message.data);
                    element.parentNode.removeChild(element);
                    return [3 /*break*/, 11];
                case 5:
                    if (!(message.type == "receive-offer")) return [3 /*break*/, 7];
                    callerConnection = users[message.from];
                    if (!callerConnection) {
                        // we do not know about this caller
                        // TODO: pretty sure this is always the case
                        // TODO: have to init this connection too
                        callerConnection = new RTCPeerConnection(configuration);
                        rtcInit(callerConnection, message.from);
                        users[message.from] = callerConnection;
                    }
                    offer = message.data;
                    callerConnection.setRemoteDescription(new RTCSessionDescription(message.data));
                    return [4 /*yield*/, callerConnection.createAnswer()];
                case 6:
                    answer = _a.sent();
                    /*await*/ callerConnection.setLocalDescription(answer);
                    ws.send(JSON.stringify({
                        "type": "send-answer",
                        "target": message.from,
                        "data": answer
                    }));
                    return [3 /*break*/, 11];
                case 7:
                    if (!(message.type == "receive-answer")) return [3 /*break*/, 9];
                    thisConn = users[message.from];
                    remoteDesc = new RTCSessionDescription(message.data);
                    return [4 /*yield*/, thisConn.setRemoteDescription(remoteDesc)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 9:
                    if (!(message.type == "ice-candidate")) return [3 /*break*/, 11];
                    senderConn = users[message.from];
                    return [4 /*yield*/, senderConn.addIceCandidate(message.data)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    }); };
    // we can use WebAudio too, see MediaStreamAudioSourceNode and MediaStreamAudioDestinationNode
    ws.onclose = function (e) {
        console.log(e);
    };
    ws.onerror = function (e) {
        console.log(e);
    };
    ws.onopen = function (e) {
        console.log(e);
    };
})["catch"](function (error) {
    console.error('Error accessing media devices.', error);
});
