let faces = [];
let numFaces = 4;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for (let i = 0; i < numFaces; i++) {
        faces.push(new Face(random(width), random(height)));
    }

}

function draw() {
    background(180);

    for (let i = 0; i < faces.length; i++) {
        faces[i].update();
        faces[i].display();
    }

    // // all face turn angry at the same time
    // if (frameCount > 100){
    //     for (let i=0; i <faces.length; i++){
    //         faces [i].turnAngry();
    //     }
    // }

}

class Face {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.offsetX = 0;

        this.angleForSineRadians = random (0, 2*PI)

        //list of possible color
        this.normalColor= color (220,250,90);
        this.angryColor= color (255,90,29);

        //initial color
        this.c = this.normalColor;

        this.speed = random(0.01, 0.1);

        this.age= 0
        this.ageToTurnAngry = random (15,55);

    }
    update() {
        this.offsetX = map(sin(this.angleForSineRadians), -1, 1, -20, 20);

        this.angleForSineRadians += this.speed

        this.age+=0.2;

        //make face turn angry once turns 22
        if(this.age > 22){
            this.turnAngry()
        }
    }
    display() {
        push();
        translate(this.x + this.offsetX, this.y);

        noStroke();
        fill(this.c);
        circle(0, 0, 50);
        fill(0);
        circle(-10, -10, 5)
        circle(10, -10, 5)
        ellipse(0, 10, 8, 9)

        text(round(this.age), 0,0) //can also you floor instead of round

        pop();
    }
    turnAngry(){
        this.c= this.angryColor;
    }
    // turnNormal(){
    //     this.c= this.normalColor;
    // }

}

function mousePressed(){
    //everybody angry :(
// for (let i=0, i< faces.length; i++){
   // faces[i].turnAngry();
   //} OR

    //faces.push(new Face(random(width), random(height)));
    //faces.push(newFace (mouseX, mouseY))



    
}


