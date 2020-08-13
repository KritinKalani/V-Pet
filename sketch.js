//Create variables here
var dog, happyDog, database, foodS, foodStock;


function preload()
{
  //load images here
  happyDogImg = loadImage("images/dogImg1.png")
  DogImg = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,350,50,50);
  dog.addImage(DogImg,"images/dogImg.png");
  dog.scale = 0.2;

  database = firebase.database();

  database.ref('Food').on("value",readStock);
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyDogImg,"images/dogImg1.png");
  }else{
    dog.addImage(DogImg,"images/dogImg.png")
  }

  drawSprites();
  //add styles here
  text("Press up arrow to feed milk", 350, 700);
  textSize(20);
  fill(255,0,255);
  stroke(23,25,20);
  text("Milk: " + foodStock,50,10)

}

function readStock(data){
  foodStock = data.val();
  console.log(foodStock);
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



