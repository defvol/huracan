var fs = require('fs')
var test = require('tape');
var huracan = require('../lib/index');


test('summary', function (t) {
  t.plan(2);

  var fixture = fs.readFileSync(__dirname + '/fixtures/gis-ep.xml');
  huracan.summary(fixture, function (err, res) {
    t.error(err, 'no errors');
    t.true(res.match('nhc.noaa.gov'), 'finds a link to the summary');
  });
});
