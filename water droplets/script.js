
let NUM_OF_PARTICLES = 20 
let particles = [];
let backgroundHue;
//let cloud

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  colorMode (HSB)
  backgroundHue= random (0,360)

 //cloud = new cloud(mouseX, mouseY);
}

function draw() {
  background(backgroundHue, 10, 190);

  //cloud.display();
  if (mouseIsPressed === true){
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
  } 
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
  for (let i = particles.length-1; i >= 0; i--) {
    
    if(particles[i].onCanvas == false){
        particles.splice(i, 1);
    }
} 
  if (particles.length > 20) {
  let index = 0; 
  
  for(let i = 0; i < (particles.length - 20); i++) {
    particles.splice(index, 1);
  }
}

}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.size= random (.3,1)
    this.speedX= random (-15,15)
    this.speedY= random (-8,16)
  }
  
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY = this.speedY * .7 + random (2,2)
    this.speedX = this.speedX * .9
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(this.size)
    noStroke()
    triangle(30, 72, 58, 10, 85, 72);
    circle (58,80,56);

    pop();
  }
}

// class Cloud {
//   // constructor function
//   constructor(mouseX, mouseY) {
//     // properties: particle's characteristics
//     this.x = mouseX;
//     this.y = mouseY;
//   }
  
//   // methods (functions): particle's behaviors
//   update() {
//     // (add) 
//     this.x += this.speedX;
//     this.y += this.speedY;
//     this.speedY = this.speedY * .7 + random (2,2)
//     this.speedX = this.speedX * .9
//   }
//   display() {
//     // particle's appearance
//     push();
//     translate(this.x, this.y);
//     scale(this.size)
//     noStroke()
//     triangle(30, 72, 58, 10, 85, 72);
//     circle (58,80,56);

//     pop();
//   }
//}
