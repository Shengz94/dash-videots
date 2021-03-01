import dashjs from 'dashjs';
export declare class videoPlayer {
    private player;
    constructor();
    setContainer(divId: string): void;
    open(videoUrl: string): void;
    play(): void;
    pause(): void;
    seek(at: number): void;
    stop(): void;
    destroy(): void;
    getDuration(): number;
    toggleMute(): void;
    turnVolume(direction: string, value: number): void;
    setProtection(protectionData: dashjs.ProtectionDataSet): void;
}
