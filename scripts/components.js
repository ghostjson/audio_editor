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
                $(container).html('<i class="fas fa-play-circle"></i>');
            }
            else{
                this.song.play();
                $(container).html('<i class="fas fa-pause-circle"></i>');
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
                $(container).html('<i class="fas fa-volume-up"></i>');
            }else{
                this.song.setMute(!this.song.getMute());
                $(container).html('<i class="fas fa-volume-mute"></i>');
            }
        });
    }

    // Stop button
    stopButton(container){
        $(container).click(()=>{
            this.song.stop();
            $(this.playbutton).html('<i class="fas fa-play-circle"></i>');
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
            let frameCount = crt_space * sampleRate
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



// merge
class Crunker {
    constructor({ sampleRate = 44100 } = {}) {
      this._sampleRate = sampleRate;
      this._context = this._createContext();
      console.log('create merge object')
    }
  
    _createContext() {
      window.AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;
      return new AudioContext();
    }
  
    async fetchAudio(...filepaths) {
        console.log('fetchaudio');
      const files = filepaths.map(async filepath => {
        const buffer = await fetch(filepath).then(response =>
          response.arrayBuffer()
        );
        return await this._context.decodeAudioData(buffer);
      });
      return await Promise.all(files);
    }
  
    mergeAudio(buffers) {
      let output = this._context.createBuffer(
        1,
        this._sampleRate * this._maxDuration(buffers),
        this._sampleRate
      );
  
      buffers.map(buffer => {
        for (let i = buffer.getChannelData(0).length - 1; i >= 0; i--) {
          output.getChannelData(0)[i] += buffer.getChannelData(0)[i];
        }
      });
      return output;
    }
  
    concatAudio(buffers) {
      let output = this._context.createBuffer(
          1,
          this._totalLength(buffers),
          this._sampleRate
        ),
        offset = 0;
      buffers.map(buffer => {
        output.getChannelData(0).set(buffer.getChannelData(0), offset);
        offset += buffer.length;
      });
      return output;
    }
  
    play(buffer) {
      const source = this._context.createBufferSource();
      source.buffer = buffer;
      source.connect(this._context.destination);
      source.start();
      return source;
    }
  
    export(buffer, audioType) {
      const type = audioType || "audio/mp3";
      const recorded = this._interleave(buffer);
      const dataview = this._writeHeaders(recorded);
      const audioBlob = new Blob([dataview], { type: type });
  
      return {
        blob: audioBlob,
        url: this._renderURL(audioBlob),
        element: this._renderAudioElement(audioBlob, type)
      };
    }
  
    download(blob, filename) {
      const name = filename || "crunker";
      const a = document.createElement("a");
      a.style = "display: none";
      a.href = this._renderURL(blob);
      a.download = `${name}.${blob.type.split("/")[1]}`;
      a.click();
      return a;
    }
  
    notSupported(callback) {
      return !this._isSupported() && callback();
    }
  
    close() {
      this._context.close();
      return this;
    }
  
    _maxDuration(buffers) {
      return Math.max.apply(Math, buffers.map(buffer => buffer.duration));
    }
  
    _totalLength(buffers) {
      return buffers.map(buffer => buffer.length).reduce((a, b) => a + b, 0);
    }
  
    _isSupported() {
      return "AudioContext" in window;
    }
  
    _writeHeaders(buffer) {
      let arrayBuffer = new ArrayBuffer(44 + buffer.length * 2),
        view = new DataView(arrayBuffer);
  
      this._writeString(view, 0, "RIFF");
      view.setUint32(4, 32 + buffer.length * 2, true);
      this._writeString(view, 8, "WAVE");
      this._writeString(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 2, true);
      view.setUint32(24, this._sampleRate, true);
      view.setUint32(28, this._sampleRate * 4, true);
      view.setUint16(32, 4, true);
      view.setUint16(34, 16, true);
      this._writeString(view, 36, "data");
      view.setUint32(40, buffer.length * 2, true);
  
      return this._floatTo16BitPCM(view, buffer, 44);
    }
  
    _floatTo16BitPCM(dataview, buffer, offset) {
      for (var i = 0; i < buffer.length; i++, offset += 2) {
        let tmp = Math.max(-1, Math.min(1, buffer[i]));
        dataview.setInt16(offset, tmp < 0 ? tmp * 0x8000 : tmp * 0x7fff, true);
      }
      return dataview;
    }
  
    _writeString(dataview, offset, header) {
      let output;
      for (var i = 0; i < header.length; i++) {
        dataview.setUint8(offset + i, header.charCodeAt(i));
      }
    }
  
    _interleave(input) {
      let buffer = input.getChannelData(0),
        length = buffer.length * 2,
        result = new Float32Array(length),
        index = 0,
        inputIndex = 0;
  
      while (index < length) {
        result[index++] = buffer[inputIndex];
        result[index++] = buffer[inputIndex];
        inputIndex++;
      }
      return result;
    }
  
    _renderAudioElement(blob, type) {
      const audio = document.createElement("audio");
      audio.controls = "controls";
      audio.type = type;
      audio.src = this._renderURL(blob);
      return audio;
    }
  
    _renderURL(blob) {
      return (window.URL || window.webkitURL).createObjectURL(blob);
    }
  }


// blob to audio
function uploadAudio(mp3Data){
  var reader = new FileReader();
  reader.onload = function(event){
    var fd = new FormData();
    var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
    console.log("mp3name = " + mp3Name);
    fd.append('fname', mp3Name);
    fd.append('data', event.target.result);
    $.ajax({
      type: 'POST',
      url: 'merge.php',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(data) {
      console.log(data);
      // log.innerHTML += "\n" + data;
    });
  };      
  // reader.readAsDataURL(mp3Data);
}