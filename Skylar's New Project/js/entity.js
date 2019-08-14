var Direction = {
    Up: 1,
    Right: 2,
    Down: 3,
    Left: 4
};

function Entity(x, y, w, h, s, c, d) {
    this.x = x; 
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
    this.c = c;
    this.d = [d];
}

Entity.prototype.Update = function () {
    if (this.d.indexOf(Direction.Up) > -1)
        this.y -= this.s;
    if (this.d.indexOf(Direction.Down) > -1)
        this.y += this.s;
    if (this.d.indexOf(Direction.Right) > -1)
        this.x += this.s;
    if (this.d.indexOf(Direction.Left) > -1)
        this.x -= this.s;
};

Entity.prototype.Draw = function (Canvas) {
    Canvas.fillStyle = this.c;
    Canvas.fillRect(this.x, this.y, this.w, this.h); 
};