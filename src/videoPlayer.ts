import dashjs from 'dashjs';

export class videoPlayer{
    private player: dashjs.MediaPlayerClass;

    /**
     * Initializes player module.
     * 
     */
    constructor(){
        this.player = dashjs.MediaPlayer().create();
    }

    /**
     * Initializes and configure the player
     * 
     * @param {string} divId - The id of the div where the player will be deployed.
     */
    setContainer(divId: string){
        let container = document.getElementById(divId);
        if(container != null){
            let videoElement = document.createElement("VIDEO");
            videoElement.setAttribute("controls", "true");
            container.appendChild(videoElement);
            this.player.initialize();
            this.player.setAutoPlay(false);
            this.player.attachView(videoElement);
        }
        else{
            throw new Error("Container #" + divId + " not found.");
        }
    }

    /**
     * Opens a new video url and starts to preload the video.
     * 
     * @param {string} videoUrl - Video source URL.
     */
    open(videoUrl: string){
        this.player.attachSource(videoUrl);
        this.player.preload();
    }

    /**
     * Plays the video.
     * 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    play(){
        if(this.player.isReady()){
            if(this.player.isPaused()){
                this.player.play();
            }
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }
    /**
     * Pauses the video.
     * 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    pause(){
        if(this.player.isReady()){
            if(!this.player.isPaused()){
                this.player.pause();
            }
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }/**
     * Jumps to a specific time given in seconds.
     * 
     * @param {number} at - time in seconds to jump at.
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    seek(at:number) {
        if(this.player.isReady()){
            let duration : number = this.player.duration();
            if(at >= 0 && at <= duration){
                this.player.seek(at);
            }
            else if(at > duration){
                this.player.seek(duration);
            }
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Stops the video
     * 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    stop(){
        if(this.player.isReady()){
            this.player.attachSource(this.player.getSource());
            this.player.pause();
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Destroys the player and release the resources.
     * 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    destroy(){
        if(this.player.isReady()){
            this.player.getVideoElement().remove();
            this.player.reset();
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Returns the duration of the current video.
     * 
     * @returns {number} 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    getDuration(): number{
        if(this.player.isReady()){
            return this.player.duration();            
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Toggles the mute of the function.
     * 
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    toggleMute(){
        if(this.player.isReady()){
            this.player.setMute(!this.player.isMuted());
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Turns the volume up/down by the value given.
     * 
     * @param {string} direction - It tells the direction of the volume change. "up" or "down".
     * @param {string} value - Value to change. It's ranged from 0 to 1 (values under 0 or over 1 will set it to the min/max respectively).
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    turnVolume(direction: string, value: number){
        if(this.player.isReady()){
            if(direction === "up" && this.player.getVolume() != 1){
                if(this.player.getVolume() + value < 1){
                    this.player.setVolume(this.player.getVolume() + value);
                }
                else if(this.player.getVolume() + value >= 1 ){
                    this.player.setVolume(1);
                }
            }
            else if(direction === "down" && this.player.getVolume() != 0){
                if(this.player.getVolume() - value > 0){
                    this.player.setVolume(this.player.getVolume() - value);
                }
                else if(this.player.getVolume() - value <= 0){
                    this.player.setVolume(0);
                }
            }
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }

    /**
     * Sets the DRM protection module.
     * Protection data should be set before the video is initialized or PROTECTION_CREATED event fired
     * 
     * @param {ProtectionDataSet} value - object containing
     * property names corresponding to key system name strings and associated
     * values being instances of.
     * @throws {Error} - Error if there are no view and/or source attached to the player.
     */
    setProtection(protectionData: dashjs.ProtectionDataSet){
        if(this.player.isReady()){
            this.player.setProtectionData(protectionData);
        }
        else{
            throw new Error("Player has not attached the View or the source.");
        }
    }
}
