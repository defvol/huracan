var cheerio = require('cheerio');
var fs = require('fs');

/**
 * Parse the KML breakpoints dataset and build a JSON version
 * @param {String} path to KML dataset
 * @return {Object} breakpoints in JSON format
 */
module.exports.breakpoints = function (path) {
  var buffer = fs.readFileSync(path);
  if (!buffer) throw new Error('Something is wrong: ' + err);

  var kml = buffer.toString();
  var results = [];

  var $ = cheerio.load(kml);
  var placemarks = $('placemark').map(function() {
    var name = $(this).children('name').text();
    var coordinates = $(this).children('point').children('coordinates').text();
    coordinates = coordinates.split(',').map(parseFloat);
    results.push({ name, lng: coordinates[0], lat: coordinates[1] });
  });

  return results;
};

/**
 * Get usage instructions
 * @return {String} the instructions to run this thing
 */
module.exports.usage = function () {
  var u = [];
  u.push('Monitor cyclones near Mexico shores');
  u.push('usage: huracan [options]');
  u.push(' --geojson returns advisory as GeoJSON');
  u.push(' --latest check both eastern pacific and atlantic feeds');
  u.push(' --breakpoints convert a KML breakpoints dataset to JSON');
  u.push(' --help prints this message');
  u.push(' --version prints package version');
  u.push('');
  return u.join('\n');
};

/**
 * Get module version from the package.json file
 * @return {String} version number
 */
module.exports.version = function () {
  var data = fs.readFileSync(__dirname + '/../package.json');
  return JSON.parse(data).version;
};
