// ==UserScript==
// @name         Show Awaiting Feedback
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Highlight blocks where the last comment is not you
// @author       Muhammed Haque
// @match        https://github.com/livelink/mobile-photos-app/pull/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/ShowAwaitingFeedback.js
// @updateURL    https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/ShowAwaitingFeedback.js
// ==/UserScript==

(function() {
    'use strict';

    const user = document.querySelector('img.avatar[src^=http]').attributes.alt.textContent.slice(1);

    if (document.querySelector('a.author').textContent === user) {
        document.querySelectorAll('.js-line-comments').forEach(n => {
            const [ last ] = Array.from(n.querySelectorAll('.review-comment .js-suggested-changes-contents > h4 > strong')).slice(-1);

            if (user === last.textContent.trim()) {
                n.style.background = "wheat";
            } else {
                n.style.background = "lightcoral";
            }
        });
    }
})();
