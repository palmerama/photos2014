(function(){

    var namespace = MAIN.namespace('MAIN.app');
    var stage;


    if (namespace.AppManager === undefined) 
	{
        namespace.AppManager = function()
		{	
		}

		var p = namespace.AppManager.prototype;	

		
		p.init = function()
		{
			console.log("App initialising...");	

			// setup
			this.image = new Image();
			this.image.onload = this.picLoaded.bind(this);
			this.userScale = 1;
			this.textShadowColour = '#FFF';

			// binds
			this.loadImageBound = this.loadImage.bind(this);
			this.onResizeWindowBound = this.onResizeWindow.bind(this);
			this.gotoNextPhotoBound = this.gotoNextPhoto.bind(this);

			this.enableClickBound = this.enableClick.bind(this);

			// controllers
			this.bgController = new namespace.BGController();
			this.bgController.init(this.image);	

			this.textController = new namespace.TextController();
			this.textController.init();		
			
			// start
			this.getData();
		}

		p.getData = function()
		{
			// load scenes urlData
			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: 'json/photos.json',
				success: this.onDataLoaded.bind(this)
			});			
		};

		p.onDataLoaded = function(data)
		{
			this.data = data;

		    // photo lookup table
			this.data.photosLookup = [];
			for (var i=0; i<this.data.photos.length; ++i) this.data.photosLookup.push(this.data.photos[i].id);

		    // set up jsAddress
			this.jsAddress = new MAIN.utils.JSAddress();
			this.jsAddress.listen(this.onURLUpdate.bind(this));

			$(window).resize(this.onResizeWindowBound);
			window.addEventListener('orientationchange', this.onResizeWindowBound);

			// pinch etc
			$('body').bind("gesturechange", this.onGestureChange.bind(this) );
		}

		p.onGestureChange = function(e)
		{
			this.userScale = e.originalEvent.scale;
		}

		/* JSAddress stuff happens here from URL change */
 
		p.onURLUpdate = function(urlData)
		{
			this.disableClick();
			this.urlData = urlData;
			
			if (this.urlData.path.length > 0)
			{
				this.currentPhoto = this.data.photosLookup.indexOf(this.urlData.path[0]);
				this.currentPhotoData = this.data.photos[this.currentPhoto];
			}
			else {

				this.currentPhoto = -1;
				this.currentPhotoData = this.data.intro;
			}

			// hide current photo
			TweenMax.killTweensOf('#pic');
			TweenMax.to('#pic', .2, { autoAlpha:0, ease:Sine.easeIn });

			// hide text, then load new photo 
			TweenMax.killTweensOf('#titleCard');
			TweenMax.to('#titleCard', .3, {autoAlpha:0, ease:Sine.easeIn, onComplete:this.loadImageBound});
		}

		p.loadImage = function() 
		{
			this.image.src = 'img/photos/' + this.currentPhotoData.src;
			console.log('loading image:', this.currentPhotoData.src);
		}

		p.picLoaded = function()
		{
			console.log('image loaded:', this.currentPhotoData.src);

			$('#pic').css('background-size', this.urlData.path.length > 0 ? 'contain' : 'cover');
			$('#pic').css('background-image', 'url("' + 'img/photos/' + this.currentPhotoData.src + '")');

			$('#titleCard span').html(this.currentPhotoData.title.toUpperCase());
			$('#titleCard').css('font-size', '1px');
			TweenMax.to('#titleCard', 0, { textShadow:this.textShadowColour + ' 0 0 0px' });
			this.onResizeWindow();

			// show photo
			TweenMax.to('#pic', 1, { autoAlpha:1, ease:Sine.easeInOut, onComplete:this.enableClick.bind(this) });

			// show text
			TweenMax.killTweensOf('#titleCard');
			TweenMax.to('#titleCard', this.urlData.path.length > 0 ? .6 : 1.5, { delay:1, 
				autoAlpha:this.currentPhotoData.titleAlpha != undefined ? this.currentPhotoData.titleAlpha : this.urlData.path.length > 0 ? .3 : .2, 
				ease:Sine.easeInOut, 
				onComplete:this.fadeOutTitle.bind(this) });			
		}

		p.fadeOutTitle = function()
		{
			if (this.urlData.path.length > 0) TweenMax.to('#titleCard', Math.max(3.5, 2 + this.currentPhotoData.title.length*.07), 
			{ delay:.4 + this.currentPhotoData.title.length*.08, textShadow:this.textShadowColour + ' 0 0 100px', autoAlpha:0, ease:Sine.easeInOut });
		}

		p.enableClick = function()
		{
			console.log('ENABLE click');
			$('body').bind('mousedown', this.gotoNextPhotoBound);
			$('body').bind('touchstart', this.gotoNextPhotoBound);
		}

		p.disableClick = function()
		{
			console.log('DISABLE click');
			$('body').unbind('mousedown', this.gotoNextPhotoBound);
			$('body').unbind('touchstart', this.gotoNextPhotoBound);
		}

		p.gotoNextPhoto = function(e)
		{
			if (e.type == 'touchstart') this.showNextPhoto();
			else if (e.type == 'mousedown') this.showNextPhoto();
		}

		p.showNextPhoto = function()
		{
			this.currentPhoto++;
			if (this.currentPhoto > this.data.photos.length-1)
			{
				this.currentPhoto = 0;
				location = '';
			}
			else location = '#/' + this.data.photos[this.currentPhoto].id;
		}

		p.onResizeWindow = function()
		{
			if (this.urlData.path.length > 0) this.bgController.positionBackground();
			else this.bgController.resetBackground();	

			this.textController.fitTitleToWindow(this.urlData.path.length);		
		}
	}

})();
