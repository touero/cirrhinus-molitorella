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

    var loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-overlay';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '30%';
    loadingDiv.style.left = '20px';
    loadingDiv.style.transform = 'translateY(-50%)';
    loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingDiv.style.color = '#ffffff';
    loadingDiv.style.padding = '10px';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.style.display = 'none';
    loadingDiv.innerText = 'autoLogin';
    document.body.appendChild(loadingDiv);

    var loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-overlay';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '30%';
    loadingDiv.style.left = '20px';
    loadingDiv.style.transform = 'translateY(-50%)';
    loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingDiv.style.color = '#ffffff';
    loadingDiv.style.padding = '10px';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.style.display = 'none';
    loadingDiv.innerText = 'autoLogin';
    document.body.appendChild(loadingDiv);

    if (firstUrls.includes(window.location.href)) {
        var loginLink = document.querySelector('a[href="/accounts/login/"]');
        if (loginLink) {
                showLoading('Clicking Log in');
        }
        else {
                requestAnimationFrame(clickLoginLinkWhenAvailable);
            }
        function clickLoginLinkWhenAvailable() {
                loginLink.click();
            }
        var observer = new MutationObserver(function(mutationsList) {
            clickLoginLinkWhenAvailable();
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    if (secondUrls.includes(window.location.href)) {
        showLoading('Input username、password and Click login');
        var usernameInput = document.getElementById('id_username');
        var passwordInput = document.getElementById('id_password');
        var loginButton = document.querySelector('button[type="submit"]');
        if (usernameInput && passwordInput && loginButton) {
            usernameInput.value = username;
            passwordInput.value = password;
            loginButton.click();
        }
    }

    if (thirdUrls.includes(window.location.href)){
        showLoading('Finish');
        setTimeout(function() {
                removeLoadingElement();
            }, 1000);
    }

    function showLoading(msg) {
        loadingDiv.innerText = 'autoLogin: '+ msg;
        document.getElementById('loading-overlay').style.display = 'block';
    }

    function removeLoadingElement() {
        var loadingElement = document.getElementById('loading-overlay');
        if (loadingElement) {
            loadingElement.remove();
            console.log('remove tips')
        }
    }
})();
