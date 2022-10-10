var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function randomColor(){
	// below creates random colors
		var color = "rgba(";
		var set;
		for (var j = 0; j < 3; j++){
			set = Math.floor(Math.random() * 255);
			color += set + ", "; 
		}
		var opacity = (Math.random() * 1); opacity = opacity.toFixed(1);
		// console.log(opacity); // for testing
		color += opacity + ")";
		// end of code for random color production
    return color; //returns the rancom color when function completes
}

function Circle(x, y, dx, dy, radius, color1, color2){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color1 = color1;
  this.color2 = color2;
  
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = color1;
    c.stroke();
    c.fillStyle = color2;
    c.fill();
  }
  
  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x + this.radius < 0){
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y + this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    
    this.draw();
  }
}

function Rectangle(x, y, dx, dy, width, height, color){
  this.x = x; this.dx = dx;
  this.y = y; this.dy = dy;
  this.width = width;
  this.height = height;
  this.color = color;
  
  this.draw = function(){
    c.fillStyle = color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  
  this.update = function(){
    if (this.x > innerWidth || this.x < 0){
      this.dx = -this.dx;
    }
    if (this.y > innerHeight || this.y < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    
    this.draw();
  }
  
}

function clearCanvas(){
  var clear = c.clearRect(0, 0, innerWidth, innerHeight);
  return clear;
}

var circleArray = [];

for (var i = 0; i < 500; i++){
	//random to make more? Math.random()
	var radius = Math.random() * 30;
	var x = Math.random() * (innerWidth - radius * 2) + radius; 
	var y = Math.random()* (innerHeight - radius * 2) + radius; //use a variable to change values of arc
	var dx = (Math.random() - 0.5) ;  // -0.5 allows to get either negative or positive value
	var dy = (Math.random() - 0.5) ; // speed of movement variable
  var color1 = randomColor();
  var color2 = randomColor();
	
	circleArray.push(new Circle(x, y, dx, dy, radius, color1, color2)); // pushes new value to end of open array
}

var rectArray = [];

for (var i = 0; i < 100; i++){
	var x = Math.random() * innerWidth; 
	var y = Math.random() * innerHeight; //use a variable to change values of arc
	var dx = (Math.random() - 0.5) ;  // -0.5 allows to get either negative or positive value
	var dy = (Math.random() - 0.5) ; // speed of movement variable
  var height = Math.random() * 100;
  var width = Math.random() * 100;
  var color = randomColor(); 
  
  rectArray.push(new Rectangle(x, y, dx, dy, width, height, color));
}

function animate(){
  requestAnimationFrame(animate);
  clearCanvas();
  
  for (var i=0; i < circleArray.length; i++){
		circleArray[i].update();
	}
  for (var i=0; i < rectArray.length; i++){
    rectArray[i].update();
  }
}

animate();