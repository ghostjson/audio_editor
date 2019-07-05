const updation_rate = 30; // Frame updation rate
let comp = [];
let isLoad = false; // song load status

// Create Wavesurfer object

let no_songs = 0;

song = [];

function addSong(song,no_songs){
    song.push(WaveSurfer.create({
        container: '#waveform'+no_songs,
        waveColor: '#FF6600',
        progressColor: '#FF7F00',
        audioRate: 1,
        autoCenter: true,
        splitChannels: false
    }));

    comp.push(new Component(song[no_songs]));

    comp[no_songs].playButton('#playbtn'+no_songs);
    comp[no_songs].volumeSlider('#volume'+no_songs); 
    comp[no_songs].muteButton('#mutebtn'+no_songs);
    comp[no_songs].stopButton('#stopbtn'+no_songs);

    $('#song'+no_songs).show();
}




// Window loaded
function load(){
    // song.load('bensound-dance.mp3');

    // contains all audio editor components
    // comp = [new Component(song[0]),new Component(song[1]),new Component(song[2])];
}



// update function
function update(){
    
    if(isLoad){
        for(let i=0;i<=no_songs;i++){
            comp[i].displaySongTime('#time'+i);
        }
    }
    
}


// on song is ready to play
function songReady(){ 

    // for(let i=0;i<no_songs;i++){
    //     comp[i].playButton('#playbtn'+i);
    //     comp[i].volumeSlider('#volume'+i); 
    //     comp[i].muteButton('#mutebtn'+i);
    //     comp[i].stopButton('#stopbtn'+i);
    //     comp[i].removeButton('#removebtn'+i);
    // }
}



// Enviroment setup
window.setInterval(()=>update(), 1000/updation_rate);

window.onload = () => load();

// song[0].on('ready', ()=> {songReady();isLoad = true;});