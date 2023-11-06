let numDroplets = 1;
let droplets = [];
let backgroundHue;

function setup() {
  let canvas = createCanvas(600, 600);
  noCursor();

  for (let i = 0; i < numDroplets; i++) {
    droplets[i] = new Droplet(mouseX, mouseY);
  }
}

function draw() {
  //background(188, 239, 247);
  background(204, 229, 255);

  if (mouseIsPressed === true) {
    for (let i = 0; i < numDroplets; i++) {
      droplets.push(new Droplet(mouseX, mouseY));
    }
  }
  for (let i = 0; i < droplets.length; i++) {
    let p = droplets[i];
    p.update();
    p.display();
  }
  for (let i = droplets.length - 1; i >= 0; i--) {
    if (droplets[i].onCanvas == false) {
      droplets.splice(i, 1);
    }
  }
  if (droplets.length > 20) {
    let index = 0;

    for (let i = 0; i < droplets.length - 20; i++) {
      droplets.splice(index, 1);
    }
  }
  drawCloud(mouseX, mouseY);
  Clouds();
}

class Droplet {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(0.3, 1);
    this.speedX = random(-15, 15);
    this.speedY = random(-8, 16);
    this.hue = random(0, 188);
    this.onCanvas = true;
  }
  checkOutOfCanvas() {
    if (this.y > height) {
      this.onCanvas = false;
    }
    if (this.x > width) {
      this.onCanvas = false;
    }
    if (this.y < height) {
      this.onCanvas = false;
    }
    if (this.x < width) {
      this.onCanvas = false;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY = this.speedY * 0.7 + random(2, 2);
    this.speedX = this.speedX * 0.9;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    fill(38, this.hue, 189);
    noStroke();
    triangle(30, 72, 58, 10, 85, 72);
    circle(58, 80, 56);
    pop();
  }
}

function drawCloud(xPos, yPos) {
  x = xPos;
  y = yPos;
  push();
  translate(x, y);
  colorMode(RGB);
  fill(244);
  noStroke();
  ellipse(50, 50, 60, 60);
  ellipse(80, 50, 60, 60);
  ellipse(110, 50, 60, 60);
  ellipse(65, 70, 60, 60);
  ellipse(95, 70, 60, 60);
  ellipse(50, 80, 60, 60);
  ellipse(80, 80, 60, 60);
  ellipse(110, 80, 60, 60);
  ellipse(130, 60, 60, 60);
  ellipse(20, 60, 60, 60);
  pop();
}

function Clouds() {
  push();
  //fill(220,223,220);
  fill(244);
  noStroke();
  ellipse(50, 50, 60, 60);
  ellipse(80, 50, 60, 60);
  ellipse(110, 50, 60, 60);
  ellipse(65, 70, 60, 60);
  ellipse(95, 70, 60, 60);
  ellipse(50, 80, 60, 60);
  ellipse(80, 80, 60, 60);
  ellipse(110, 80, 60, 60);
  ellipse(130, 60, 60, 60);
  ellipse(20, 60, 60, 60);
  
  fill(244);
  ellipse(240, 50, 60, 60);
  ellipse(270, 50, 60, 60);
  ellipse(300, 50, 60, 60);
  ellipse(255, 70, 60, 60);
  ellipse(285, 70, 60, 60);
  ellipse(240, 80, 60, 60);
  ellipse(270, 80, 60, 60);
  ellipse(300, 80, 60, 60);
  ellipse(320, 60, 60, 60);
  ellipse(210, 60, 60, 60);
  
  ellipse(430, 50, 60, 60);
  ellipse(460, 50, 60, 60);
  ellipse(490, 50, 60, 60);
  ellipse(445, 70, 60, 60);
  ellipse(475, 70, 60, 60);
  ellipse(430, 80, 60, 60);
  ellipse(460, 80, 60, 60);
  ellipse(490, 80, 60, 60);
  ellipse(510, 60, 60, 60);
  ellipse(400, 60, 60, 60);
  
  pop();
}