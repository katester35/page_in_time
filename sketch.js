// Declare a "SerialPort" object
var serial;
var latestData = [0,0,0]; // you'll use this to write incoming data to the canvas

var hayp;
var chicka;
var dimsum;
var introduction;
var errorState;
var previousState = [0,0,0];

function preload(){  
    hayp = createVideo('hayp.mp4');
    chicka = createVideo('chickachickaboomboom2.mp4');
    dimsum = createVideo('dimsum.mp4');

    introduction = loadImage('introduction.png');
    errorState = loadImage('error.png');
}

function setup() {
  createCanvas(1480, 720);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/tty.usbmodem1201");
  serial.on('data', gotData);

  hayp.position(200,20);
  chicka.position(200,20);
  dimsum.position(200,20);
  chicka.size(1080, 640);
  dimsum.size(1080, 640);
  hayp.size(1080, 640);
  hayp.hide();
  chicka.hide();
  dimsum.hide();

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();
  if (currentString.length > 0) {
    latestData = currentString.split(",");
    //console.log(latestData);
  }
}

function stopAll(){
  hayp.hide();
  hayp.pause();
  dimsum.hide();
  dimsum.pause();
  chicka.hide(); 
  chicka.pause();
 
}
function draw() {
  background(255, 255, 255);

  print(latestData);

  if(latestData[0] == 0 && previousState[0] != 0){
    stopAll();
    hayp.show();
    hayp.loop();
  }
  else if(latestData[1] == 0 && previousState[1] != 0){
    stopAll();
    dimsum.show();
    dimsum.loop();
  } 
  else if(latestData[2] == 0 && previousState[2] != 0){
    stopAll();
    chicka.show();
    chicka.loop();
  } 
  else if(latestData[0] == 1 && latestData[1] == 1 && latestData[2] == 1){
    image(introduction, 200, 20, 1080, 640);
    stopAll();
  }
  else if(latestData[0] == 0 && latestData[1] == 0){
    image(errorState, 200, 20, 1080, 640);
    stopAll();
  }
  else if(latestData[0] == 0 && latestData[2] == 0){
    image(errorState, 200, 20, 1080, 640);
    stopAll();
  }
  else if(latestData[1] == 0 && latestData[2] == 0){
    image(errorState, 200, 20, 1080, 640);
    stopAll();
  }
  else if(latestData[0] == 0 && latestData[1] == 0 && latestData[2] == 0){
    image(errorState, 200, 20, 1080, 640);
    stopAll();
  }

  previousState[0] = latestData[0];
  previousState[1] = latestData[1];
  previousState[2] = latestData[2];
}


