/***************************************************
 * Created by nanyuantingfeng on 2020/3/1 10:10. *
 ***************************************************/
var mdurl = require("mdurl");

function isNeedDecode(url, config) {
  config = config || "*";

  if (config === "*") {
    return true;
  }

  if (config === "./" || config === ".") {
    return !/^(\w+?:\/)?\//.test(url);
  }

  if (config instanceof RegExp) {
    return config.test(url);
  }

  config = [].concat(config);
  return config.some(a => url.startsWith(a));
}

function decodeURL(url, config) {
  url = isNeedDecode(url, config) ? mdurl.decode(url) : url;
  return /^(\w+?:\/)?\.?\//.test(url) ? url : "./" + url;
}

module.exports = function(md, config) {
  md.renderer.rules.image = function(tokens, idx) {
    var token = tokens[idx];
    var srcIndex = token.attrIndex("src");
    var url = token.attrs[srcIndex][1];
    var caption = md.utils.escapeHtml(token.content);
    url = decodeURL(url, config);
    return '<img src="' + url + '" alt="' + caption + '" />';
  };
};
