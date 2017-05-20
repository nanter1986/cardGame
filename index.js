function Card(name) {
    this.name;
}
Card.prototype.toGrave = function (area, index) {
    player.field.graveyard.push()
}
Card.prototype.toHand = function () {
    document.write("im back");
}
Card.prototype.toDeck = function () {
    document.write("im sleepy");
}

function Monster(name, attack) {
    this.name = name;
    this.attack = attack;
}
Monster.prototype = new Card();
Monster.prototype.toField = function () {
    document.write("ready to fight<br>");
}

function Spell(name, effect) {
    this.name = name;
    this.effect = effect;
}
Spell.prototype = new Card();
Spell.prototype.toField = function () {

}

function Trap(name, effect) {
    this.name = name;
    this.effect = effect;
}
Trap.prototype = new Card();
Trap.prototype.toField = function () {

}

function Soldier() {

}
Soldier.prototype = new Monster();
Soldier.prototype.attack = 1;
Soldier.prototype.name = "soldier";

function General() {

}
General.prototype = new Monster();
General.prototype.name = "general";
General.prototype.attack = 3;
General.prototype.toField = function () {
    document.write("im ready to dominate<br>");
}

function Field(deck) {
    this.deck = deck
    this.shuffledeck();
    this.graveyard = [];
    this.monsters = [];
    this.spelltrap = [];
    this.hand = [];
    this.hand[0] = this.deck.shift();
    this.hand[1] = this.deck.shift();
    this.hand[2] = this.deck.shift();
    this.hand[3] = this.deck.shift();
    this.hand[4] = this.deck.shift();
    for (var i = 0; i < this.hand.length; i++) {
        console.log(i + " " + this.hand[i].name);

    }
    console.log("hand was drawn successfully");
}

Field.prototype.shuffledeck = function () {
    var i = 0
        , j = 0
        , temp = null;

    for (i = this.deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = this.deck[i]
        this.deck[i] = this.deck[j]
        this.deck[j] = temp
    }
    for (var i = 0; i < this.deck.length; i++) {
        console.log(i + " " + this.deck[i].name);

    }
    console.log("deck was shuffled successfully");
}


function Player(name, field) {
    this.name = name;
    this.field = field;
    this.showOneCard = function (id, index) {
        var slot = document.getElementById(id);
        var name = this.field.hand[index].name;
        var attack = this.field.hand[index].attack;
        slot.innerHTML = name + "<br>" + attack;
    }
    this.displayCards = function () {
        if (this.name == "com") {

        } else {
            this.showOneCard("handPl1", 0);
            this.showOneCard("handPl2", 1);
            this.showOneCard("handPl3", 2);

        }
    }
}
Player.prototype.lifepoints = 10;


function makeDeckOne() {
    var deckOne = [];
    for (var i = 0; i < 10; i++) {
        deckOne.push(new Soldier());
    }
    for (var i = 0; i < 2; i++) {
        deckOne.push(new General());
    }
    for (var i = 0; i < deckOne.length; i++) {
        console.log(i + " " + deckOne[i].name);

    }
    console.log("deck 1 was made successfully");
    return deckOne;
}

function makeDeckTwo() {
    var deckTwo = [];
    for (var i = 0; i < 10; i++) {
        deckTwo.push(new Soldier());
    }
    for (var i = 0; i < 2; i++) {
        deckTwo.push(new General());
    }
    for (var i = 0; i < deckTwo.length; i++) {
        console.log(i + " " + deckTwo[i].name);

    }
    console.log("deck 2 was made successfully");
    return deckTwo;
}

function setUpGame() {
    players = [];
    var playerDeck = makeDeckOne();
    var computerDeck = makeDeckTwo();
    var playerField = new Field(playerDeck);
    var computerField = new Field(computerDeck);

    var player1 = new Player("nanter", playerField);
    var playerCom = new Player("com", computerField);
    console.log(player1);
    console.log(playerCom);
    players.push(player1);
    players.push(playerCom);
    return players;
}
var players = setUpGame();
var playerOne = players[0];
var playerCom = players[1];
playerOne.displayCards();

