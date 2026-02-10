// Navigation
const s1 = document.getElementById('screen1');
const s2 = document.getElementById('screen2');
const s3 = document.getElementById('screen3');

document.getElementById('next1').onclick = () => {
    s1.classList.remove('active');
    s2.classList.add('active');
};

document.getElementById('checkPass').onclick = () => {
    const pass = document.getElementById('password').value.toUpperCase();
    if (pass === 'Noo') {
        s2.classList.remove('active');
        s3.classList.add('active');
        startAnimation();
        typeMessage();
    } else {
        document.getElementById('errorMsg').innerText = 'Wrong Answer! Hint:IT IS A ROLL ...';
        setTimeout(() => {
            document.getElementById('errorMsg').innerText = '';
        }, 3000);
    }
};

// Typing Effect
const message = `Hey Bae,

Every day with you feels like a win & I want this kind of win for the rest of my life...

Really, you are the best part of my life that ever happened.

I hope our love never ends and I promise you that I'll never let it end.

Bngrm, you are my best friend, my half & you are my everything.

HAPPY VALENTINE'S DAY MY GIRL [HANSINI] 🌹🌹
I LOVE YOU 💗💗💗

Your forever valentine[DEEKSHITH] ❤️`;

let charIndex = 0;
function typeMessage() {
    if (charIndex < message.length) {
        document.getElementById('typingText').textContent += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeMessage, 15);
    }
}

// Heart Particles Animation
function startAnimation() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    const particles = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = height + 20;
            this.size = Math.random() * 15 + 5;
            this.speed = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.swing = Math.random() * 2;
            this.swingSpeed = Math.random() * 0.05;
            this.time = Math.random() * 100;
        }
        
        update() {
            this.y -= this.speed;
            this.time += this.swingSpeed;
            this.x += Math.sin(this.time) * this.swing;
            
            if (this.y < -20) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 77, 109, ${this.opacity})`;
            ctx.beginPath();
            const x = this.x;
            const y = this.y;
            const s = this.size;
            
            // Simple heart shape
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x - s/2, y - s/2, x - s, y + s/3, x, y + s);
            ctx.bezierCurveTo(x + s, y + s/3, x + s/2, y - s/2, x, y);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}
