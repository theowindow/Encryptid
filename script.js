// =========================================================
//  ENCRYPTID — STARFIELD
//  Draws 70 pixel-square (fillRect) stars on a canvas.
//  Roughly 10 of them slowly flicker using opacity fades.
//  You do not need to edit this file.
// =========================================================

(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const TOTAL_STARS   = 70;
  const FLICKER_COUNT = 10;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < TOTAL_STARS; i++) {
      const flicker = i < FLICKER_COUNT;
      stars.push({
        x:           Math.random() * canvas.width,
        y:           Math.random() * canvas.height,
        size:        Math.random() < 0.25 ? 3 : 2,      // mostly 2px squares, a few 3px
        opacity:     0.3 + Math.random() * 0.5,
        flicker:     flicker,
        dir:         Math.random() > 0.5 ? 1 : -1,       // fade in or out first
        speed:       0.003 + Math.random() * 0.005,       // fade speed
        minOp:       0.05,
        maxOp:       0.95,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      if (s.flicker) {
        s.opacity += s.dir * s.speed;
        if (s.opacity >= s.maxOp) { s.opacity = s.maxOp; s.dir = -1; }
        if (s.opacity <= s.minOp) { s.opacity = s.minOp; s.dir =  1; }
      }
      ctx.fillStyle = `rgba(232, 232, 255, ${s.opacity.toFixed(3)})`;
      // fillRect keeps edges crisp — no anti-aliased circles
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () {
    resize();
    initStars();
  });

  resize();
  initStars();
  draw();
})();
