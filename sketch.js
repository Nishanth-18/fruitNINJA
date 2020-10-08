// CREATING GAME STSTES
var PLAY=1;
 var END=0;
var gameState=1;

// CREATING VARIABLES FOR DIFFRENT OBJECTS IN THE GAME 
var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;

// CRAETING VARIABLES FOR ADDING IMAGES FOR DIFFRENT OBJECTS
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage

//  CREATING VARIABLES FOR POSITION OF THE FRUITS
var position;

// CREATING SOUND FOR THE GAME
var gameoverSound;
var swordSound;

function preload()
{
  // LOADING IMAGE FOR SWORD
  swordImage = loadImage("sword.png");
  
  // LOADING IMAGE FOR MONSTER
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  // LOADING IMAGE FOR FRUITS
  fruit1 = loadImage("fruit1.png");
   fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
   fruit4 = loadImage("fruit4.png");
  
  // LOADING IMAGES FOR THE GAMEOVER 
  gameOverImage = loadImage("gameover.png");
  
  // LOADING SOUNDS
  gameoverSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");
  
}


function setup() 
{
  createCanvas(600, 600);
  
  // CREATING SWORD
   sword=createSprite(40,200,20,20);
    sword.addImage(swordImage);
   sword.scale=0.7 
  
  // SETTING COLLIDER FOR SWORD
  sword.setCollider("rectangle",0,0,40,40);

  // MAKING SCORE VARIABLE
  score=0;
  
  // MAKING GROUP VARIABLE FOR FRUIT & ENEMY GROUP
  fruitGroup=createGroup();
   enemyGroup=createGroup();
  
}


function draw() 
{
  background("lightblue");
  
  // CREATING GAMESTATE PLAY & END
  if(gameState===PLAY)  
  {    
   // CALLING ENEMY AND FRUITS FUNCTION
   fruits();
    Enemy();
    
   // MAKING THE SWORD MOVE WITH MOUSE
   sword.y=World.mouseY;
    sword.x=World.mouseX;
  
      // INCREASING THE SCORE IF THE SWORD IS TOUCHING THE FRUITS
      if(fruitGroup.isTouching(sword))
    {
      fruitGroup.destroyEach();
       score=score+2;
      swordSound.play();
    }
        else
     {
        // MAKING THE GAME TO END IF THE SWORD IS TOUCHING ENEMY
        if(enemyGroup.isTouching(sword))
       {
         gameState=END;
        // MAKING THE FRUIT & MONSTER DISAPPERAR WHEN THEY TOUCH EACH OTHER
         fruitGroup.destroyEach();
          enemyGroup.destroyEach();
         
         fruitGroup.setVelocityXEach(0);
          enemyGroup.setVelocityXEach(0);
        
         // CHANGE THE ANIMATION OF THE SWORD
         sword.addImage(gameOverImage);
         
         // RESETING THE SWORD
         sword.x=300;
          sword.y=300;
         sword.scale=2.5
         
         gameoverSound.play();
       }
     }
  }
  
  drawSprites();
  
  //DISPLAYING THE SCORE
  text("Score : "+ score,300,30);
}


function Enemy()
{
  if(World.frameCount%200===0)
  {
    monster=createSprite(400,200,20,20);
    
    // ADDING IMAGE FOR MONSTER
     monster.addAnimation("moving", monsterImage);
    
    // MAKING THE MONSTER TO COME RANDOMLY
    monster.y=Math.round(random(100,300));
    
    // SETTING SPEED FOR THE MONSTER
     monster.velocityX=-(8+score/10);
    
    // SETTING LIFETIME FOR MONSTER
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits()
{
  if(World.frameCount%80===0)
  {
    fruit=createSprite(400,200,20,20);
     fruit.scale=0.2;
    r=Math.round(random(1,4));
    
    if (r == 1) 
    {
      fruit.addImage(fruit1);
    } 
    else if (r == 2) 
    {
      fruit.addImage(fruit2);
    }
    
    else if (r == 3) 
    {
      fruit.addImage(fruit3);
    }
    
    else 
    {
      fruit.addImage(fruit4);
    }
    
    // MAKING FRUIT TO COME RADOMLY
    fruit.y=Math.round(random(50,340));
    
    // CREATING THE SPEED FOR THE FRUITS
    //fruit.velocityX=-7;
    
    // SETTING LIFETIME FOR THE FRUITS
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
    position = Math.round(random(1,2))
    if(position === 1)
      {fruit.x=600;
       fruit.velocityX=-(7+score/4);
      }
    if(position === 2)
    { fruit.x=0;
      fruit.velocityX=(7+score/4);
     }
  }
}

