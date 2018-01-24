require('cesium/Widgets/widgets.css');
require('./css/main.css');

var Cesium = require('cesium/Cesium');

var mapbox = new Cesium.MapboxImageryProvider({
    mapId: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiY3lrb2QiLCJhIjoiY2o4bWE2MGQ0MHdnbjJxcGZodnV2ZGc1dyJ9.TF3XJW7TtYMOSFbinJXEfA'
});

var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: mapbox,
  baseLayerPicker: false,
  timeline: false,
  sceneModePicker: false, 
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  animation: false,
  vrButton: false 
});

var votesmap = new Cesium.UrlTemplateImageryProvider({
  url : 'http://{s}.maps.local.com:8010/votes/{z}/{x}/{y}.png',
  tilingScheme : new Cesium.GeographicTilingScheme(),
  subdomains: "abcdefghijklm"
});

viewer.scene.imageryLayers.addImageryProvider(votesmap)



