// ==UserScript==
// @name         autoLogin
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatic login of some websites
// @author       weienosng
// @match        your urls


// ==/UserScript==

(function() {
    'use strict';
    var username = 'your username'
    var password = 'your password'
    var firstUrls = ['your urls'];
    var secondUrls = ['your urls'];

    if (firstUrls.includes(window.location.href)) {
        function clickLoginLinkWhenAvailable(){
            var loginLink = document.querySelector('a[href="/accounts/login/"]');
            if (loginLink) {
                loginLink.click();
            } else {
                requestAnimationFrame(clickLoginLinkWhenAvailable);
            }
        }
        var observer = new MutationObserver(function(mutationsList) {
            clickLoginLinkWhenAvailable();
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    if (secondUrls.includes(window.location.href)) {
        var usernameInput = document.getElementById('id_username');
        var passwordInput = document.getElementById('id_password');
        var loginButton = document.querySelector('button[type="submit"]');
        if (usernameInput && passwordInput && loginButton) {
            usernameInput.value = username;
            passwordInput.value = password;
            loginButton.click();
        }
    }
})();
