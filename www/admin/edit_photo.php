<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

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

			<div id='edit-photo-harness'>
				<img id='edit-photo' src=''/>
				<div id='titleCard'>
					<span contenteditable></span>
				</div>
			</div>

			<div id='controls'>

				<div class='input-harness'>
					<div id='page-id' class='list-title'>PAGE ID: </div>
					<div id='page-id-input' class='list-title input' contenteditable></div>
				</div>

				<div class='input-harness'>
					<div id='title-alpha' class='list-title'>TITLE ALPHA: </div>
					<div id='title-alpha-input' class='list-title input' contenteditable></div>
				</div>	

				<div class='input-harness'>
					<div id='cover' class='list-title'>USE AS COVER? </div>
					<div id='cover-input' class='list-title input'>NO</div>
				</div>

				<div class='button-harness'>
					<a href='#' class='button' id='update-btn'>UPDATE</a>
				</div>

			</div>

		</div>

		<!-- RELEASE
		<script type="text/javascript" src="js/Site_0.0.1.min.js"></script>
		END RELEASE -->

		<!-- DEV (These files are minified &/OR concatenated into the file above -->
		<script type="text/javascript" src="../../dev/libs/misc/Function.prototype.bind.js"></script>
		<script type="text/javascript" src="../../dev/libs/misc/jquery.form.min.js"></script>
		<script type="text/javascript" src="../../dev/libs/misc/jquery.hotkeys.js"></script>
		<script type="text/javascript" src="../../dev/libs/misc/keybinding.js"></script>
 
		<script type="text/javascript" src="../../dev/rhythm/utils/Tools.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/Main.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/utils/JSAddress.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/BGController.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/TextController.js"></script>
		<script type="text/javascript" src="../../dev/rhythm/app/AdminEditPhotoManager.js"></script>
		<!-- END DEV -->

		<script type="text/javascript">
			MAIN.init = function()
			{
				var app = MAIN.namespace('MAIN.app');
				new app.AdminEditPhotoManager().init(<?php echo $_GET['id']; ?>);
			};

			$(function(){
				MAIN.init();
			});
		</script>
	</body>

</html>