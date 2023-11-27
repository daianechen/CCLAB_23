console.log("js is linked!");

let backgroundImage;
let karateChop;
let readyToChop = true;

let fruit1;

//load sounds
function preload(){
    karateChop= loadSound("sounds/beat.mp3"); //karate chop sound wasn't working so I linked something else

}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    
}

function draw(){
    background(0);
  
    fruit1 = new Fruit(width/2, height/2);

    //distance between current mouse position and mouse position in previous frame

        // let distance= dist(pmouseX, pmouseY, mouseX, mouseY);
        // if (distance > 50 && readyToChop == true){
        //     karateChop.play ();
        //     readyToChop = false;
        // } else if (distance <10){
        //     readyToChop= true;
        // }
        // stroke(255)
        // line (pmouseX, pmouseY, mouseX, mouseY)
        // //circle (mouseX,mouseY, 5)

    // OR
    
    let distance= dist(pmouseX, pmouseY, mouseX, mouseY);

    if(mouseIsPressed ==true){
        if (distance > 30 && readyToChop == true){
            karateChop.play ();
            readyToChop = false;
        } else if (distance <10){
            readyToChop= true;
        }
        stroke(255)
        line (pmouseX, pmouseY, mouseX, mouseY)
        //circle (mouseX,mouseY, 5)
    }
    // fruit section
    fruit1.display();
}

function mousePressed(){
   // karateChop.play();
}

// image as a class
class Fruit{
    constructor(startX, startY){
    this.x= startX;
    this.y= startY; 
    }
   display(){
        push();
        translate(this.x, this.y);
        circle (0, 0, 50)

        pop();
        }

}