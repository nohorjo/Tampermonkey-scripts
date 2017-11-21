// ==UserScript==
// @name         Remove posts containing certain words
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove posts containing certain words
// @author       Nohorjo
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function () {
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

    function removePost(containing) {
        setInterval(function () {
            findElementsContaining(containing, "span, div").forEach(
                function (el) {
                    console.log("Found", el);
                    var toDel = findAncestor(el, "div._1dwg._1w_m, div._1-ia");
                    console.log("Deleting", toDel);
                    toDel.remove();
                });
        }, 1000);
    }

    removePost("Suggested Post");
    removePost("Suggested Groups");
    removePost("People you may know");
    removePost("Page stories you may like");

})();