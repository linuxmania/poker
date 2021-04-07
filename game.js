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
