console.log("js is linked!");

let backgroundImage;
let karateChop;
let readyToChop = true;

// let fruit1;

let fruitBasket= []; //empty array that will hold fruits
let numFruits= 3; //initial number of fruits

let cherriesImage; // for every new image needs to put into preload to get it into a data

let fruitImageArray= []; //load multiple images into array
let numFruitImages =3; // food types


//load sounds
function preload(){
    karateChop= loadSound("sounds/beat.mp3"); //karate chop sound wasn't working so I linked something else
    backgroundImage= loadImage("images/gradient-bkg.png")
   
    cherriesImage= loadImage("images/fruit0.png")

    for(let i=0; i < numFruitsImages; i++){
        let path= "images/fruit"+ i+ "png"
        console.log(path);
        let img =loadImage(path);
        fruitImageArray.push(img);
    }
    console.log(fruitImageArray)
}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    // fruit1 = new Fruit(width/2, height/2, cherriesImage);
    for (let i=0; i< numFruits; i++){
        let single fruit
}}

function draw(){
    background(0,50);
    image(backgroundImage, 0, 0, 400, 400)
    
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
    // fruit1.display();
    fill (255)lengthtext(distan)

}

function mousePressed(){
   // karateChop.play();
}

// image as a class
// every fruit created that gets X and Y
class Fruit{
    constructor(startX, startY, fruitImg){
    this.x= startX;
    this.y= startY; 

    //assigns fruit image to its own 
    this.img= fruitImg 
    }
   display(){
        push();
        translate(this.x, this.y);
        noStroke();
        circle (0, 0, 50);

        image(this.img, -25, -25, 50, 50) //this puts the image where you want locaiton

        pop();
        }

}