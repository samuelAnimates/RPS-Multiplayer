


firebase.initializeApp(config);
// global variable acting as shorthand for our firebase database
var database = firebase.database();

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
var userPlayerAssignment = 0;
var isWeaponPickedLocally = false;
var isOpponentWeaponPickedLocally = false;
var localUserChoice = null;
var isTheRoomFull = false;


/*function that takes in both players' choices, updates W/L counts accordingly,
and nulls their weapon picks
*/
function checkWhoWon(player1weapon, player2weapon){

 if ( (player1weapon === "grass") && (player2weapon === "water")) {
    
    //log outcome locally
    localPlayer1.winsCount++;
    localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.winsCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.lossesCount,
		weaponPick: "null"
	});

	//Print results to page
    $("#results-span").html("RESULT: P1 WINS!");

  }

  else if ( (player1weapon === "grass") && (player2weapon === "fire") ){
  	
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.lossesCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.winsCount,
		weaponPick: "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");
  }

  else if ( (player1weapon === "water") && (player2weapon === "grass") ){
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.lossesCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.winsCount,
		weaponPick: "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");

  }

  else if ( (player1weapon === "water") && (player2weapon === "fire") ){

    //log outcome locally
    localPlayer1.winsCount++;
    localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.winsCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.lossesCount,
		weaponPick: "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P1 WINS!");

  }

  else if ( (player1weapon === "fire") && (player2weapon === "water") ){
    
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.lossesCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.winsCount,
		weaponPick: "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");

  }

  else if ( (player1weapon === "fire") && (player2weapon === "grass") ){
    //log outcome locally
    localPlayer1.winsCount++;
    localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref("player1").update({
		winsCount: localPlayer1.winsCount,
		weaponPick: "null"
	});

    database.ref("player2").update({
		lossesCount: localPlayer2.lossesCount,
		weaponPick: "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P1 WINS!");

  }

  else if (player1weapon === player2weapon) {
    $("#results-span").html("RESULT: TIE!");

    //null weapon choices
    database.ref("player1").update({
		weaponPick: "null"
	});

    database.ref("player2").update({
		weaponPick: "null"
	});

  }

}

//function that takes in Player 1's weapon choice and dislays a corresponding img on-screen
function displayPlayer1Weapon(weaponchoice){

	if (weaponchoice === "null"){
		$("#player1-weapon-display").attr("src", "./assets/images/waiting.gif");
	}

	else if (weaponchoice === "grass"){
		$("#player1-weapon-display").attr("src", "./assets/images/grass.png");
	}

	else if (weaponchoice === "fire"){
		$("#player1-weapon-display").attr("src", "./assets/images/fire.png");
	}

	else{
		$("#player1-weapon-display").attr("src", "./assets/images/water.png");
	}

}

//function that takes in Player 2's weapon choice and dislays a corresponding img on-screen
function displayPlayer2Weapon(weaponchoice){

	if (weaponchoice === "null"){
		$("#player2-weapon-display").attr("src", "./assets/images/waiting.gif");
	}

	else if (weaponchoice === "grass"){
		$("#player2-weapon-display").attr("src", "./assets/images/grass.png");
	}

	else if (weaponchoice === "fire"){
		$("#player2-weapon-display").attr("src", "./assets/images/fire.png");
	}

	else{
		$("#player2-weapon-display").attr("src", "./assets/images/water.png");
	}

}


database.ref().on("value", function(snapshot) {     

	//update the local player objects whenvever the database is updated
    localPlayer1 = snapshot.val().player1; 
    localPlayer2 = snapshot.val().player2;

    //
    if ( !isTheRoomFull && localPlayer1.username != "null" && localPlayer2.username != "null"){

    	isTheRoomFull;

    	displayPlayer1Weapon(localPlayer1.weaponPick);
    	$("#player-1-name").html(localPlayer1.username);
    	$("#player-1-wins").html(localPlayer1.winsCount);
    	$("#player-1-losses").html(localPlayer1.lossesCount);

    	displayPlayer2Weapon(localPlayer2.weaponPick);
    	$("#player-2-name").html(localPlayer2.username);
    	$("#player-2-wins").html(localPlayer2.winsCount);
    	$("#player-2-losses").html(localPlayer2.lossesCount);

    	if (localPlayer1.weaponPick != "null" && localPlayer2.weaponPick != "null"){

    		checkWhoWon(localPlayer1.weaponPick, localPlayer2.weaponPick);


    	}

	}

	else if (isTheRoomFull){

		displayPlayer1Weapon(localPlayer1.weaponPick);
		$("#player-1-name").html(localPlayer1.username);
		$("#player-1-wins ").html(localPlayer1.winsCount);
		$("#player-1-losses").html(localPlayer1.lossesCount);

		displayPlayer2Weapon(localPlayer2.weaponPick);
		$("#player-2-name").html(localPlayer2.username);
		$("#player-2-wins").html(localPlayer2.username);
		$("#player-2-losses").html(localPlayer2.username);

	}

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});


//User submits their username and are assigned to be Player 1 or Player 2
$("#start-button").on("click", function() {

	userName = $("#username-input").val();

	//check to make sure that the user input a name
	if ( userName  == "" ){

		alert("ENTER A USERNAME, PLEASE");

	}

	//Check to see if the game room is already full
	else if (localPlayer1.username != "null" && localPlayer2.username != "null"){

    	alert("SORRY, THE GAME ROOM IS FULL.");
    	isTheRoomFull = true;

    }

    //otherwise, assign local user to Player 1 or Player 2, with preference to fill the P1 spot first
    else if (localPlayer1.username == "null"){

    	//Assign local user to Player 1
    	database.ref("player1").update({
	    	username: userName,
	    	lossesCount: 0,
	    	winsCount: 0,
	    	weaponPick: "null"
	    });
    	userPlayerAssignment = 1;

    	//update html
    	$("#player-1-name").html(localPlayer1.username);
    	$("#name-entry-div").remove();

    }

    else{

    	//Assign local user to Player 2
    	database.ref("player2").update({
	    	username: userName,
	    	lossesCount: 0,
	    	winsCount: 0,
	    	weaponPick: "null"
	    });
    	userPlayerAssignment = 2;

    	//update html
    	$("#player-2-name").html(localPlayer1.username);
    	$("#name-entry-div").remove();

    	isTheRoomFull = true;

    }

});


//User presses one of three buttons, W/F/G
$(".weapon-button").on("click", function() {

	if (userPlayerAssignment === 0){

		alert("PLEASE ENTER A USERNAME FIRST.");
	}
	
	else {
		var buttonPressed = this.id;

		//User picks Grass, their choice is logged in firebase and the html page is updated
		if ( !isWeaponPickedLocally && buttonPressed == "grass-button" ){

			localUserChoice = "grass";
			isWeaponPickedLocally = true;
		}

		//User picks Fire, their choice is logged in firebase and the html page is updated
		else if ( !isWeaponPickedLocally && buttonPressed == "fire-button" ){

			//Store their choice locally when they pick a weapon 
			localUserChoice = "fire";
			isWeaponPickedLocally = true;
		}

		//User picks Water, their choice is logged in firebase and the html page is updated
		else {
			//Store their choice locally when they pick a weapon 
			localUserChoice = "water";
			isWeaponPickedLocally = true;
		}

		if (userPlayerAssignment === 1){

			displayPlayer1Weapon(localUserChoice);
			database.ref("player1").update({
		    		weaponPick: localUserChoice
		    });

		}

		else{

			displayPlayer2Weapon(localUserChoice);
			database.ref("player2").update({
		    		weaponPick: localUserChoice
		    });

		}

	}

});

