(function(){

    var namespace = MAIN.namespace('MAIN.app');
    var stage;


    if (namespace.AdminOverviewManager === undefined) 
	{
        namespace.AdminOverviewManager = function()
		{	
		}

		var p = namespace.AdminOverviewManager.prototype;	

		
		p.init = function()
		{
			this.getData();
		}

		p.getData = function()
		{
			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: '../scripts/get_photos.php',
				success: this.onDataLoaded.bind(this)
			});			
		};

		p.onDataLoaded = function(data)
		{
			console.log(data);
			this.data = data;	

			this.numPhotosLoaded = 0;
			this.populateActive();
			this.populateHidden();

			// mouse events
			$('.list-photo').bind('click', this.onClickPhoto.bind(this));
			$('.list-photo').bind('mouseenter', this.onMouseEnterPhoto.bind(this));
			$('.list-photo').bind('mouseleave', this.onMouseLeavePhoto.bind(this));
			$('.list-photo').load(this.onImageLoaded.bind(this));
		}

		p.onImageLoaded = function(e)
		{
			this.numPhotosLoaded++;

			if (this.numPhotosLoaded == this.data.photos.length + this.data.hidden.length)
			{
				$.each($('.list-photo'), this.showPhoto.bind(this));
			}
		}

		p.showPhoto = function(i, html)
		{
			TweenMax.to($(html), .4, {delay:.1*i, autoAlpha:.85, ease:Sine.easeIn});
		}

		p.onMouseEnterPhoto = function(e)
		{
			TweenMax.to(e.target, 0, {autoAlpha:1, ease:Sine.easeIn});
		}

		p.onMouseLeavePhoto = function(e)
		{
			TweenMax.to(e.target, .1, {autoAlpha:.85, ease:Sine.easeIn});
		}

		p.populateActive = function()
		{
			for (var i=0; i<this.data.photos.length; ++i)
			{
				var html = '<div class="list-photo-harness" draggable="true"><img class="list-photo" data-id="' + this.data.photos[i].id + '" src="../img/photos/' + this.data.photos[i].id + '-500.jpg"></div>';
				$('#active-list').append(html);
			}
		}

		p.populateHidden = function()
		{
			for (var i=0; i<this.data.hidden.length; ++i)
			{
				var html = '<div class="list-photo-harness"><img class="list-photo" data-id="' + this.data.hidden[i].id + '" src="../img/photos/' + this.data.hidden[i].id + '-500.jpg"></div>';
				$('#hidden-list').append(html);
			}
		}

		p.onClickPhoto = function(e)
		{
			e.preventDefault();
			window.location = 'edit_photo.php?id=' + $(e.target).attr('data-id');
		}
	}

})();
