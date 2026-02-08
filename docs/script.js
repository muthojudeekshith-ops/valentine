/* ---------------- INTERFACE LOGIC ---------------- */

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const nextBtn = document.getElementById("nextBtn");
const confirmBtn = document.getElementById("confirmBtn");

setTimeout(() => {
  nextBtn.style.opacity = "1";
}, 5000);

nextBtn.onclick = () => {
  screen1.classList.remove("active");
  screen2.classList.add("active");
};

confirmBtn.onclick = () => {
  const pass = document.getElementById("password").value;
  if (pass === "SHAWARMA") {
    screen2.classList.remove("active");
    screen3.classList.add("active");
    typeEffect();
  } else {
    alert("Wrong Password 💔");
  }
};

/* ---------------- TYPING EFFECT ---------------- */

const text = `Hey Bae,

Every day with you feels like a win, and i want this kind of win to the rest of my life . . . .

Really,  You are the best part of my life that ever happend . . . .

I hope our love never end and i promise you that I'll never let it end . . . .

Bngrm, you are my best friend , you my half & you are my everything . . . .

HAPPY VALENTINE DAY MY GIRL 🌹🌹
I LOVE YOU 💗💗💗`;

let i = 0;
const target = document.getElementById("typedText");

function typeEffect() {
  if (i < text.length) {
    target.innerHTML += text[i] === "\n" ? "<br>" : text[i];
    i++;
    setTimeout(typeEffect, 40);
  }
}

/* ---------------- HEART CANVAS (YOUR CODE UNTOUCHED) ---------------- */

let settings = {
  particles: { length: 500, duration: 2, velocity: 100, effect: -0.75, size: 30 }
};

/* requestAnimationFrame polyfill */
(function () {
  let b = 0;
  let c = ["ms", "moz", "webkit", "o"];
  for (let a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
    window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
  }
})();

/* FULL HEART ANIMATION CODE CONTINUES EXACTLY AS YOU GAVE */
// ===== FORCE CANVAS SIZE FIX =====
const canvasFix = document.getElementById("pinkboard");
function fixCanvasSize() {
  if (!canvasFix) return;
  canvasFix.width = window.innerWidth;
  canvasFix.height = window.innerHeight;
}
window.addEventListener("resize", fixCanvasSize);
fixCanvasSize();

