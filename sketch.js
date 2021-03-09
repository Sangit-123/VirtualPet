var dog,happyDog
var database
var foodS,foodStock

function preload()
{
	dogImage=loadImage("Dog.png")
  happyImage=loadImage("happydog.png")
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,250,10,10)
  dog.scale=.3
  dog.addImage(dogImage)
  database=firebase.database()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock,writeStock)
}


function draw() {  
  background(46,139,87)
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyImage)
  }
  drawSprites();
  textSize(17)
  stroke(5) 
  fill("white")
  text("Note : Press UP_ARROW Key to feed Drago Milk!",50,25)
  textSize(17)
  text("Food Remaining : " + foodS ,100,100)  

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }  

  database.ref('/').update({
    Food:x
  })
   
}
