class Crop{
    constructor(song){
        // var au  dioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 10, audioCtx.sampleRate);
        this.song = song;
    }

    crop(c1,c2){
       
        
        // this.selectRegion(c1,c2);
        
        // create a new buffer to hold the new clip
        let buffer = this.createBuffer(this.song.backend.buffer, c2-c1)
        // copy
        this.copyBuffer(this.song.backend.buffer, c1, c2, buffer, 0)
        
        // load the new buffer
        this.song.empty()
        this.song.loadDecodedBuffer(buffer)
    }

    


    createBuffer(originalBuffer, duration) {
        let sampleRate = originalBuffer.sampleRate
        let frameCount = duration * sampleRate
        let channels = originalBuffer.numberOfChannels 
        return new AudioContext().createBuffer(channels, frameCount, sampleRate)
        }
        
    copyBuffer(fromBuffer, fromStart, fromEnd, toBuffer, toStart) {
        let sampleRate = fromBuffer.sampleRate
        let frameCount = (fromEnd - fromStart) * sampleRate
        for (let i = 0; i < fromBuffer.numberOfChannels; i++) {
            let fromChanData = fromBuffer.getChannelData(i)
            let toChanData = toBuffer.getChannelData(i)
            for (let j = 0, f = Math.round(fromStart*sampleRate), t = Math.round(toStart*sampleRate); j < frameCount; j++, f++, t++) {
                toChanData[t] = fromChanData[f]
            }
        }
    }
}
