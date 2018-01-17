var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 41.8781, lng: -87.6298}
  });

  // call ajax to load the geoJSON data
  map.data.loadGeoJson(
      'https://datacatalog.cookcountyil.gov/resource/rj5v-36tj.geojson');

}
