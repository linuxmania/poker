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
