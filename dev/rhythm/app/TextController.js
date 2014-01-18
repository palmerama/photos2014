(function(){

    var namespace = MAIN.namespace('MAIN.app');


    if (namespace.TextController === undefined) 
	{
        namespace.TextController = function()
		{	
		}

		var p = namespace.TextController.prototype;	
		
		
		p.init = function()
		{
		}

		p.getFontSize = function()
		{
			return parseInt($('#titleCard').css('font-size'));
		}

		p.increaseFontSize = function()
		{
			$('#titleCard').css('font-size', this.getFontSize()*1.1 + 'px');
		}

		p.decreaseFontSize = function()
		{
			$('#titleCard').css('font-size', this.getFontSize()*.9 + 'px');
		}

		p.fitTitleToWindow = function(intro)
		{
			// var numLines = Math.floor($('#titleCard').innerHeight() / parseInt($('#titleCard').css('line-height')) );

			$('#titleCard').css('top', '0px');
			$('#titleCard').css('font-size', intro > 0 ? Math.min(48, Math.ceil((window.innerHeight*window.innerWidth)*.0002)) : 300 + 'px');

			if (intro == 0)
			{
				while ($('#titleCard span').innerWidth() > window.innerWidth* .9 || $('#titleCard span').outerHeight() > window.innerHeight*.94) 
				{
					this.decreaseFontSize();
				}
			}			
			else $('#titleCard').css('top', Math.floor(   (window.innerHeight - $('#titleCard span').outerHeight())/2 - parseInt($('#titleCard').css('padding-top'))*.7)  );
		}

	}

})();
