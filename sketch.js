var mic, fft;

function setup() {
  song = loadSound('assets/relaxation-spa-treatment.mp3');
  createCanvas(windowWidth,windowHeight);
   noFill();
   colorMode(HSB);


   // mic = new p5.AudioIn();
   // mic.start();
   fft = new p5.FFT(0.9);
   fft.setInput(song);

	  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude(0.5);

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {

  var rms = analyzer.getLevel();
  	// console.log (rms);

   var spectrum = fft.analyze();
	console.log (spectrum);

   background(0,0,(rms*700));

// VERTEX
   // beginShape();
   // noFill();
   // stroke(1);
   // for (i = 0; i<spectrum.length; i++) {
   //  vertex(i, map(spectrum[i], 0, width, height, -height*5) );
   // }
   // endShape();

//LINHA
   beginShape();
   noFill();
   stroke(1);
   for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, height, height, -height*3) );
   }
   endShape();

  // Draw an ellipse with size based on volume
  fill(0,0,(-rms*700));
  noStroke();
  ellipse(width/2, height/2, 10+rms*windowWidth, 10+rms*windowWidth);

  //TRIANGLES

    noFill();
    if ( song.isPlaying() ) { // .isPlaying() returns a boolean
      fill(0,0,100,0)
    } else {
      fill(0,0,100,1)
    }
    triangle(width/2-10, height/2-10, width/2-10, height/2+10, width/2+10, height/2);
}
