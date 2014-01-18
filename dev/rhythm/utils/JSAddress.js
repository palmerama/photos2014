/*
(Note: Requires JQuery.)

Setup JSAddress:

jsAddress = new MAIN_INTEL.namespace('MAIN_INTEL.app.utils').JSAddress();
$(jsAddress.listener).bind("URL_UPDATE", this.onURLUpdate.bind(this));
jsAddress.listen();


To trigger an update, call something like:

location = "#/whatever/you/want";
*/

(function(){

    var namespace = MAIN.namespace('MAIN.utils');


    if (namespace.JSAddress === undefined) 
	{
        namespace.JSAddress = function()
		{	
			this.listener = this;
			this.currentPath = '';
		}

		var p = namespace.JSAddress.prototype;	


		p.urlChanged = function() 
		{
			// console.log('JSAddress: URL CHANGED');

			var pathString = String(location.hash.substr(2,location.hash.length));
			var path = pathString.split("/");
			var i = 0;

			// if (this.currentPath === pathString) {
			// 	return; // return if url is the same
			// }

			for(i; i < path.length; ++i) {
				if(path[i].length === 0) {
					path.splice(i,1);
				}
			}

			this.currentPath = pathString;
			this.callback({path:path});
		}

		p.listen = function(callback)
		{
			this.callback = callback;
			$(window).hashchange(this.urlChanged.bind(this));
			this.urlChanged();
		}

	}

})();