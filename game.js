var canvas;
var ctx;
var w = 1000;
var h = 600;

var o1 = {
    "x": 0,
    "y": h/2,
    "w": 60,
    "h": 60,
    "d": rand(10),
    "c": 10,
    "a": 0.5,
    "angle": 0,
    "changle": 15,

}

var o2 = {
    "x": rand(w),
    "y": rand(h),
    "w": 100,
    "h": 400,
    "d": rand(10),
    "c": 44,
    "a": 1,
    "angle": 180,
    "changle": 15,

}



document.onkeydown = moveShape;

setUpCanvas();
animationLoop();








function animationLoop(){
    collision();
    clear();
    for(var i=0; i<1; i++){
        rect(o1);
        forward(o1,1);
        bounce(o1);

        
    }

    for(var i=0; i<5; i++){
    
        rect(o2);
        turn(o2,0);
        forward(o2,0);
        bounce(o2);
    
        
        
    }

    

    requestAnimationFrame(animationLoop);
        
   
}



function collision(){
    if(o1.x+o1.w/2 > o2.x-o2.w/2 &&
        o1.x-o1.w/2 < o2.x + o2.w/2 &&
        o1.y+o1.w/2 > o2.y-o2.h/2 &&
        o1.y-o1.w/2 < o2.y+o2.h/2  
        ){

        stop();   
        var message = "You lost!";
        console.log(message);
        document.querySelector("#paragraph").innerHTML = message;
        
        }

}



function moveShape(event){
    // up 
    if(event.keyCode == 38){
        forward(o1,7);
    }; 
    // down 
    if(event.keyCode == 40){
        forward(o1, -7);
    }
    // left 
    if(event.keyCode == 37){
        turn(o1, -15)
    }    
    // right 
    if(event.keyCode == 39){
        turn(o1, 15)
    } 



}



function bounce(o){
    if(o.x < 0){
       turn(o, 180);
    };
    if(o.y > h || o.y < 0){
        turn(o,180);
    };
    if(o1.x > w) {
        stop();
    var message = "You won!";
    console.log(message);
    document.querySelector("#paragraph").innerHTML = message;
    }
    

}
function clear(){
    ctx.clearRect(0,0,w,h);
}

function stop(){
    o1.x = 0
    o1.y = rand(600)
    o1.angle = 0
    o2.x = rand(w)
    o2.y = rand(h)
    

}


function rect(o){
    
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    var d = o.d;

    turn(o, 180);
    forward(o, o.w/2);
    turn(o, 90);
    forward(o, o.h/2);
    turn(o, 90);

    
    ctx.beginPath();
    ctx.moveTo(o.x,o.y);
    forward(o, o.w); 
    ctx.lineTo(o.x, o.y);
    turn(o,90);
    forward(o, o.h);
    ctx.lineTo(o.x, o.y);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    turn(o, 90);
    forward(o, o.h);
    ctx.lineTo(o.x, o.y);
    ctx.fillStyle = "hsla("+o.c+",100%,50%,"+o.a+")";
    ctx.fill();

    o.x = x;
    o.y = y;
    o.angle = a;
    o.d = d;

}


function turn(o,angle){
    if(angle!=undefined){
        o.changle = angle;
    };
    o.angle += o.changle; 
}

function forward(o,d){
    var changeX;
    var changeY;
    var oneDegree = Math.PI/180; 
    if(d != undefined){
        o.d = d;
    };
    changeX = o.d*Math.cos(o.angle*oneDegree);
    changeY = o.d*Math.sin(o.angle*oneDegree);
    o.x+=changeX;
    o.y+=changeY;
}



function randn(r){
    var result = Math.random()*r - r/2;
    return result
}

function randi(r){
    var result = Math.floor(Math.random()*r);
    return result
}

function rand(r){
    var result = Math.random()*r;
    return result
}


function setUpCanvas(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "5px dotted yellow";
    canvas.style.background = "black"; 

}


console.log("game by manuela");
