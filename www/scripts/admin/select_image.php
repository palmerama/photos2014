<?php 

	if( isset($_FILES) ) 
	{  
		// clear tmp folder
		$files = glob('../../img/photos/tmp/*'); // get all file names
		foreach($files as $file){ // iterate files
		  if(is_file($file))
		    unlink($file); // delete file
		}

		// save resized image
		include('../simpleimage.php'); 

	 	$quality = 90;
	 	$fileType = IMAGETYPE_JPEG;

	 	$image = new SimpleImage(); 
	 	$image->load($_FILES['uploaded_image']['tmp_name']); 

	 	$image->resizeToWidth(2000);
	 	$image->save('../../img/photos/1-2000.jpg', $fileType, $quality);

	 	$image->resizeToWidth(1500);
	 	$image->save('../../img/photos/1-1500.jpg', $fileType, $quality);

	 	$image->resizeToWidth(1000);
	 	$image->save('../../img/photos/tmp/OOF.jpg', $fileType, $quality);
	 	$image->save('../../img/photos/1-1000.jpg', $fileType, $quality);

	 	$image->resizeToWidth(500);
	 	$image->save('../../img/photos/1-500.jpg', $fileType, $quality);

	 	echo '../img/photos/tmp/OOF.jpg';
	} 
	else echo 'NO';

?>  