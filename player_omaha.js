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
