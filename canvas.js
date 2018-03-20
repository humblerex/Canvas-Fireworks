var canvas = document.getElementById("myCanvas");

var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gravity = 0.16;

var colors = [
    "#EBB66A",
    "#FDD33F",
    "#6A9965",
    "#965491",
    "#EBEBEB"    
  ];

var firework = [];

c.fillStyle = "black";
c.fillRect(0,0,window.innerWidth,window.innerHeight);

function getRandom(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Firework(x,y,explode,hue){
    this.x = x;
    this.y = y;
    this.speedx = getRandom(-5,5);
    this.speedy = -Math.random()*15;
    this.radius = 1;
    this.explode = explode;
    this.explodeSpeed = getRandom(-6,3);
    this.hue = hue;
    this.brightness = getRandom(50,80);
    this.alpha = getRandom(60,100)/100;
    this.life = getRandom(10,20);
    this.color = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+this.alpha+')';
    
    colors[Math.floor(Math.random()*colors.length)];
    this.draw = function(){
    
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        
         
    }    
    this.update = function(){
   
   if(!this.explode)
    this.y += this.speedy;
    // console.log(this.y);
    this.speedy += gravity;
    //this.speedy -= gravity;
        
    if(this.explode)
    {
        this.x += this.speedx;
        this.y += this.explodeSpeed;
        this.explodeSpeed += gravity;
        
        this.life--;
        
        if(this.life<0 && explode){
           const index= firework.indexOf(this);
        if(index != -1)
         { firework.splice(index,1); }
         }
        
    }
        
        
    if(this.speedy >=0)
    { 
        const index= firework.indexOf(this);
        if(index != -1)
         { firework.splice(index,1);
            
          if(!this.explode)
           for(var i=0;i<100;i++)
            {
             firework.push(new Firework(this.x,this.y,true,this.hue));
            }
          
         }
        
        
    }
        
            
    this.draw();
            
        
    }
}



for(var i=0;i<1;i++)
    {var x = Math.random()*window.innerWidth;
     var y = 400;
     firework.push(new Firework(x,y,false));
    }
function animate(){
    
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.2)";
    c.fillRect(0,0,window.innerWidth,window.innerHeight);    
   
    for(var i=0;i<firework.length;i++)
      firework[i].update();
    
    if(Math.random() > 0.95){
    var x = Math.random()*window.innerWidth;
    var y = innerHeight - 20;
    var hue = getRandom(0,360);
       firework.push(new Firework(x,y,false,hue));
    }
    
    
    
    
  //  console.log(firework);
}
animate();