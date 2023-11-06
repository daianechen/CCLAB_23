console.log("js is linked!");

// //         egg 1 egg 2 egg 3
// let xArray = [40,120,290];
// let yArray = [140, 200, 90]

// let basket = [eggs, eggs, eggs];

let egg1;
let egg2;

let eggBasket = []

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    // egg1=  new Egg(random (width),random(height),random (0.3,1));
    // egg2=  new Egg(random (width),random(height),random (0.3,1));

    eggBasket [0]=  new Egg(random (width),random(height),random (0.3,1));
    eggBasket [1]=  new Egg(random (width),random(height),random (0.3,1));

    console.log[eggBasket]

    let newEgg = new Egg(random (width),random(height),random (0.3,1));
      eggBasket.push(newEgg);
    
}

function draw() {
    background(120, 90, 230);

    // egg1.display();
    // egg2.display();
    for (let i=0; i < eggBasket.length; i++){
        eggBasket[i].display();
    }

    // //drawShape(width/2, height/2);

    // for(let i= 0; i < xArray.length; i++){
    //     let xPos = xArray[i];
    //     let yPos = yArray[i];
    //     //drawShape(xPos, yPos)
    // }
}

// function drawShape(x, y){
//     push();
//     translate(x,y);

//         noStroke();
//         fill(255, 200);
//         arc(0, 0, 80, 80,  0,  PI);
//         arc(0, 0, 80, 130, PI, 2*PI);

//     pop();
// }

class Egg{
   constructor(startX, startY, scaleFactor){
       this.x= startX;
       this.y= startY;
       this.s= scaleFactor; //scale
   }
   display (){
    push();
    translate(this.x, this.y);
    scale(this.s);

    noStroke();
    fill(255, 200);
    arc(0, 0, 80, 80,  0,  PI);
    arc(0, 0, 80, 130, PI, 2*PI);
   
    pop();
   }
}