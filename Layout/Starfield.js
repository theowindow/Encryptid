/* ============================================================
   ENCRYPTID — STAR FIELD CANVAS
   ============================================================
   HOW TO EDIT:
   - STAR_COUNT: Total number of stars
   - FLICKER_COUNT: How many of them slowly fade in/out
   - STAR_SIZE: Size of each square "pixel" star (in pixels)
   - STAR_COLOR: Colour of the stars
   ============================================================ */

(function () {
  const STAR_COUNT   = 70;          // Total stars on screen
  const FLICKER_COUNT = 10;         // How many stars flicker
  const STAR_SIZE    = 2;           // Width & height of each square star (px)
  const STAR_COLOR   = '#E8E8FF';   // Star colour

  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Resize canvas to fill the window
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Build star objects
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const flickers = i < FLICKER_COUNT;
    stars.push({
      x:       Math.random(),   // As a fraction of canvas width (0–1)
      y:       Math.random(),   // As a fraction of canvas height (0–1)
      opacity: Math.random(),   // Starting opacity
      flickers: flickers,
      // Flicker direction (+1 = fading in, -1 = fading out)
      dir:     Math.random() > 0.5 ? 1 : -1,
      // Speed of fade (lower = slower flicker)
      speed:   0.003 + Math.random() * 0.007,
    });
  }

  // Animation loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      // Update opacity for flickering stars
      if (star.flickers) {
        star.opacity += star.dir * star.speed;
        if (star.opacity >= 1) { star.opacity = 1; star.dir = -1; }
        if (star.opacity <= 0.1) { star.opacity = 0.1; star.dir = 1; }
      }

      // Draw as a sharp square (pixel art — NOT a circle)
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle   = STAR_COLOR;
      ctx.fillRect(
        Math.floor(star.x * canvas.width),
        Math.floor(star.y * canvas.height),
        STAR_SIZE,
        STAR_SIZE
      );
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
})();
