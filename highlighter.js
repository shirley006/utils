/** 高亮文字
 */
function StringUtils() {

}


/**
 * 格式化字符串
 * e.g.  String.Utils.format("I love {0}, but I don't love {1}", "China", "Japan");
 * this will output: I love China, but I don't love Japan
 * @param format
 */
StringUtils.prototype.format = function (format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
}


/**
 *
 * @param s
 */
StringUtils.prototype.escapeRegExpChars = function (s) {
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

let stringUtils = new StringUtils();

class Highlighter {
  constructor() {

  }

  /**
   *
   * @param text 原文字
   * @param words 搜素词
   * @param color 高亮颜色
   */
  highlight(text, words, color) {
    let length = words.length;
    for (let i = 0; i < length; i++) {
      let word = words[i].trim();
      if (!word) {
        continue;
      }
      let reg = new RegExp('(' + stringUtils.escapeRegExpChars(word) + ')', "g");
      text = text.replace(reg, function (match, _word) {
        return stringUtils.format('<span style="color: {0};">{1}</span>', color, _word);

      });
    }
    return text;
  }
}

module.exports = new Highlighter();
