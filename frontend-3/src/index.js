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

fetch('votes.json').then((r) => r.json()).then(function(json) {
  showVotes(json);
})

function showVotes(data) {
  var size = 10000;
  var entities = viewer.entities;
  var voteBoxes = entities.add(new Cesium.Entity());

  for(var i=0;i< data.length;i++) {
    var entity = data[i];
    var height = entity.total_votes;

    var position = Cesium.Cartesian3.fromDegrees(
      entity.lon, 
      entity.lat + 0.1, 
      height / 2);

    entities.add({
      parent: voteBoxes,
      name : entity.name,
      position: position,
      box : {
        dimensions : new Cesium.Cartesian3(size, size, height),
        material : Cesium.Color.LIGHTSLATEGRAY.withAlpha(0.6)
      }
    });
  }

}

setTimeout(function() {
  viewer.camera.flyTo({
    destination:  new Cesium.Cartesian3(
      -1449248.9294289043,  
      -10573194.123773875, 
      2555888.800937168),
    orientation: {
      heading: 0.0275895435274629,
      pitch: -1.1104888769867127,
      roll: 6.283107475947466
    }
  });
}, 4000)




