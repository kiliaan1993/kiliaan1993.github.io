window.onload = function() {

  var layers = {
    esriDarkGray: L.esri.basemapLayer('DarkGray', {
            }),
    usgs: L.tileLayer("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/WMTS/tile/1.0.0/USGSTopo/default/GoogleMapsCompatible/{z}/{y}/{x}.png", {
                attribution: '&copy; <a href="http://nationalmap.gov/index.html">U.S. Geological Survey</a>'
           })
  };

  var map = L.map('map', {
            layers: [layers.esriDarkGray],
            center : [40, -100],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

  L.control.layers ({
    "ESRI Dark Grey" : layers.esriDarkGray,
    "USGS" : layers.usgs
  }).addTo(map)

};
