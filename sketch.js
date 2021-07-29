var foodGroup,cloudGroup,holeGroup,background,bunny,score;
var gameState,reset,edges;
var backgroundimg,bunnyimg,bunnyholeimg,bunnyhurtimg,carrotimg,cloudimg,bunny_eating,resetimg;
function preload(){
backgroundimg = loadImage("background.png")
bunnyimg = loadImage("running_ bunny.png")
bunnyholeimg = loadImage("bunny_hole.png")
carrotimg = loadImage("carrot.png")
cloudimg = loadImage("cute_cloud.png")
bunnyhurtimg = loadImage("bunny_hurt.png")
bunny_eating = loadImage("bunny.png")
resetimg = loadImage("play.png")
}
function setup(){
createCanvas(400,400);
 foodGroup = createGroup();  
 cloudGroup = createGroup();
 holeGroup = createGroup();
 background = createSprite(200,200,400,400);
background.addImage (backgroundimg);
background.velocityX = -2;
background.scale = 2;
background.x = background.width/2
 bunny = createSprite(50,365);
bunny.addImage(bunnyimg);
bunny.scale = 0.4;
bunny.setCollider("circle",0,0,100);
 score = 0;
 gameState = "play";
reset = createSprite(320,340,40,40);
reset.addImage(resetimg);
reset.scale = 0.2
reset.visible = false;

 edges = createEdgeSprites();
}
function draw() {
if(background.x <0){
background.x = 200;
}

if(gameState === "play"){
if(bunny.isTouching(foodGroup)){
score = score+5;
foodGroup.destroyEach();
bunny.addImage(bunny_eating);
}
if(bunny.isTouching(holeGroup)){
gameState = "end";
}
if((keyDown("space")||keyDown("UP_ARROW"))&& bunny.y > 300){
bunny.velocityY = -8;
bunny.addImage(bunnyimg);
gameState = "play";
}

spawncarrot();
spawnhole();
spawncloud();
}
else if(gameState === "end"){
score = 0;
bunny.addImage(bunnyhurtimg);
holeGroup.destroyEach(0);
foodGroup.destroyEach(0);
cloudGroup.destroyEach(0);
background.velocityX = 0;
reset.visible = true;
}
if(mousePressedOver(reset)){
gameState = "play";
bunny.addImage(bunnyimg);
spawncloud();
spawncarrot();
spawnhole();
reset.visible = false;
background.velocityX = -2;
}

bunny.velocityY = bunny.velocityY+ 0.5
bunny.collide(edges[3]);
drawSprites();
if(gameState === "end"){
textSize(25);
fill("black")
text("Game Over",140,200);
}
textSize(25);
fill("black");
text("score: "+score,150,30)
}
function spawncarrot() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    var carrot = createSprite(600,250,40,10);
    carrot.y = random(200,230);    
    carrot.velocityX = -5;
    
     //assign lifetime to the variable
    carrot.lifetime = 300;
    bunny.depth = carrot.depth + 1;
    
    //add image of carrot
     carrot.addImage(carrotimg);
    carrot.scale=0.2;
    
    //add each carrot to the group
    foodGroup.add(carrot);
    
  }
}
function spawncloud() {
  //write code here to spawn the cloud
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,250,40,10);
    cloud.y = random(50,100);    
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    //add image of cloud
     cloud.addImage(cloudimg);
    cloud.scale=0.15;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
    
  }
}
function spawnhole() {
  if(frameCount % 300 === 0) {
    var hole = createSprite(400,360,10,40);
    hole.velocityX = -6;
    hole.debug = true;
    hole.setCollider("circle",0,0,20)
    //add image to the hole
    hole.addImage(bunnyholeimg);
    hole.scale=0.5;
    
    //lifetime to the obstacle     
    hole.lifetime = 300;
    
    //add each hole to the group
    holeGroup.add(hole);
  }
}


  
