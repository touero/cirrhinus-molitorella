// ==UserScript==
// @name         autoClick
// @namespace    https://github.com/weiensong/cirrhinus-molitorella
// @version      1
// @description  bilibili auto wide screen
// @author       You
// @match        https://www.bilibili.com/video/*
// @match        https://www.zhihu.com/question/*
// ==/UserScript==

(function() {
    'use strict';
    var xpathsToWaitFor = [
        '//div[@class="bpx-player-control-wrap"]//div[@aria-label="宽屏"]',
        '//button[contains(text(),"显示全部 ")]'
    ];

    function waitForXPaths(xpaths, callback) {
        function checkXPath(xpath) {
            var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                callback(element);
            }
        }

        xpaths.forEach(function(xpath) {
            checkXPath(xpath);
        });

        var observer = new MutationObserver(function(mutations) {
            xpaths.forEach(function(xpath) {
                var newElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (newElement) {
                    observer.disconnect();
                    callback(newElement);
                }
            });
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    waitForXPaths(xpathsToWaitFor, function(elementToClick) {
        if (elementToClick) {
            elementToClick.click();
        }
    });
})();