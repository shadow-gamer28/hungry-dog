//Create variables here
var dog, happydog;
var feed, add;
var Feedtime;
var lastFed;
var foodobject;

var database;
var foodS, foodStock, position;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png")
}

function setup() {
	createCanvas(800, 500);
  
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.4;

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readPosition, showError);
  feed = createButton("FEED DOG")
  feed.position(900,60)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,60)
  add.mousePressed(AddFood)
  
}


function draw() {  
  background(46, 139, 87);
  console.log("display food")
  foodobject.display()
  feedTime = database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill(255,255,254);
 textSize(15);
   if(lastFed>=12){
     text("LastFeed : "+ lastFed%12 + " PM", 150,30);
   }else if(lastFed==0) {
     text("Last Feed : 12 AM", 150,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 150,30)
   }

drawSprites();
}

function readPosition(data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS)
}

function showError(){
  console.log("Error in writing to the database");
}

function AddFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage(dogHappy)
  if(foodobject.getFoodStock()<= 0){
    foodobject.updateFoodStock(foodobject.getFoodStock()*0)
  }else{
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  }
  
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }




