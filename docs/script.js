/* ---------- SCREEN LOGIC ---------- */
const s1 = document.getElementById("screen1");
const s2 = document.getElementById("screen2");
const s3 = document.getElementById("screen3");

document.getElementById("nextBtn").onclick = () => {
  s1.classList.remove("active");
  s2.classList.add("active");
};

document.getElementById("confirmBtn").onclick = () => {
  const pass = document.getElementById("password").value;
  if (pass === "SHAWARMA") {
    s2.classList.remove("active");
    s3.classList.add("active");
    typeText();
  } else {
    alert("Wrong password");
  }
};

/* ---------- TYPING EFFECT ---------- */
const msg = "This is written on my heart forever ❤️";
let i = 0;

function typeText() {
  if (i < msg.length) {
    document.getElementById("typingText").innerHTML += msg.charAt(i);
    i++;
    setTimeout(typeText, 80);
  }
}

/* ---------- HEART ANIMATION ---------- */
const canvas = document.getElementById("pinkboard");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 2 + 1;
  this.speed = Math.random() * 1 + 0.5;
}

function drawHeart(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-2, -2, -4, 1, 0, 4);
  ctx.bezierCurveTo(4, 1, 2, -2, 0, 0);
  ctx.fillStyle = "pink";
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 100) hearts.push(new Heart());

  hearts.forEach((h, index) => {
    h.y -= h.speed;
    drawHeart(h.x, h.y, h.size);
    if (h.y < -10) hearts.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();
