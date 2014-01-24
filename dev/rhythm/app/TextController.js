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

		p.fitTitleToArea = function(intro, w, h)
		{
			$('#titleCard').css('top', '0px');
			$('#titleCard').css('font-size', intro != 'cover' ? Math.min(48, Math.ceil((h*w)*.0002)) : 300 + 'px');

			if (intro == 'cover')
			{
				while ($('#titleCard span').innerWidth() > w* .9 || $('#titleCard span').outerHeight() > h*.94) 
				{
					this.decreaseFontSize();
				}
			}			
			else $('#titleCard').css('top', Math.floor(   (h - $('#titleCard span').outerHeight())/2 - parseInt($('#titleCard').css('padding-top'))*.7)  );

			// center?
			// $('#titleCard').css('left', (w - $('#titleCard span').innerWidth())/2);
		}

	}

})();
