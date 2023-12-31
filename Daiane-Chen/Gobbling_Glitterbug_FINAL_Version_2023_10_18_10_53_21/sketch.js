let sequence = 0;
let textSizeValue = 20;

//Glitterbug Arrays
let glitterbugX = [150, 200, 254];
let glitterbugY = [100, 130, 360];
let foodEaten = [0, 0, 0]; // do this

let glitterbugspeedX = [5, 3, 6];
let glitterbugspeedY = [3, 5, 2];

let initialSizeOfArray = 3;
let colors;

//Food Arrays
let foodX = [];
let foodY = [];

//Rocket
let rocketX;
let rocketY;
let angle = 0;
let angleSpeed = 0.15;

//origin circles/glitterbug
let glitterbugDia = 10;
let growSpeed = 0.1;

//let circleBlue = (160, 204, 219);
let circleBlue = 0;
let blueIncrease = 15;

//sun color change + origin glitterbug
let sinInput = 0;
let angleMoon = 0;

// origin glitterbugs
let originX = [];
let originY = [];

// food eaten counter
let count = [0, 0, 0];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 3; i++) {
    originX.push(random(width));
    originY.push(random(height));
  }

  for (let i = 0; i < initialSizeOfArray; i++) {
    glitterbugX[i] = random(200, width - 200);
    glitterbugY[i] = random(200, height - 200);
  }
  rocketX = width / 2;
  rocketY = height / 2;
}

function draw() {
  // FIRST SCENE - ORIGIN OF GLITTERBUG
  if (sequence == 0) {
    background(0, 76, 153);
    drawStars(50);
    //draworganisms(50);
    // GlitterbugOrigin();

    textStyle(BOLD);
    textSize(32);
    fill(255);
    textAlign(CENTER);
    text("Watch the Glitterbugs come to life!", width / 2, 60);
    textAlign(CENTER);
    textSize(20);
    text("Press any key to continue to the next stage", width / 2, 90);

    for (let i = 0; i < glitterbugX.length; i++) {
      glitterbugMove(i);
      GlitterbugOrigin(glitterbugX[i], glitterbugY[i]);
    }
  }

  //SECOND SCENE - GLITTERBUGS & ENVIRONMENT
  else if (sequence == 1) {
    background(0, 76, 153);
    drawMoon();
    drawSun();
    drawStars(50);
    drawRocket();

    textStyle(BOLD);
    textSize(32);
    fill(255);
    text("Glitterbugs in its natural environment: Space!", width / 2, 100);
    textSize(25);
    text("Next: Press any key to feed the Glitterbugs", width / 2, height - 50);

    for (let i = 0; i < glitterbugX.length; i++) {
      glitterbugMove(i);

      let colors = [204, 229, 255];
      drawGlitterbug(
        glitterbugX[i],
        glitterbugY[i],
        colors[0],
        colors[1],
        colors[2]
      );
    }

    // THIRD SCENE - EATING
  } else if (sequence == 2) {
    background(0, 76, 153);
    drawStars(50);

    fill(255);
    text("The Glitterbugs are excited to eat!", width / 2, 60);
    textSize(20);
    text(
      "Press on the mouse to stamp space debris and see which Glitterbug can eat the most",
      width / 2,
      100
    );
    textSize(28);
    text("Press any key to restart the cycle!", width / 2, height - 70);
    // handle the eating
    // for (let i = 0; i < foodX.length; i++) {
    for (let i = foodX.length - 1; i >= 0; i--) {
      // loop backwards through food

      // for loop looping over glitterbugs
      // and for each checking the distance of foodX[i] and foodY[i]
      for (let j = 0; j < glitterbugX.length; j++) {
        if (dist(glitterbugX[j], glitterbugY[j], foodX[i], foodY[i]) <= 70) {
          foodX.splice(i, 1);
          foodY.splice(i, 1);
          count[j]++;
        }
      }

      // food is stamped
      if (foodX.length != 0 && foodY.length != 0) {
        fill("pink");
        // console.log(foodY);
        drawFood(foodX[i], foodY[i]);
      }
    }
    // console.log(count);
    // draw the bugs
    for (let i = 0; i < glitterbugX.length; i++) {
      glitterbugMove(i);

      let colors = [random(160), random(204), random(219)];
      drawGlitterbug(
        glitterbugX[i],
        glitterbugY[i],
        colors[0],
        colors[1],
        colors[2],
        count[i],
        false
      );
    }
  }
}

function keyPressed() {
  sequence++;
  if (sequence > 2) {
    background(255);
    sequence = 0;
  }
}

function mousePressed() {
  if (sequence == 2) {
    foodX.push(mouseX);
    foodY.push(mouseY);
  }
}
let scaleSize = 0.0001;

function drawGlitterbug(xPos, yPos, r, g, b, countfood) {
  //GLITTERBUG
  push();
  translate(xPos, yPos);

  if (sequence == 0) {
    scale(scaleSize);
  }
  //GLITTERBUG SHAPE
  //body
  fill(r, g, b);
  noStroke(170, 215, 229);
  // ellipse(150, 100, 180, 210);
  ellipse(0, 0, 180, 210); // x: -150 y: -100
  //body curves
  square(-100, -20, 95, 100, 55, 15, 55);
  square(-30, -20, 125, 100, 55, 55, 55);
  //black eyes
  fill(0);
  circle(-40, -30, 60);
  circle(40, -30, 60);
  //white circle inside eyes
  fill(255);
  ellipse(-40, -40, 20);
  ellipse(40, -40, 20);
  circle(-50, -15, 10);
  circle(50, -15, 10);
  //mouth
  fill("#FADBAC");
  arc(0, 0, 30, 30, 0, PI);
  //circle(40, 0, 10);
  circle(-10, 0, 10);
  circle(10, 0, 10);

  if (sequence == 2) {
    textSize(22);
    fill(r, g, b);
    textAlign(CENTER);
    text("Food eaten: " + countfood, 0, 140);
  }

  pop();

  if (scaleSize <= 1) {
    scaleSize += 0.0005;
  }
}

function glitterbugMove(index) {
  glitterbugX[index] += glitterbugspeedX[index];
  glitterbugY[index] += glitterbugspeedY[index];

  let xOfLeftEdge = glitterbugX[index] - 100;
  let xOfRightEdge = glitterbugX[index] - 30 + 125;
  if (xOfRightEdge >= width || xOfLeftEdge <= 0) {
    glitterbugspeedX[index] = -glitterbugspeedX[index];
  }
  // let yOfUpperEdge = ;
  // let yOfLowerEdge = ;
  if (glitterbugY[index] >= height || glitterbugY[index] <= 0) {
    glitterbugspeedY[index] = -glitterbugspeedY[index];
  }
}

function drawStars(numStars) {
  fill(255);
  noStroke();
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(2, 5);
    ellipse(x, y, size, size);
  }
}

function draworganisms(numOrganisms) {
  fill(0);
  noStroke();
  for (let i = 0; i < numOrganisms; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(-2, 5);
    ellipse(x, y, size, size);
    fill(204, 229, 255);
  }
}

function drawMoon() {
  let rotateAngle = radians(angleMoon);
  push();
  fill("grey");
  noStroke();
  translate(width / 2 - 100, height / 2 - 120);
  rotate(rotateAngle);
  ellipse(-150, -120, 80, 80);
  pop();

  angleMoon -= 2;
}

function drawSun(xPos, yPos) {
  let sineValue = sin(sinInput);
  sinInput = sinInput + 0.01;
  let b = map(sineValue, -1, 1, 0, 204);
  fill(255, 255, b);
  noStroke();
  circle(width / 2 - 100, height / 2 - 120, 200);
}

function drawRocket() {
  let rotateAngle = radians(angleMoon);

  push();
  translate(width / 2, height);
  rotate(rotateAngle);
  rocketX = 500;
  rocketY = 0;

  fill(255, 0, 0);
  triangle(
    rocketX,
    rocketY - 20,
    rocketX - 10,
    rocketY + 20,
    rocketX + 10,
    rocketY + 20
  );
  fill(100);
  rect(rocketX - 5, rocketY + 20, 10, 10);
  angle += angleSpeed;
  pop();
}

function drawFood(foodx, foody) {
  push();
  translate(foodx, foody);
  let vertices = [];
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i;
    let x = cos(angle) * random(15, 10);
    let y = sin(angle) * random(10, 20);
    vertices.push(createVector(x, y));
  }
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
  pop();
}

function GlitterbugOrigin(originX, originY, circleDia) {
  noStroke();
  push();
  translate(originX, originY);

  let sineValue = sin(sinInput);
  sinInput = sinInput + 0.01;
  drawGlitterbug(0, 0, 204, 229, 255, 0);

  pop();
}
