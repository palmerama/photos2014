$files = glob('path/to/temp/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

			<?php 
				if( isset($_POST['submit']) ) 
				{  
				 	include('../scripts/simpleimage.php'); 

				 	$quality = 90;
				 	$fileType = IMAGETYPE_JPEG;

				 	$image = new SimpleImage(); 
				 	$image->load($_FILES['uploaded_image']['tmp_name']); 

				 	$image->resizeToWidth(2000);
				 	$image->save('../img/photos/test-2000.jpg', $fileType, $quality);

				 	$image->resizeToWidth(1500);
				 	$image->save('../img/photos/test-1500.jpg', $fileType, $quality);

				 	$image->resizeToWidth(1000);
				 	$image->save('../img/photos/test-1000.jpg', $fileType, $quality);

				 	$image->resizeToWidth(500);
				 	$image->save('../img/photos/test-500.jpg', $fileType, $quality);

				 	echo('<img src="../img/photos/test-1000.jpg">');
				} 
				else { 
			?>  

			   

			<?php } ?>