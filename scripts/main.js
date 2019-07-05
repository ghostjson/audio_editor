// $('input[type=file]').change(function() { 
//     // select the form and submit
//     $('form').submit(); 
// });


$(document).ready(function(){

	$('input[type=file]').change(function(){

		$(this).simpleUpload("upload.php", {

			start: function(file){
				//upload started
				$('#filename').html(file.name);
				$('#progress').html("");
				$('#progressBar').width(0);
			},

			progress: function(progress){
				//received progress
				$('#progress').html("Progress: " + Math.round(progress) + "%");
				$('#progressBar').width(progress + "%");
			},

			success: function(data){
				//upload successful
				$('#progress').html("Success!<br>Data: " + JSON.stringify(data));
				
				addSong(song,no_songs);
				song[no_songs].load(data);
				no_songs++;
				
			},

			error: function(error){
				//upload failed
				$('#progress').html("Failure!<br>" + error.name + ": " + error.message);
			}

		});

	});

});
