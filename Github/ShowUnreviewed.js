// ==UserScript==
// @name         Show Unreviewed
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Highlight unreviewed PRs
// @author       Muhammed Haque
// @match        https://github.com/livelink/mobile-photos-app/pulls
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/ShowUnreviewed.js
// @updateURL    https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/GitHub/ShowUnreviewed.js
// ==/UserScript==

(function() {
    'use strict';

    const user = document.querySelector('img.avatar[src^=http]').attributes.alt.textContent.slice(1);
    const prs = Array.from(document.querySelectorAll('.table-fixed'));
    prs.forEach(e => {
        e.style.background = "wheat";
    });
    prs.filter(e => e.querySelector('a.muted-link').innerText !== user).forEach(async e => {
        const _document = new DOMParser().parseFromString(await fetch(e.querySelector('a').href).then(x => x.text()), "text/html")
        if (!Array.from(_document.querySelectorAll('.sidebar-assignee p'))
            .some(e =>
                  e.querySelector('span')
                  && e.querySelector('span').innerText.trim() === user
                  && !e.querySelector('.octicon-primitive-dot')
            )
        ) {
            e.style.background = "lightcoral";
        }
    });

})();
