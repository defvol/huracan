var cheerio = require('cheerio');
var request = require('request');
var sexagesimal = require('sexagesimal');

var NOAA = 'http://www.nhc.noaa.gov/gis-ep.xml';

/**
 * Parse a hurricane advisory
 * @param {string} html - a DOM object from a public advisory page
 * @returns {object} advisory - a JSON object
 */
 function advisory(html) {
   var location = html.match(/LOCATION\.+(\d+\.\d+N\s+\d+\.\d+W)/);

   var info = {
     location: sexagesimal.pair(location[1])
   };
   return info;
 }

/**
 * Fetch the latest hurricane info from NOAA
 * @param {function} callback - returns error and info objects
*/
function fetch(callback) {
  var self = this;
  request(NOAA, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var link = self.summary(body);
      request(link, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(null, self.advisory(body));
        } else {
          callback(error);
        }
      });
    } else {
      callback(error);
    }
  });
}

/**
 * Find link to the latest hurricane summary
 * @param {string} xml - a DOM object from the RSS feed
 * @returns {string} link - url to the latest summary
 */
function summary(xml) {
  var $ = cheerio.load(xml, { xmlMode: true });

  var summary = $('item').filter(function (i, el) {
    var title = $(this).children('title').text();
    return title.startsWith('Summary');
  })[0];

  return summary ? $(summary).children('link').text() : null;
}

/**
 * Transform advisory into GeoJSON
 * Needs to switch (lat, lng)
 * GeoJSON uses (lng, lat)
 * @param {object} advisory
 * @return {object} featureCollection
 */
function toGeoJSON(advisory) {
  var cyclone = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: advisory.location.reverse()
    }
  };
  return {
    type: 'FeatureCollection',
    features: [ cyclone ]
  };
}

module.exports = function huracan (options) {
  options = options || {};
  return 'pong';
}

module.exports.advisory = advisory;
module.exports.fetch = fetch;
module.exports.summary = summary;
module.exports.toGeoJSON = toGeoJSON;
