class Component{
    constructor(song, volume=0.5){
        this.song = song;
        this.song.setVolume(volume);
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

    // display current song time in the given container
    displaySongTime(container){
        let crt_time = this.song.getCurrentTime();
        var m = Math.floor(crt_time % 3600 / 60);
        var s = Math.floor(crt_time % 3600 % 60);
        s / 10 >= 1 ? s=s : s = `0${s}`; //if second has only one digit display 0x format
        $(container).text(`${m}:${s}`);
    }
}

