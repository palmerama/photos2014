(function(){

    var namespace = MAIN.namespace('MAIN.app');
    var stage;


    if (namespace.AdminNewPhotoManager === undefined) 
	{
        namespace.AdminNewPhotoManager = function()
		{	
		}

		var p = namespace.AdminNewPhotoManager.prototype;	

		
		p.init = function()
		{
			this.textController = new namespace.TextController();
			this.textController.init();		

			// $('#select-image-form').bind('submit', this.uploadSelectedImage.bind(this));
			$('#new-photo-btn').bind('click', this.onClickNewPhoto.bind(this));

			$('#uploaded_image').change(function() {
				console.log($('#select_photo'));
			  	$('#select_photo').submit();
			});

			$('#temp-photo').load(this.initPhotoText.bind(this));
			$('#titleCard').bind('input', this.onTitleCardTextChange.bind(this));
		}

		p.onClickNewPhoto = function(e)
		{
			e.preventDefault();
			$('#uploaded_image')[0].click();
		}

		p.uploadSelectedImage = function(e)
		{
			e.preventDefault();

		    $(e.target).ajaxSubmit({
		        success:  this.onSelectPhotoSuccess.bind(this)
		    });
		}

		p.onSelectPhotoSuccess = function(imgURL)
		{
			TweenMax.to('#select-image-form', 0, {autoAlpha:0});
			$('#temp-photo').attr('src', imgURL);
		}

		p.initPhotoText = function(e)
		{
			this.textShadowColour = '#FFF';

			this.textController.fitTitleToArea(1, $('#temp-photo').width(), $('#temp-photo').height());
			TweenMax.to('#titleCard', 0, { textShadow:this.textShadowColour + ' 0 0 0px' });
			TweenMax.to('#titleCard', 1, { autoAlpha:.3, ease:Sine.easeIn });
		}

		p.onTitleCardTextChange = function(e)
		{
			this.textController.fitTitleToArea(1, $('#temp-photo').width(), $('#temp-photo').height());			
		}
	}

})();
