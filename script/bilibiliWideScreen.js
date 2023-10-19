// ==UserScript==
// @name         bilibiliWideScreen
// @namespace    https://github.com/weiensong/cirrhinus-molitorella
// @version      1
// @description  bilibili auto wide screen
// @author       You
// @match        https://www.bilibili.com/video/*
// ==/UserScript==

(function() {
    'use strict';
    var xpathToWaitFor = '//div[@class="bpx-player-control-wrap"]//div[@aria-label="宽屏"]';

    function waitForXPath(xpath, callback) {
        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            callback(element);
        } else {
            var observer = new MutationObserver(function(mutations) {
                var newElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (newElement) {
                    observer.disconnect();
                    callback(newElement);
                }
            });
            observer.observe(document, { childList: true, subtree: true });
        }
    }

    waitForXPath(xpathToWaitFor, function(elementToClick) {
        if (elementToClick) {
            elementToClick.click();
        }
    });
})();
