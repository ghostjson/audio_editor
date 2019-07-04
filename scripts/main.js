import {Component} from './components.js';

const updation_rate = 30; // Frame updation rate
let comp;
let isLoad = false; // song load status

// Create Wavesurfer object
let song = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#FF6600',
    progressColor: '#FF7F00',
    audioRate: 1,
    autoCenter: true,
    splitChannels: false
});


// Window loaded
function load(){
    song.load('bensound-dance.mp3');

    // contains all audio editor components
    comp = new Component(song);

    
}

// update function
function update(){
    
    if(isLoad){
        comp.displaySongTime('small');   
    }
    
}


// on song is ready to play
function songReady(){ 
    comp.playButton('#playbtn');
    comp.volumeSlider('#volume'); 
    comp.muteButton('#mutebtn');
    comp.stopButton('#stopbtn');
}



// Enviroment setup
window.setInterval(()=>update(), 1000/updation_rate);

window.onload = () => load();

song.on('ready', ()=> {songReady();isLoad = true;});