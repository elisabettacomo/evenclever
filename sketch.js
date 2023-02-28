let img;
let scaleFactor = 1;
let targetScale = 1;

let buttons = [];
let buttonImages = [];
let buttonLinks = [  "index.html",  "index.html",  "index.html",  "index.html"];

function preload() {
  img = loadImage("assets/logotype.png");
  for (let i = 0; i < 4; i++) {
    buttonImages[i] = loadImage(`path/button-${i}.svg`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let btnBlockWidth = img.width * 0.1;
  let btnBlockHeight = img.height * 0.1;
  let btnBlockX = (width - btnBlockWidth) / 2;
  let btnBlockY = (height - btnBlockHeight) / 2;

  for (let i = 0; i < 4; i++) {
    let x = (i % 2) * (img.width * 0.05) + btnBlockX;
    let y = floor(i / 2) * (img.height * 0.05) + btnBlockY;
    buttons[i] = new Button(x, y, img.width * 0.05, img.height * 0.05, buttonImages[i], buttonLinks[i]);
  }
}

function draw() {
  background(0);
  imageMode(CENTER);
  
  scaleFactor += (targetScale - scaleFactor) * 0.1;
  image(img, width/2, height/2, img.width * scaleFactor / 24, img.height * scaleFactor / 24);

  if (targetScale === 7.5) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].display();
    }
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    targetScale = 7.5;
  } else {
    targetScale = 1;
  }
}

class Button {
  constructor(x, y, w, h, image, link) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.link = link;
  }

  display() {
    imageMode(CENTER);
    image(this.image, this.x + this.w/2, this.y + this.h/2, this.w, this.h);
  }

  checkClick() {
    if (mouseX >= this.x && mouseX <= this.x + this.w &&
        mouseY >= this.y && mouseY <= this.y + this.h) {
      window.location.href = this.link;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].checkClick();
  }
}
