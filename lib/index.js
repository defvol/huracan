var cheerio = require('cheerio');

/**
 * Parse a hurricane advisory
 * @param {string} html - a DOM object from a public advisory page
 * @returns {object} advisory - a JSON object
 */
 function advisory (html) {
   var location = html.match(/LOCATION\.+(\d+\.\d+N\s+\d+\.\d+W)/);
   var info = {
     location: location[1]
   };
   return info;
 }

/**
 * Find link to the latest hurricane summary
 * @param {string} xml - a DOM object from the RSS feed
 * @returns {string} link - url to the latest summary
 */
function summary (xml) {
  var $ = cheerio.load(xml, { xmlMode: true });

  var summary = $('item').filter(function (i, el) {
    var title = $(this).children('title').text();
    return title.startsWith('Summary');
  })[0];

  return summary ? $(summary).children('link').text() : null;
}

module.exports = function huracan (options) {
  options = options || {};
  return 'pong';
}

module.exports.advisory = advisory;
module.exports.summary = summary;
