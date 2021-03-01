"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoPlayer = void 0;
const dashjs_1 = __importDefault(require("dashjs"));
class videoPlayer {
    constructor() {
        this.player = dashjs_1.default.MediaPlayer().create();
    }
    setContainer(divId) {
        let container = document.getElementById(divId);
        if (container != null) {
            let videoElement = document.createElement("VIDEO");
            videoElement.setAttribute("controls", "true");
            container.appendChild(videoElement);
            this.player.initialize();
            this.player.setAutoPlay(false);
            this.player.attachView(videoElement);
        }
        else {
            throw new Error("Container #" + divId + " not found.");
        }
    }
    open(videoUrl) {
        this.player.attachSource(videoUrl);
        this.player.preload();
    }
    play() {
        if (this.player.isReady()) {
            if (this.player.isPaused()) {
                this.player.play();
            }
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    pause() {
        if (this.player.isReady()) {
            if (!this.player.isPaused()) {
                this.player.pause();
            }
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    seek(at) {
        if (this.player.isReady()) {
            let duration = this.player.duration();
            if (at >= 0 && at <= duration) {
                this.player.seek(at);
            }
            else if (at > duration) {
                this.player.seek(duration);
            }
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    stop() {
        if (this.player.isReady()) {
            this.player.attachSource(this.player.getSource());
            this.player.pause();
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    destroy() {
        if (this.player.isReady()) {
            this.player.getVideoElement().remove();
            this.player.reset();
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    getDuration() {
        if (this.player.isReady()) {
            return this.player.duration();
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    toggleMute() {
        if (this.player.isReady()) {
            this.player.setMute(!this.player.isMuted());
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    turnVolume(direction, value) {
        if (this.player.isReady()) {
            if (direction === "up" && this.player.getVolume() != 1) {
                if (this.player.getVolume() + value < 1) {
                    this.player.setVolume(this.player.getVolume() + value);
                }
                else if (this.player.getVolume() + value >= 1) {
                    this.player.setVolume(1);
                }
            }
            else if (direction === "down" && this.player.getVolume() != 0) {
                if (this.player.getVolume() - value > 0) {
                    this.player.setVolume(this.player.getVolume() - value);
                }
                else if (this.player.getVolume() - value <= 0) {
                    this.player.setVolume(0);
                }
            }
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
    setProtection(protectionData) {
        if (this.player.isReady()) {
            this.player.setProtectionData(protectionData);
        }
        else {
            throw new Error("Player has not attached the View or the source.");
        }
    }
}
exports.videoPlayer = videoPlayer;
