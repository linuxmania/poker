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

function GameOmahaRest(num){
    this.shuffled = [];
	this.num = prompt("How many Players (2 - 9)?", num);
	if (!(this.num == parseInt(this.num,10) && this.num > 1 && this.num < 10)) return;
	
    fetch('https://linuxmania.com/deck/')
    .then(response => {
        return response.json();
    })    
    .then(data => {
        for(var i in data){
            var suit = data[i].suit;
            var value = parseInt(data[i].value);
            var card = new Card(suit,value);
    	    this.shuffled.push(card);
        
        }
		this.players = [];
		while(this.num > 0){
			this.players.push(new PlayerOmaha());
			this.num--;
		}
		this.deal();
		alert("Click to see Player 1");
		for (i = 0; i < this.players.length; i++) {
			this.players[i].process(i+1);
		}

		this.flop = new FlopOmaha();

		this.populateFlop();
		this.showFlop();

		this.flop.addCard(this.shuffled.pop());
		this.showFlop();

		this.flop.addCard(this.shuffled.pop());
		this.showFlop();

		this.reportStandings();

    });
}

GameOmahaRest.prototype.populateFlop = function() {
	this.flop.addCard(this.shuffled.pop());
	this.flop.addCard(this.shuffled.pop());
	this.flop.addCard(this.shuffled.pop());
};

GameOmahaRest.prototype.showFlop = function() {
	alert(this.flop.reportHand());
};

GameOmahaRest.prototype.deal = function() {
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCard(this.shuffled.pop());
		}
	}
};

GameOmahaRest.prototype.reportStandings = function() {
	var s = "";

	this.flop.analyze();

	for (var i = 0; i < this.players.length; i++) {
		this.players[i].evaluateHand(this.flop);
	}

	for (var j = 1; j < 10; j++) {
		for (i = 0; i < this.players.length; i++) {
			if(this.players[i].value == j){
				s += "# " + (i+1) + ": " + this.players[i].convertValue() +  "\n" + this.players[i].reportHand() + "\n";
			}
		}
	}
	s += "\n" + this.flop.reportHand();
	alert(s);
};

GameOmahaRest.prototype.reportResults = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		s = this.players[i].getResults(this.flop, i+1);
		alert(s);
	}
};
