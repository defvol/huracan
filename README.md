# huracan

Monitor cyclones near Mexico shores

```bash
% huracan --latest
{ location: [ 15.7, -125.4 ] }
```

Examples:

Open the latest advisory in geojson.io

```bash
% huracan --latest --geojson | geojsonio
```

## Install

```bash
% npm install -g huracan
```

## Data attribution

The breakpoints (coast line) dataset was downloaded from the [NHC](http://www.nhc.noaa.gov) website at http://www.nhc.noaa.gov/gis/breakpoints/current/Breakpoints_2016.kmz.

Then, converted to JSON:

```bash
% node lib/cli.js --breakpoints data/Breakpoints_2016.kml | jsonlint > data/Breakpoints_2016.json
```

To see a map of these breakpoints, run:

```bash
% cat data/Breakpoints_2016.json | json-to-geo | nd-geojson | geojsonio
```

- [rodowi/json-to-geo](https://github.com/rodowi/json-to-geo)
- [rodowi/nd-geojson](https://github.com/rodowi/nd-geojson)
- [mapbox/geojsonio-cli](https://github.com/mapbox/geojsonio-cli)

Generated map can be found at https://github.com/rodowi/huracan/blob/master/data/Breakpoints_2016.geojson
