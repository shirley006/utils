/** 字符串工具
 * Created by p_yunfzhang on 2017/3/25.
 */

"use strict";

function StringUtils() {

}


/**
 * 格式化字符串
 * e.g.  String.Utils.format("I love {0}, but I don't love {1}", "China", "Japan");
 * this will output: I love China, but I don't love Japan
 * @param format
 */
StringUtils.prototype.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
       return typeof args[number] != 'undefined' ? args[number] : match;
    });
}


/**
 *
 * @param s
 */
StringUtils.prototype.escapeRegExpChars = function(s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}



module.exports = new StringUtils();
