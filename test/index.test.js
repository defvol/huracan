var fs = require('fs')
var test = require('tape');
var huracan = require('../lib/index');

test('advisory', function (t) {
  var fixture = fs.readFileSync(__dirname + '/fixtures/062034.shtml');
  var info = huracan.advisory(fixture.toString());
  t.equal(info.location, '15.2N 124.7W', 'scrapes location');
  t.end();
})

test('summary', function (t) {
  t.plan(2);

  var fixture = fs.readFileSync(__dirname + '/fixtures/gis-ep.xml');
  huracan.summary(fixture, function (err, res) {
    t.error(err, 'no errors');
    t.true(res.match('nhc.noaa.gov'), 'finds a link to the summary');
  });
});
