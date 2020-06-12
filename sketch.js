let fontsize = 100;
var chars = ['M', 'A', 'R', 'C'];
var cols;
var word = [];
var bg_color = '#f0f0f0';
var difX = 0;
var difY = 0;


// TODO - Add dragging on touch screens and maybe make content responsive in realtime?
// FIX - Custom font (Lato) not working

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  cols = ['#EEA47F', '#EEA47F', '#EEA47F', '#EEA47F'];
  // Set text characteristics
   textFont('Lato');
   textSize(fontsize);
   textAlign(width, height);

   for (let i = 0; i < chars.length; i++) {
     word.push(new Letter(chars[i], width/2-150 + i*100, height/2, cols[i]));
   }
 }

 function draw() {
   background(bg_color);

   drawWords();
 }

 function windowResized() {
 	resizeCanvas(windowWidth, windowHeight);
 }

 function mousePressed() {
   for (let i = 0; i < word.length; i++) {
     word[i].check();
   }
 }
 function mouseReleased() {
   for (let i = 0; i < word.length; i++) {
     word[i].dragging = false;
   }
 }

 function touchStarted() {
   for (let i = 0; i < word.length; i++) {
     word[i].check();
   }
 }
 function touchEnded() {
   for (let i = 0; i < word.length; i++) {
     word[i].dragging = false;
   }
 }


 function drawWords() {
   textAlign(CENTER);
   for (let i = 0; i < word.length; i++) {
     word[i].update();
     word[i].draw();
   }
 }

 function Letter(char, x, y, col) {
     this.char = char;
     this.x = x;
     this.y = y;
     this.col = col;
     this.size = 50;
     this.offset = 25;
     this.dragging = null;
     this.difX = 0;
     this.difY = 0;

   this.draw = function() {
     fill(color(this.col));
     text(this.char, this.x, this.y);
     //circle(this.x,this.y,30);
   };

   this.update = function () {
     if(this.dragging) {
       let v = createVector(mouseX,mouseY);
       //v.sub(width/2,height/2);
       this.x = v.x + this.difX;
       this.y = v.y + this.difY;
     }
   }

   this.check = function() {
     let v = createVector(mouseX,mouseY);
     //v.sub(width/2,height/2);

     if (dist(v.x, v.y, this.x, this.y-this.offset) <= this.size) {
       this.dragging = true;
       this.difX = this.x-v.x;
       this.difY = this.y-v.y;
     }
   };
 }
