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
			
			$('#titleCard').bind('input', this.onResizeWindowBound);		
			$('#title-alpha-input').bind('input', this.onChangeTitleAlpha.bind(this));	
			$('#page-id-input').bind('focusout', this.pageIdInputFocusOut.bind(this));
			$('#cover-input').bind('click', this.onClickCoverInput.bind(this));

			this.getData(id);
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
			$('#edit-photo').attr('src', '../img/photos/' + this.data.id + '-1000.jpg');

			$('#titleCard span').text(decodeURIComponent(this.data.title_display));
			$('#page-id-input').text(decodeURIComponent(this.data.page_id));
			$('#title-alpha-input').text(this.data.title_alpha);
			$('#cover-input').text(this.data.cover == '1' ? 'YES' : 'NO');

			console.log('cover:', this.data.cover);

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

		p.onChangeTitleAlpha = function(e)
		{
			TweenMax.to('#titleCard', .34, {autoAlpha:parseFloat($('#title-alpha-input').text()), ease:Sine.easeIn });
		}

		p.UpdateRecord = function(e)
		{
			e.preventDefault();

			console.log($('#titleCard span').text());
			console.log(encodeURIComponent($('#titleCard span').text()));

			var cover = ($('#cover-input').text() == 'YES' ? "1" : "0");
			var call = '../scripts/update_photo.php?id=' + String(this.data.id) + '&title_display=' + encodeURIComponent($('#titleCard span').text()) + '&page_id=' + encodeURIComponent($('#page-id-input').text()) + '&title_alpha=' + $('#title-alpha-input').text() + '&cover=' + cover;

			$.ajax({
				urlDataType: 'json',
				cache: false,
				url: call,
				success: this.onRecordUpdated.bind(this)
			});
		}

		p.onRecordUpdated = function(e)
		{
			window.location = '../admin';
		}

		p.onResizeWindow = function(e)
		{
			this.textController.fitTitleToArea(1, $('#edit-photo').width(), $('#edit-photo').height());		
		}
	}

})();
