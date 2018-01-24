// ==UserScript==
// @name         Remove posts containing certain words
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Remove posts containing certain words
// @author       Nohorjo
// @match        https://www.facebook.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/Facebook/RemovePosts.js
// @updateURL    https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/Facebook/RemovePosts.js
// ==/UserScript==

(function () {
    'use strict';
	
	var findElementsContaining = (searchText, sel) => Array.from(document.querySelectorAll(sel || "*"))
		.filter(e => e.textContent == searchText || getComputedStyle(e,"::after")
                .getPropertyValue("content").replace(/"/g,"") == searchText);
		

    var findAncestor = (sel, elp) => elp && !elp.matches(sel) ? findAncestor(sel, elp.parentElement) : elp;

    var removePost = containing =>
        setInterval(() => {
            findElementsContaining(containing, "span, div")
            	.forEach(el => {
                    console.log("Found", el);
                    var toDel = findAncestor("div._1dwg._1w_m, div._1-ia, div._1t3l", el.parentElement);
                    console.log("Deleting", toDel);
                    toDel.remove();
                });
        }, 1000);
    

    removePost("Suggested Post");
    removePost("Suggested Groups");
    removePost("People you may know");
    removePost("Page stories you may like");

})();
