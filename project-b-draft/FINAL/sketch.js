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
    if (i == 1 || i == 3 || i == 4 || i == 6 || i == 8) {
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
  //noCursor();
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
    rect(filmX, filmY, 500* this.images.length, windowHeight*8/9);
    //windowHeight*6/7
    
    fill(255);
    for (let i = 0; i < this.images.length; i++) {
      rect(5 + i * windowHeight*25/36, windowHeight / 5.5, (windowHeight*9/11-45)/5*4, windowHeight*9/11-45);
      films[i].display(5 + i * windowHeight*25/36, windowHeight / 5.5, (windowHeight*9/11-45)/5*4, windowHeight*9/11-45); //550
      //call special images here
      // //if i==2, then films[i].mousepress
      // if (i == 2 || i == 5 || i == 7 ) {
      //   films[i].mousePressed
      // } 
    }

    //top & bottom squares
    for (let i = 0; i < 67; i++) {
      // rect(i * 60, 105, 15, 15);
      // rect(i * 60, 700, 15, 15);
      rect(i * 60, ((filmY +20)*7)/6.5 - 10, 15, 15);
      rect(i * 60, ((filmY +20)*7)- 35, 15, 15);
    }


    
    pop();
    this.drawCamera();
    this.drawButton();
    

    text(this.x, 20, 20)
    
    
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

    if (counter >= 450) {
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
    //fill("red");
    //text("Left", width / 4 + 60, height - 40 / 2 - 20);

    //right button
    fill(this.rr, this.gr, this.br);
    ellipse((3 * width) / 4 - 60, height - 30 / 2 - 20, 40, 40);
    //fill("red");
    //text("Right", (3 * width) / 4 - 60, height - 40 / 2 - 20);
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
  }
  checkMouseEveryFrame() {
    this.buttonLogic();
    console.log();
    // mouseover
    fill("red")
    // mouse in relation to window
    let mX = mouseX;
    let mY = mouseY
    text(mouseX + " , " + mouseY, mouseX, mouseY );
    // mouse in relation to film
    let mXonFilm = mouseX - this.x
    let mYonFIlm = mouseY;
    text(mXonFilm + " , " + mYonFIlm, mouseX, mouseY+30 );

    //if mouse hovered over then sound plays
    //use if statements here for the 2 that play sounds (use the bottom number)
    // if mouseIsPressed

      if (mXonFilm > 505 && mXonFilm< 945 && mYonFIlm > 84 && mYonFIlm<632 ) {
        // console.log(this.soundNotPlay)
        if(waterSound.isPlaying() == false){
          waterSound.play();

        }
        // this.soundNotPlay = false
      } else {
        waterSound.stop();

      }

      // if (mXonFilm > 505 && mXonFilm< 945 && mYonFIlm > 84 && mYonFIlm<632) {
      //   this.soundPlay = true;
      //   if (this.soundPlay == false) {
      //     waterSound.play();
      //   }
      // }
      
      if (mXonFilm > 3005 && mXonFilm< 3445 && mYonFIlm > 84 && mYonFIlm<632){
        if(mountainSound.isPlaying() == false){
          mountainSound.play();
      } 
    }else{
        mountainSound.stop();
      }
    }
  
  checkMouseOnPress() {
    this.buttonLogic();
    // mouseover
    fill("red")
    // mouse in relation to window/browser
    let mX = mouseX;
    let mY = mouseY
    text(mouseX + " , " + mouseY, mouseX, mouseY );
    // mouse in relation to film
    let mXonFilm = mouseX - this.x
    let mYonFIlm = mouseY;
    text(mXonFilm + " , " + mYonFIlm, mouseX, mouseY+30 );

    if (mXonFilm > 2217 && mXonFilm< 2280 && mYonFIlm > 352 && mYonFIlm<490){
      beerSound.play();
    } else {
      beerSound.stop();
      // this.soundPlay = false;
    }

  }

  drawCamera() {
    strokeWeight(10);
    fill("white")
    rect(windowWidth - 50, 0, 100, 700, 55, 55); // side lens
    rect(windowWidth - 30, -10, 30, 40, 40, 40);
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
    //console.log(speed)
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