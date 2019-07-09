const updation_rate = 30; // Frame updation rate
let comp = [];
let isLoad = false; // song load status

// Create Wavesurfer object

let no_songs = 0;
let large = 0;
song = [];
$('#playbtn-master').hide();
$('#merge-master').hide();


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
   
    song[no_songs].on('ready', ()=>{
        large < song[no_songs].getDuration() ? large = song[no_songs].getDuration() : 0;
    });
        // console.log(song[0].getDuration());
    comp[no_songs].cropButton('#cropbtn'+no_songs, '#pos1'+no_songs,'#pos2'+no_songs, large);
    comp[no_songs].startPos('#startposbtn'+no_songs, '#startpos'+no_songs, large);

    // comp[no_songs].startPos('#startpos'+no_songs, large);

    // put common UI 
    
    $('#playbtn-master').show();
    $('#merge-master').show();
    


});
}





// Window loaded
function load(){
    // song.load('bensound-dance.mp3');
    
    // contains all audio editor components
    // comp = [new Component(song[0]),new Component(song[1]),new Component(song[2])];

    // Master controls
	$('#playbtn-master').click(function(){
		for(let i=0;i<no_songs;i++){
			song[i].stop();
			song[i].play();
		}
		
    });
    
    $('#merge-master').click(function(){
        let audio = new Crunker();

        
        let response;

        let url;
        audio
            .fetchAudio("../temp/1.mp3", "../temp/newpath.mp3")
            .then(buffers => audio.mergeAudio(buffers))
            .then(merged => audio.export(merged, "audio/mp3"))
            .then(output => {
                // => {blob, element, url}
                audio.download(output.blob);
                let buffer = new Buffer(blob, "binary");
            })
           .catch(error => {
                console.log(error);
            });

    });

}

// Ready player
function songReady(){
    console.log('hello');
}



// update function
function update(){
    
    
    for(let i=0;i<no_songs;i++){
        comp[i].displaySongTime('#time'+i);
    }
    
    
}


// Enviroment setup
window.setInterval(()=>update(), 1000/updation_rate);

window.onload = () => load();

// song[0].on('ready', ()=> {songReady();});