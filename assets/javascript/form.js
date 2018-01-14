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


  
  var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var facility = "";
    var address1 = "";
    var address2 = "";
    var city = "";
    var state= "";
    var zip = "";
    var phone = "";
    var email ="";
    var notes ="";


    
    // Capture Button Click
    $(".add-facility").on("click", function(event) {
      event.preventDefault();

      name = $("#location-input").val().trim();
      facility = $("#facility-input").val().trim();
      address1 = $("#address1-input-input").val().trim();
      address2 = $("#address2-input-input").val().trim();
      city = $("#city-input").val().trim();
      state = $("#state-input").val().trim();
      zip = $("#zip-input").val().trim();
      phone = $("#phone-input").val().trim();
      email = $("#email-input").val().trim();
      notes = $("#notes-input").val().trim();
 

      // Code for the push
      dataRef.ref().push({

        name = name,
        facility = facility,
        address1 = address1,
        address2 = address2,
        city = city,
        state = state,
        zip = zip,
        phone = phone,
        email = email,
        notes = notes,
    
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader 
    dataRef.ref().on("child_added", function(childSnapshot) {
        
    });
  




    