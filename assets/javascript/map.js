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
        icon: 'assets/images/colorIcon_26.png'
  })

  map.controls[google.maps.ControlPosition.RIGHT_TOP].push (document.getElementById('legend'));

}
