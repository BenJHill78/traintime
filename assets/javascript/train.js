		// Firebase DB info
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
		// Declaring initial variable values
	var newTrain = [];
		var dest = [];
		var trainTime = [];
		var frequency = [];
		var timeHold;
		var timeDif;
		var minTo;
		var nextArive;
		var format = "HH:mm"
		var startTime = moment("trainTime",format);
		// Setting the table to empty
	database.ref().on("value", function(snapshot) {
	$("#trainTable").empty();
		//looking for the values of the arrays
	if (snapshot.child("newTrain").exists() && snapshot.child("dest").exists() && snapshot.child("trainTime").exists() && snapshot.child("frequency").exists()) {
		//setting the var equal to
		newTrain = snapshot.val().newTrain;
		dest = snapshot.val().dest;
		trainTime = snapshot.val().trainTime;   
		frequency = snapshot.val().frequency;
		// setting the values to the array and adding to it
	for (var i = 0; i < newTrain.length; i++ ){
		//getting the times and calculating frequency
		timeHold = moment(trainTime[i], format);
		timeDif = timeHold.diff(moment(),"minutes");
		timeDif = Math.abs(timeDif);
		minTo = frequency[i] - (timeDif % frequency[i]);
		nextArive = moment().add(minTo,"minutes").format(format);
		//putting the vales into the table
	$("#trainTable").append ("<tr><td>" + snapshot.val().newTrain[i] + "</td><td>" + snapshot.val().dest[i] + "</td><td>" + snapshot.val().frequency[i] + "</td><td>" + nextArive +"</td><td>" + minTo +"</td></tr>");
}
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

