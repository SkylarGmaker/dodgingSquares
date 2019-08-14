var ctx;
var player;
var enemies = [];
var gameOver = false;

function Tick() {
    Update();
    Draw();
}

function Update() {
    if (!gameOver)
        player.Update();

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].Update();
        if (player.Intersects(enemies[i]))
            gameOver = true;
    }
}

function Draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    player.Draw(ctx);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].Draw(ctx);
    }

    if (gameOver) {
        ctx.font = "40px Comic Sans MS";
        ctx.fillStyle = "purple";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
}

function StartEngine(CanvasId) {
    var canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    ResizeCanvas();
    window.onresize = ResizeCanvas;

    // Initialize KeyManager
    KeyManager.Initialize();

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
        null,
        false
    );
    // For Testing Purposes - Insert 10 Random Enemies
    for (var i = 0; i < 10; i++) {
        InsertEnemy();
    }
    setInterval(Tick, 1000 / 60);
}

function ResizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function InsertEnemy() {
    var _direction = GetRandomNumber(1, 4); // Get a random direction
    var _width = GetRandomNumber(10, 30); // Get a random width between 10 and 30 pixels
    var _height = GetRandomNumber(10, 30); // Get a random height between 10 and 30 pixels
    var _speed = GetRandomNumber(1, 5); // Get a random speed between 1 and 5 pixels (per tick)
    var _x, _y;

    // Based on which direction the enemy will be moving, we want to set the default x and y coordinates.
    // For example, an enemy moving up needs to start off-screen at the very bottom.  The y-coordinate can be random though.
    if (_direction === Direction.Up) {
        _y = ctx.canvas.height;
        _x = GetRandomNumber(1, ctx.canvas.width - _width);
    }
    else if (_direction === Direction.Down) {
        _y = -_height;
        _x = GetRandomNumber(1, ctx.canvas.width - _width);
    }
    else if (_direction === Direction.Left) {
        _x = ctx.canvas.width;
        _y = GetRandomNumber(1, ctx.canvas.height - _height);
    }
    else if (_direction === Direction.Right) {
        _x = -_width;
        _y = GetRandomNumber(1, ctx.canvas.height - _height);
    }

    // 'Push' the new enemy into the enemies array.
    enemies.push(new Entity(_x, _y, _width, _height, _speed, "red", _direction, true));
}
