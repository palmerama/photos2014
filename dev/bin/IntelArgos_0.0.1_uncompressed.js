if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);

      if (typeof target != 'function') throw new TypeError();

      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }

      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);

      return bound;
    };
  })();
}
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){

	jQuery.hotkeys = {
		version: "0.8+",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 188: ",", 190: ".",
			191: "/", 224: "meta"
		},

		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {

		var origHandler = handleObj.handler,
			//use namespace as keys so it works with event delegation as well
			//will also allow removing listeners of a specific key combination
			//and support data objects
			keys = (handleObj.namespace || "").toLowerCase().split(" ");
			keys = jQuery.map(keys, function(key) { return key.split("."); });

		//no need to modify handler if no keys specified
		if (keys.length === 1 && (keys[0] === "" || keys[0] === "autocomplete")) {
			return;
		}

		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			// important to note that $.fn.prop is only available on jquery 1.6+
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				event.target.type === "text" || $(event.target).prop('contenteditable') == 'true' )) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt_";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl_";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta_";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift_";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift_" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );

$(function() {
  window.keydown = {};
  
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }
  
  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });
  
  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});
/**
 * Global Abatement
 */

var MAIN = MAIN || {};

MAIN.namespace = function (aNamespace)
{
    var parts = aNamespace.split('.'),
        parent = MAIN,
        i;
    if (parts[0] === "MAIN") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
};
var FBHelper = FBHelper || {};

FBHelper = (function(){

	this.authenticated = false;

	

	var init = function() {

		FB.init({
			appId      : '128207314040488', // App ID
			channelUrl : '//channel.html', // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		FB.Event.subscribe('auth.login', function(response) {
			
			// do something with response
			
		});

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// the user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token 
				// and signed request each expire
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;

				
				onInit();

			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
				
				login();

			} else {
				// the user isn't logged in to Facebook.

				
				login();
			}
		});

	}.bind(this);

	var login = function() {
		FB.login(function(response) {
	        if (response.authResponse) {
	            // connected
	           // 
	            onInit();
	        } else {
	            // cancelled
	            
	            $(FBHelper).trigger("cancelled");
	        }
		});
	}
	
	var onInit = function() {
		
		this.initialised = true;
		$(FBHelper).trigger("connected");
	};

	return {
		init: function() {
			init();
		}
	}

})();
(function(){

	var namespace = MAIN.namespace('MAIN.app');


	if (namespace.StageTools === undefined) 
	{
		var StageTools = function StageTools()
		{	
		}

		namespace.StageTools = StageTools;
		
		
		StageTools.logDisplayList = function(container)
		{
			

			for (var i=container.getNumChildren()-1; i>=0; --i)
			{
				
			}

			
		}

		StageTools.getChildIndexByName = function(container, child)
		{
			return container.getChildIndex(container[child]);
		}
}

})();

(function(){

    var namespace = MAIN.namespace('MAIN.app');

    var manifest;
    var preload;
    var stage;


    if (namespace.PreloadManager === undefined) 
	{
		namespace.PreloadManager = function(aStage)
		{	
			stage = aStage;
        }

        var p = namespace.PreloadManager.prototype;
		
		
		p.init = function(onLoadComplete)
		{
			this.onLoadComplete = onLoadComplete;
			this.showPreloader();

			manifest = [
				// {src:'img/bg.jpg', id:'bg'},
				{src:'sound/music.mp3|sound/music.ogg', id:'music'}
			];

			preload = new createjs.LoadQueue(false);
			
			createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
            preload.installPlugin(createjs.Sound);
            
            preload.addEventListener("complete", this.loadComplete.bind(this));
            preload.addEventListener("progress", this.onProgress.bind(this));

			preload.loadManifest(manifest);
		}

		p.showPreloader = function()
		{
			// show it!
		}

		p.onProgress = function(e)
		{
			//TweenLite.to(this, .3, {barWidth:2 + (432*e.loaded), ease:Sine.easeOut, onUpdate:this.setBarWidth.bind(this)});
		}

		p.setBarWidth = function()
		{
			var g = this.bar.graphics;
			g.beginFill('#FFFF00');
			g.rect(-217, 10, this.barWidth, 12);
			g.endFill();
		}

		p.loadComplete = function()
		{
			
			this.onLoadComplete();
		}

		p.getAsset = function(asset)
		{
			return preload.getResult(asset).result;
		}
}

})();

(function(){

    var namespace = MAIN.namespace('MAIN.app');

    var stage;


    if (namespace.Scene === undefined) 
	{
        namespace.Scene = function(aStage, id)
		{	
			stage = aStage;
			this.id = id;
		}

		var p = namespace.Scene.prototype;

		
		p.init = function(setup)
		{
			this.setup = setup;

			this.container = new createjs.Container();
			this.container.name = 'scene' + this.id + 'Container';
			stage.addChild(this.container);

			this.preload();
		}

		p.preload = function()
		{
			this.preloader = new createjs.LoadQueue(false);
			this.preloader.addEventListener("complete", this.initScene.bind(this));
            // this.preload.addEventListener("progress", this.onProgress.bind(this));
			this.preloader.loadManifest(this.setup.items);
		}

		p.initScene = function()
		{
			this.container.regX = this.setup.scene.width/2;
			this.container.regY = this.setup.scene.height/2;
			this.container.x = stage.canvas.width/2;
			this.container.y = stage.canvas.height/2;

			this.roomDepth = {top:this.setup.scene.height-this.setup.scene.roomDepth, depth:this.setup.scene.roomDepth};

			this.initSceneItems();
			this.initSceneMarkers();

			namespace.StageTools.logDisplayList(this.container);

			this.touchEnabled = createjs.Touch.isSupported();
			createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
		}

		p.handleTick = function(event)
		{
			if (!event.paused)
			{
				if (this.items)
				{
					this.moveX = -(stage.mouseX - stage.canvas.width/2)/120;
					
					if (this.touchEnabled) {
						this.moveX = -this.moveX;
					}

					for (var i=0; i < this.items.length; ++i)
					{
						this.items[i].moveBy(this.moveX);
					}

					this.markers[0].x += this.moveX;
					this.markers[1].x += this.moveX;
				}
			}			
		}

		p.initSceneMarkers = function()
		{
			this.markers = [];

			for (var i=0; i<2; ++i)
			{
				var marker = new createjs.Shape();
				marker.name = 'marker' + i;
				var g = marker.graphics;
				g.beginFill('#FF0000');
				g.rect(0, 0, 4, this.setup.scene.height);
				g.endFill();
				this.container.addChild(marker);
				this.markers.push(marker);
			}

			this.markers[1].x = this.setup.scene.width;
		}

		p.initSceneItems = function()
		{
			this.items = [];

			for (var i=0; i<this.setup.items.length; ++i)
			{
				var item = new namespace.SceneItem();
				item.init(this.setup.items[i], this.preloader.getResult(this.setup.items[i].id), i, this.roomDepth);
				this.items.push(item);
				this.container.addChild(item.obj);
			}
		}

		p.onBrowserResize = function()
		{
			this.container.x = stage.canvas.width/2;
		}
	}

})();

(function(){

    var namespace = MAIN.namespace('MAIN.app');
    var stage;


    if (namespace.ScenesManager === undefined) 
	{
        namespace.ScenesManager = function(aStage)
		{	
			stage = aStage;
		};

		var p = namespace.ScenesManager.prototype;

		
		p.init = function()
		{
			this.sceneSetups = [
				{
					scene: { width:1618, height:550, roomDepth:190},
					items:[
						{ src:'img/scenes/scene0/lady.png', id:'lady', x:784, y:375, reg:{x:55, y:218} },						
						{ src:'img/scenes/scene0/sofas.png', id:'sofas', x:880, y:400, reg:{x:513, y:130} },
						{ src:'img/scenes/scene0/lamp.png', id:'lamp', x:1272, y:470, reg:{x:114, y:324} },
						{ src:'img/scenes/scene0/beanbag.png', id:'beanbag', x:441, y:477, reg:{x:171, y:183} },
						{ src:'img/scenes/scene0/girl.png', id:'girl', x:1000, y:491, reg:{x:111, y:145} },
						{ src:'img/scenes/scene0/plant.png', id:'plant', x:248, y:510, reg:{x:126, y:320} }
					]
				}
			];

			this.initScene(0);
		};

		p.initScene = function(sceneId)
		{
			this['scene'+sceneId] = new namespace.Scene(stage, sceneId);
			this['scene'+sceneId].init(this.sceneSetups[0]);
		}

		p.onBrowserResize = function()
		{
			this.scene0.onBrowserResize();
		}
	}

})();

(function(){

    var namespace = MAIN.namespace('MAIN.app');


    if (namespace.SceneItem === undefined) 
	{
        namespace.SceneItem = function()
		{	
		};

		var p = namespace.SceneItem.prototype;

		
		p.init = function(data, image, i, roomDepth)
		{
			this.data = data;
			this.id = this.data.id;
			this.sequenceId = i;
			this.image = image;
			this.roomDepth = roomDepth;

			this.bmp = new createjs.Bitmap(this.image);
			this.obj = new createjs.Container();
			this.obj.addChild(this.bmp);

			this.obj.regX = this.data.reg.x;
			this.obj.regY = this.data.reg.y;
			this.showRegPoint();

			this.obj.cache(0, 0, this.bmp.image.width, this.bmp.image.height);

			this.obj.name = this.id;
			this.obj.x = this.data.x;
			this.obj.y = this.data.y;
			this.zPerc = (this.obj.y - this.roomDepth.top) / this.roomDepth.depth;

			// this.blur(50);
			this.unfold();
		}

		p.moveBy = function(move)
		{
			this.obj.x += move*this.zPerc;
		}

		p.blur = function(blur)
		{
			var blurFilter = new createjs.BoxBlurFilter(blur, blur, 1);
			this.obj.filters = [blurFilter];

			var blurBounds = blurFilter.getBounds();
			this.obj.cache(blurBounds.x, blurBounds.y, this.bmp.image.width + blurBounds.width, this.bmp.image.height + blurBounds.height);
		}

		p.unfold = function()
		{
			this.obj.scaleY = 0;
			TweenMax.to(this.obj, 0.2 + Math.random(), {delay:this.sequenceId*0.2, scaleY:1, ease:Elastic.easeOut});
		}

		p.showRegPoint = function()
		{
			var shape = new createjs.Shape();
			var g = shape.graphics;
			g.beginFill('#FFFF00');
			g.rect(this.data.reg.x-2, this.data.reg.y-2, 4, 4);
			g.endFill();
			this.obj.addChild(shape);
		}
	}

})();

(function(){

    var namespace = MAIN.namespace('MAIN.app');

    var stage;


    if (namespace.AppManager === undefined) 
	{
        namespace.AppManager = function(aStage)
		{	
			stage = aStage;
		}

		var p = namespace.AppManager.prototype;
		
		var preloadManager;
		var scenesManager;

		
		p.init = function()
		{
			preloadManager = new namespace.PreloadManager(stage);
			preloadManager.init(this.onPreloadComplete.bind(this));
		}

		p.onPreloadComplete = function(event) 
	    {
			scenesManager = new namespace.ScenesManager(stage);
			scenesManager.init();

			this.resizeStage();
			$(window).resize(this.resizeStage.bind(this));
	    }

		p.resizeStage = function()
		{
			stage.canvas.width = window.innerWidth;
			scenesManager.onBrowserResize();
		}
	}

})();

MAIN.init = function()
{

	// Connect to Facebook
	//$(FBHelper).bind("connected", onFacebookConnected);
	//$(FBHelper).bind("cancelled", onFacebookCancelled);
	
	FBHelper.init();

	// Facebook connected
	function onFacebookConnected(e) {

		



		//$(FBHelper).unbind("connected", onFacebookConnected);

		var stage = new createjs.Stage(document.getElementById('mainCanvas'));
		stage.name = 'stage';
		createjs.Touch.enable(stage);

		createjs.Ticker.setFPS(60);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.addListener(stage);

		var app = MAIN.namespace('MAIN.app');
		var appManager = new app.AppManager(stage);
		appManager.init();
	}

	function onFacebookCancelled(e) {
		
	}

	onFacebookConnected(null);

};

$(function(){
	MAIN.init();
});