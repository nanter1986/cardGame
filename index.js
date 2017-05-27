function Card(name) {
    this.name;
}
Card.prototype.toGrave = function (field, index) {
    field.graveyard.push(field.monsters[index].shift());
};
Card.prototype.toHand = function () {
    document.write("im back");
};
Card.prototype.toDeck = function () {
    document.write("im sleepy");
};

function Monster(name, attack) {
    this.name = name;
    this.attack = attack;
}
Monster.prototype = new Card();
Monster.prototype.toField = function () {
    document.write("ready to fight<br>");
};

function Spell(name, effect) {
    this.name = name;
    this.effect = effect;
}
Spell.prototype = new Card();
Spell.prototype.toField = function () {

};

function Trap(name, effect) {
    this.name = name;
    this.effect = effect;
}
Trap.prototype = new Card();
Trap.prototype.toField = function () {

};

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
};
function BlackHole() {

}
BlackHole.prototype=new Spell();
BlackHole.prototype.name="Black Hole";
BlackHole.prototype.effect=function (field1, field2) {
    for(var i=0;i<field1.monsters.length;i++){
        if(field1.monsters[i]!=undefined){
            this.toGrave(field1,i);
        }
    }
    for(var j=0;i<field2.monsters.length;i++){
        if(field2.monsters[j]!=undefined){
            this.toGrave(field2,i);
        }
    }
};


function Field(deck) {
    this.deck = deck;
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
        j = Math.floor(Math.random() * (i + 1));
        temp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = temp
    }
    for (var i = 0; i < this.deck.length; i++) {
        console.log(i + " " + this.deck[i].name);

    }
    console.log("deck was shuffled successfully");
};


function Player(name, field,buttonActivity) {
    this.name = name;
    this.field = field;
    this.lifepoints=10;
    this.buttonsActive=buttonActivity;

    this.displayLP=function () {
        var screen;
        if(this.name==="com"){
            screen=document.getElementById("lpCom");
        }else{
            screen=document.getElementById("lpPlayer");
        }
        screen.innerHTML=this.lifepoints;
    }

    this.showOneCard = function (id, index) {
        var slot = document.getElementById(id);
        var name = this.field.hand[index].name;
        var attack = this.field.hand[index].attack;
        slot.innerHTML = name + "<br>" + attack;
    };
    this.displayCards = function () {
        if (this.name == "com") {
            this.showOneCard("handCom1", 0);
            this.showOneCard("handCom2", 1);
            this.showOneCard("handCom3", 2);
            console.log("new cards added to hand");
        } else {
            this.showOneCard("handPl1", 0);
            this.showOneCard("handPl2", 1);
            this.showOneCard("handPl3", 2);
            console.log("new cards added to hand");

        }

    }
}



function makeaDeck() {
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

    console.log("deck was made successfully");
    return deckOne;
}


function setUpGame() {
    players = [];
    var playerDeck = makeaDeck();
    var computerDeck = makeaDeck();
    var playerField = new Field(playerDeck);
    var computerField = new Field(computerDeck);

    var player1 = new Player("nanter", playerField,true);
    var playerCom = new Player("com", computerField,false);
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
playerOne.displayLP();
playerCom.displayCards();
playerCom.displayLP();
runGame();

function checkLifePoints() {
    if(playerOne.lifepoints==0 && playerCom.lifepoints==0){
        console.log("its a draw");
    }else if(playerOne.lifepoints==0){
        console.log("Com Won The Battle");
    }else if(playerCom.lifepoints==0){
        console.log("You Won The Battle");
    }else{
        console.log("game goes on!");
    }
}
function reDraw(player) {
    var lengthOfArray=player.field.hand.length;
    console.log(lengthOfArray+" length of hand");
    for(var i=0;i<lengthOfArray;i++){
        if(player.field.hand[0]===undefined || player.field.hand[0]===null){
            console.log("empty slot");
        }else{
            console.log(player.field.hand[0].name+" returned to deck.");
            player.field.deck.push(player.field.hand.splice(0,1)[0]);

        }
    }
    player.field.shuffledeck();
    console.log("6");
    player.displayCards();
    console.log("7");
    console.log("redraw for"+player.name+ "happened");
}
function runGame() {
    checkLifePoints();
    console.log("1");
    reDraw(playerOne);
    console.log("2");
    reDraw(playerCom);
    console.log("3");
    makeMove();
    makeBattle();
    switchTurns();
}

function makeClicker(clicked_id) {
    var theFunctionToReturn;
    if(clicked_id==="handPl1"){
        theFunctionToReturn=function () {
            console.log(playerOne.field.hand[0].name);
            var toAdd=playerOne.field.hand.splice(0,1);
            playerOne.field.monsters.push(toAdd[0]);
            console.log(playerOne.field.hand[0].name);
            console.log(toAdd[0].name);
            playerOne.showOneCard("mPl1", 0);
        }
    }else if (clicked_id==="handPl2"){
        theFunctionToReturn=function () {
            console.log(playerOne.field.hand[1].name);
            var toAdd=playerOne.field.hand.splice(1,1);
            playerOne.field.monsters.push(toAdd[0]);
            console.log(playerOne.field.hand[1].name);
            console.log(toAdd[0].name);
            playerOne.showOneCard("mPl1", 1);
        }

    }else if (clicked_id==="handPl3"){
        theFunctionToReturn=function () {
            console.log(playerOne.field.hand[2].name);
            var toAdd=playerOne.field.hand.splice(2,1);
            playerOne.field.monsters.push(toAdd[0]);
            console.log(playerOne.field.hand[2].name);
            console.log(toAdd[0].name);
            playerOne.showOneCard("mPl1", 2);
        }

    }else{
        theFunctionToReturn=function () {
            console.log("empty click function");
        }
    }
    return theFunctionToReturn;
}
function clickHandPlayer(eventO) {
    console.log("clicked: "+eventO);
    if(playerOne.buttonsActive){

        var clicker=makeClicker(eventO);

        clicker();
        playerOne.buttonsActive=false;
        playerCom.buttonsActive=true;
    }

}
