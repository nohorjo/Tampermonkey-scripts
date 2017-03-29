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
    var interval = 1000;
    function shrink(){
        try{
            var width = "555px";
            var el = document.querySelectorAll("._mh6._wsc")[0].style;
            if(el.width==width)
                return;
            el.width=width;
        } catch (e){}
        setTimeout(shrink,interval);
    }
    setTimeout(shrink,interval);
})();
