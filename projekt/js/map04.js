window.onload = function () {
	var layers = {
		CartoDB_PositronOnlyLabels: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 8
		}),
		Esri_WorldImagery: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles © Esri — Source: <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}),
		NASAGIBS_ViirsEarthAtNight2012: L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
			attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ. © <a href="http://www.esri.com/">Esri</a>-Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
			bounds: [
				[-85.0511287776, -179.999999975],
				[85.0511287776, 179.999999975]
			],
			minZoom: 1,
			maxZoom: 8,
			format: 'jpg',
			time: '',
			tilematrixset: 'GoogleMapsCompatible_Level'
		})
	};

	var magnifyingGlass = L.magnifyingGlass({
		zoomOffset: 0,
		layers: [
			L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
				subdomains: '1234'
			})
		]
	});
	

	var map = L.map('map', {
		layers: [layers.CartoDB_PositronOnlyLabels, magnifyingGlass, /*layers.NASAGIBS_ViirsEarthAtNight2012*/ layers.NASAGIBS_ViirsEarthAtNight2012],
		center: [25.512089, -78.818544],
		zoom: 8,
		maxZoom: 8
	});

	var miniMap = new L.Control.GlobeMiniMap({
		topojsonSrc : 'js/world.json'
			}).addTo(map);
	
	L.control.layers({
		/*
		        "ESRI Image Map": layers.Esri_WorldImagery, "Night": layers.NASAGIBS_ViirsEarthAtNight2012
		    */
	}, {
		"Labels": layers.CartoDB_PositronOnlyLabels
	}).addTo(map);

	// make the glass disappear on click...
	magnifyingGlass.on('click', function () {
		map.removeLayer(magnifyingGlass);
	})

	// ...and reappear on right click
	map.on('contextmenu', function (mouseEvt) {
		if (map.hasLayer(magnifyingGlass)) {
			return;
		}
		map.addLayer(magnifyingGlass);
		magnifyingGlass.setLatLng(mouseEvt.latlng);
	});

}

