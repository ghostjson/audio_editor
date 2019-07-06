const updation_rate = 30; // Frame updation rate
let comp = [];
let isLoad = false; // song load status

// Create Wavesurfer object

let no_songs = 0;
let large = 0;
song = [];



// song added
function addSong(song,no_songs){

    song.push(WaveSurfer.create({  //add wavesurfer object
        container: '#waveform'+no_songs,
        waveColor: '#FF6600',
        progressColor: '#FF7F00',
        audioRate: 1,
        autoCenter: true,
        splitChannels: false
    }));

    comp.push(new Component(song[no_songs])); // add new song's components

    comp[no_songs].playButton('#playbtn'+no_songs);
    comp[no_songs].volumeSlider('#volume'+no_songs); 
    comp[no_songs].muteButton('#mutebtn'+no_songs);
    comp[no_songs].stopButton('#stopbtn'+no_songs);

    
    

    $('#song'+no_songs).show(); // show song wave

    //song ready
    song[no_songs].on('ready', ()=>{
        
        if(song[no_songs].getDuration() > large){
            large = song[no_songs].getDuration();
        }
   
    if(no_songs == 0){
        large = song[no_songs].getDuration();
    }
        // console.log(song[0].getDuration());
    comp[no_songs].cropButton('#cropbtn'+no_songs, '#pos1'+no_songs,'#pos2'+no_songs, large);
    comp[no_songs].startPos('#btn', '#startpos'+no_songs, large);

    // comp[no_songs].startPos('#startpos'+no_songs, large);
});
}

$('#btn').click(()=>{
});




// Window loaded
function load(){
    // song.load('bensound-dance.mp3');
    
    // contains all audio editor components
    // comp = [new Component(song[0]),new Component(song[1]),new Component(song[2])];
}



// update function
function update(){
    
    
    for(let i=0;i<no_songs;i++){
        comp[i].displaySongTime('#time'+i);
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