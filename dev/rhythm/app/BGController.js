(function(){

    var namespace = MAIN.namespace('MAIN.app');


    if (namespace.BGController === undefined) 
	{
        namespace.BGController = function()
		{	
		}

		var p = namespace.BGController.prototype;	
		
		p.init = function(image)
		{
			this.image = image;
		}

		p.resetBackground = function()
		{
			$('#pic').css('top', '0px');
			$('#pic').css('padding-left', '0px');
			$('#pic').css('width', '100%');
			$('#pic').css('height', '100%');
		}

		p.positionBackground = function()
		{
			// reset!
			this.resetBackground();

			// position
			var picTop = 0;
			var picLeft = 0;

			this.imageRatio = this.image.width / this.image.height;
			var windowRatio = window.innerWidth / window.innerHeight;

			if (windowRatio < this.imageRatio) 
			{
				// position vertically
				picTop = (window.innerHeight - (window.innerWidth / this.image.width)*this.image.height)/2;
				picLeft = 0;

				$('#pic').css('height', (window.innerWidth / this.image.width)*this.image.height + 'px');
				$('#pic').css('width', '100%');
			}
			else {

				// position horizontally
				picTop = 0;
				picLeft = (window.innerWidth - (window.innerHeight / this.image.height)*this.image.width);

				$('#pic').css('height', '100%');
				$('#pic').css('width', (window.innerHeight / this.image.height)*this.image.width + 'px');				
			}
			
			// set offsets
			$('#pic').css('top', Math.max(0, picTop) + 'px');
			$('#pic').css('padding-left', Math.max(0, picLeft) + 'px');
		}
	}

})();
