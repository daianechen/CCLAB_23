let films = [];
let film1;
let filmRoll;

let waterSound
let beerSound 
let mountainSound

let startX = 0;
let startY = -50;

let clickCamera = false;
let counter = 0;

let speed = -3;

//let largeImage = false;

function preload() {
  for (let i = 1; i < 9; i++) {
    if (i == 1 || i == 3 || i == 4 || i == 6 || i == 8 ) {
      let filename = "library/film" + i + ".jpg";
      let film = loadImage(filename);
      let the_img= new normalImage(film)
      films.push(the_img);
    } 
    else if (i == 2) {
       // load sound
      waterSound = loadSound("library/water-waves.mp3");
      // load image
      let filename = "library/film" + i + ".jpg";
      let waterImg = loadImage(filename);
      let the_img= new waterImage(waterImg, waterSound)
      films.push(the_img);
    } else if (i == 5) {
       // load sound
      beerSound = loadSound("library/beer-clink.mp3");
      // load image
      let filename = "library/film" + i + ".jpg";
      let beerImg = loadImage(filename);
      let the_img= new beerImage(beerImg, beerSound)
      films.push(the_img);
    } else if (i == 7) {
       // load sound
      mountainSound = loadSound("library/birds-singing.mp3");
      // load image
      let filename = "library/film" + i + ".jpg";
      let mountainImg = loadImage(filename);
      let the_img= new mountainImage(mountainImg, mountainSound)
      films.push(the_img);
    }
  }
  
}

function setup() {
  //console.log(films)
  let cnv = createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  // cnv.parent("canvasWrapper");
  filmRoll = new FilmRoll(startX, startY, films);
}

function draw() {
  background(225);

  // red tint for film roll
  //tint(255, 0, 0);
  // image(films[0],150,windowHeight/5.5, 120, 150)

  // for (let i = 0; i < films.length; i++) { 
  //   films[i].display()
  // }
  filmRoll.update(speed);
  filmRoll.display();
  filmRoll.checkMouseEveryFrame(); //buttons change color

}

class FilmRoll {
  constructor(startX, startY, images) {
    this.x = startX;
    this.y = startY;
    this.images = images;

    // color for left button
    this.rl = 255;
    this.gl = 51;
    this.bl = 51;
    // color for right button
    this.rr = 255;
    this.gr = 51;
    this.br = 51;

    this.pictureWidth= (windowHeight*9/11-45)/5*4;
    this.pictureHeight = windowHeight*9/11-45;
    this.spacingWidth= windowHeight*25/36 //image adding border
    this.filmWidth= this.spacingWidth*7+this.pictureWidth+ (windowWidth/20)
    this.tinyMarginLeft = 5;
    this.marginTop = windowHeight / 5.5


    this.waterX = this.tinyMarginLeft+1*this.spacingWidth;
    this.waterY =  this.marginTop + this.pictureHeight*0.65;
    this.waterW = this.pictureWidth;
    this.waterH = this.pictureHeight*0.35;

    //rect(2906, 522, 2996-2906, 718-522); // rect for beer 

    this.beerX= this.tinyMarginLeft*56+4*this.spacingWidth;
    this.beerY= this.marginTop + this.pictureHeight*0.48;
    this.beerW= this.pictureWidth*.16
    this.beerH= this.pictureHeight*0.27;

    // rect(3942, 418, 4525-3942, 903-418); // rect for mountain 
    this.mountainX= this.tinyMarginLeft+6*this.spacingWidth;
    this.mountainY= this.marginTop + this.pictureHeight*0.33;
    this.mountainW= this.pictureWidth
    this.mountainH= this.pictureHeight*0.67;


    // this.speed= -3; //loop later
    //this.speed = speed
    this.soundNotPlay = true;
  }
  display() {
    push();
    translate(this.x, this.y);
    strokeWeight(2);
    fill(0);
    let filmX = -10;
    let filmY = windowHeight/7 -20;
    

    // background film roll
    rect(filmX, filmY, this.filmWidth, windowHeight*8/9);
    //windowHeight*6/7
    
    fill(255);
    for (let i = 0; i < this.images.length; i++) {
      rect(this.tinyMarginLeft + i * this.spacingWidth, this.marginTop,this.pictureWidth, windowHeight*9/11-45);
      films[i].display(this.tinyMarginLeft + i * this.spacingWidth, this.marginTop, this.pictureWidth, this.pictureHeight); //550
    }

    //top & bottom squares
    for (let i = 0; i < this.filmWidth/60; i++) {
      // rect(i * 60, 105, 15, 15);
      // rect(i * 60, 700, 15, 15);
      rect(i * 60, ((filmY +20)*7)/6.5 - 10, 15, 15);
      rect(i * 60, ((filmY +20)*7)- 35, 15, 15);
    }



    noFill();
    stroke(255);

    // rectangle location reference for sounds
    // rect(this.waterX, this.waterY, this.waterW, this.waterH); //rect for water

    // mountain reference
    // rect(3942, 418, 4525-3942, 903-418); // rect for mountain 
    // rect(this.mountainX, this.mountainY, this.mountainW, this.mountainH);
    
    //beer reference
    //rect(2906, 522, 2996-2906, 718-522); // rect for beer 
    // rect(this.beerX, this.beerY, this.beerW, this.beerH);

    // if (mXonFilm > 2906 && mXonFilm< 2996 && mYonFIlm > 522 && mYonFIlm<718){
    // if (mXonFilm > 3942 && mXonFilm< 4525 && mYonFIlm > 418 && mYonFIlm<903){

    // 570 && mXonFilm< 1068 && mYonFIlm > 500 && mYonFIlm<720 
    pop();
    this.drawCamera();
    this.drawButton();
    

    //text(this.x, 20, 20)
    
    
  }
  update(speed) {
    if (clickCamera == true) {
      this.x = this.x + speed;
      if (speed >= 0) {
        counter += speed;
      } else {
        counter += -speed;
      }
    }

    if (counter >= 500) {
      clickCamera = false;
      counter = 0;
    }
  }

  drawButton() {
    push();
    strokeWeight(1);

    //left button
    fill(this.rl, this.gl, this.bl);
    ellipse(width / 4 + 60, height - 30 / 2 - 20, 40, 40);
    fill("black");
    text("Back", width / 4 + 60, height - 30 / 2 - 20);

    //right button
    fill(this.rr, this.gr, this.br);
    ellipse((3 * width) / 4 - 60, height - 40 / 2 - 20, 40, 40);
    fill("black");
    text("Next", (3 * width) / 4 - 60, height - 40 / 2 - 20);
    pop();
  }

  buttonLogic(){
    let rightButtonDistance = dist(
      mouseX,
      mouseY,
      (3 * width) / 4 - 60,
      height - 40 / 2 - 20
    );

    if (rightButtonDistance < 20) {
      // in the area- neon green
      this.rr = 153;
      this.gr = 255;
      this.br = 204;
      if (mouseIsPressed) {
        this.rr = 204;
        this.gr = 255;
        this.br = 229;
        //light green
      }
    } else {
      // out of the area - grey
      this.rr = 218;
      this.gr = 218;
      this.br = 218;
    }

    let leftButtonDistance = dist(
      mouseX,
      mouseY,
      width / 4 + 60,
      height - 40 / 2 - 20
    );
    if (leftButtonDistance < 20) {
      // in the area - light pink
      this.rl = 255;
      this.gl = 204;
      this.bl = 255;
      if (mouseIsPressed) {
        this.rl = 255;
        this.gl = 153;
        this.bl = 255;
      }
    } else {
      // out of the area
      this.rl = 218;
      this.gl = 218;
      this.bl = 218;
    }
    function mousePressed() {
      let rightButtonDistance = dist(
        mouseX,
        mouseY,
        (3 * width) / 4 - 60,
        height - 40 / 2 - 20
      );
      let leftButtonDistance = dist(
        mouseX,
        mouseY,
        width / 4 + 60,
        height - 40 / 2 - 20
      );
      if (rightButtonDistance <= 20) {
        clickCamera = true;
        speed = -3;
      }
      if (leftButtonDistance <= 20) {
        clickCamera = true;
        speed = 3;
        //console.log(speed)
      }
      filmRoll.checkMouseOnPress();
    }


  }
  checkMouseEveryFrame() {
    this.buttonLogic();
    //console.log();
    //mouseover
    fill("red")
    // mouse in relation to window
    let mX = mouseX;
    let mY = mouseY
  //  text(mouseX + " , " + mouseY, mouseX, mouseY );
    // mouse in relation to film
    let mXonFilm = mouseX - this.x
    let mYonFIlm = mouseY - this.y;
    // text(mXonFilm + " , " + mYonFIlm, mouseX, mouseY+30 );
    // text("this.pictureWidth " + this.pictureWidth, mouseX, mouseY+60) 
    // text("this.pictureHeight " + this.pictureHeight, mouseX, mouseY+90) 
    // text("this.spacingWidth " + this.spacingWidth, mouseX, mouseY+120) 
    // text("this.filmWidth " + this.filmWidth, mouseX, mouseY+150) 

    let pictureWidth= (windowHeight*9/11-45)/5*4
    let spacingWidth= windowHeight*25/36

    if (mXonFilm > this.waterX && mXonFilm< this.waterX+this.waterW && mYonFIlm > this.waterY && mYonFIlm<this.waterY+this.waterH ) {
      // console.log(this.soundNotPlay)
      if(waterSound.isPlaying() == false){
        waterSound.play();

      }
      // this.soundNotPlay = false
    } else {
      waterSound.stop();

    }
    
    if (mXonFilm > this.mountainX && mXonFilm< this.mountainX+this.mountainW && mYonFIlm > this.mountainY && mYonFIlm< this.mountainY+this.mountainH){
      if(mountainSound.isPlaying() == false){
        mountainSound.play();
    } 
  }else{
      mountainSound.stop();
    }
  }

    // if (mXonFilm > 3942 && mXonFilm< 4525 && mYonFIlm > 418 && mYonFIlm<903){
  
  checkMouseOnPress() {
    this.buttonLogic();

    // mouseover
    fill("red")
    // mouse in relation to window/browser
    let mX = mouseX;
    let mY = mouseY
    //text(mouseX + " , " + mouseY, mouseX, mouseY );
    // mouse in relation to film
    let mXonFilm = mouseX - this.x
    let mYonFIlm = mouseY - this.y;
   // text(mXonFilm + " , " + mYonFIlm, mouseX, mouseY+30 );
    

    if (mXonFilm > this.beerX && mXonFilm< this.beerX+this.beerW && mYonFIlm > this.beerY && mYonFIlm<this.beerY+this.beerH){
      // if(beerSound.isPlaying() == false){
      beerSound.play();
    } else {
      beerSound.stop();
      // this.soundPlay = false;
    }

  // if (mXonFilm > 2906 && mXonFilm< 2996 && mYonFIlm > 522 && mYonFIlm<718){

  }
  
  drawCamera() {
    strokeWeight(10);
    fill("white")
   rect(windowWidth - 50, windowHeight/40, 100, windowHeight* 19/20, 55, 55); // side lens
    rect(windowWidth - 30, (windowHeight/40)- (windowHeight/50), 30, 40, 40, 40);
  }

}

function mousePressed() {
  let rightButtonDistance = dist(
    mouseX,
    mouseY,
    (3 * width) / 4 - 60,
    height - 40 / 2 - 20
  );
  let leftButtonDistance = dist(
    mouseX,
    mouseY,
    width / 4 + 60,
    height - 40 / 2 - 20
  );
  if (rightButtonDistance <= 20) {
    clickCamera = true;
    speed = -3;
  }
  if (leftButtonDistance <= 20) {
    clickCamera = true;
    speed = 3;
  }
  filmRoll.checkMouseOnPress();
}

class normalImage {
  constructor(image) {
    this.img = image;
  }
  display(x, y, w, h) {
    push();
    translate(x, y);
    image(this.img, 0, 0, w, h);
    pop();
  }
  checkClick(){
    
  }
}

class waterImage {
  constructor(waterImg,waterSound) {
    this.img = waterImg;
    this.sound= waterSound;
  }
  display(x, y, w, h) {
    push();
    translate(x, y);
    image(this.img, 0, 0, w, h);
    pop();
  }
  checkClick(){
    
  }
  //mousepressed();
}

class beerImage {
  constructor(beerImg,beerSound) {
    this.img = beerImg;
    this.sound= beerSound;
  }
  display(x, y, w, h) {
    push();
    translate(x, y);
    image(this.img, 0, 0, w, h);
    pop();
  }
  checkClick(){
    

  }
}

class mountainImage {
  constructor(mountainImg,mountainSound) {
    this.img = mountainImg;
    this.sound= mountainSound;
  }
  display(x, y, w, h) {
    push();
    translate(x, y);
    image(this.img, 0, 0, w, h);
    pop();
  }
  checkClick(){
    
  }
}


// function mousePressed(){
//   filmRoll.checkMouseOnPress();
// }