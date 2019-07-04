<?php

    $file_store_path = 'temp/';

    // phpinfo();

    // print_r($_FILES['song']);

    if($_FILES["song"]["error"] == UPLOAD_ERR_OK){
        $file = $_FILES["song"]["tmp_name"];
        
        // echo $file;
        
        move_uploaded_file($_FILES["song"]["tmp_name"],$file_store_path . $_FILES["song"]["name"]);
        echo $file_store_path . $_FILES["song"]["name"];
    }else{
        echo 'Failed';
    }

 