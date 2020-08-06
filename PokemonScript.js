window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  var restart = document.getElementById("restart");
  var ctx = canvas.getContext('2d');
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  canvas.height = GAME_HEIGHT;
  canvas.width = GAME_WIDTH;
  ctx.fillStyle = "green"

  var isMoving = false;

  var origgame = {
    background: {
      x: 0, y: 0, h: GAME_HEIGHT, w: GAME_WIDTH, imgSrc: "background.jpg", speedX: 0, speedY: 0
    },
    player: {
      x: 100, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"pika.png", speedX: 5, speedY: 0
    },
    enemy: {
      x: 300, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"gengar.png", speedX: 0, speedY: 5
    },
    enemy1: {
      x: 600, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"drowsy.png", speedX: 0, speedY: 7
    },
    enemy2: {
      x: 900, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"gengar.png", speedX: 0, speedY: 9
    },
    goal: {
      x: 1200, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"ball.png", speedX: 0, speedY: 0
    },
    over: false
  }
  
   var game = JSON.parse(JSON.stringify(origgame));

  canvas.addEventListener('mousedown', function(){
    isMoving = true;
  });

  canvas.addEventListener('mouseup', function(){
    isMoving = false;
  });

  var isCollision = function(player, obj){
    var case1 = false, case2 = false;
    if(obj.x < player.x + player.w && obj.x + obj.w > player.x){
      case1 = true;
    }
    if(obj.y < player.y + player.h && obj.y + obj.h > player.y){
      case2 = true;
    }
    var collisionState =  case1 && case2;
    if(collisionState && obj == game.goal){
      window.alert("Congratulations....!!!!  You Won the Game..");
    } else if(collisionState){
      window.alert("Ohoooo..!!! Game Over...");
    }
    return collisionState
  }

  var checkCollisions = function(){
    var enemyCollision = isCollision(game.player, game.enemy);
    var enemy1Collision = isCollision(game.player, game.enemy1);
    var enemy2Collision = isCollision(game.player, game.enemy2);
    var goalCollision = isCollision(game.player, game.goal);
    return enemyCollision || enemy1Collision || enemy2Collision || goalCollision
  }

  var updateObj = function(obj){
    obj.y += obj.speedY;
    if(obj.y > GAME_HEIGHT || obj.y < 0){
      obj.speedY *= -1;
    }
    if(isMoving){
      obj.x -= game.player.speedX;
    }
  }

  var update = function(){
    if(checkCollisions()){
      game.over = true;
    } else {
      updateObj(game.enemy);
      updateObj(game.enemy1);
      updateObj(game.enemy2);
      updateObj(game.goal);
    }
  }

  var drawObj = function(ctx, obj){
    var image = new Image();
    image.src = obj.imgSrc;
    image.onload = function(){
      ctx.drawImage(image, obj.x, obj.y, obj.w, obj.h);
    }
  }

  var draw = function(){
    drawObj(ctx, game.background);
    drawObj(ctx, game.player);
    drawObj(ctx, game.enemy);
    drawObj(ctx, game.enemy1);
    drawObj(ctx, game.enemy2);
    drawObj(ctx, game.goal);
  }
  
   restart.onclick = function(){
    if(game.over){
      game = JSON.parse(JSON.stringify(origgame));
      render();
    }
  }

  var render = function(){
    draw();
    update();
    if(!game.over){
      window.requestAnimationFrame(render);
    }
  }

  render();

}
