var API_KEY = `AIzaSyBV-xnNA8cnDzU_Ehij8y4_XOvfzo0H2Po`;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBfHV5fWxxT0Qof1L3zFOGeLq2yiMMuaRo",
  authDomain: "compost-1ecb5.firebaseapp.com",
  databaseURL: "https://compost-1ecb5.firebaseio.com",
  projectId: "compost-1ecb5",
  storageBucket: "compost-1ecb5.appspot.com",
  messagingSenderId: "62910822789"
};
firebase.initializeApp(config);

var database = firebase.database();


// convert the Firebase data into an array
function snapshotToArray(snapshot) {
  var returnArr = [];
  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};


// geocode address data stored in Firebase
function codeAddress(location) {
  if (location.address) {
    var compName = location.name;
    var compPhone = location.phone;
    var compAddress = location.address;
    var newAddress = location.address.replace(/ /g, '+');
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}&key=${API_KEY}`
    }).done(function (response) {
      if (response.status == 'OK') {

        var contentString = "<p>Company: " + compName + "</p>" +
          "<p>Phone: " + compPhone + "</p>" +
          "<p>Address: " + compAddress + "</p>";

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          map: map,
          position: response.results[0].geometry.location,
          icon: 'assets/images/colorIcon_26.png',
        });
        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + result.status);
      }
    });
  }
}


// initialize and create map
var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: { lat: 41.8781, lng: -87.6298 },
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
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend'));

  // create infowindow object to use later
  var infowindow = new google.maps.InfoWindow();

  // create a listener that will wait for the user to click a facility, then display the infowindow with details about that facility
  map.data.addListener('click', function (event) {
    // in the geojson feature that was clicked, get the "place" and "mag" attributes
    let companyName = event.feature.getProperty("company_name_");
    let phoneNum = event.feature.getProperty("phone_1");
    let address = event.feature.getProperty("address");
    let address2 = event.feature.getProperty("municipality_") + ", " + event.feature.getProperty("state") + ", " + event.feature.getProperty("zip");
    let html = "<p>Company: " + companyName + "</p>" + "<p>Phone: " + phoneNum + "</p>" + "<p>Address: " + address + "</p>" + "<p>" + address2 + "</p>";
    infowindow.setContent(html); // show the html variable in the infowindow
    infowindow.setPosition(event.feature.getGeometry().get()); // anchor the infowindow at the marker
    infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) }); // move the infowindow up slightly to the top of the marker icon
    infowindow.open(map);
  });

  // on value, log the array
  firebase.database().ref().on('value', function (snapshot) {
    var locationArray = snapshotToArray(snapshot);
    console.log(locationArray);
    for (i = 0; i < locationArray.length; i++) {
      //console.log(locationArray[i].address);
      codeAddress(locationArray[i]);
    }
  });

}
