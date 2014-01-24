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

	 	$quality = 95;
	 	$fileType = IMAGETYPE_JPEG;

	 	$image = new SimpleImage(); 

	 	$image->load($_FILES['uploaded_image']['tmp_name']);
	 	$portrait = $image->getHeight() > $image->getWidth();
	 	if ($portrait) $image->resizeToHeight(2000);
	 	else $image->resizeToWidth(2000);
	 	$image->save('../../img/photos/tmp/tmp_photo_2000.jpg', $fileType, $quality);

	 	$image->load($_FILES['uploaded_image']['tmp_name']);
	 	if ($portrait) $image->resizeToHeight(1500);
	 	else $image->resizeToWidth(1500);
	 	$image->save('../../img/photos/tmp/tmp_photo_1500.jpg', $fileType, $quality);

	 	$image->load($_FILES['uploaded_image']['tmp_name']);
	 	if ($portrait) $image->resizeToHeight(1000);
	 	else $image->resizeToWidth(1000);
	 	$image->save('../../img/photos/tmp/tmp_photo_1000.jpg', $fileType, $quality);

	 	$image->load($_FILES['uploaded_image']['tmp_name']);
	 	if ($portrait) $image->resizeToHeight(500);
	 	else $image->resizeToWidth(500);
	 	$image->save('../../img/photos/tmp/tmp_photo_500.jpg', $fileType, $quality);

	 	header("Location: ../../admin/edit_photo.php?id=-1");
	} 

?>  