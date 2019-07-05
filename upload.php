<?php


    session_start();

    if(!isset($_SESSION['no_of_songs'])){
        $_SESSION['no_of_songs'] = 0;
    }
    

    $file_store_path = 'temp/w1/';

    // phpinfo();

    // print_r($_FILES['song']);

    if($_FILES["song"]["error"] == UPLOAD_ERR_OK){
        $file = $_FILES["song"]["tmp_name"];
        
        // echo $file;
        
        $_SESSION['no_of_songs'] += 1;

        move_uploaded_file($file,$file_store_path. $_SESSION['no_of_songs'] . $_FILES["song"]["name"]);
        echo $file_store_path . $_SESSION['no_of_songs']. $_FILES["song"]["name"] ;
    }else{
        echo 'Failed';
    }

 