var ctx;
var player;
var enemies = [];
var keyPress = { };

function Tick() {
    Update();
    Draw();
};

function Update() {
    player.Update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].Update();
    }
};

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPress[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPress[event.key] = false;
}

function Draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    player.Draw(ctx);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].Draw(ctx);
    };
        if (keyPress.w) {
            player.y -= player.s;
        } else if (keyPress.s) {
            player.y += player.s;
        }
        if (keyPress.a) {
            player.x -= player.s;
        } else if (keyPress.d) {
            player.x += player.s;
        }
    
};


function StartEngine(CanvasId) {
    var canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    ResizeCanvas();
    window.onresize = ResizeCanvas;


    // Instantiate Player
    var player_width = 20;
    var player_height = 20;
    player = new Entity(
        (ctx.canvas.width / 2) - (player_width / 2),
        (ctx.canvas.height / 2) - (player_height / 2),
        player_width,
        player_height,
        3,
        "green",
        null
    );
    // For Testing Purposes - Insert 10 Random Enemies
    for (var i = 0; i < 10; i++) {
        InsertEnemy();
    }
    setInterval(Tick, 1000 / 60);
};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
};

function ResizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function InsertEnemy() {
    var _direction = GetRandomNumber(1, 4);
    var _width = GetRandomNumber(10, 30);
    var _height = GetRandomNumber(10, 30);
    var _speed = GetRandomNumber(1, 5);
    var _x, _y;

    if (_direction == Direction.Up) {
        _y = ctx.canvas.height;
        _x = GetRandomNumber(1, ctx.canvas.width - _width);
    }
    else if (_direction == Direction.Down) {
        _y = -_height;
        _x = GetRandomNumber(1, ctx.canvas.width - _width);
    }
    else if (_direction == Direction.Left) {
        _x = ctx.canvas.width;
        _y = GetRandomNumber(1, ctx.canvas.height - _height);
    }
    else if (_direction == Direction.Right) {
        _x = -_width;
        _y = GetRandomNumber(1, ctx.canvas.height - _height);
    }

    enemies.push(new Entity(_x, _y, _width, _height, _speed, "red", _direction));
}
