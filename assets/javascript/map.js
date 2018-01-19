var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 41.8781, lng: -87.6298},
    mapTypeId: 'terrain'
  });

  // call to load the geoJSON data
  map.data.loadGeoJson('https://datacatalog.cookcountyil.gov/resource/rj5v-36tj.geojson');

  // set specific map styling for geoJSON data
  map.data.setStyle({
        icon: 'assets/images/colorIcon_26.png',
        clickable: true
  })

  // adds legend to the map document
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push (document.getElementById('legend'));

  // create infowindow object to use later
  var infowindow = new google.maps.InfoWindow();

  // create a listener that will wait for the user to click a facility, then display the infowindow with details about that facility
  map.data.addListener('click', function(event) {
    // in the geojson feature that was clicked, get the "place" and "mag" attributes
    let companyName = event.feature.getProperty("company_name_");
    let phoneNum = event.feature.getProperty("phone_1");
    let html = "Company: " + companyName + ", Phone: " + phoneNum;
    infowindow.setContent(html); // show the html variable in the infowindow
    infowindow.setPosition(event.feature.getGeometry().get()); // anchor the infowindow at the marker
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)}); // move the infowindow up slightly to the top of the marker icon
    infowindow.open(map);
  });

}
