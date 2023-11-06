let instanceOfTaxi;



function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    // create instance of taxi class 
    // and stores it in variable "instanceOfTaxi"
    instanceOfTaxi = new Taxi(100, 200, 1);
    instanceOfTaxi2 = new Taxi(100, 200, 1); 
}

function draw() {
  background(120, 190, 250);

  instanceOfTaxi.display();
  instanceOfTaxi.update();


}

class Taxi {
  // every class MUST have a constructor function
  // it's call automatically when instances oif the class
  // are created
  constructor(startX, startY, s){
    // inside, we list and define the class's properties 
    this.x = startX;
    this.y = startY; 
    this.scaleFactor = s;
    this.w = 100; //width
    this.h = 30;
    this.speed = random(-2, 2);
    this.col = [120, 150, 90]; //r g b in array
    let randomNumber = random(0, 3);
    if(randomNumber<1){
       this.driver = "🦹";
     }else if(randomNumber<2){
       this.driver = "👨‍🔬";
     }else if(randomNumber<3){
       this.driver = "👩‍🎓";
     }

     this.sinInput = 0; // used to affect height of taxi
  }
  display(){
    // here we actually draw the thing using property value

    // always a good idea to 
    // use push translate pop
    // to make everything be drawn in reference
    // to the class's location
    push();
    translate(this.x, this.y);
    // different instances will have different scales
    scale(this.scaleFactor);

    this.drawDriver();
    
    //car
    fill(this.col[0], this.col[1], this.col[2]);
    rect(0, 0, this.w, this.h);
    
    //window
    fill(0, 20, 240, 60);
    rect(this.w/2-this.w/6, -this.w/3, this.w/3, this.w/3)

    pop();
  }
  drawDriver(){
    // in reference to objects translated origin
    textSize(35);
    textAlign(CENTER);
    text(this.driver, this.w*0.5, 0)
  }
  update(){
    // here we will change property values
    this.x = this.x + this.speed;

    // change height over time
    this.h = 30 + sin(this.sinInput)*10;
    this.sinInput += 0.03;

    this.reappear();
    
  }
  reappear(){
    if(this.x > width){
      // moving to right
      this.x = -this.w*this.scaleFactor;
    }else if(this.x < -this.w*this.scaleFactor){
      // moving to left
      this.x = width;
    } 
  }

}






