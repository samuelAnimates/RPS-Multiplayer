

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


var userPlayerAssignment;
var isWeaponPickedLocally;
var isOpponentWeaponPickedLocally;
var localUserChoice;
var isTheRoomFull;
var localChatRoom;
var localChatRoomTemp;


function initializeGame(){

	//app status tracking variables
	userPlayerAssignment = 0;
	isWeaponPickedLocally = false;
	isOpponentWeaponPickedLocally = false;
	localUserChoice = null;
	isTheRoomFull = false;
	localChatRoom;
	localChatRoomTemp;

};


/*function that takes in both players' choices, updates W/L counts accordingly,
and nulls their weapon picks so they can play again
*/
function checkWhoWon(player1weapon, player2weapon){

 if ( (player1weapon === "grass") && (player2weapon === "water")) {
    
    //log outcome locally
    localPlayer1.winsCount++;
    localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/winsCount": localPlayer1.winsCount,
		"player1/weaponPick": "null",
		"player2/lossesCount": localPlayer2.lossesCount,
		"player2/weaponPick": "null"
	}); 

	//Print results to page
    $("#results-span").html("RESULT: P1 WINS!");

  }

  else if ( (player1weapon === "grass") && (player2weapon === "fire") ){
  	
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/lossesCount": localPlayer1.lossesCount,
		"player1/weaponPick": "null",
		"player2/winsCount": localPlayer2.winsCount,
		"player2/weaponPick": "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");
  }

  else if ( (player1weapon === "water") && (player2weapon === "grass") ){
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/lossesCount": localPlayer1.lossesCount,
		"player1/weaponPick": "null",
		"player2/winsCount": localPlayer2.winsCount,
		"player2/weaponPick": "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");

  }

  else if ( (player1weapon === "water") && (player2weapon === "fire") ){

    //log outcome locally
    localPlayer1.winsCount++;
    localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/winsCount": localPlayer1.winsCount,
		"player1/weaponPick": "null",
		"player2/lossesCount": localPlayer2.lossesCount,
		"player2/weaponPick": "null"
	}); 

    //Print results to page
    $("#results-span").html("RESULT: P1 WINS!");

  }

  else if ( (player1weapon === "fire") && (player2weapon === "water") ){
    
    //log outcome locally
    localPlayer1.lossesCount++;
    localPlayer2.winsCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/lossesCount": localPlayer1.lossesCount,
		"player1/weaponPick": "null",
		"player2/winsCount": localPlayer2.winsCount,
		"player2/weaponPick": "null"
	});

    //Print results to page
    $("#results-span").html("RESULT: P2 WINS!");

  }

  else if ( (player1weapon === "fire") && (player2weapon === "grass") ){
    
   
	//log outcome locally
	localPlayer1.winsCount++;
	localPlayer2.lossesCount++;

    //log results to firebase and null weapon choices
    database.ref().update({
		"player1/winsCount": localPlayer1.winsCount,
		"player1/weaponPick": "null",
		"player2/lossesCount": localPlayer2.lossesCount,
		"player2/weaponPick": "null"
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

	else if (weaponchoice === "water"){
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

	else if (weaponchoice === "water"){
		$("#player2-weapon-display").attr("src", "./assets/images/water.png");
	}

}

/*============================================================================================*/

initializeGame();

$("#clear-button").on("click", function() {

	database.ref().update({
    	"player1/lossesCount": 0,
    	"player1/username": "null",
    	"player1/weaponPick": "null",
    	"player1/winsCount": 0,
    	"player2/lossesCount": 0,
    	"player2/username": "null",
    	"player2/weaponPick": "null",
    	"player2/winsCount": 0
    });

	$("#player-1-name").html("NO ONE HERE YET");
    $("#player-1-wins").html("n/a");
    $("#player-1-losses").html("n/a");

    $("#player-2-name").html("NO ONE HERE YET");
    $("#player-2-wins").html("n/a");
    $("#player-2-losses").html("n/a");

    !isTheRoomFull;


});


database.ref().on("value", function(snapshot) {     

	//update the local player objects whenvever the database is updated
    localPlayer1 = snapshot.val().player1; 
    localPlayer2 = snapshot.val().player2;

    //update chatroom
    localChatRoomTemp = snapshot.val().messages;

    if (localChatRoomTemp != localChatRoom){

    	localChatRoom = localChatRoomTemp;
    	$("#chat-box").text(localChatRoom);

    }

    //The user's weapon choice will always be displayed, placeholder gif if it's null
    displayPlayer1Weapon(localPlayer1.weaponPick);
    displayPlayer2Weapon(localPlayer2.weaponPick);

    //
    if ( !isTheRoomFull ){


    	//change global variable to reflect app state if the game is being played by 2 players
    	if ( (localPlayer1.username != "null") && (localPlayer2.username != "null") ){

    		isTheRoomFull;

			$("#player-1-name").html(localPlayer1.username);
	    	$("#player-1-wins").html(localPlayer1.winsCount);
	    	$("#player-1-losses").html(localPlayer1.lossesCount);

	    	$("#player-2-name").html(localPlayer2.username);
	    	$("#player-2-wins").html(localPlayer2.winsCount);
	    	$("#player-2-losses").html(localPlayer2.lossesCount);

    	}

    	//otherwise, fill html page with placeholders where applicable
    	else if ( (localPlayer1.username === "null") && (localPlayer2.username != "null") ){

    		$("#player-1-name").html("NO ONE HERE YET");
    		$("#player-1-wins").html("n/a");
    		$("#player-1-losses").html("n/a");

    		$("#player-2-name").html(localPlayer2.username);
	    	$("#player-2-wins").html(localPlayer2.winsCount);
	    	$("#player-2-losses").html(localPlayer2.lossesCount);

	    	!isTheRoomFull;

    	}

    	else if ( (localPlayer1.username != "null") && (localPlayer2.username === "null") ){

    		$("#player-1-name").html(localPlayer1.username);
	    	$("#player-1-wins").html(localPlayer1.winsCount);
	    	$("#player-1-losses").html(localPlayer1.lossesCount);

    		$("#player-2-name").html("NO ONE HERE YET");
    		$("#player-2-wins").html("n/a");
    		$("#player-2-losses").html("n/a");

    		!isTheRoomFull;

    	}

    	//run checkWhoWon function on the users' weapon choices if aplicable
    	if (localPlayer1.weaponPick != "null" && localPlayer2.weaponPick != "null"){

    		checkWhoWon(localPlayer1.weaponPick, localPlayer2.weaponPick);
    		isWeaponPickedLocally = false;

    	}

	}

	//if the app has already detected two players in a previous turn, just directly print all player info to the page
	else if (isTheRoomFull){

		//update html page with 
		displayPlayer1Weapon(localPlayer1.weaponPick);
		$("#player-1-name").html(localPlayer1.username);
		$("#player-1-wins ").html(localPlayer1.winsCount);
		$("#player-1-losses").html(localPlayer1.lossesCount);

		displayPlayer2Weapon(localPlayer2.weaponPick);
		$("#player-2-name").html(localPlayer2.username);
		$("#player-2-wins").html(localPlayer2.winsCount);
		$("#player-2-losses").html(localPlayer2.lossesCount);

		//run checkWhoWon function on the users' weapon choices if aplicable
		if (localPlayer1.weaponPick != "null" && localPlayer2.weaponPick != "null"){

    		checkWhoWon(localPlayer1.weaponPick, localPlayer2.weaponPick);
    		isWeaponPickedLocally = false;

    	}

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
    else if (localPlayer1.username === "null"){

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

    else if (localPlayer2.username === "null"){

    	//Assign local user to Player 2
    	database.ref("player2").update({
	    	username: userName,
	    	lossesCount: 0,
	    	winsCount: 0,
	    	weaponPick: "null"
	    });
    	userPlayerAssignment = 2;

    	//update html
    	$("#player-2-name").html(localPlayer2.username);
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
		else if ( !isWeaponPickedLocally && buttonPressed == "water-button" ){
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

