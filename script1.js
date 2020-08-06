window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  var start = document.getElementById("start");
  var stop = document.getElementById("stop");
  var restart = document.getElementById("restart");

  const GAME_HEIGHT = 400;
  const GAME_WIDTH = 400;
  canvas.height = GAME_HEIGHT;
  canvas.width = GAME_WIDTH;
  var ctx = canvas.getContext('2d');

  var origgame = {
    player: {x: 10, y: 200, w: 20, h:20, color: 'blue', speedX: 4, speedY: 0},
    enemy: {x: GAME_WIDTH - 150, y: 200, w: 20, h:20, color: 'red', speedX: 0, speedY: 10},
    goal: {x: GAME_WIDTH - 50, y: 200, w: 20, h:20, color: 'yellow', speedX: 0, speedY: 0},
    over: false
  }

  var game = JSON.parse(JSON.stringify(origgame));

  var isCollision = function(player, enemy){
    var case1 = false, case2 = false;
    if(enemy.x < player.x + player.w && enemy.x + enemy.w > player.x){
      case1 = true;
    }
    if(enemy.y < player.y + player.h && enemy.y + enemy.h > player.y){
      case2 = true;
    }
    return case1 && case2;
  }

  var updateObj = function(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    if(obj.x > GAME_WIDTH || obj.x < 0){
      obj.speedX *= -1;
    }
    if(obj.y > GAME_HEIGHT || obj.y < 0){
      obj.speedY *= -1;
    }
  }

  var update = function(){
    if(isCollision(game.player, game.enemy)){
      game.over = true;
    } else {
      updateObj(game.player);
      updateObj(game.enemy);
    }
  }

  var drawObj = function(ctx, obj){
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  }

  var draw = function(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawObj(ctx, game.player);
    drawObj(ctx, game.enemy);
    drawObj(ctx, game.goal);
  }

  start.onclick = function(){
    game.over = false;
    render();
  }

  stop.onclick = function(){
    game.over = true;
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