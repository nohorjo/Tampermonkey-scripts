// ==UserScript==
// @name         Whatsapp Active alert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Play an alert when the current contact's last seen changes
// @author       Muhammed Haque
// @match        https://web.whatsapp.com/
// @downloadURL  https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/Whatsapp/ActiveAlert.js
// @updateURL    https://raw.githubusercontent.com/nohorjo/Tampermonkey-scripts/master/Whatsapp/ActiveAlert.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    const beep = new Audio("https://web.whatsapp.com/assets/0a598282e94e87dea63e466d115e4a83.mp3");
    const timeout = 1000 * 30;

    const checkboxDiv = document.createElement('div');
    checkboxDiv.textContent = 'Check activity';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkboxDiv.prepend(checkbox);
    (await waitFor(() => document.querySelector('#side'))).prepend(checkboxDiv);

    let lastSeen;
    !function doCheck() {
        const span = document.querySelector('#main header span[class]:not([class=""]):not([dir])');
        if (span) {
            span.style.background = (Date.now() / timeout | 0) % 2 ? 'aquamarine' : 'gold';
            const { textContent } = span;
            if (
                lastSeen
                && checkbox.checked
                && textContent !== lastSeen
            ) {
                beep.play();
            }
            lastSeen = textContent;
        }
        setTimeout(doCheck, timeout);
    }();

    function waitFor(fn, timeout = 1000) {
        return new Promise((resolve, reject) => {
            !function check() {
                try {
                    const result = fn();
                    if (result) {
                        resolve(result);
                    } else {
                        setTimeout(check, timeout);
                    }
                } catch (e) {
                    reject(e);
                }
            }();
        });
    }
})();
