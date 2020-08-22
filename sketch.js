//Create variables here
var dog, happyDog, database, foodS, foodStock;
var button1, button2;
var fedTime, lastFed;
var foodObj;
var changeGameState, readGameState;
var bedroom, bathroom, garden;
var currentTime;

function preload() {

  milkBottle = loadImage("Milk.png");
  bedroom = loadImage("virtual pet images/Bed Room.png")
  bathroom = loadImage("virtual pet images/Wash Room.png")
  garden = loadImage("virtual pet images/Garden.png")


  //load images here
  happyDogImg = loadImage("dogImg1.png")
  DogImg = loadImage("dogImg.png")
  sadDog = loadImage("virtual pet images/Lazy.png")
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(400, 350, 50, 50);
  dog.addImage("SadDog", sadDog);
  dog.scale = 0.2;

  currentTime = hour();

  foodObj = new Food();
  //foodObj.addImage("images/Milk.png",milkBottle);

  button1 = createButton("Feed the Dog");
  button1.position(400, 100)
  button1.mousePressed(feedDog);

  button2 = createButton("Add Food");
  button2.position(500, 100);
  button2.mousePressed(addFood);

  database = firebase.database();

  database.ref('Food').on("value", readStock);

  readGameState = database.ref('gameState').on("value", function (data) {
    gameState = data.val();
  })
}


function draw() {
  background(46, 139, 87)

  /*  if(keyWentDown(UP_ARROW)){
     writeStock(foodStock);
     dog.addImage(happyDogImg,"images/dogImg1.png");
   }else{
     dog.addImage(DogImg,"images/dogImg.png")
   } */

  database.ref('Feedtime').on("value", function (data) {
    lastFed = data.val();
  })

  console.log("lcurrentTime === (lastFed + 1):  " +currentTime === (lastFed + 1))

  if (currentTime === (lastFed + 1)) {
    foodObj.garden();
  } else if (currentTime === (lastFed + 2)) {
    foodObj.bedroom();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    foodObj.washroom();
  } else {
    background(46, 139, 87)
    update("Hungry");
    foodObj.display();
  }

  if (gameState !== "Hungry") {
    button1.hide();
    button2.hide();
    dog.remove();
  } else {
    console.log("sad dog");
    button1.show();
    button2.show();
    dog.addImage("SadDog", sadDog)
  }

 // foodObj.display();
  drawSprites();
  //add styles here
  //text("Press up arrow to feed milk", 350, 700);
  textSize(20);
  fill(255, 0, 255);
  stroke(23, 25, 20);
  text("Milk: " + foodStock, 50, 10)
}

function readStock(data) {
  foodStock = data.val();
  //console.log(foodStock);
  foodObj.updateFoodStock(foodStock);
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}

function addFood() {
  foodStock++;
  database.ref('/').update({
    Food: foodStock
  })
}

function feedDog() {
  dog.addImage(happyDogImg, "dogImg1.png")
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    Feedtime: hour()
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}