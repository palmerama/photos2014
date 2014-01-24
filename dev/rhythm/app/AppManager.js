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
			// setup
			this.image = new Image();
			this.image.onload = this.picLoaded.bind(this);
			this.imageSizes = [500, 1000, 1500, 2000];
			this.lastImageSize = this.imageSizes[0];
			this.lastPhotoId = -1;
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
			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: 'scripts/get_photos.php',
				success: this.onDataLoaded.bind(this)
			});			
		};

		p.onDataLoaded = function(data)
		{
			//console.log(data);
			this.data = data;		

		    // photo lookup table
			this.data.photosLookup = [];
			for (var i=0; i<this.data.photos.length; ++i) this.data.photosLookup[this.data.photos[i].page_id] = i;

			//console.log('lookup:', this.data.photosLookup);

		    // set up jsAddress
			this.jsAddress = new MAIN.utils.JSAddress();
			this.jsAddress.listen(this.onURLUpdate.bind(this));

			$(window).resize(this.onResizeWindowBound);
			window.addEventListener('orientationchange', this.onResizeWindowBound);
		}
		

		/* JSAddress stuff happens here from URL change */
 
		p.onURLUpdate = function(urlData)
		{
			this.disableClick();
			this.urlData = urlData;

			//console.log('\n\n');

			if (this.urlData.path.length == 0)
			{
				this.lastImageSize = this.imageSizes[0];
				location = '#/cover';
			}
			else {
				
				if (this.urlData.path[0] == 'cover')
				{
					this.currentPhoto = -1;
					this.currentPhotoData = this.data.covers[Math.floor(Math.random()*this.data.covers.length)];
				}
				else {
					this.currentPhoto = this.data.photosLookup[this.urlData.path[0]];
					this.currentPhotoData = this.data.photos[this.currentPhoto];
				}

				//console.log('covers:', this.data.covers.length, 'photo data:', this.currentPhotoData);

				// hide current photo
				TweenMax.killTweensOf('#pic');
				TweenMax.to('#pic', .2, { autoAlpha:0, ease:Sine.easeIn });

				// hide text, then load new photo 
				TweenMax.killTweensOf('#titleCard');
				TweenMax.to('#titleCard', .3, {autoAlpha:0, ease:Sine.easeIn, onComplete:this.loadImageBound});

			}		
		}

		p.loadImage = function() 
		{
			if (this.urlData.path[0] == 'cover') 
			{
				this.imageSize = this.imageSizes[this.imageSizes.length-1];
			}
			else {
				//console.log('window size =>', window.innerWidth * window.devicePixelRatio, 'x', window.innerHeight * window.devicePixelRatio);
				//console.log('pixel ratio:', window.devicePixelRatio);

				if (this.currentPhotoData.portrait == '1') this.longestSideWindow = window.innerHeight * window.devicePixelRatio;
				else this.longestSideWindow = window.innerWidth * window.devicePixelRatio;

				this.imageSize = this.imageSizes[0];
				//console.log('imageSize start:', this.imageSize, 'longest side:', this.longestSideWindow);

				for (var i=0; i<this.imageSizes.length; ++i)
				{
					if (this.longestSideWindow < this.imageSizes[i] || i == this.imageSizes.length-1)
					{
						this.imageSize = this.imageSizes[i];
						break;
					}
				}			
			}
			
			
			//console.log('imageSize:', this.imageSize, 'lastImageSize:', this.lastImageSize);

			if (this.lastImageSize != this.imageSize || this.currentPhotoData.id != this.lastPhotoId) 
			{
				//console.log('loading image', this.imageSize, 'on the longest side');

				this.lastImageSize = this.imageSize;
				this.lastPhotoId = this.currentPhotoData.id;

				this.image.src = '';
				this.image.src = 'img/photos/' + this.currentPhotoData.id + '-' + this.imageSize + '.jpg';
				//console.log('loading photo id:', this.currentPhotoData.id + '-' + this.imageSize + '.jpg');
			}
			// else console.log('already loaded this size:', this.lastImageSize);
		}

		p.picLoaded = function()
		{
			//console.log('image loaded:', this.image.src);

			if (this.urlData.path[0] == 'cover') 
			{
				this.imageFillMethod = 'cover';
				this.titleCopy = 'SOME PHOTOS I TOOK WITH MY CAMERA.<br/>ADAM PALMER';
				this.titleRevealTime = 1.5;
			}
			else 
			{
				this.imageFillMethod = 'contain';
				this.titleCopy = this.currentPhotoData.title_display.toUpperCase();
				this.titleRevealTime = .6;
			}

			$('#pic').css('background-size', this.imageFillMethod);
			$('#pic').css('background-image', 'url("' + this.image.src + '")');

			$('#titleCard span').html(this.titleCopy);
			$('#titleCard').css('font-size', '1px');

			this.textShadowColour = this.currentPhotoData.title_colour;
			TweenMax.to('#titleCard', 0, { textShadow:this.textShadowColour + ' 0 0 0px' });

			this.onResizeWindow();

			// show photo
			TweenMax.to('#pic', 1, { autoAlpha:1, ease:Sine.easeInOut, onComplete:this.enableClick.bind(this) });

			// show text
			TweenMax.killTweensOf('#titleCard');
			TweenMax.to('#titleCard', this.titleRevealTime, { 
				delay:1, 
				autoAlpha:this.currentPhotoData.title_alpha, 
				ease:Sine.easeInOut, 
				onComplete:this.fadeOutTitle.bind(this) 
			});			
		}

		p.fadeOutTitle = function()
		{
			if (this.urlData.path[0] != 'cover') 
			{
				TweenMax.to('#titleCard', Math.max(3.5, 2 + this.currentPhotoData.title_display.length*.07), 
				{ 
					delay:.4 + this.currentPhotoData.title_display.length*.08, 
					textShadow:this.textShadowColour + ' 0 0 100px', 
					autoAlpha:0, 
					ease:Sine.easeInOut 
				});
			}
		}

		p.enableClick = function()
		{
			// console.log('ENABLE click');
			$('body').bind('mousedown', this.gotoNextPhotoBound);
			$('body').bind('touchstart', this.gotoNextPhotoBound);
		}

		p.disableClick = function()
		{
			// console.log('DISABLE click');
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
			this.lastImageSize = this.imageSizes[0];

			if (this.currentPhoto > this.data.photos.length-1)
			{
				this.currentPhoto = 0;
				location = '#/cover';
			}
			else {
				location = '#/' + this.data.photos[this.currentPhoto].page_id;
			}
		}

		p.onResizeWindow = function()
		{
			if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(this.loadImageBound, 300);

			if (this.urlData.path[0] != 'cover') this.bgController.positionBackground();
			else this.bgController.resetBackground();	

			this.textController.fitTitleToArea(this.urlData.path[0], window.innerWidth, window.innerHeight);		
		}
	}

})();
