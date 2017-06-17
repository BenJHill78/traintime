 var config = {
 	apiKey: "AIzaSyDW1dGLaF_6mCQa92aPSUXcMnyfQcNx9j0",
 	authDomain: "trains-24ee0.firebaseapp.com",
 	databaseURL: "https://trains-24ee0.firebaseio.com",
 	projectId: "trains-24ee0",
 	storageBucket: "trains-24ee0.appspot.com",
 	messagingSenderId: "717894343698"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

// Initial Values
var newTrain = [];
var dest = [];
var trainTime = [];
var frequency = [];

database.ref().on("value", function(snapshot) {
   $("#trainTable").empty();
  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("newTrain").exists() && snapshot.child("dest").exists() && snapshot.child("trainTime").exists() && snapshot.child("frequency").exists()) {
    // Set the local variables for highBidder equal to the stored values in firebase.
    newTrain = snapshot.val().newTrain;
    dest = snapshot.val().dest;
    trainTime = snapshot.val().trainTime;   
    frequency = snapshot.val().frequency;

    for (var i = 0; i < newTrain.length; i++ )
    		$("#trainTable").append ("<tr><td>" + snapshot.val().newTrain[i] + "</td><td>" + snapshot.val().dest[i] + "</td><td>" + snapshot.val().frequency[i] + "</td><td>next</td><td>minutes</td></tr>");
   }

});
    $("#submit").on("click", function(event) {
  // prevent form from trying to submit
  event.preventDefault();
  // Get the input values
  newTrain.push($("#trainName").val().trim());
  dest.push($("#finalDestination").val().trim());
  trainTime.push($("#ftt").val().trim());
  frequency.push($("#totalFrequency").val().trim());

    database.ref().set({
    	newTrain: newTrain,
    	dest: dest,
    	trainTime: trainTime,
    	frequency: frequency

    });
    	
});

