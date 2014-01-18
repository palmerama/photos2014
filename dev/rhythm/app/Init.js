MAIN.init = function()
{
	var app = MAIN.namespace('MAIN.app');
	var appManager = new app.AppManager();
	appManager.init();
};

$(function(){
	MAIN.init();
});