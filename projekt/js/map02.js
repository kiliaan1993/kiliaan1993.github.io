window.onload = function() {

//set current Date

  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth()+1;
  var yyyy = currentDate.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }

  currentDate = yyyy+'/'+mm+'/'+dd;

  var layers = {
    esriDarkGray: L.esri.basemapLayer('DarkGray', {
            }),
    surfaceTemp: L.GIBSLayer('MODIS_Terra_Land_Surface_Temp_Day', {
                date: new Date(currentDate),
                transparent: true
            }),
    chloroOcean: L.GIBSLayer('MODIS_Terra_Chlorophyll_A', {
                date: new Date(currentDate),
                transparent: true
            }),
    image: L.GIBSLayer('MODIS_Terra_CorrectedReflectance_TrueColor', {
            date: new Date(currentDate),
            transparent: true
          }),
    earthNight: L.GIBSLayer('VIIRS_SNPP_DayNightBand_ENCC', {
                date: new Date(currentDate),
                transparent: true
          }),
    borders: L.GIBSLayer('Reference_Features', {
            date: new Date(currentDate),
            transparent: true
          })
   };

  var map = L.map('map', {
            layers: [layers.esriDarkGray, layers.borders, layers.surfaceTemp],
            center : [40, -100],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

  L.control.layers ({
    "ESRI Dark Gray": layers.esriDarkGray,
    "MODIS Image": layers.image,
    "Earth at Night": layers.earthNight
  },{
    "Borders": layers.borders,
    "Chlorophyll Ocean": layers.chloroOcean,
    "Surface Temperature": layers.surfaceTemp
  }).addTo(map)

};
