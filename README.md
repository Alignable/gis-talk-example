# Political Visualization in Cesium.js

## Step 1. Get the data & Take a peak

Download [Counties](http://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_us_county_500k.zip) and [Congressional Districts](http://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_us_cd115_500k.zip)

Unzip them both to the data/ directory

[Download QGIS](https://qgis.org/en/site/forusers/download.html) (available for all platforms)

Open up a shape file from both downloads and take a look at it and its features

## Step 2. Install Postgres and PostGIS and convert our data boundries to SQL

`brew install postgresql postgis` or download [postgres.app](http://postgresapp.com/)

Run the convertor:
`shp2pgsql -s SRID cb_2016_us_county_500k.shp public.counties > counties.sql`
`shp2pgsql -s SRID cb_2016_us_cd115_500k.shp public.districts > districts.sql`

Get yourself a database and load it in PSQL
`createdb politics`
`psql -d politics -c "CREATE EXTENSION postgis;"`
`psql -d politics -f counties.sql`
`psql -d politics -f districts.sql`
`psql -d politics -c "CREATE INDEX idx_counties_geom ON counties USING gist(geom);"`
`psql -d politics -c "CREATE INDEX idx_districts_geom ON districts USING gist(geom);"`

Now you can create a PostGIS connection in QGis and verify the data imported

## Step 3. Install Mapnik and Tilstache

`brew install memcached`
`brew install mapnik`
`pip install mapnik`
`easy_install tilestache`
`easy_install python_memcached`

Run tiles/map.sh and visit [127.0.0.1:8010/counties/#4/59.82/-373.98](http://127.0.0.1:8010/counties/#4/59.82/-373.98) to verify our map.

## Step 4: Augment our data

Download the 2016 Electrion results CSV from [https://github.com/john-guerra/US_Elections_Results](Github Repo)

Load and run the jupyter notebook in the data directory.


## Step 5: FrontEnd Examples

Run `npm install` and `npm start` to run each

- `frontend-1` - Cesium Hello World
- `frontend-2` - Custom Imagery Provider
- `frontend-3` - Adding entities and fly-in


## Step 6: Extensions!

- Do something cool with the districts table and the legislators repos
