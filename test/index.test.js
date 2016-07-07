var fs = require('fs')
var test = require('tape');
var huracan = require('../lib/index');

test('advisory', function (t) {
  var fixture = fs.readFileSync(__dirname + '/fixtures/062034.shtml');
  var info = huracan.advisory(fixture.toString());
  t.deepEqual(info.location, [15.2, -124.7], 'scrapes location');
  t.end();
})

test('summary', function (t) {
  var fixture = fs.readFileSync(__dirname + '/fixtures/gis-ep.xml');
  var link = huracan.summary(fixture);
  t.true(link.match('nhc.noaa.gov'), 'finds a link to the summary');
  t.end();
});
