/* ---------- SCREEN CONTROL ---------- */
function showScreen(n){
  document.querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));
  document.getElementById("screen"+n).classList.add("active");
}

setTimeout(()=>{
  document.getElementById("nextBtn").style.display="block";
},5000);

document.getElementById("nextBtn").onclick=()=>{
  showScreen(2);
};

/* ---------- PASSWORD ---------- */
function checkPassword(){
  let pass=document.getElementById("password").value;
  if(pass==="SHAWARMA"){
    showScreen(3);
    startTyping();
  }else{
    alert("Wrong password 💔");
  }
}

/* ---------- TYPING EFFECT ---------- */
let text=`Hey Bae,
Every day with you feels like a win, and i want this kind of win to the rest of my life . . . .  .
Really,  You are the best part of my life that ever happend . . . . .
I hope our love never end and i promise you that I'll never let it end . . . . .
Bngrm, you are my best friend , you my half & you are my everything . . . .

HAPPY VALENTINE DAY MY GIRL 🌹🌹
I LOVE YOU 💗💗💗`;

let i=0;
function startTyping(){
  let box=document.getElementById("typingText");
  let timer=setInterval(()=>{
    box.textContent+=text[i];
    i++;
    if(i>=text.length) clearInterval(timer);
  },40);
}

/* ---------- HEART ANIMATION (UNCHANGED, SAFE) ---------- */
let settings={particles:{length:500,duration:2,velocity:100,effect:-0.75,size:30}};

;(function(){let b=0,c=["ms","moz","webkit","o"];
for(let a=0;a<c.length&&!window.requestAnimationFrame;++a){
window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];
window.cancelAnimationFrame=
window[c[a]+"CancelAnimationFrame"]||
window[c[a]+"CancelRequestAnimationFrame"]}
if(!window.requestAnimationFrame){
window.requestAnimationFrame=function(h){
let d=new Date().getTime(),f=Math.max(0,16-(d-b));
let g=setTimeout(()=>h(d+f),f);b=d+f;return g}}
if(!window.cancelAnimationFrame){
window.cancelAnimationFrame=function(id){clearTimeout(id)}}})();

function Point(x,y){this.x=x||0;this.y=y||0;}
Point.prototype.clone=function(){return new Point(this.x,this.y);}
Point.prototype.length=function(l){
if(l===undefined)return Math.sqrt(this.x*this.x+this.y*this.y);
this.normalize();this.x*=l;this.y*=l;return this;}
Point.prototype.normalize=function(){
let l=this.length();this.x/=l;this.y/=l;return this;}

function Particle(){
this.position=new Point();
this.velocity=new Point();
this.acceleration=new Point();
this.age=0;
}
Particle.prototype.initialize=function(x,y,dx,dy){
this.position.x=x;this.position.y=y;
this.velocity.x=dx;this.velocity.y=dy;
this.acceleration.x=dx*settings.particles.effect;
this.acceleration.y=dy*settings.particles.effect;
this.age=0;}
Particle.prototype.update=function(dt){
this.position.x+=this.velocity.x*dt;
this.position.y+=this.velocity.y*dt;
this.velocity.x+=this.acceleration.x*dt;
this.velocity.y+=this.acceleration.y*dt;
this.age+=dt;}
Particle.prototype.draw=function(ctx,img){
let s=img.width*(1-this.age/settings.particles.duration);
ctx.globalAlpha=1-this.age/settings.particles.duration;
ctx.drawImage(img,this.position.x-s/2,this.position.y-s/2,s,s);}

function ParticlePool(l){
this.particles=new Array(l);
for(let i=0;i<l;i++)this.particles[i]=new Particle();
this.firstActive=0;this.firstFree=0;
}
ParticlePool.prototype.add=function(x,y,dx,dy){
this.particles[this.firstFree].initialize(x,y,dx,dy);
this.firstFree++;
if(this.firstFree==this.particles.length)this.firstFree=0;
if(this.firstActive==this.firstFree)this.firstActive++;
if(this.firstActive==this.particles.length)this.firstActive=0;
}
ParticlePool.prototype.update=function(dt){
let i;
if(this.firstActive<this.firstFree)
for(i=this.firstActive;i<this.firstFree;i++)
this.particles[i].update(dt);
if(this.firstFree<this.firstActive){
for(i=this.firstActive;i<this.particles.length;i++)
this.particles[i].update(dt);
for(i=0;i<this.firstFree;i++)
this.particles[i].update(dt);}
while(this.particles[this.firstActive].age>=settings.particles.duration
&&this.firstActive!=this.firstFree){
this.firstActive++;
if(this.firstActive==this.particles.length)this.firstActive=0;}
}
ParticlePool.prototype.draw=function(ctx,img){
let i;
if(this.firstActive<this.firstFree)
for(i=this.firstActive;i<this.firstFree;i++)
this.particles[i].draw(ctx,img);
if(this.firstFree<this.firstActive){
for(i=this.firstActive;i<this.particles.length;i++)
this.particles[i].draw(ctx,img);
for(i=0;i<this.firstFree;i++)
this.particles[i].draw(ctx,img);}
}

;(function(canvas){
let ctx=canvas.getContext("2d"),
pool=new ParticlePool(settings.particles.length),
rate=settings.particles.length/settings.particles.duration,
time;

function heart(t){
return new Point(
160*Math.pow(Math.sin(t),3),
130*Math.cos(t)-50*Math.cos(2*t)-20*Math.cos(3*t)
-10*Math.cos(4*t)+25);
}

let img=(function(){
let c=document.createElement("canvas"),
x=c.getContext("2d");
c.width=settings.particles.size;
c.height=settings.particles.size;
x.fillStyle="#ea80b0";
x.beginPath();
let t=-Math.PI,p;
while(t<Math.PI){p=heart(t);
x.lineTo(
c.width/2+p.x*c.width/350,
c.height/2-p.y*c.height/350);
t+=0.01;}
x.fill();
let i=new Image();
i.src=c.toDataURL();
return i;
})();

function resize(){
canvas.width=canvas.clientWidth;
canvas.height=canvas.clientHeight;
}
window.addEventListener("resize",resize);
resize();

(function render(){
requestAnimationFrame(render);
let now=Date.now()/1000;
let dt=now-(time||now);
time=now;
ctx.clearRect(0,0,canvas.width,canvas.height);
for(let i=0;i<rate*dt;i++){
let p=heart(Math.random()*Math.PI*2);
let d=p.clone().length(settings.particles.velocity);
pool.add(canvas.width/2+p.x,canvas.height/2-p.y,d.x,-d.y);
}
pool.update(dt);
pool.draw(ctx,img);
})();
})(document.getElementById("pinkboard"));
