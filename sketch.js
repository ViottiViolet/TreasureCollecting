var path,boy,cash,diamonds,jwellery,sword, gameover;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gamestate, play, end;
play = 1;
end = 0;
gamestate = play;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameover = createSprite(200, 200, 20, 20);
gameover.addImage("end", endImg);
gameover.scale = 0.7;
gameover.visible = false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gamestate == play) {

    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }

      createCash();
      createDiamonds();
      createJwellery();
      createSword();

      if (cashG.isTouching(boy)) {
        cashG.destroyEach();
        treasureCollection += 100;
      }
      else if (diamondsG.isTouching(boy)) {
        diamondsG.destroyEach();
        treasureCollection += 200;

      }else if(jwelleryG.isTouching(boy)) {
        jwelleryG.destroyEach();
        treasureCollection += 50;
      }
       else{
        if(swordGroup.isTouching(boy)) {
          swordGroup.destroyEach();
          gamestate = end;
      }
    }

  }
  
  
  if(gamestate == end) {
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    path.velocityY = 0;
    
    gameover.visible = true;
  }

    drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.1;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.2;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.2;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
