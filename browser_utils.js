/**
 * Created by bryonliu on 2017/1/22.
 */

"use strict";

exports.isIE = function () {
    return /msie/i.test(navigator.userAgent) && !window.opera;
};

/**
 * 判断当前浏览器是不是ie
 *
 * @param ver 6 7 8 9 ... 分别代表ie6, ie7 ie9 ie9 ...
 */
exports.isIEBrowser = function (ver) {
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
}

exports.getQueryString= function (key){
    var arr, reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    if (arr = window.location.search.substr(1).match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
};

/**
 * 判断是否是我们支持的浏览器，支持，返回true， 不支持返回false
 * @modify: p_yunfzhang  2017/10/23
 */
exports.myBrowser = function(){
    if (!exports.isIE()) {
        return true;
    }
    var limitBrowserVersions = [5, 6, 7, 8];
    for (var i = 0; i < limitBrowserVersions.length; i++) {
        if (exports.isIEBrowser(limitBrowserVersions[i])) { // 当前浏览器是这几个其中的一个，则返回false
            return false;
        }
    }
    return true;
}; //判断是否IE浏览器
