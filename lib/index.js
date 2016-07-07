var cheerio = require('cheerio');

/**
 * Find link to hurricane summary in the RSS feed
 * @param {string} xml - a DOM object to traverse
 * @param {function} callback - returns error or the link found
 */
function summary (xml, callback) {
  var $ = cheerio.load(xml, { xmlMode: true });

  var summary = $('item').filter(function (i, el) {
    var title = $(this).children('title').text();
    return title.startsWith('Summary');
  })[0];

  if (summary) {
    var link = $(summary).children('link').text();
    callback(null, link);
  } else {
    callback(new Error('link not found'));
  }
}

module.exports = function huracan (options) {
  options = options || {};
  return 'pong';
}

module.exports.summary = summary
