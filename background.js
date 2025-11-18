(function () {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

  // canvas 全画面
  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";

  var particles = [];
  var pIndex = 0;
  var frameId = 0;

  function Dot(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    particles[pIndex] = this;
    this.id = pIndex++;
    this.life = 0;
    this.maxlife = 1000;
    this.degree = Math.random() * 360;
    this.size = Math.floor(Math.random() * 3) + 8; // 8~10
  }

  Dot.prototype.draw = function () {
    this.degree += 1;
    this.vx *= 0.99;
    this.vy *= 0.999;
    this.x += this.vx + Math.cos(this.degree * Math.PI / 600);
    this.y += this.vy;

    var w = this.size;
    var h = Math.cos(this.degree * Math.PI / 40) * this.size;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + w / 2, this.y + h);
    ctx.lineTo(this.x + w + w / 2, this.y + h);
    ctx.lineTo(this.x + w, this.y);
    ctx.closePath();
    ctx.fill();

    this.life++;
    if (this.life >= this.maxlife) {
      delete particles[this.id];
    }
  }

  // リサイズ対応
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frameId % 100 === 0) {
      var colors = ["#ED1A3D", "#FFEB3D", "#009688", "#0693e3"];
      for (var i = 0; i < colors.length; i++) {
        new Dot(Math.random() * canvas.width, getRandom(-100, -80), getRandom(-1, 1), getRandom(2, 4), colors[i]);
      }

    }


    for (var i in particles) {
      if (particles[i]) particles[i].draw();
    }

    frameId++;
    requestAnimationFrame(loop);
  }

  loop();

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

})();

