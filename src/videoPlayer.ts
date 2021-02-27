import dashjs from 'dashjs';

class videoPlayer{
    private player: dashjs.MediaPlayerClass;
    private videoElement?: HTMLElement;

    constructor(){
        this.player = dashjs.MediaPlayer().create();
    }

    setContainer(divId: string){
        let container = document.getElementById(divId);
        if(container != null){
            this.videoElement = document.createElement("VIDEO");
            this.videoElement.setAttribute("controls", "true");
            this.videoElement.setAttribute("style", "width:640px") ////////
            container.appendChild(this.videoElement);
            this.player.initialize();
            this.player.setAutoPlay(false);
            this.player.attachView(this.videoElement);
        }
        else{
            throw new Error("Container #" + divId + " not found.");
        }
    }

    open(videoUrl: string){
        this.player.attachSource(videoUrl);
        this.player.preload();
    }
    play(){
        if(this.player.isReady()){
            if(this.player.isPaused()){
                this.player.play();
            }
        }
    }
    pause(){
        if(this.player.isReady()){
            if(!this.player.isPaused()){
                this.player.pause();
            }
        }
    }
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
    }
    stop(){
        if(this.player.isReady()){
            this.player.attachSource(this.player.getSource());
            this.player.pause();
        }
    }
    destroy(){
        if(this.player.isReady()){
            this.player.reset();
            if(this.videoElement != null){
                this.videoElement.remove();
            }
        }
    }
}

export default videoPlayer