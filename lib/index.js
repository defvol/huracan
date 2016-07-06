var cheerio = require('cheerio');

/**
 * Find the summary link on the RSS feed
 * @param {string} xml - a DOM structure from the site
 * @param {function} callback - returns the link found
 */
function summary (xml, callback) {
  var $ = cheerio.load(xml, {
    xmlMode: true
  });

  var summary = $('item').filter(function (i, el) {
    var title = $(this).children('title').text();
    return title.startsWith('Summary');
  })[0];

  var link = summary ? $(summary).children('link').text() : null

  if (summary) callback(null, link);
  else callback(new Error('link not found'));
}

module.exports = function huracan (options) {
  options = options || {};
  return 'pong';
}

module.exports.summary = summary
