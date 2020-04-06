/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//import Vue from 'vue'
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
/*
var app = new Vue({
    el: 'vue-context',
    data: {
        users:users
    }
})
*/
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
var ws;
document.getElementById("submit-username-button").onclick = function (ev) {
    ws.send(JSON.stringify({
        type: "set-username",
        data: document.getElementById("username").value
    }));
};
navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
    // get a websocket
    ws = new WebSocket("ws://localhost:8081/");
    ws.onmessage = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var m, message, id, peerConnection, offer_1, element, user, callerConnection, offer, answer, thisConn, remoteDesc, senderConn, from, sender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    m = e.data;
                    message = JSON.parse(m);
                    if (!(message.type == "new-user")) return [3 /*break*/, 1];
                    // being told about existing users
                    for (id in message.data) {
                        users[id] = {
                            id: id,
                            displayName: message.data[id],
                            connection: null
                        };
                    }
                    return [3 /*break*/, 7];
                case 1:
                    if (!(message.type == "user-join")) return [3 /*break*/, 3];
                    peerConnection = new RTCPeerConnection(configuration);
                    // store this connection as the offer for this user
                    users[message.data] = {
                        id: message.data,
                        connection: peerConnection
                    };
                    // peer connection init
                    rtcInit(peerConnection, stream, ws, message.data);
                    return [4 /*yield*/, peerConnection.createOffer()];
                case 2:
                    offer_1 = _a.sent();
                    // set this offer as the local connection
                    // don't really need to await this
                    /*await*/ peerConnection.setLocalDescription(offer_1);
                    // send this offer to the server
                    ws.send(JSON.stringify({
                        "type": "send-offer",
                        "target": message.data,
                        "data": offer_1
                    }));
                    return [3 /*break*/, 7];
                case 3:
                    if (!(message.type == "user-leave")) return [3 /*break*/, 4];
                    // a user left
                    delete users[message.data];
                    element = document.getElementById(message.data);
                    element.parentNode.removeChild(element);
                    return [3 /*break*/, 7];
                case 4:
                    if (!(message.type == "receive-offer")) return [3 /*break*/, 6];
                    user = users[message.from];
                    if (!user) {
                        // don't know about this caller
                        user = {
                            id: message.from,
                            connection: null
                        };
                        users[message.from] = user;
                    }
                    callerConnection = user.connection;
                    if (!callerConnection) {
                        callerConnection = new RTCPeerConnection(configuration);
                        rtcInit(callerConnection, stream, ws, message.from);
                        users[message.from].connection = callerConnection;
                    }
                    offer = message.data;
                    callerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                    return [4 /*yield*/, callerConnection.createAnswer()];
                case 5:
                    answer = _a.sent();
                    /*await*/ callerConnection.setLocalDescription(answer);
                    ws.send(JSON.stringify({
                        "type": "send-answer",
                        "target": message.from,
                        "data": answer
                    }));
                    return [3 /*break*/, 7];
                case 6:
                    if (message.type == "receive-answer") {
                        thisConn = users[message.from].connection;
                        remoteDesc = new RTCSessionDescription(message.data);
                        /*await*/ thisConn.setRemoteDescription(remoteDesc);
                    }
                    // end RTC connection establishment
                    // now ICE
                    else if (message.type == "ice-candidate") {
                        senderConn = users[message.from].connection;
                        /*await*/ senderConn.addIceCandidate(message.data);
                    }
                    else if (message.type == "set-username") {
                        from = message.from;
                        sender = users[from];
                        sender.displayName = message.data;
                    }
                    _a.label = 7;
                case 7: return [2 /*return*/];
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
})
    .catch(function (error) {
    console.error('Error accessing media devices.', error);
});
// common code needed to initialize an rtc connection
function rtcInit(peerConnection, stream, ws, iceTarget) {
    var _this = this;
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
}


/***/ })
/******/ ]);