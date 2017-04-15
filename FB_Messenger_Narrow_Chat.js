// ==UserScript==
// @name         Narrow Window
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes FB Messenger chat window narrow 
// @author       Nohorjo
// @match        https://www.facebook.com/messages/t/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	function doRezise(){
	      var interval = 500;
			var maxW = Math.round(screen.width*0.75);
			function shrink(){
		     try{
		         var width = Math.round(window.outerWidth);
					if(width>maxW){
						width=maxW;
					}
					width = width + "px";
		         var el = document.querySelectorAll("._mh6._wsc")[0].style;
		         if(el.width==width){
		             return;
					}
		         el.width=width;
		     } catch (e){}
		     setTimeout(shrink,interval);
		 }
	    setTimeout(shrink,interval);
	}
	document.body.onresize = doRezise;
	doRezise();
})();
