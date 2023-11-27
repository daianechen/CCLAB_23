console.log("js is linked!");

let atoms = [];
let numAtoms = 3;



let fruitImages = [];




function preload(){
    //let img= loadImage(IMAGE_PATH);
    for(let i= 0; i<3; i++){
        let path= "images/fruit" + i + "png";
        console.log(path);
        fruitImages[i] = loadImage(path);
    }
}





function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for(let i = 0; i < numAtoms; i++){
        atoms.push( new Atom() )
    }
    console.log(atoms);

    rectMode(CENTER);

}

function draw(){
    background(0);

    if(random()<0.02){
        atoms.push( new Atom() )
    }   
    for(let i = 0; i < atoms.length; i++){
        // console.log("i is ", i);

    for (let i=atoms.length-1; i>=0; i--){
        let currentAtom = atoms[i];
        if (currentAtom.isOncanvas == false){
            atoms.splice(i,1);
    }
    }

    fill (255);
    text()

        currentAtom.display();
        currentAtom.fly();
        currentAtom.checkIfOnCanvas();
        // currentAtom.checkIfTouched(mouseX, mouseY);
        
        currentAtom.isTouched = false;
    
        for(let j = 0; j < atoms.length; j++){
            if(i != j && currentAtom.isTouched == false){
                // only check for OTHER atoms, 
                // not for the current atom itself
                console.log("    j is ", j);
                let otherAtom = atoms[j];
                let otherX = otherAtom.x;
                let otherY = otherAtom.y;
                console.log("    otherX:", otherX);
                console.log("    otherY:", otherY);
                currentAtom.checkIfTouched(otherX, otherY);
            }
            
        }
    }

}

class Atom{
    // constructor(startX, startY){
    constructor(){
        // this.x = width/2;
        this.y = random(0, height);
        this.size = 40;
        this.speed = random(4, 7);
        // this.direction = random(  -1, 1 ); // pick value between -1 and 1
        this.direction = random( [-1, 1] ); // picks either -1 or 1
       
        // after picked the direction
        // i can now define the initial this.x location
        if(this.direction == -1){
            // if flying left, start at the right
            this.x = width + 100;
        }else{
            // if flying right, start at the left
            this.x = -100;
        }

        this.isTouched = false;


    }
display(){
        push();
        translate(this.x, this.y);

        if(this.isTouched == true){
            fill("red");
        }else{
            fill(255)
        }

        // rememeber we switched to rectMode(CENTER)
        // will be drawn from its center and right 
        // on top of the atom's this.x, this.y
        rect(0, 0, this.size, this.size);

        push();
             scale(0.15);
             image(this.img, -this.img.width/2, -this.img.height/2);
        pop();

        // helper dot:
        fill("red");
        circle(0, 0, 5);
        pop();
    }
fly(){
        // this.x changes by atom's speed 
        // with regards to its direction:
        this.x += this.speed*this.direction //add or subtract from it 

}
checkIfTouched(otherX, otherY){
    // bigger than left edge, smaller than right edge      bigger than upper edge, smaller than lower edge 
    let leftEdge = this.x - this.size/2;
    let rightEdge = this.x + this.size/2;
    let upperEdge = this.y - this.size/2;
    let lowerEdge = this.y + this.size/2;

    // check if the x and y pair (otherX and otherY) that 
    // was passed in to this function
    // is colliding with this atom:
    if(otherX > leftEdge && otherX < rightEdge && otherY > upperEdge && otherY < lowerEdge){
        // if all four conditions are met, a collision occurred 
        this.isTouched = true;
    }else{
        this.isTouched = false;
    }
}

checkIfOnCanvas(){
    if(this.x <-500 || this.x > width+500)
    this.isoncanvas= 500

}

}
