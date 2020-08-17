//Create variables here
var dog, happyDog, database, foodS, foodStock;
var button1, button2;
var fedTime, lastFed;
var foodObj;

function preload()
{
  
   milkBottle = loadImage("images/Milk.png");

  //load images here
  happyDogImg = loadImage("images/dogImg1.png")
  DogImg = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,350,50,50);
  dog.addImage(DogImg,"images/dogImg.png");
  dog.scale = 0.2;

  foodObj = new Food();
  //foodObj.addImage("images/Milk.png",milkBottle);

  button1 = createButton("Feed the Dog");
  button1.position(200,200)
  button1.mousePressed(feedDog);

  button2 = createButton("Add Food");
  button2.position(300,300);
  button2.mousePressed(addFood);

  database = firebase.database();

  database.ref('Food').on("value",readStock);
}


function draw() {  
  background(46,139,87)

 /*  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyDogImg,"images/dogImg1.png");
  }else{
    dog.addImage(DogImg,"images/dogImg.png")
  } */

  database.ref('FeedTime').on("value",function (data){
    lastFed = data.val();
  })

foodObj.display();
  drawSprites();
  //add styles here
  //text("Press up arrow to feed milk", 350, 700);
  textSize(20);
  fill(255,0,255);
  stroke(23,25,20);
  text("Milk: " + foodStock,50,10)
}

function readStock(data){
  foodStock = data.val();
  //console.log(foodStock);
  foodObj.updateFoodStock(foodStock);
}

function writeStock(x){

if(x <= 0){
  x = 0;
}else{
  x = x-1;
}

  database.ref('/').update({
    Food : x
  })
}

function addFood(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}

function feedDog(){
  dog.addImage(happyDogImg,"images/dogImg.png")
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  Feedtime : hour()
  })
}