<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles/main.css">
    <title>Audio Editor</title>
</head>
<body>
    
    <main>

        <?php for($i=0;$i<3;$i++): ?>

            <div id="song<?=$i?>">
                <div id="waveform<?=$i?>"></div>
                <button id="playbtn<?=$i?>">Play</button>
                <button id="mutebtn<?=$i?>">Mute</button>
                <button id="stopbtn<?=$i?>">Stop</button>
                <input type="range" min="0" max="1" value="0.5" step="0.025" id="volume<?=$i?>">
                
                <div id="time<?=$i?>"></div>
            </div>
        <?php endfor; ?>
        <!-- <div id="song1">
            <div id="waveform1"></div>
            <button id="playbtn1">Play</button>
            <button id="mutebtn1">Mute</button>
            <button id="stopbtn1">Stop</button>
            <input type="range" min="0" max="1" value="0.5" step="0.025" id="volume1">        
            
            <div id="time1"></div>
        </div>
        
        <div id="song2">
            <div id="waveform2"></div>
            <button id="playbtn2">Play</button>
            <button id="mutebtn2">Mute</button>
            <button id="stopbtn2">Stop</button>
            <input type="range" min="0" max="1" value="0.5" step="0.025" id="volume2">    
            
            <div id="time2"></div>
        </div> -->
        
        
        
        <!-- <form action="upload.php" method="post" enctype="multipart/form-data"> -->
            <!-- <input type="file" id="add" name="song" accept="audio/*"> -->  
        <!-- </form> -->

        <div id="filename"></div>
        <div id="progress"></div>
        <div id="progressBar"></div>

            <br><br>

        <label for="add" class="addbtn">Add +</label>
        <input type="file" id="add" name="song" accept="audio/*" enctype="multipart/form-data" style="display:none;"/>
        
        <button id="playbtn-master">play</button>
    
    </main>



    <script src="scripts/jquery-3.3.1.min.js"></script>
    <script src="scripts/wavesurfer.min.js"></script>
    <script src="scripts/simpleUpload.min.js"></script>

    <script src="scripts/components.js"></script>

    <script src="scirpts/crop.js"></script>

    <script src="scripts/app.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>