// /app.js
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const floaters = $("floaters");
  const overlay = $("overlay");
  const twinkles = $("twinkles");
  const landedEmojis = $("landedEmojis");

  const buttons = $("buttons");
  const noPlaceholder = $("noPlaceholder");

  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  const hintText = $("hintText");
  const bubble = $("bubble");
  const stickerImg = $("stickerImg");

  const promptView = $("promptView");
  const successView = $("successView");
  const bigTitle = $("bigTitle");

  const gfPhoto = $("gfPhoto");

  const bgAudioEl = $("bgAudio");
  const yesAudioEl = $("yesAudio");

  async function resolveGfPhoto() {
    const candidates = [
      "gf.png","gf.jpg","gf.jpeg","gf.webp",
      "gf (1).png","gf (1).jpg","gf (1).jpeg",
      "GF.PNG","GF.JPG","GF.JPEG"
    ];

    for (const name of candidates) {
      try {
        const r = await fetch(name, { method: "HEAD", cache: "no-store" });
        if (r.ok) { gfPhoto.src = name; return; }
      } catch {}
    }

    gfPhoto.alt = "Put gf.png (or gf.jpg) next to index.html";
    gfPhoto.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>
          <defs>
            <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
              <stop stop-color='#ffd2e2' offset='0'/>
              <stop stop-color='#e6e0ff' offset='0.5'/>
              <stop stop-color='#ccfaee' offset='1'/>
            </linearGradient>
          </defs>
          <rect width='100%' height='100%' fill='url(#g)'/>
          <text x='50%' y='48%' font-size='34' text-anchor='middle' fill='rgba(31,26,29,.7)' font-family='system-ui'>
            gf image not found
          </text>
          <text x='50%' y='54%' font-size='22' text-anchor='middle' fill='rgba(31,26,29,.55)' font-family='system-ui'>
            Put it in the same folder as index.html
          </text>
        </svg>`
      );
  }

  const noTexts = [
    "linda mekaifebi?",
    "pookiee rashobiii???",
    "axla gavdeldebi icodee.....",
    "moval maqa...",
    "auuchemikaiii",
    "raarii martla lindaa daa?",
    "LINDAAA..",
    "Au madeleb xom...??"
  ];
  const hintBase = [
    "No seems a bit shy 😈",
    "too slow 😌",
    "nice try 😭",
    "it ran away 🏃‍♀️💨",
    "just press Yes already 💞"
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  function setSticker(src) {
    stickerImg.style.display = "block";
    stickerImg.classList.remove("on");
    stickerImg.src = src;
    stickerImg.onload = () => stickerImg.classList.add("on");
    stickerImg.onerror = () => { stickerImg.style.display = "none"; };
  }
  function swapSticker(src) {
    stickerImg.classList.remove("on");
    window.setTimeout(() => setSticker(src), 140);
  }

  const STICKER_BEFORE =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2prNnVoN2NieWE3MGE0bzFwZndnazNucDM5aTQyNTlrdjZwZ2VsbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26gslMAdctNhu6YnK/giphy.gif";

  const STICKERS_INTRO = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJlZHNsZzhhamw2dnlpYnh1aXA3OGtsOHp1OHMyb3Q2YTNtZGhveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Xr9TlAqw3S7VPOrftK/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWR2NmdhbjNpNmNxbW84ZWk5Zjh6cXRxdnJzc2F6ejRrMnBuZW80dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l0Iy8m9yd2pBk5NXW/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVob2x3d253dmljc2Z0ZDhlcnh0Z3B6a2dyY2tzeTIwajczNHMyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/dRHzQNsHOlVsid9Pct/giphy.gif",
  ];

  const STICKERS_POOL = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ216YzdoOXZqNW44OTZtZGR3ZHR5a2hjN3dldjQwaTM1Z215ZHVhbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TvpRL1xoIWWF3hdvw7/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXJwejRkcG9yZmlpamV3aXNwMXl0OXZyenlyM2xzMm1iNXJ1eXMwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/gTtaTV1m4YL3NLMdqN/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGFiNjhzZHp6a2ZjdXFsZHpjMmUwZDgwYTcxZTVsbDViYnpsZDdldyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/10MwRXu4YQ9mOk/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3Q2dzAwbmF6eTZpZ3FrbXhnNGZpaDk0ZGd2bmNlZWptdGtkajZsOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/eLudeY6Dwj4gpbMZYV/giphy.gif",
  ];

  let lastPoolSticker = "";
  function nextAfterSticker(noClickCount) {
    if (noClickCount <= STICKERS_INTRO.length) return STICKERS_INTRO[noClickCount - 1];
    for (let i = 0; i < 12; i++) {
      const s = pick(STICKERS_POOL);
      if (s !== lastPoolSticker) { lastPoolSticker = s; return s; }
    }
    lastPoolSticker = STICKERS_POOL[0] || "";
    return lastPoolSticker;
  }

  let bubbleReplaceTimer = null;
  function showBubble(text) {
    if (bubbleReplaceTimer) { clearTimeout(bubbleReplaceTimer); bubbleReplaceTimer = null; }

    const startNew = () => {
      bubble.textContent = text;
      bubble.classList.remove("fadeFast", "show");
      void bubble.offsetWidth;
      bubble.classList.add("show");
      bubbleReplaceTimer = window.setTimeout(() => {
        bubble.classList.remove("show");
        bubbleReplaceTimer = null;
      }, 6100);
    };

    if (bubble.classList.contains("show")) {
      bubble.classList.remove("show", "fadeFast");
      void bubble.offsetWidth;
      bubble.classList.add("fadeFast");
      bubbleReplaceTimer = window.setTimeout(() => {
        bubble.classList.remove("fadeFast");
        startNew();
      }, 220);
    } else startNew();
  }

  // ========= AUDIO =========
  let audioCtx = null;
  let bgSource = null;
  let yesSource = null;
  let bgGain = null;
  let yesGain = null;
  let audioReady = false;
  let bgStarted = false;

  function getAudioCtx() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    return audioCtx;
  }
  function withAudio(fn) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === "running") { fn(ctx); return; }
    ctx.resume().then(() => fn(ctx)).catch(() => {});
  }
  function ensureMediaGraph() {
    withAudio(() => {
      if (audioReady) return;

      bgGain = audioCtx.createGain();
      yesGain = audioCtx.createGain();
      bgGain.gain.value = 0.0001;
      yesGain.gain.value = 0.0001;

      bgSource = audioCtx.createMediaElementSource(bgAudioEl);
      yesSource = audioCtx.createMediaElementSource(yesAudioEl);

      bgSource.connect(bgGain).connect(audioCtx.destination);
      yesSource.connect(yesGain).connect(audioCtx.destination);

      audioReady = true;
    });
  }
  function fadeGainTo(gainNode, target, seconds) {
    if (!gainNode) return;
    withAudio((ctx) => {
      const t = ctx.currentTime;
      const dur = Math.max(0.01, seconds);
      const cur = Math.max(0.0001, gainNode.gain.value || 0.0001);
      const dst = Math.max(0.0001, target);

      gainNode.gain.cancelScheduledValues(t);
      gainNode.gain.setValueAtTime(cur, t);
      gainNode.gain.exponentialRampToValueAtTime(dst, t + dur);
    });
  }
  async function safePlay(el) {
    try {
      const p = el.play();
      if (p && typeof p.then === "function") await p;
      return true;
    } catch {
      return false;
    }
  }
  async function startBgLoop() {
    ensureMediaGraph();
    if (!audioReady || bgStarted) return;

    bgAudioEl.loop = true;
    bgAudioEl.currentTime = Math.min(bgAudioEl.currentTime || 0, 0.2);
    const ok = await safePlay(bgAudioEl);
    if (!ok) return;

    bgStarted = true;
    fadeGainTo(bgGain, 0.22, 0.8);
  }
  function unlockAudio() {
    ensureMediaGraph();
    startBgLoop();
  }
  function armFirstGestureAudio() {
    const once = () => {
      document.removeEventListener("pointerdown", once);
      document.removeEventListener("touchstart", once);
      unlockAudio();
    };
    document.addEventListener("pointerdown", once, { passive: true });
    document.addEventListener("touchstart", once, { passive: true });
  }

  async function playYesSongSegment() {
    unlockAudio();

    fadeGainTo(bgGain, 0.0001, 0.8);

    const startAt = 0.6;
    const endAt = 19.0;
    const fadeIn = 0.8;
    const fadeOut = 0.8;

    try { yesAudioEl.pause(); } catch {}
    yesAudioEl.currentTime = startAt;

    fadeGainTo(yesGain, 0.0001, 0.01);
    const ok = await safePlay(yesAudioEl);
    if (!ok) return;

    fadeGainTo(yesGain, 0.95, fadeIn);

    const segmentMs = Math.max(0, (endAt - startAt) * 1000);
    const fadeOutStartMs = Math.max(0, segmentMs - fadeOut * 1000);

    window.setTimeout(() => fadeGainTo(yesGain, 0.0001, fadeOut), fadeOutStartMs);

    window.setTimeout(() => {
      try { yesAudioEl.pause(); } catch {}
      window.setTimeout(() => {
        safePlay(bgAudioEl);
        fadeGainTo(bgGain, 0.22, 0.8);
      }, 120);
    }, segmentMs + 40);
  }

  function playNoClickSound() {
    unlockAudio();
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      const dur = 0.07;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.18, t0 + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1700, t0);

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, t0);
      osc.frequency.exponentialRampToValueAtTime(260, t0 + dur);

      osc.connect(gain);
      gain.connect(filter).connect(ctx.destination);

      osc.start(t0);
      osc.stop(t0 + dur);
    });
  }

  function playYesCelebrationSound() {
    unlockAudio();
    withAudio((ctx) => {
      const base = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const step = 0.09;

      const out = ctx.createGain();
      out.gain.setValueAtTime(0.0001, base);
      out.gain.exponentialRampToValueAtTime(0.22, base + 0.01);
      out.gain.exponentialRampToValueAtTime(0.0001, base + 0.60);
      out.connect(ctx.destination);

      for (let i = 0; i < notes.length; i++) {
        const t0 = base + i * step;
        const t1 = t0 + (i === notes.length - 1 ? 0.20 : 0.12);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(i === notes.length - 1 ? 0.22 : 0.15, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t1);

        const bell = ctx.createOscillator();
        bell.type = "sine";
        bell.frequency.setValueAtTime(notes[i], t0);

        bell.connect(g);
        g.connect(out);

        bell.start(t0);
        bell.stop(t1);
      }
    });
  }

  function playPopSound(type = "small", whenMs = 0) {
    unlockAudio();
    withAudio((ctx) => {
      const startAt = ctx.currentTime + Math.max(0, whenMs) / 1000;
      const dur = type === "big" ? 0.16 : 0.075;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(type === "big" ? 0.28 : 0.12, startAt + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);

      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = type === "big" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(type === "big" ? 140 : 210, startAt);
      osc.frequency.exponentialRampToValueAtTime(type === "big" ? 70 : 120, startAt + dur);

      osc.connect(gain);
      osc.start(startAt);
      osc.stop(startAt + dur);
    });
  }

  function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }
  function getSafeInsets() {
    const cs = getComputedStyle(document.documentElement);
    return {
      top: parseFloat(cs.getPropertyValue("--safe-top")) || 0,
      right: parseFloat(cs.getPropertyValue("--safe-right")) || 0,
      bottom: parseFloat(cs.getPropertyValue("--safe-bottom")) || 0,
      left: parseFloat(cs.getPropertyValue("--safe-left")) || 0,
    };
  }
  function getViewport() {
    const vv = window.visualViewport;
    if (vv) return { left: vv.offsetLeft, top: vv.offsetTop, width: vv.width, height: vv.height };
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  }
  function clampToViewport(x, y, bw, bh) {
    const vp = getViewport();
    const ins = getSafeInsets();
    const pad = 10;

    const minX = vp.left + ins.left + pad;
    const maxX = vp.left + vp.width - ins.right - pad - bw;
    const minY = vp.top + ins.top + pad;
    const maxY = vp.top + vp.height - ins.bottom - pad - bh;

    return { x: Math.floor(clamp(x, minX, maxX)), y: Math.floor(clamp(y, minY, maxY)) };
  }

  function triggerHeartbeat() {
    yesBtn.classList.remove("heartbeat");
    void yesBtn.offsetWidth;
    yesBtn.classList.add("heartbeat");
  }

  const SLOT_PCTS = [
    { x: 0.08, y: 0.34 },
    { x: 0.60, y: 0.34 },
    { x: 0.08, y: 0.50 },
    { x: 0.60, y: 0.50 },
    { x: 0.08, y: 0.66 },
    { x: 0.60, y: 0.66 },
    { x: 0.18, y: 0.80 },
    { x: 0.52, y: 0.80 },
  ];

  let slotBag = [];
  function refillSlotBag() {
    slotBag = Array.from({ length: SLOT_PCTS.length }, (_, i) => i);
    for (let i = slotBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slotBag[i], slotBag[j]] = [slotBag[j], slotBag[i]];
    }
  }

  function positionNoAtPlaceholder() {
    const ph = noPlaceholder.getBoundingClientRect();
    const br = noBtn.getBoundingClientRect();
    const bw = Math.max(br.width || 0, ph.width || 160);
    const bh = Math.max(br.height || 0, ph.height || 66);
    const pos = clampToViewport(ph.left, ph.top, bw, bh);
    noBtn.style.left = `${pos.x}px`;
    noBtn.style.top = `${pos.y}px`;
  }

  function teleportNoToSlot() {
    const oldRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const bw = Math.max(oldRect.width, 160);
    const bh = Math.max(oldRect.height, 66);

    if (!slotBag.length) refillSlotBag();

    let chosen = null;
    for (let tries = 0; tries < SLOT_PCTS.length + 2; tries++) {
      if (!slotBag.length) refillSlotBag();
      const idx = slotBag.shift();
      const slot = SLOT_PCTS[idx];

      const vp = getViewport();
      const baseX = vp.left + slot.x * vp.width;
      const baseY = vp.top + slot.y * vp.height;

      const x = baseX + (Math.random() * 18 - 9);
      const y = baseY + (Math.random() * 14 - 7);
      const pos = clampToViewport(x, y, bw, bh);

      const overlapsYes = rectsOverlap(pos.x, pos.y, bw, bh, yesRect.left, yesRect.top, yesRect.width, yesRect.height);
      if (!overlapsYes) { chosen = pos; break; }
    }

    if (!chosen) {
      const vp = getViewport();
      chosen = clampToViewport(vp.left + 16, vp.top + vp.height * 0.78, bw, bh);
    }

    noBtn.style.left = `${chosen.x}px`;
    noBtn.style.top = `${chosen.y}px`;
  }

  // ===== Burst + clear =====
  const canvas = document.getElementById("burst");
  const ctx2d = canvas.getContext("2d");
  let burstRaf = null;

  const EMOJIS = ["💗","💞","💘","💕","💝","✨"];
  const SPRITES = new Map();

  function dprCap() { return Math.min(2, window.devicePixelRatio || 1); }
  function resizeCanvas() {
    const dpr = dprCap();
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spriteKey(emoji, size) { return `${emoji}|${Math.round(size)}`; }
  function getEmojiSprite(emoji, size) {
    const key = spriteKey(emoji, size);
    if (SPRITES.has(key)) return SPRITES.get(key);

    const c = document.createElement("canvas");
    const pad = 12;
    const w = Math.ceil(size + pad * 2);
    c.width = w; c.height = w;
    const g = c.getContext("2d");
    g.font = `${size}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(emoji, w / 2, w / 2);
    SPRITES.set(key, c);
    return c;
  }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function getBurstOrigin() {
    const r = bigTitle.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function addLandedEmoji(x, y, emoji, size) {
    const el = document.createElement("div");
    el.className = "landedEmoji";
    el.textContent = emoji;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.round(size)}px`;
    landedEmojis.appendChild(el);
  }

  function spawnTwinkles(origin) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = 3 + Math.floor(Math.random() * 2);
    const glyphs = ["✨", "✦", "✧", "💫"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "twinkle";
      el.textContent = pick(glyphs);
      const dx = (Math.random() * 120 - 60);
      const dy = (Math.random() * 60 - 30);
      el.style.left = `${origin.x + dx}px`;
      el.style.top = `${origin.y + dy}px`;
      el.style.fontSize = `${12 + Math.random() * 10}px`;
      el.style.animationDelay = `${i * 90}ms`;
      twinkles.appendChild(el);
      window.setTimeout(() => el.remove(), 1400);
    }
  }

  function startBurst() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (burstRaf) cancelAnimationFrame(burstRaf);
    resizeCanvas();

    const origin = getBurstOrigin();
    spawnTwinkles(origin);

    const LAND_COUNT = 8;
    const FALL_COUNT = 6;
    const FLOAT_COUNT = 22;

    const parts = [];
    const start = performance.now();

    for (let i = 0; i < LAND_COUNT; i++) {
      const size = 16 + Math.random() * 10;
      parts.push({
        type: "land",
        emoji: pick(EMOJIS),
        size,
        x: origin.x, y: origin.y,
        ox: origin.x, oy: origin.y,
        tx: origin.x + (Math.random() * 280 - 140),
        ty: origin.y + (Math.random() * 360 - 120),
        ttl: 1100 + Math.random() * 500,
        t: 0,
        rot: Math.random() * Math.PI,
        vr: (-0.9 + Math.random() * 1.8) * 0.02,
        alpha: 0
      });
    }

    for (let i = 0; i < FALL_COUNT; i++) {
      const size = 16 + Math.random() * 10;
      parts.push({
        type: "fall",
        emoji: pick(EMOJIS),
        size,
        x: origin.x + (Math.random() * 40 - 20),
        y: origin.y + (Math.random() * 18 - 6),
        vx: (Math.random() * 1.0 - 0.5),
        vy: (-1.2 - Math.random() * 1.4),
        g: 0.065 + Math.random() * 0.04,
        ttl: 2400 + Math.random() * 900,
        rot: Math.random() * Math.PI,
        vr: (-0.9 + Math.random() * 1.8) * 0.02,
        alpha: 1
      });
    }

    for (let i = 0; i < FLOAT_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const size = 14 + Math.random() * 10;
      parts.push({
        type: "float",
        emoji: pick(EMOJIS),
        size,
        x: origin.x + (Math.random() * 30 - 15),
        y: origin.y + (Math.random() * 22 - 10),
        vx: Math.cos(a) * (0.6 + Math.random() * 1.6),
        vy: Math.sin(a) * (0.6 + Math.random() * 1.6) - 1.2,
        drag: 0.992,
        ttl: 2200 + Math.random() * 1100,
        rot: Math.random() * Math.PI,
        vr: (-0.9 + Math.random() * 1.8) * 0.02,
        alpha: 1
      });
    }

    function drawEmoji(p) {
      const spr = getEmojiSprite(p.emoji, p.size);
      ctx2d.save();
      ctx2d.globalAlpha = p.alpha;
      ctx2d.translate(p.x, p.y);
      ctx2d.rotate(p.rot);
      ctx2d.drawImage(spr, -spr.width / 2, -spr.height / 2);
      ctx2d.restore();
    }

    function tick(now) {
      const elapsed = now - start;
      ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = 0;

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];

        if (p.type === "land") {
          p.t = clamp(elapsed / p.ttl, 0, 1);
          const tt = easeOutCubic(p.t);
          const arc = Math.sin(tt * Math.PI) * 22;

          p.x = p.ox + (p.tx - p.ox) * tt;
          p.y = p.oy + (p.ty - p.oy) * tt - arc;
          p.rot += p.vr;
          p.alpha = tt < 0.1 ? (tt / 0.1) : 1;

          if (p.t >= 1) {
            addLandedEmoji(p.tx, p.ty, p.emoji, p.size);
            parts.splice(i, 1);
            continue;
          }
          drawEmoji(p);
          alive += 1;
          continue;
        }

        if (p.type === "fall") {
          const t = clamp(elapsed / p.ttl, 0, 1);
          p.vy += p.g;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;

          const fade = t < 0.7 ? 1 : (1 - (t - 0.7) / 0.3);
          p.alpha = clamp(fade, 0, 1);

          drawEmoji(p);
          if (t >= 1 || p.alpha <= 0.03) parts.splice(i, 1);
          else alive += 1;
          continue;
        }

        if (p.type === "float") {
          const t = clamp(elapsed / p.ttl, 0, 1);
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;

          const fade = t < 0.65 ? 1 : (1 - (t - 0.65) / 0.35);
          p.alpha = clamp(fade, 0, 1);

          drawEmoji(p);
          if (t >= 1 || p.alpha <= 0.03) parts.splice(i, 1);
          else alive += 1;
          continue;
        }
      }

      if (alive > 0) burstRaf = requestAnimationFrame(tick);
      else { ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight); burstRaf = null; }
    }
    burstRaf = requestAnimationFrame(tick);
  }

  let isClearing = false;
  function getCenter(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function poofAt(x, y, big = false) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.createElement("div");
    el.className = big ? "poof big" : "poof";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const ring = document.createElement("div");
    ring.className = "ring";
    el.appendChild(ring);

    const particles = big ? ["✨", "💥", "💗", "💞", "💫"] : ["✨", "💨", "💗", "💞"];
    const count = big ? 8 : 5;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "p";
      p.textContent = particles[Math.floor(Math.random() * particles.length)];
      const spread = big ? 120 : 84;
      const dySpread = big ? 110 : 74;
      p.style.setProperty("--dx", `${Math.floor(-spread/2 + Math.random() * spread)}px`);
      p.style.setProperty("--dy", `${Math.floor(-dySpread/2 + Math.random() * dySpread)}px`);
      p.style.animationDelay = `${i * (big ? 14 : 16)}ms`;
      el.appendChild(p);
    }

    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), big ? 760 : 650);
  }

  function clearLandedEmojisSmooth(triggerPoint) {
    const nodes = Array.from(landedEmojis.querySelectorAll(".landedEmoji"));
    if (!nodes.length || isClearing) return;
    isClearing = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const baseDelay = 120;
    const lastIdx = nodes.length - 1;

    if (triggerPoint) poofAt(triggerPoint.x, triggerPoint.y, false);

    nodes.forEach((node, i) => {
      const delay = i * baseDelay;
      const isLast = i === lastIdx;
      const center = getCenter(node);

      playPopSound(isLast ? "big" : "small", delay);
      window.setTimeout(() => poofAt(center.x, center.y, isLast), delay);

      if (prefersReduced) {
        window.setTimeout(() => {
          node.remove();
          if (i === lastIdx) isClearing = false;
        }, delay);
        return;
      }

      const scaleUp = isLast ? 1.9 : 1.25;
      const scaleDown = isLast ? 0.08 : 0.18;
      const dur = isLast ? 520 : 360;
      const base = node.style.transform || "translate(-50%, -50%)";

      node.animate(
        [
          { opacity: 1, transform: `${base} scale(1)` },
          { opacity: 1, transform: `${base} scale(${scaleUp})` },
          { opacity: 0, transform: `${base} scale(${scaleDown})` }
        ],
        { duration: dur, delay, easing: "cubic-bezier(.18,.9,.25,1)", fill: "forwards" }
      ).onfinish = () => {
        node.remove();
        if (i === lastIdx) isClearing = false;
      };
    });
  }

  function setupClearGesture() {
    document.addEventListener("pointerdown", (e) => {
      if (!successView.classList.contains("active")) return;
      clearLandedEmojisSmooth({ x: e.clientX, y: e.clientY });
    }, { passive: true });
  }

  function spawnFloaters() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const emojis = ["💗", "💞", "💘", "💕", "💝", "✨", "🌸"];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "floater";
      el.textContent = pick(emojis);
      el.style.setProperty("--x0", `${Math.floor(Math.random() * 100)}vw`);
      el.style.setProperty("--x1", `${Math.floor(Math.random() * 100)}vw`);
      el.style.setProperty("--dur", `${10 + Math.random() * 10}s`);
      el.style.left = "0";
      el.style.top = "0";
      el.style.animationDelay = `${-Math.random() * 12}s`;
      floaters.appendChild(el);
    }
  }

  let noClicks = 0;
  let afterNo = false;
  let lastNoFire = 0;

  function onNoAttempt(e) {
    e.preventDefault();
    unlockAudio();

    const now = performance.now();
    if (now - lastNoFire < 180) return;
    lastNoFire = now;

    playNoClickSound();
    showBubble(pick(noTexts));

    noClicks += 1;
    hintText.textContent = hintBase[Math.min(noClicks, hintBase.length - 1)];

    if (!afterNo) { afterNo = true; buttons.classList.add("after-no"); }
    triggerHeartbeat();
    swapSticker(nextAfterSticker(noClicks));
    teleportNoToSlot();
  }

  function hideNoForever() {
    noBtn.disabled = true;
    noBtn.style.display = "none";
    noBtn.style.pointerEvents = "none";
  }

  async function switchToSuccess() {
    unlockAudio();
    playYesCelebrationSound();
    await playYesSongSegment();

    hideNoForever();
    promptView.classList.remove("active");
    successView.classList.add("active");
    startBurst();
  }

  function init() {
    resolveGfPhoto();
    spawnFloaters();
    setupClearGesture();

    setSticker(STICKER_BEFORE);

    overlay.appendChild(noBtn);
    refillSlotBag();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        positionNoAtPlaceholder();
      });
    });

    yesBtn.addEventListener("click", switchToSuccess);
    noBtn.addEventListener("pointerdown", onNoAttempt, { passive: false });
    noBtn.addEventListener("click", onNoAttempt, { passive: false });

    armFirstGestureAudio();

    window.addEventListener("resize", () => {
      if (!afterNo) positionNoAtPlaceholder();
      resizeCanvas();
    });
    window.visualViewport?.addEventListener("resize", () => {
      if (!afterNo) positionNoAtPlaceholder();
      resizeCanvas();
    });
    window.visualViewport?.addEventListener("scroll", () => {
      if (!afterNo) positionNoAtPlaceholder();
    });
  }

  init();
});
