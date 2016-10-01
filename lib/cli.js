#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var pack = require('./index');
var util = require('./utils');

if (argv.version || argv.v) {
  console.log(util.version());
} else if (argv.help || argv.h) {
  console.log(util.usage());
} else if (argv.latest) {
  pack.fetch(function (err, info) {
    if (err) return console.log(err);
    info = (argv.geojson || argv.g) ? pack.toGeoJSON(info) : info;
    console.log('%j', info);
  });
} else if (argv.breakpoints) {
  console.log('%j', util.breakpoints(argv.breakpoints));
} else if (argv.nearest) {
  pack.fetch(function (err, info) {
    if (err) return console.log(err);
    console.log('%j', pack.nearestCoast(info.location.reverse()));
  });
} else {
  console.log(pack());
}
