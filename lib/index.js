var cheerio = require('cheerio');

/**
 * Parse a hurricane advisory and return JSON object
 * @param {string} html - a DOM object from a public advisory page
 * @returns {object} advisory JSON object
 */
 function advisory (html) {
   // LOCATION...15.2N 124.7W
   var location = html.match(/LOCATION\.+(\d+\.\d+N\s+\d+\.\d+W)/);
   var info = {
     location: location[1]
   };
   return info;
 }

/**
 * Find link to hurricane summary in the RSS feed
 * @param {string} xml - a DOM object from the RSS feed
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

module.exports.advisory = advisory;
module.exports.summary = summary;
