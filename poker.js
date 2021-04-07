/***************************

Copyleft [2014] [Daniel Spicer]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

****************************/

function Card(suit,order){
	this.suit=suit;
	this.order=order;

	switch(order){
		case 1:
			this.name = "A";
			this.value = 14;
			break;
		case 2:
			this.name = "2";
			this.value = 2;
			break;
		case 3:
			this.name = "3";
			this.value = 3;
			break;
		case 4:
			this.name = "4";
			this.value = 4;
			break;
		case 5:
			this.name = "5";
			this.value = 5;
			break;
		case 6:
			this.name = "6";
			this.value = 6;
			break;
		case 7:
			this.name = "7";
			this.value = 7;
			break;
		case 8:
			this.name = "8";
			this.value = 8;
			break;
		case 9:
			this.name = "9";
			this.value = 9;
			break;
		case 10:
			this.name = "10";
			this.value = 10;
			break;
		case 11:
			this.name = "J";
			this.value = 11;
			break;
		case 12:
			this.name = "Q";
			this.value = 12;
			break;
		case 13:
			this.name = "K";
			this.value = 13;
			break;
	}
}
/***************************

Copyleft [2014] [Daniel Spicer]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

****************************/

function Deck(){
	this.cards = new Array();
	this.shuffled = new Array();

	for(var i=0; i<52; i++) {
		if(i<13)
			var s = "Diamonds";
		else if(i<26)
			s="Clubs";
		else if(i<39)
			s="Hearts";
		else
			s="Spades";

		var val = (i%13) + 1;
		this.cards.push(new Card(s,val));
	}

	while(this.cards.length > 0){
		var num = parseInt(Math.random() * this.cards.length);
		this.shuffled.push(this.cards[num]);
		this.cards.splice(num,1);
	}
}

Deck.prototype.nextCard = function() {
	return this.shuffled.pop();
}
/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/

function Game(num){
	var playIt = true;
	while(true){
		this.num = prompt("How many Players (2 - 9)?", num);
		if (this.num == parseInt(this.num,10) && this.num > 1 && this.num < 10){
			numPlayers = this.num
			break;
		} else if (this.num == null){
			playIt = false;
			break;
		}
	}
	if(playIt){
		this.deck = new Deck();
		this.players = new Array();
		while(this.num > 0){
			this.players.push(new Player());
			this.num--;
		}
		this.deal();
		alert("Click to see Player 1");
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].process(this.deck, (i+1));
		}

		this.flop = new Flop();

		this.populateFlop();
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.reportStandings();

		this.reportResults();
	}
}

Game.prototype.populateFlop = function() {
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
}

Game.prototype.showFlop = function() {
	alert(this.flop.reportHand());
}

Game.prototype.deal = function() {
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCard(this.deck.nextCard());
		}
	}
}

Game.prototype.reportStandings = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].evaluateHand(this.flop);
	}

	for (var j = 1; j < 10; j++) {
		for (var i = 0; i < this.players.length; i++) {
			if(this.players[i].value == j){
				s += "Player " + (i+1) + ": " + this.players[i].convertValue() + "\n";
			}
		}
	}
	alert(s);
}

Game.prototype.reportResults = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		s = this.players[i].getResults(this.flop, i+1);
		alert(s);
	}
}
/***************************

Copyleft [2014] [Daniel Spicer]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

****************************/

var numPlayers = 2;

function playGame(num) {
		var game = new Game(num);
}
/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/

function Player(){
	this.hand = new Array();
	this.sortedHandValues = new Array();
	this.flushSuit = "";
	this.value = 0;
	this.topCard = 0;
	this.straightHighCard = 0;
	this.threesCard = 0;
	this.pairCard = 0;
	this.secondPairCard = 0;
	this.fullOfCard = 0;
}

Player.prototype.addCard = function(card) {
	this.hand.push(card);
}

Player.prototype.getCard = function(index) {
	return this.hand[index];
}

Player.prototype.convertValue = function(){
	var s = "undefined";
	switch(this.value) {
	  case 1:
	    s = "Straight Flush - " + decodeValue(this.topCard)
	    break;
	  case 2:
			s = "Four of a Kind - " + decodeValue(this.topCard)
	    break;
		case 3:
			s = "Full House - " + decodeValue(this.threesCard) + "  " +  decodeValue(this.fullOfCard)
	    break;
		case 4:
			s = "Flush - " + decodeValue(this.topCard)
	    break;
		case 5:
			s = "Straight - " + decodeValue(this.straightHighCard)
	    break;
		case 6:
			s = "Three of a Kind - " + decodeValue(this.threesCard)
	    break;
		case 7:
			s = "Two Pair - " + decodeValue(this.pairCard) + "  " + decodeValue(this.secondPairCard)
	    break;
		case 8:
			s = "One Pair - " + decodeValue(this.pairCard)
	    break;
		case 9:
			s = "High Card - " + decodeValue(this.topCard)
	    break;
	  default:
			s = "Other"
	}
	return s;
}

Player.prototype.reportHand = function(){
	s="";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}

Player.prototype.process = function(deck, num){
	s = "Player " + num + ":\n" +
		this.reportHand();
	alert(s);
	alert("Click to see next Player or flop");
}

Player.prototype.evaluateHand = function(flop){
	tempHand = new Array();
	tempHand[0] = this.getCard(0);
	tempHand[1] = this.getCard(1);
	tempHand[2] = flop.getCard(0);
	tempHand[3] = flop.getCard(1);
	tempHand[4] = flop.getCard(2);
	tempHand[5] = flop.getCard(3);
	tempHand[6] = flop.getCard(4);

	// create sorted values
	this.sortedHandValues = getSortedHandValues(tempHand);

  // flush?
  this.flushSuit = hasFlush(tempHand);

	// straight?
  this.straightHighCard = hasStraight(this.sortedHandValues);

	if(this.flushSuit != "" && this.straightHighCard > 0){ //flush and straight
		this.topCard = hasStrightFlush(tempHand, this.flushSuit);
		if(this.topCard > 0){ //straigh flush
			this.value = 1;
			return;
		}
	}

	this.threesCard = hasThreeOfAKind(this.sortedHandValues);
	if(this.threesCard > 0 && this.flushSuit == "" && this.straightHighCard== 0){ 
		// at least three of a kind with no flush or straight
		this.foursCard = hasFourOfAKind(this.sortedHandValues);
		if(this.foursCard > 0){ //four of a kind
			this.value = 2;
			return;
		}
		this.fullOfCard = hasFullHouse(this.sortedHandValues, this.threesCard);
		if(this.fullOfCard > 0){ // full house
			this.value = 3;
			return;
		}
	}

	if(this.flushSuit != ""){ //flush
		this.topCard = getFlushHigh(tempHand, this.flushSuit);
		this.value = 4;
		return;
	} else if(this.straightHighCard > 0){ //straight
		this.value = 5;
		return;
	} else if(this.threesCard > 0) { // three of a kind
		this.value = 6;
		return;
	}

	this.pairCard = hasPair(this.sortedHandValues);
	if(this.pairCard > 0){ //at least one pair
		this.secondPairCard = hasTwoPair(this.sortedHandValues, this.pairCard);
		if(this.secondPairCard > 0){ // two pair
			this.value = 7;
			return;
		} else { //one pair
			this.value = 8;
			return;
		}
	}

	//high card
	this.topCard = this.sortedHandValues[0];
	this.value = 9;
}

Player.prototype.getResults = function(flop, num){
	s = "Player " + num + ":\n" +
		this.reportHand() +
		"\n\n" +
		flop.reportHand();

	return s;
}
function Flop(){
	this.hand = new Array();
}

Flop.prototype.addCard = function(card) {
	this.hand.push(card);
}

Flop.prototype.getCard = function(index) {
	return this.hand[index];
}

Flop.prototype.reportHand = function(){
	s = "";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}
/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/

function GameOmaha(num){
	var playIt = true;
	while(true){
		this.num = prompt("How many Players (2 - 9)?", num);
		if (this.num == parseInt(this.num,10) && this.num > 1 && this.num < 10){
			numPlayers = this.num
			break;
		} else if (this.num == null){
			playIt = false;
			break;
		}
	}
	if(playIt){
		this.deck = new Deck();
		this.players = new Array();
		while(this.num > 0){
			this.players.push(new PlayerOmaha());
			this.num--;
		}
		this.deal();
		alert("Click to see Player 1");
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].process(i+1);
		}

		this.flop = new FlopOmaha();

		this.populateFlop();
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.reportStandings();

		this.reportResults();
	}
}

GameOmaha.prototype.populateFlop = function() {
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
}

GameOmaha.prototype.showFlop = function() {
	alert(this.flop.reportHand());
}

GameOmaha.prototype.deal = function() {
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCard(this.deck.nextCard());
		}
	}
}

GameOmaha.prototype.reportStandings = function() {
	var s = "";

	this.flop.analyze()

	for (var i = 0; i < this.players.length; i++) {
		this.players[i].evaluateHand(this.flop);
	}

	for (var j = 1; j < 10; j++) {
		for (var i = 0; i < this.players.length; i++) {
			if(this.players[i].value == j){
				s += "Player " + (i+1) + ": " + this.players[i].convertValue() + "\n";
			}
		}
	}
	alert(s);
}

GameOmaha.prototype.reportResults = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		s = this.players[i].getResults(this.flop, i+1);
		alert(s);
	}
}
/***************************

Copyleft [2014] [Daniel Spicer]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

****************************/

var numPlayers = 2;

function playOmaha(num) {
		var game = new GameOmaha(num);
}
/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.				// value = 1; set topCard; return

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/

function PlayerOmaha(){
	this.hand = new Array();
	this.sortedValues = new Array();
	this.flushSuit = "";
	this.value = 0;
	this.topCard = 0;
	this.threesCard = 0;
	this.pairCard = 0;
	this.secondPairCard = 0;
	this.fullOfCard = 0;

	this.possibleFlushSuits = new Array();
	this.pairValues = new Array();

	this.alsoInFlop = new Array();

	this.foursOne = 0;
	this.foursTwo = 0;

	this.threes = new Array();

	this.pairs = new Array();
	this.comboPairs = new Array();

	this.possStraights = new Array();
	this.uniqueValues = new Array();
	this.straightCombos = new Array();
}

PlayerOmaha.prototype.addCard = function(card) {
	this.hand.push(card);
}

PlayerOmaha.prototype.getCard = function(index) {
	return this.hand[index];
}

PlayerOmaha.prototype.convertValue = function(){
	var s = "undefined";
	switch(this.value) {
	  case 1:
	    s = "Straight Flush - " + decodeValue(this.topCard)
	    break;
	  case 2:
			s = "Four of a Kind - " + decodeValue(this.topCard)
	    break;
		case 3:
			s = "Full House - " + decodeValue(this.topCard) + "  " +  decodeValue(this.fullOfCard)
	    break;
		case 4:
			s = "Flush - " + decodeValue(this.topCard)
	    break;
		case 5:
			s = "Straight - " + decodeValue(this.topCard)
	    break;
		case 6:
			s = "Three of a Kind - " + decodeValue(this.threesCard)
	    break;
		case 7:
			s = "Two Pair - " + decodeValue(this.pairCard) + "  " + decodeValue(this.secondPairCard)
	    break;
		case 8:
			s = "One Pair - " + decodeValue(this.pairCard)
	    break;
		case 9:
			s = "High Card - " + decodeValue(this.topCard)
	    break;
	  default:
			s = "Other"
	}
	return s;
}

PlayerOmaha.prototype.reportHand = function(){
	s="";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}

PlayerOmaha.prototype.process = function(num){
	s = "PlayerOmaha " + num + ":\n" +
		this.reportHand();
	alert(s);
	alert("Click to see next PlayerOmaha or flop");
}

PlayerOmaha.prototype.evaluateHand = function(flop){

	// create sorted values
	this.sortedValues = getSortedHandValues(this.hand);

	this.possibleFlushSuits = getPossibleFlushSuits(this.hand);
	if(flop.flushSuit != ""){
		this.flushSuit = hasMatchingSuits(this.possibleFlushSuits, flop.flushSuit);
	}

	//if flush
	if(this.flushSuit != ""){
		//if straigh flush
		this.topCard = getStraightFlush(this.hand, flop.hand, this.flushSuit);
		if(this.topCard != 0){
			// value = 1; set topCard; return
			this.value = 1;
			return;
		}
	}

	this.pairValues = getPairValues(this.sortedValues);
 	//if four of a kind
	if(flop.threeOfaKind != 0){
		this.foursOne = hasMatch(this.sortedValues,flop.threeOfaKind);
	}
	fours = commonValues(this.pairValues, flop.pairValues);
	if(fours.length > 0){
		if(this.foursOne == 0){
			this.foursOne = fours[0];
		} else {
			this.foursTwo = fours[0];
		}
	}
	if(fours.length == 2){
		this.foursTwo = fours[1];
	}
	if(this.foursOne != 0){
		// value = 2; set topCard; return
		this.value = 2;
		if(this.foursTwo != 0){
			if(this.foursOne > this.foursTwo){
				this.topCard = this.foursOne;
			}else {
				this.topCard = this.foursTwo;
			}
		} else {
			this.topCard = this.foursOne;
		}
		return;
	}

	//if full house
	//set three threes
	if(flop.threeOfaKind != 0){
		this.threes[0] = flop.threeOfaKind;
	}
	for(i=0; i<flop.pairValues.length; i++){
		if(contains(this.sortedValues ,flop.pairValues[i])){
			this.threes[this.threes.length] = flop.pairValues[i];
		}
	}
	for(i=0; i<this.pairValues.length; i++){
		if(contains(flop.sortedFlopValues ,this.pairValues[i])){
			this.threes[this.threes.length] = this.pairValues[i];
		}
	}
	//sort the threes
	this.threes.sort(function(a, b){return b-a});

	//set four twos
	for(i=0; i<this.pairValues.length; i++){
		if(!contains(flop.sortedFlopValues ,this.pairValues[i])){
			this.pairs[this.pairs.length] = this.pairValues[i];
		}
	}
	for(i=0; i<flop.pairValues.length; i++){
		if(!contains(this.sortedValues ,flop.pairValues[i])){
			this.pairs[this.pairs.length] = flop.pairValues[i];
		}
	}

	for(i=0; i<4; i++){
		if(contains(flop.sortedFlopValues, this.sortedValues[i])){
			if(!contains(flop.pairValues, this.sortedValues[i]) && !contains(this.pairValues, this.sortedValues[i])){
				this.pairs[this.pairs.length] = this.sortedValues[i];
				this.comboPairs[this.comboPairs.length] = this.sortedValues[i];
			}
		}
	}

	//sort pairs
	this.pairs.sort(function(a, b){return b-a});
	//sort combo pairs
	this.comboPairs.sort(function(a, b){return b-a});

	// if multiple threes or one three and one pair
	// and utilizing 2 cards from hand and 3 from flop
	// - full house

	if(this.threes.length == 3){
		this.value = 3;
		this.topCard = this.threes[0];
		if( !(contains(this.pairValues, this.threes[0]) &&  contains(this.pairValues, this.threes[1]) ) ) {
			this.fullOfCard = this.threes[1];
		} else {
			this.fullOfCard = this.threes[2];
		}
		return;
	}

	if(this.threes.length == 2){

		if(contains(this.pairValues, this.threes[0])  && contains(this.pairValues, this.threes[1]) ){
			if(this.pairs.length == 1){
				this.topCard = this.threes[0];
				this.fullOfCard = this.pairs[0];
				this.value = 3;
				return;
			}
		}

		//need better logic here
		//value = 3; set threesCard; set fullOfCard; return

		// 3 from flop || 1 from hand || 2 from hand
		// numFromHand(this.sortedHandValues, value);

		if(!contains(this.sortedValues, this.threes[0])){
			if(this.pairs.length == 1 && this.pairs[0] > this.threes[1]){
					if(contains(this.pairValues, this.pairs[0])){
						this.value = 3;
						this.topCard = this.threes[0];
						this.fullOfCard = this.pairs[0];
						return;
					} else {
						if(numContains(this.sortedValues, this.threes[1]) == 2){
							this.value = 3;
							this.topCard = this.threes[0];
							this.fullOfCard = this.threes[1];
							return;
						}
					}
				}
		}

		if( !contains(this.pairValues, this.threes[0]) ||  !contains(this.pairValues, this.threes[1]) ) {
			this.topCard = this.threes[0];
			this.value = 3;

			if(!contains(this.pairValues, this.threes[0])){
				if(this.pairs.length == 1 && this.pairs[0] > this.threes[1]){
					this.fullOfCard = this.pairs[0];
				}	else this.fullOfCard = this.threes[1];
				return;
			} else {
				if(this.pairs.length == 1 && this.pairs[0] > this.threes[1] && !contains(this.sortedValues, this.pairs[0])){
					this.fullOfCard = this.pairs[0];
				}	else this.fullOfCard = this.threes[1];
				return;
			}
		}
	}

	if(this.threes.length == 1 && this.pairs.length > 0){
		if(!contains(this.sortedValues, this.threes[0])){
			if(this.pairValues.length > 0){
				this.topCard = this.threes[0];
				this.fullOfCard = this.pairValues[0];
				this.value = 3;
				return;
			}
		} else if(numContains(flop.sortedFlopValues, this.threes[0]) == 2){
			if(this.comboPairs.length > 0){
				this.topCard = this.threes[0];
				this.fullOfCard = this.comboPairs[0];
				this.value = 3;
				return;
			}
		} else {
			if(flop.pairValues.length > 0){
				this.topCard = this.threes[0];
				this.fullOfCard = flop.pairValues[0];
				this.value = 3;
				return;
			}
		}
	}

	//if flush
	if(this.flushSuit != ""){
		//value = 4; set topCard; return
		this.value = 4;
		this.topCard = getFlushHigh(createTempHand(this.hand,flop.hand), this.flushSuit);
		return;
	}

	//set up to six possible straights
	this.uniqueValues = getUniqueValues(this.sortedValues);

	//add 1 if we have an ace
	if(this.uniqueValues[0] == 14){
		this.uniqueValues[this.uniqueValues.length] = 1;
	}

	this.possStraights = getPossStraights(this.uniqueValues);

	this.topCard = getHighestStraight(this.possStraights, flop.sortedFlopValues);
	//if straight
	if(this.topCard > 0){
		this.value = 5;
		return;
	}

	//if three of a kind
	if(this.threes.length > 0) {
		//value = 6; set threesCard; return
		this.value = 6;
		this.threesCard = this.threes[0];
		return;
	}

	//two pair?
	if(this.pairs.length > 1){
		twoPairValues = getTwoPairValues(this.pairs, this.pairValues, flop.pairValues, this.comboPairs);
		if(twoPairValues.length == 2){
			this.value = 7;
			this.pairCard = twoPairValues[0];
			this.secondPairCard = twoPairValues[1];
			return;
		}
	}

	// if one pair
	if(this.pairs.length > 0) {
	  //value = 8; set pairCard; return
		this.value = 8;
		this.pairCard = this.pairs[0];
		return;
	}

	// else value = 9; set topCard; return
	this.value = 9;
	if(flop.sortedFlopValues[0] > this.sortedValues[0]){
		this.topCard = flop.sortedFlopValues[0];
	} else {
		this.topCard = this.sortedValues[0];
	}
}

PlayerOmaha.prototype.getResults = function(flop, num){
	s = "PlayerOmaha " + num + ":\n" +
		this.reportHand() +
		"\n\n" +
		flop.reportHand();

	return s;
}
function FlopOmaha(){
	this.hand = new Array();
	this.flushSuit = "";
	this.sortedFlopValues = new Array();
	this.threeOfaKind = 0;
	this.pairValues = new Array();
}

FlopOmaha.prototype.addCard = function(card) {
	this.hand.push(card);
}

FlopOmaha.prototype.getCard = function(index) {
	return this.hand[index];
}

FlopOmaha.prototype.analyze = function() {
	this.sortedFlopValues = getSortedHandValues(this.hand);
	this.flushSuit = getFlushSuit(this.hand);

	this.threeOfaKind = hasThreeOfAKind(this.sortedFlopValues);
	this.pairValues = getPairValuesOther(this.sortedFlopValues, this.threeOfaKind);
}

FlopOmaha.prototype.reportHand = function(){
	s = "";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}
function unicodeSuit(suit) {

  switch(suit) {
    case "Spades":
      s = "\u2660"
      break;
    case "Clubs":
      s = "\u2663"
      break;
    case "Diamonds":
      s = "\u2666"
      break;
    case "Hearts":
      s = "\u2665"
      break;
    default:
      s = "Other"
  }
  return s;
}

function decodeValue(value) {
  switch(value) {
    case 14:
      s = "A"
      break;
    case 13:
      s = "K"
      break;
    case 12:
      s = "Q"
      break;
    case 11:
      s = "J"
      break;
    default:
      s = value
  }
  return s;
}
function hasTwoPair(sortedHandValues, pairValue){
	remainingCards = new Array();
	j=0;
	for(i = 0; i < sortedHandValues.length; i++){
		if(sortedHandValues[i] != pairValue){
			remainingCards[j] = sortedHandValues[i];
			j++;
		}
	}
  return hasPair(remainingCards);
}

function getFlushHigh(tempHand, flushSuit){
  flushHigh = 0;
  for(i=0; i<tempHand.length; i++){
    if(tempHand[i].suit == flushSuit){
      if(tempHand[i].value > flushHigh)
      flushHigh = tempHand[i].value;
    }
  }
  return flushHigh;
}

function hasFullHouse(sortedHandValues, threesValue){
	remainingCards = new Array();
	j = 0;
	for(i=0; i<sortedHandValues.length; i++){
		if(sortedHandValues[i] != threesValue){
			remainingCards[j] = sortedHandValues[i];
			j++;
		}
	}
  return hasPair(remainingCards);
}

function hasFourOfAKind(sortedHandValues){
	remaining = new Array();

	for(j=0; j<sortedHandValues.length-3; j++){
  	test = sortedHandValues[j];
		matches = 0;
		k = 0;
  	for(i = j+1; i < sortedHandValues.length; i++){
  		if(sortedHandValues[i] == test){
  			matches++;
  			if(matches == 3) {
  				return test;
  			}
  		} else {
				remaining[k] = sortedHandValues[i];
				k++;
			}
  	}
  }

	test = remaining[0];
	for(i=1;i<remaining.length;i++){
		if(remaining[i] != test);
			return 0;
	}
	if(i == 4) return test;
	return 0;
}

function hasStraightFlush(tempHand, suit){
	hand = new Array();

	j = 0;
	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == suit){
			hand[j] = tempHand[i].value;
			j++;
		}
	}
	//sort array descending
	hand.sort(function(a, b){return b-a});

  for(i=0; i< hand.length -4; i++){
  	if(hand[i] - hand[i+4] == 4) {
  		return hand[i];
  	}
  }

	if(hand[0] == 14 && hand[hand.length - 1] == 2 && hand[hand.length - 4] == 5) {
		return 5;
	}
	return 0;
}

function getUnpairedValues(sortedHandValues){
  unpairedValues = new Array();

  unpairedValues[0] = sortedHandValues[0];
  prev =0;
  j=1;
  for(i = 1; i < sortedHandValues.length; i++){
    if(sortedHandValues[i] != sortedHandValues[prev]){
      unpairedValues[j] = sortedHandValues[i];
      j++;
    }
    prev++;
  }
  return unpairedValues;
}

function hasStraight(sortedHandValues){
  unpairedValues = getUnpairedValues(sortedHandValues);
  return hasStraightFromUnpaired(unpairedValues);
}

function hasStraightFromUnpaired(sortedUnpairedValues){
  numCards = sortedUnpairedValues.length;
  if(numCards < 5) return 0;

  for(j=0; j< (numCards -4); j++){
  	if((sortedUnpairedValues[j] - sortedUnpairedValues[j+4]) == 4)
      return sortedUnpairedValues[j];
  }

	if(sortedUnpairedValues[0] == 14 && sortedUnpairedValues[numCards-1] == 2 && sortedUnpairedValues[numCards-4] == 5)
    return 5;

	return 0;
}

function getSortedHandValues(hand){
	sortedHand = new Array();

	for(i = 0; i < hand.length; i++){
		sortedHand[i] = hand[i].value;
	}
	//sort array descending
	sortedHand.sort(function(a, b){return b-a});
	return sortedHand;
}

function hasThreeOfAKind(sortedHandValues){
	for(j=0; j<(sortedHandValues.length-2); j++){
		test = sortedHandValues[j];
		matches = 0;
		for(i = j+1; i < sortedHandValues.length; i++){
			if(sortedHandValues[i] == test){
				matches++;
				if(matches == 2) {
					return test;
				}
			}
		}
	}
	return 0;
}

function hasPair(sortedValues){
	for(j=0; j < (sortedValues.length - 1); j++){
		test = sortedValues[j];
		for(i = j+1; i < sortedValues.length; i++){
			if(sortedValues[i] == test) return test;
		}
	}
  return 0;
}

function hasFlush(tempHand){
	diamonds = 0;
	clubs = 0;
	hearts = 0;
	spades = 0;

	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == "Diamonds") diamonds++;
		else if(tempHand[i].suit == "Clubs") clubs++;
		else if(tempHand[i].suit == "Spades") spades++;
		else if(tempHand[i].suit == "Hearts")hearts++;
	}

	if(diamonds >= 5) return "Diamonds";
	else if(clubs >= 5) return "Clubs";
	else if(spades >= 5) return "Spades";
	else if(hearts >= 5) return "Hearts";

	return "";
}
function getPairValuesOther(sortedFlopValues, threeOfaKind){
  pairs = new Array();
  test = hasPairOther(sortedFlopValues, threeOfaKind);
  if(test != 0){
    pairs[0] = test;
    if(threeOfaKind == 0){
      test = hasPairOther(sortedFlopValues, pairs[0]);
      if(test != 0){
        pairs[1] = test;
      }
    }
  }
  return pairs;
}

function getPairValues(sortedValues){
  pairs = new Array();
  test = hasPair(sortedValues);
  if(test != 0){
    pairs[0] = test;
    test = hasPairOther(sortedValues, pairs[0]);
    if(test != 0){
      pairs[1] = test;
    }
  }
  return pairs;
}

function getTwoPairValues(pairs, handPairs, flopPairs, comboPairs){
  twoPairValues = new Array();

  // if (pair from hand and pair from flop) or (combo and flop pair) or (2 combos) return
  for(var i=0; i< pairs.length - 1; i++){
    if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
      && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
      && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    }
  }

  if(pairs.length == 3){
    for(i=1; i< pairs.length - 1; i++){
      if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])){
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      }
    }
  }

  if(pairs.length == 4){
    for(i=1; i< pairs.length - 1; i++){
      if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      }
    }
  }

  return twoPairValues;
}

function hasPairOther(sortedValues, notCard){
  for(var j=0; j < (sortedValues.length - 1); j++){
    test = sortedValues[j];
    for(var i = j+1; i < sortedValues.length; i++){
      if(sortedValues[i] == test && test != notCard) return test;
    }
  }
  return 0;
}

function getUniqueValues(list){
  ret = new Array();
  index = 0;
  ret[index] = list[0];
  for(var i=1; i<list.length; i++){
    if(list[i] != list[i-1]){
      index++;
      ret[index] = list[i];
    }
  }
  return ret;
}

function getUniqueSorted(list1, list2){
  ret = new Array();
  index = 0;
  for(var i=0; i<list1.length; i++){
    ret[index++] = list1[i];
  }
  for(i=0; i<list2.length; i++){
    ret[index++] = list2[i];
  }
  ret.sort(function(a, b){return b-a});
  return getUniqueValues(ret);
}

function straightContains(list, high){
  for(var i=0; i<list.length; i++){
    if(Math.abs(list[i]-high) > 4) return false;
  }
  return true;
}

function getHighestStraight(possStraights, sortedFlopValues){
  ret = 0;
  for(var i=0; i<possStraights.length; i++ ){
    uniqueValues = getUniqueSorted(possStraights[i],sortedFlopValues);
    if(uniqueValues.length > 4){
      ret = hasStraightFromUnpaired(uniqueValues);
      if(ret != 0){
        if(straightContains(possStraights[i], ret)) return ret;
      }
    }
  }
  return ret;
}

function getPossStraights(uniqueValues){
  index = 0;
  ret = new Array();
  for(var i=0; i < (uniqueValues.length - 1); i++){
    for(var j=1+i; j < uniqueValues.length; j++){
      if(uniqueValues[i] - uniqueValues[j] < 5){
        //add them to list
//        index = this.possStraights.length;
//        this.possStraights[index] = new Array();
        ret[index] = new Array();
        ret[index][0] = uniqueValues[i];
        ret[index][1] = uniqueValues[j];
        index++;
      }
    }
  }
  //need to account for an ace
  return ret;
}

function contains(list, item){
  for(var ci=0; ci<list.length; ci++){
    if(list[ci] == item) return true;
  }
  return false;
}

function numContains(list, item){
  num = 0;
  for(var ni=0; ni<list.length; ni++){
    if(list[ni] == item) num++;
  }
  return num;
}

function hasMatchingSuits(possibleSuits, suit) {
  for(var i=0; i<possibleSuits.length; i++){
    if(possibleSuits[i] == suit){
      return suit;
    }
  }
  return "";
}

function getStraightFlush(hand, flop, suit){
  suitCards = new Array();
  handValues = new Array();
  var index = 0;
  for(var i=0; i< hand.length; i++){
    if(hand[i].suit == suit){
      handValues[index] = hand[i].value;
      suitCards[index++] = hand[i].value;
    }
  }
  for(var i=0; i< flop.length; i++){
    if(flop[i].suit == suit){
      suitCards[index++] = flop[i].value;
    }
  }
  suitCards.sort(function(a, b){return b-a});
  highStraight = hasStraightFromUnpaired(suitCards);
  if(highStraight == 0) return 0;

  if(suitCards.length == 5) return highStraight;
  handValues.sort(function(a, b){return b-a});

  //loop for other straight values before returning 0
  // does the straight include exactly 2 values from hand?

  while (suitCards.length > 4) {
    numFromHand = 0;
    for(var i=0; i< handValues.length; i++){
      if(handValues[i] <= highStraight && handValues[i] >= (highStraight-4)){
        numFromHand++;
      }
    }
    if(highStraight == 5 && handValues[0] == 14) numFromHand++;
    if(numFromHand == 2) return highStraight;

    //do we have another straight?
    if(suitCards.length > 5){
      temp = new Array();
      for(i=1; i<suitCards.length; i++){
        temp[i-1] = suitCards[i];
      }
      if(suitCards[0] == 14) temp[i-1] = 1; //ace to low
      suitCards = temp;
    }
    highStraight = hasStraightFromUnpaired(suitCards);
    if(highStraight == 0) return 0;
  }
  return 0;
}

function createTempHand(cardsPlayer, cardsFlop){
  cards = new Array();

  numCards = cardsPlayer.length;
  for(var i=0; i< numCards; i++){
    cards[i] = cardsPlayer[i];
  }
  for(i=numCards; i< numCards+cardsFlop.length ; i++){
    cards[i] = cardsFlop[i-numCards];
  }
  return cards;
}

function getFlushSuit(cards) {
  diamonds = 0;
  clubs = 0;
  spades = 0;
  hearts = 0;

  for(var i=0; i<cards.length; i++){
    if(cards[i].suit == "Diamonds"){
      diamonds++;
    }
    else if(cards[i].suit == "Clubs"){
      clubs++;
    }
    else if(cards[i].suit == "Spades"){
      spades++;
    }
    else if(cards[i].suit == "Hearts"){
      hearts++;
    }
  }

  if(diamonds > 2){
    return "Diamonds";
  }
  if(clubs > 2){
    return "Clubs";
  }
  if(hearts > 2){
    return "Hearts";
  }
  if(spades > 2){
    return "Spades";
  }

  return "";
}

function getPossibleFlushSuits(cards) {
  suits = new Array();

  diamonds = 0;
  clubs = 0;
  spades = 0;
  hearts = 0;

  for(var i=0; i<cards.length; i++){
    if(cards[i].suit == "Diamonds"){
      diamonds++;
    }
    else if(cards[i].suit == "Clubs"){
      clubs++;
    }
    else if(cards[i].suit == "Spades"){
      spades++;
    }
    else if(cards[i].suit == "Hearts"){
      hearts++;
    }
  }

  if(diamonds > 1){
    suits[suits.length] = "Diamonds";
  }
  if(clubs > 1){
    suits[suits.length] = "Clubs";
  }
  if(hearts > 1){
    suits[suits.length] = "Hearts";
  }
  if(spades > 1){
    suits[suits.length] = "Spades";
  }

  return suits;
}

function hasMatch(values,match){
  for(var i=0; i<values.length; i++){
    if(values[i] == match) return match;
  }
  return 0;
}

function commonValues(pairValues1, pairValues2){
  ret = new Array();
  var k=0;
  for(var i=0; i<pairValues1.length; i++){
    for(var j=0; j<pairValues2.length; j++){
      if(pairValues1[i] == pairValues2[j]){
        ret[k] = pairValues1[i];
        k++;
        break;
      }
    }
  }
  return ret;
}
