/**
 * TACTILE AUDIO & SPARKLES ENGINE (Josh W. Comeau Style)
 * 100% Native Web Audio API Synthesis • Zero External Sound Files • 120 FPS Canvas2D
 * Rustam Timalsina Portfolio System
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. WEB AUDIO SYNTHESIZER ENGINE
  // --------------------------------------------------------------------------
  let audioCtx = null;
  const STORAGE_KEY = 'portfolio_tactile_sound_enabled';

  // Check saved user preference (defaults to false until user interacts/turns on)
  let isSoundEnabled = localStorage.getItem(STORAGE_KEY) === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function updateSoundUI() {
    const onIcon = document.getElementById('sound-icon-on');
    const offIcon = document.getElementById('sound-icon-off');
    const label = document.getElementById('sound-label');
    const btn = document.getElementById('sound-btn');

    if (isSoundEnabled) {
      if (onIcon) onIcon.style.display = 'inline';
      if (offIcon) offIcon.style.display = 'none';
      if (label) label.textContent = 'Sound On';
      if (btn) btn.classList.add('sound-active');
    } else {
      if (onIcon) onIcon.style.display = 'none';
      if (offIcon) offIcon.style.display = 'inline';
      if (label) label.textContent = 'Sound Off';
      if (btn) btn.classList.remove('sound-active');
    }
  }

  // Mechanical tactile pop (subtle pitch jitter for organic, real-world switch feel)
  window.playClickSound = function (baseFreq = 480, type = 'sine', duration = 0.08) {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Organic variation +/- 6%
      const jitter = (Math.random() - 0.5) * 0.12;
      const freq = baseFreq * (1 + jitter);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio silent fallback
    }
  };

  // Airy, magical chime on hover
  let lastChimeTime = 0;
  window.playHoverChime = function (freq = 580) {
    if (!isSoundEnabled) return;
    const now = Date.now();
    // Throttle chimes so fast cursor sweeps don't create audio cacophony
    if (now - lastChimeTime < 70) return;
    lastChimeTime = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  // Harmonious success chime (for copy actions or message dispatch)
  window.playSuccessChime = function () {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const start = ctx.currentTime + idx * 0.07;
        const dur = 0.22;

        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + dur);
      });
    } catch (e) {}
  };

  // Toggle audio on/off with persistent storage
  window.toggleAudio = function () {
    isSoundEnabled = !isSoundEnabled;
    try {
      localStorage.setItem(STORAGE_KEY, isSoundEnabled ? 'true' : 'false');
    } catch (e) {}

    updateSoundUI();

    if (isSoundEnabled) {
      getAudioContext();
      window.playClickSound(660, 'triangle', 0.12);
    }
  };

  // --------------------------------------------------------------------------
  // 2. JOSH COMEAU-STYLE CANVAS2D SPARKLES & DUST ENGINE
  // --------------------------------------------------------------------------
  function initSparkles() {
    let spCanvas = document.getElementById('sparkles-canvas');
    if (!spCanvas) {
      // Auto-inject sparkles canvas if missing
      spCanvas = document.createElement('canvas');
      spCanvas.id = 'sparkles-canvas';
      document.body.prepend(spCanvas);
    }

    const ctx = spCanvas.getContext('2d');
    if (!ctx) return;

    let width = spCanvas.width = window.innerWidth;
    let height = spCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = spCanvas.width = window.innerWidth;
      height = spCanvas.height = window.innerHeight;
    });

    const sparkles = [];
    const colors = ['#c084fc', '#f59e0b', '#38bdf8', '#818cf8', '#f472b6'];

    class Sparkle {
      constructor(x, y, isBurst = false) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        this.size = Math.random() * 2.8 + 1;
        this.maxLife = Math.random() * 80 + 40;
        this.life = 0;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = isBurst ? (Math.random() - 0.5) * 3.5 : (Math.random() - 0.5) * 0.3;
        this.vy = isBurst ? (Math.random() - 0.5) * 3.5 : -(Math.random() * 0.4 + 0.1);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (window.__lenis) {
          const vel = window.__lenis.velocity || 0;
          const push = Math.max(-5, Math.min(5, vel * 0.05));
          this.y += push;
          this.x += push * 0.15;
        }
        this.life++;
      }

      draw(c) {
        const progress = this.life / this.maxLife;
        const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
        c.save();
        c.globalAlpha = Math.max(0, alpha * 0.7);
        c.fillStyle = this.color;
        c.shadowBlur = 8;
        c.shadowColor = this.color;

        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Initial ambient dust
    for (let i = 0; i < 45; i++) {
      sparkles.push(new Sparkle());
    }

    // Desktop cursor sparkle bursts
    window.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.62) {
        sparkles.push(new Sparkle(e.clientX, e.clientY, true));
        if (sparkles.length > 85) sparkles.shift();
      }
    });

    // Mobile touch sparkle bursts
    window.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (touch) {
        for (let i = 0; i < 4; i++) {
          sparkles.push(new Sparkle(touch.clientX, touch.clientY, true));
        }
        if (sparkles.length > 95) sparkles.splice(0, 4);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch && Math.random() > 0.5) {
        sparkles.push(new Sparkle(touch.clientX, touch.clientY, true));
        if (sparkles.length > 95) sparkles.shift();
      }
    }, { passive: true });

    function renderSparkles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.update();
        s.draw(ctx);
        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          if (sparkles.length < 40) {
            sparkles.push(new Sparkle());
          }
        }
      }
      requestAnimationFrame(renderSparkles);
    }
    renderSparkles();
  }

  // --------------------------------------------------------------------------
  // 3. 3D TACTILE TILT & SPOTLIGHT FOR CARDS
  // --------------------------------------------------------------------------
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card, .project-card, .blog-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        window.playHoverChime(620);
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = ((y - centerY) / centerY) * -5;
        const rotY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. GLOBAL TACTILE SOUND LISTENERS
  // --------------------------------------------------------------------------
  function initTactileListeners() {
    // Click sound for interactive elements
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, .pill, .filter-btn, .cmd-pill, .tactile-pill, .tag-btn, .hud-mode-btn');
      if (target && target.id !== 'sound-btn') {
        window.playClickSound(520, 'sine', 0.06);
      }
    });

    // Hover chime on badges, pills, and action buttons
    document.querySelectorAll('.pill, .status-badge, .hero-tag, .filter-btn, .card-btn, .blog-card-cta').forEach(el => {
      el.addEventListener('mouseenter', () => {
        window.playHoverChime(700);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. IN-CARD CODE PEEK DRAWER & SNIPPET COPY
  // --------------------------------------------------------------------------
  window.toggleCodePeek = function (id, btn) {
    const drawer = document.getElementById(`code-peek-${id}`);
    if (!drawer) return;
    const isActive = drawer.classList.toggle('active');
    if (btn) {
      btn.textContent = isActive ? 'Hide Code ✕' : 'View Code 💻';
      if (isActive) {
        btn.style.borderColor = 'var(--purple-glow)';
        btn.style.color = '#ffffff';
      } else {
        btn.style.borderColor = '';
        btn.style.color = '';
      }
    }
    window.playClickSound(580, 'triangle', 0.08);
  };

  window.copySnippet = function (id, btn) {
    const drawer = document.getElementById(`code-peek-${id}`);
    if (!drawer) return;
    const code = drawer.querySelector('code')?.innerText || drawer.querySelector('pre')?.innerText;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied! ✓';
        window.playSuccessChime();
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 6. BOOTSTRAP ON DOM READY
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateSoundUI();
      initSparkles();
      initTiltCards();
      initTactileListeners();
    });
  } else {
    updateSoundUI();
    initSparkles();
    initTiltCards();
    initTactileListeners();
  }

  // --------------------------------------------------------------------------
  // 5. LENIS SMOOTH INERTIAL SCROLL ENGINE (Nesil Noble / Awwwards Standard)
  // --------------------------------------------------------------------------
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      lerp: 0.088,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.4,
      smoothWheel: true,
      infinite: false,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Inertial anchor scrolling for in-page bookmarks (#projects, #hero, etc.)
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, {
              duration: 1.3,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
            if (history.pushState) {
              history.pushState(null, null, targetId);
            }
          }
        }
      }
    });

    // Handle back-to-top buttons
    document.querySelectorAll('.back-top').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      };
    });

    console.log('⚡ Lenis Smooth Scroll Engine Active');
  }

  // Initialize Lenis on DOMContentLoaded or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    initLenis();
  }


  // --------------------------------------------------------------------------
  // 6. HERO SYSTEMS RIG EYE-TRACKING PHYSICS (Trigonometric Pointer Math)
  // --------------------------------------------------------------------------
  function initHeroRigPhysics() {
    const pupils = [
      document.getElementById('pupilLeft'),
      document.getElementById('pupilRight')
    ].filter(Boolean);

    const eyeWhites = document.querySelectorAll('.hero-eye-white');
    if (pupils.length === 0 || eyeWhites.length === 0) return;

    const MAX_OFFSET = 5.2; // Maximum pupil travel radius in SVG units

    window.addEventListener('pointermove', (e) => {
      eyeWhites.forEach((w, i) => {
        const rect = w.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, dist / 240); // Soft clamp sensitivity
        const px = (dx / dist) * MAX_OFFSET * k;
        const py = (dy / dist) * MAX_OFFSET * k;

        if (pupils[i]) {
          pupils[i].style.transform = `translate(${px}px, ${py}px)`;
        }
      });
    }, { passive: true });

    document.documentElement.addEventListener('pointerleave', () => {
      pupils.forEach(p => {
        if (p) p.style.transform = 'translate(0, 0)';
      });
    });

    // Interactive Rig Greeting on Click
    window.triggerRigGreeting = function() {
      const arm = document.getElementById('heroArm');
      if (arm) {
        arm.style.animation = 'arm-wave 0.35s ease-in-out 4';
        setTimeout(() => {
          arm.style.animation = 'arm-idle 4s ease-in-out infinite';
        }, 1400);
      }
      if (window.playSuccessChime) {
        window.playSuccessChime();
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroRigPhysics);
  } else {
    initHeroRigPhysics();
  }

})();
