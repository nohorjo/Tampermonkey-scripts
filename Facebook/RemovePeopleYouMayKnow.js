// ==UserScript==
// @name         Remove 'people you may know'
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove 'people you may know' div
// @author       Nohorjo
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	function findElementsContaining(searchText, sel) {
		var els = document.querySelectorAll(sel || "*");
		var found = [];

		for (var i = 0; i < els.length; i++) {
			if (els[i].textContent == searchText) {
				found.push(els[i]);
			}
		}

		return found;
	}

	function getAncestors(el, sel) {
		var found = [];
		var parent = el.parentElement;
		if (parent) {
			if (parent.matches(sel)) {
				found.push(parent);
			}
			found.concat(parent, sel);
		}
		return found;
	}

	findElementsContaining("People you may know", "span").forEach(function(el) {
		console.log("Found");
		console.log(el);
		getAncestors(el, "div._1dwg._1w_m").forEach(function(del) {
			console.log("del");
			console.log(del);
			del.remove();
		});
	});

})();