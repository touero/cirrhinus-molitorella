// ==UserScript==
// @name         autoLogin
// @namespace    https://github.com/weiensong/cirrhinus-molitorella
// @version      1
// @description  自动登录一些需要点击一次，在输入账号密码再点击登录的免验证码网站，请设置匹配的urls
// @author       weienosng
// @match        your urls
// @license      GNU General Public License v3.0

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
