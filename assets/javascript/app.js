
// Initialize Firebase
var config = {

};
firebase.initializeApp(config);
// global variable acting as shorthand for our firebase database
var database = firebase.database();


//function that logs user weapon choice
function selectWeapon(){

};

// local variables to store player information
var localPlayer1 = {
	username: null,
	winsCount: null,
	lossesCount: null,
	weaponPick: null
};

var localPlayer2 = {
	username: null,
	winsCount: null,
	lossesCount: null,
	weaponPick: null
};

//app status tracking variables
var userIsPlayer1 = true;
var isPlayer2There = false;
var isWeaponPickedLocally = false;
var isOpponentWeaponPickedLocally = false;
var localUserChoice = null;


database.ref().on("value", function(snapshot) {     

	//update the local player objects whenvever the database is updated
    localPlayer1 = snapshot.val().player1; 
    localPlayer2 = snapshot.val().player2;

    //make the local user Player 1 if there is no player 1
    if (localPlayer1.username != "null"){

    	$("#player-1-name").html(localPlayer1.username);

    }

    //otherwise, make the local user Player 2 if there is no player 2
    else if (localPlayer2.username != "null"){

    	$("#player-2-name").html(localPlayer1.username);

    }

    else {

    	alert("SORRY, THE GAME ROOM IS FULL.");

    }

    //Once both users have made their choice

	//Determine if player1 wins, loses, or ties

		//Increase the proper count for player1 and player2
		//Display current scores on-screen

    }, function(errorObject) {
    	console.log("The read failed: " + errorObject.code);


});


//User submits their username
$("#start-button").on("click", function() {

	userName = $("#username-input").val();

	//check to make sure that the user input a name
	if ( userName  == "" ){

		alert("ENTER A USERNAME, PLEASE");

	}

	//check to see if Player1 
	else if(userIsPlayer1) {
		//Save the new username in firebase and initialize variables
	   database.ref("player1").update({
	    	username: userName,
	    	lossesCount: 0,
	    	winsCount: 0,
	    	weaponPick: "null"
	    });

	}
	//Set choice in firebase


});

//User presses one of three buttons, W/F/G
$(".weapon-button").on("click", function() {
	
	var buttonPressed = this.id;

	//Store their choice locally when they pick a weapon 
	if ( !isWeaponPickedLocally && buttonPressed == "grass-button" ){

		localUserChoice = "grass";
		isWeaponPickedLocally = true;

		if ( userIsPlayer1 ){

			$("#player1-weapon-display").attr("src", "./assets/images/grass.png");

		}

	}

	if ( !isWeaponPickedLocally && buttonPressed == "fire-button" ){

		localUserChoice = "fire";
		isWeaponPickedLocally = true;

		if ( userIsPlayer1 ){

			$("#player1-weapon-display").attr("src", "./assets/images/fire.png");

		}

	}

	if ( !isWeaponPickedLocally && buttonPressed == "water-button" ){

		localUserChoice = "water";
		isWeaponPickedLocally = true;

		if ( userIsPlayer1 ){

			$("#player1-weapon-display").attr("src", "./assets/images/water.png");

		}

	}

	//Display choice on-screen


	//Set choice in firebase


});

