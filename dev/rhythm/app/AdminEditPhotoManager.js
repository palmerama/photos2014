(function(){

    var namespace = MAIN.namespace('MAIN.app');
    var stage;


    if (namespace.AdminEditPhotoManager === undefined) 
	{
        namespace.AdminEditPhotoManager = function()
		{	
		}

		var p = namespace.AdminEditPhotoManager.prototype;	

		
		p.init = function(id)
		{
			this.textController = new namespace.TextController();
			this.textController.init();

			this.onResizeWindowBound = this.onResizeWindow.bind(this);
			$(window).resize(this.onResizeWindowBound);
			window.addEventListener('orientationchange', this.onResizeWindowBound);

			$('#edit-photo').load(this.onImageLoaded.bind(this));
			
			$('#edit-photo-harness').bind('click', this.onClickPhoto.bind(this));
			$('#titleCard').bind('input', this.onResizeWindowBound);		
			$('#title-alpha-slider').bind('slide', this.onChangeTitleAlpha.bind(this));	
			$('#page-id-input').bind('focusout', this.pageIdInputFocusOut.bind(this));
			$('#cover-input').bind('click', this.onClickCoverInput.bind(this));

			if (id == -1) this.editNewPhoto();
			else this.getData(id);
		}

		p.onClickPhoto = function(e)
		{
			e.preventDefault();

			console.log('boom');
			$('#titleCard span')[0].focus();
		}

		p.editNewPhoto = function()
		{
			$('#update-btn').text('SAVE');

			this.onDataLoaded(
				{
					"photos": [
						{
							"id": "-1",
							"page_id": "page-name",
							"title_display": "SOME WORDS.",
							"title_alpha": "0.5",
							"portrait": "0",
							"cover": "0"
						}
					]
				}
			);
		}

		p.getData = function(id)
		{
			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: '../scripts/get_photo.php?id=' + id,
				success: this.onDataLoaded.bind(this)
			});			
		};

		p.onDataLoaded = function(data)
		{
			console.log(data);
			this.data = data.photos[0];

			TweenMax.to('#edit-photo', 0, {autoAlpha:0});
			
			if (this.data.id == -1) $('#edit-photo').attr('src', '../img/photos/tmp/tmp_photo_1000.jpg');
			else $('#edit-photo').attr('src', '../img/photos/' + this.data.id + '-1000.jpg');

			$('#titleCard').css('color', this.data.title_colour);
			$('#titleCard span').text(decodeURIComponent(this.data.title_display));
			$('#page-id-input').text(decodeURIComponent(this.data.page_id));
			$('#cover-input').text(this.data.cover == '1' ? 'YES' : 'NO');		

			$('#title-alpha-slider').slider(
				{
					range: "min",
					max: 1,  
    				value: this.data.title_alpha,
    				step: 0.01
    			}
   			);			

			$('#update-btn').bind('click', this.UpdateRecord.bind(this));
			TweenMax.to('#controls', .4, {delay:1, autoAlpha:1, ease:Sine.easeIn});
		}

		p.onImageLoaded = function(e)
		{
			TweenMax.to('#edit-photo', .4, {autoAlpha:1, ease:Sine.easeIn});

			this.textController.fitTitleToArea(1, $('#edit-photo').width(), $('#edit-photo').height());
			TweenMax.to('#titleCard', .7, { delay:.4, autoAlpha:this.data.title_alpha, ease:Sine.easeIn });
		}

		p.pageIdInputFocusOut = function(e)
		{
			$('#page-id-input').text( $('#page-id-input').text().replace(/\ /g, '-') );
		}

		p.onClickCoverInput = function(e)
		{
			var val = $('#cover-input').text();
			val == 'NO' ? $('#cover-input').text('YES') : $('#cover-input').text('NO');
		}

		p.onChangeTitleAlpha = function(e, ui)
		{
			TweenMax.to('#titleCard', .1, {autoAlpha:ui.value, ease:Sine.easeIn });
		}

		p.UpdateRecord = function(e)
		{
			e.preventDefault();

			var cover = ($('#cover-input').text() == 'YES' ? "1" : "0");
			var portrait = $('#edit-photo').height() > $('#edit-photo').width() ? 1 : 0;

			var call = '../scripts/update_photo.php?id=' + String(this.data.id) + '&title_display=' + encodeURIComponent($('#titleCard span').text()) + '&page_id=' + encodeURIComponent($('#page-id-input').text()) + '&title_alpha=' + $('#title-alpha-slider').slider("value") + '&cover=' + cover + '&portrait=' + portrait;

			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: call,
				success: this.onRecordUpdated.bind(this)
			});
		}

		p.onRecordUpdated = function(result)
		{
			// console.log('RESULT:', result);
			window.location = '../admin';
		}

		p.onResizeWindow = function(e)
		{
			this.textController.fitTitleToArea(1, $('#edit-photo').width(), $('#edit-photo').height());		
		}
	}

})();
