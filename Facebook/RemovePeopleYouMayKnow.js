// ==UserScript==
// @name         Remove 'people you may know'
// @namespace    http://tampermonkey.net/
// @version      0.2
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

	function findAncestor(el, sel) {
		var parent = el.parentElement;
		if (parent && !parent.matches(sel)) {
			return findAncestor(parent, sel);
		}
		return parent;
	}

	setInterval(function() {
		findElementsContaining("People you may know", "span").forEach(
				function(el) {
					console.log("Found", el);
					var toDel = findAncestor(el, "div._1dwg._1w_m");
					console.log("Deleting", toDel);
					toDel.remove();
				});
	}, 5000);

})();