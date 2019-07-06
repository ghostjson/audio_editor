class Component{
    constructor(song, volume=0.5){
        this.song = song;
        this.original = song;
        this.song.setVolume(volume);
        this.song.frontSpace = 0
        this.song.backSpace = 0
        // this.playbutton = '#playbtn';
    }
    // set play button
    playButton(container){
        $(container).click(()=>{
            this.playbutton = container;
            
            if(this.song.isPlaying()){
                this.song.pause();
                $(container).text('play');
            }
            else{
                this.song.play();
                $(container).text('pause');
            }
        });
    }

    // volume slider
    volumeSlider(container){
        $(container).on('input',()=>{
            let volume = $(container).val();
            this.song.setVolume(volume);
        });  
    }

    // Mute button
    muteButton(container){
        $(container).click(()=>{
            if(this.song.getMute()){
                this.song.setMute(!this.song.getMute());
                $(container).text('Mute');
            }else{
                this.song.setMute(!this.song.getMute());
                $(container).text('UnMute');
            }
        });
    }

    // Stop button
    stopButton(container){
        $(container).click(()=>{
            this.song.stop();
            $(this.playbutton).text('play');
        });
    }

    // Crop button
    cropButton(container, pos1,pos2,large){
        console.log(large);
        $(container).click(()=>{
            pos1 = $(pos1).val();
            pos2 = $(pos2).val();
            let c = new Crop(this.song);
            c.crop(pos1,pos2,large);
        });
    }

    // Start position
    startPos(container,value, large){

        $(container).click(()=>{

            let pos = $(value).val();

            this.setFrontSpace(pos);
            this.setBackSpace(large - (pos+this.song.getDuration()));
        
        });
    
    }


    // set front space
    setFrontSpace(space){

            
            let crt_space = space - this.song.frontSpace
            
            
            let songBuff = this.original.backend.buffer
            let sampleRate = songBuff.sampleRate
            let frameCount = Math.round(crt_space * sampleRate)
            let channels = songBuff.numberOfChannels
            let buffer = new AudioContext().createBuffer(channels, frameCount, sampleRate)
            this.song.empty()
            this.song.loadDecodedBuffer(appendBuffer(buffer, songBuff));
            
            this.song.frontSpace = space
    }

    
    //set end space
    setBackSpace(space){

        this.song.backSpace += space

        if(!space){
            let songBuff = this.original.backend.buffer
            let sampleRate = songBuff.sampleRate
            let frameCount = Math.round(space * sampleRate)
            let channels = songBuff.numberOfChannels
            let buffer = new AudioContext().createBuffer(channels, frameCount, sampleRate)
            this.song.empty()
            this.song.loadDecodedBuffer(appendBuffer(songBuff, buffer));
        }
    }

    // display current song time in the given container
    displaySongTime(container){
        let crt_time = this.song.getCurrentTime();
        var m = Math.floor(crt_time % 3600 / 60);
        var s = Math.floor(crt_time % 3600 % 60);
        s / 10 >= 1 ? s=s : s = `0${s}`; //if second has only one digit display 0x format
        $(container).text(`${m}:${s}`);
    }
}







// Crop class
class Crop{
    constructor(song){
        // var au  dioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 10, audioCtx.sampleRate);
        this.song = song;
    }

    crop(c1,c2,large){
       
        
        // this.selectRegion(c1,c2);
        
        // create a new buffer to hold the new clip
        let buffer = this.createBuffer(this.song.backend.buffer, c2-c1)
        // copy
        this.copyBuffer(this.song.backend.buffer, c1, c2, buffer, 0)
        
        // load the new buffer
        this.song.empty()
        let buffer1 = this.createBuffer(this.song.backend.buffer, large-buffer.duration);
        this.song.loadDecodedBuffer(appendBuffer(buffer, buffer1));
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
function appendBuffer(buffer1, buffer2) {
    var numberOfChannels = Math.min( buffer1.numberOfChannels, buffer2.numberOfChannels );
    var tmp = new AudioContext().createBuffer( numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate );
    for (var i=0; i<numberOfChannels; i++) {
      var channel = tmp.getChannelData(i);
      channel.set( buffer1.getChannelData(i), 0);
      channel.set( buffer2.getChannelData(i), buffer1.length);
    }
return tmp;
}

function putSong(buffer1, pos, length){
    
}