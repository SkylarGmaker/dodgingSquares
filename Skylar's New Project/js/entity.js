var Direction = {
    Up: 1,
    Right: 2,
    Down: 3,
    Left: 4
};

function Entity(x, y, w, h, s, c, d, isAI) {
    this.x = x; 
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
    this.c = c;
    this.isAI = isAI;
    this.d = d;
}

Entity.prototype.Update = function () {
    if (this.isAI) {
        if (this.d === Direction.Up)
            this.y -= this.s;
        if (this.d === Direction.Down)
            this.y += this.s;
        if (this.d === Direction.Right)
            this.x += this.s;
        if (this.d === Direction.Left)
            this.x -= this.s;
    }
    else {
        if (KeyManager.IsKeyPressed("w"))
            this.y -= this.s;
        if (KeyManager.IsKeyPressed("s"))
            this.y += this.s;
        if (KeyManager.IsKeyPressed("d"))
            this.x += this.s;
        if (KeyManager.IsKeyPressed("a"))
            this.x -= this.s;
    }
};

Entity.prototype.Draw = function (Canvas) {
    Canvas.fillStyle = this.c;
    Canvas.fillRect(this.x, this.y, this.w, this.h); 
};