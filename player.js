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
