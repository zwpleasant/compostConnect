var map;
function initMap() {
    var latlong = {lat: 41.8781, lng: -87.6298};
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlong,
        zoom: 10
    });

    var marker = new google.maps.Marker({
        map: map,
        position: latlong,
        title: 'Hello World!'
    });

    map.data.loadGeoJson('https://datacatalog.cookcountyil.gov/resource/rj5v-36tj.json');

}

// use AJAX to call the data from the Cook County API
$.ajax({
    url: "https://datacatalog.cookcountyil.gov/resource/rj5v-36tj.json",
    type: "GET",
    data: {
        "$limit" : 5000,
        "$$app_token" : "CNnPAheIrlHPVLFJFJMxk5baK"
    }

// console log the data that is retrieved (should be 44 records)
}).done(function(data) {
    console.log(data);
});