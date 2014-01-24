<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<!--[if lt IE 9]> <html class="ie8"> <![endif]-->
<!--[if IE 9]> <html class="ie9"> <![endif]-->

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Admin Palmer</title>

		<link href='http://fonts.googleapis.com/css?family=Montserrat:700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="../css/admin.css" type="text/css" media="all" />

		<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>	
		<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>

	</head>

	<body>
		
		<div id='container'>

			<div id='select-image-form'>

				<form action='../scripts/admin/select_image.php' name='select_photo' id='select_photo' method="post" enctype="multipart/form-data"> 
					<input type="file" id='uploaded_image' name="uploaded_image" />   
					<input type="submit" id="submit-btn" name="submit-btn" value="Select Photo" />
				</form>

			</div>

			<div class='button-harness'>
				<a href='#' class='button' id='new-photo-btn'>+</a>
			</div>

			<div id='photo-harness'>
				<img id='temp-photo' src=''/>
				<div id='titleCard'>
					<span contenteditable>TYPE HERE...</span>
				</div>
			</div>

		</div>

		<!-- RELEASE
		<script type="text/javascript" src="js/Site_0.0.1.min.js"></script>
		END RELEASE -->

		<!-- DEV (These files are minified &/OR concatenated into the file above -->
		<script type="text/javascript" src="../../dev/libs/misc/Function.prototype.bind.js"></script>
		<!--<script type="text/javascript" src="../../dev/libs/misc/jquery.form.min.js"></script>-->
 
		<script type="text/javascript" src="../../dev/rhythm/utils/Tools.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/Main.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/utils/JSAddress.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/BGController.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/TextController.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/AdminNewPhotoManager.js"></script>
		<!-- END DEV -->

		<script type="text/javascript">
			MAIN.init = function()
			{
				var app = MAIN.namespace('MAIN.app');
				new app.AdminNewPhotoManager().init();
			};

			$(function(){
				MAIN.init();
			});
		</script>
	</body>

</html>