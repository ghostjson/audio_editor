<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="styles/main.css">
    <script src="https://kit.fontawesome.com/7d40304bdb.js"></script>
    <title>Audio Editor</title>
</head>
<body>
    
    <main>

        <?php for($i=0;$i<3;$i++): ?>

            <div id="song<?=$i?>" class="song">
                <div id="waveform<?=$i?>"></div>
                <button id="playbtn<?=$i?>" ><i class="fas fa-play-circle"></i></button>
                <button id="stopbtn<?=$i?>"><i class="fas fa-stop-circle"></i></button>
                <button id="mutebtn<?=$i?>"><i class="fas fa-volume-up"></i></button>
                <input type="range" class='slider' min="0" max="1" value="0.5" step="0.025" id="volume<?=$i?>">
                <br>
                <button id='cropbtn<?=$i?>'><i class="fas fa-cut"></i></button>
                <input type="text" id="pos1<?=$i?>" placeholder="Crop Start Position">
                <input type="text" id="pos2<?=$i?>" placeholder="Crop End Position">
                
                
                <div id="time<?=$i?>" class="time"></div>
                <!-- <button id="startposbtn<?=$i?>"><i class="fas fa-arrows-alt"></i></button>
                <input type="text" id="startpos<?=$i?>" placeholder="Move to"> -->

            </div>
        <?php endfor; ?>
        

        
        <div id="filename"></div>
        <div id="progress"></div>
        <div id="progressBar"></div>

            <br><br>

        <label for="add" class="addbtn">Add +</label>
        <input type="file" id="add" name="song" accept="audio/*" enctype="multipart/form-data" style="display:none;"/>
        
        <button id="playbtn-master">play</button>


        <button id="merge-master">Merge</button>
    
    </main>



    <script src="scripts/jquery-3.3.1.min.js"></script>
    <script src="scripts/wavesurfer.min.js"></script>
    <script src="scripts/simpleUpload.min.js"></script>

    <!-- <script src="scirpts/crunker.js"></script> -->
    <script src="scripts/components.js"></script>


    <script src="scripts/app.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>