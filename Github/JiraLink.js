// ==UserScript==
// @name         Jira link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add link to jira issues
// @author       Muhammed Haque
// @match        https://github.com/livelink/mobile-photos-app/pull/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/JiraLink.js
// @updateURL    https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/JiraLink.js
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('.commit-ref').forEach(c => {
        let ref = c.textContent.match(/TECH-\d*/);
        if (ref && (ref = ref[0])) {
            const link = document.createElement('a');
            link.href = `https://livelinktech.atlassian.net/browse/${ref}`;
            link.textContent = ref;
            
            c.parentElement.insertBefore(link, c);
        }
    });
})();
