// Invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          event.preventDefault();

          //Grabs user input
          var name = $("#name-input").val().trim();
          var type = $("#facility-input").val().trim();
          var address = $("#autocomplete").val().trim();
          var phone = $("#phone-input").val().trim();
          var email = $("#email-input").val().trim();
          var extra = $("#extra-input").val().trim();


          // Creates local "temporary" object for holding facility data
          var newFacility = {
            name: name,
            type: type,
            address: address,
            phone: phone,
            email: email,
            extra: extra,

          };

          database.ref().push(newFacility);

          // // Clears all of the text-boxes
          // $("#name-input").val("");
          // $("#facility-input").val("");
          // $("#autocomplete").val("");
          // $("#phone-input").val("");
          // $("#email-input").val("");
          // $("#extra-input").val("");


          //Modal pops up if successful
          $("#myModal").modal();

        };
        database.ref().on("child_added", function (childSnapshot, prevChildKey) {

          console.log(childSnapshot.val());

          // Store everything into a variable.
          var name = childSnapshot.val().name;
          var type = childSnapshot.val().type;
          var address = childSnapshot.val().address;
          var phone = childSnapshot.val().phone;
          var email = childSnapshot.val().email;
          var extra = childSnapshot.val().extra;

        });


        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Auto Complete Address by Google
var placeSearch, autocomplete;
var componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name"
};



function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById("autocomplete")),
    { types: ["address"] }
  );

}

// // Bias the autocomplete object to the user's geographical location,
// // as supplied by the browser's 'navigator.geolocation' object.
// function geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy
//       });
//       autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }


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
