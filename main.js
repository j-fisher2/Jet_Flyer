window.addEventListener("load",function(){
    let canvas=document.getElementById("game_screen");
    let ctx=canvas.getContext("2d");
    const GAME_WIDTH=1200;
    const GAME_HEIGHT=600;

    class InputHandler{
        constructor(jet){
            document.addEventListener("keydown", e=>{
                if(e.key=="ArrowRight"){
                    jet.moving=true;
                }
                if(e.key=="ArrowUp"){
                    jet.angle+=5;

                }
                if(e.key==="ArrowDown"){
                    jet.angle-=5;
                }
            })
            document.addEventListener("keyup",e=>{
                if(e.key=="ArrowRight"){
                    jet.moving=false;
                }
            })
        }
    }
    class Jet{
        constructor(x,y,speed,width,height){
            this.x=x;
            this.y=y;
            this.speed=speed;
            this.width=width; 
            this.height=height;
            this.img=document.getElementById("jet");
            this.x_vel=0;
            this.y_vel=0;
            this.angle=0;
            this.moving=false;
            this.frames=[];
        }
        draw(){
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(-1*this.angle*Math.PI/180);
            ctx.drawImage(this.img,0-this.width/2,0-this.height/2,this.width,this.height);
            ctx.restore();
        }
        move(){
            if(this.moving){
                this.x_vel=Math.cos(this.angle*Math.PI/180)*this.speed;
                this.y_vel=-1*Math.sin(this.angle*Math.PI/180)*this.speed;
                this.x+=this.x_vel;
                this.y+=this.y_vel;
            }
        }
    }
    let jet=new Jet(100,200,8,150,75);
    new InputHandler(jet);

    function loop(){
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
        jet.draw();
        jet.move();
        requestAnimationFrame(loop);
    }
    loop();
})
