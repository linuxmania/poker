function TestHand(){
  this.player = new PlayerOmaha();
  this.flop = new FlopOmaha();

//should be 7s full of 3s
  this.flop.addCard(new Card("Spades",13));
  this.flop.addCard(new Card("Clubs",13));
  this.flop.addCard(new Card("Hearts",13));
  this.flop.addCard(new Card("Hearts",10));
  this.flop.addCard(new Card("Diamonds",13));

  this.player.addCard(new Card("Hearts",7));
  this.player.addCard(new Card("Diamonds",8));
  this.player.addCard(new Card("Hearts",9));
  this.player.addCard(new Card("Spades",4));


  this.flop.analyze();
  this.player.evaluateHand(this.flop);

  alert(this.player.convertValue());
  alert(this.player.getResults(this.flop, 1));
}
