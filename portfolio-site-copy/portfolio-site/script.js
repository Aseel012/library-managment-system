/* ============================================================
   ASEEL PORTFOLIO — SCRIPT JS
   ============================================================ */

// ── THEME ────────────────────────────────────────────────────
const root = document.documentElement;
const _sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
const _moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

function playThemeSound() {
  try {
    if (!window._themeAc) window._themeAc = new (window.AudioContext || window.webkitAudioContext)();
    const ac = window._themeAc;
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine';
    o.frequency.value = root.classList.contains('dark') ? 440 : 523.25;
    g.gain.setValueAtTime(.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.06, ac.currentTime + .02);
    g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .18);
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + .2);
  } catch (e) {}
}

function applyTheme(dark, animate = true) {
  if (animate) {
    root.classList.add('theme-animate');
    root.classList.toggle('dark', dark);
    const el = document.getElementById('iconMoon');
    if (el) el.innerHTML = dark ? _sunSVG : _moonSVG;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    playThemeSound();
    setTimeout(() => root.classList.remove('theme-animate'), 320);
  } else {
    root.classList.toggle('dark', dark);
    const el = document.getElementById('iconMoon');
    if (el) el.innerHTML = dark ? _sunSVG : _moonSVG;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const sys   = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved === 'dark' || (!saved && sys), false);
})();

document.getElementById('themeToggle')?.addEventListener('click', () =>
  applyTheme(!root.classList.contains('dark'), true)
);

// ── CANVAS / MP4 LOOP VIDEO BANNER ─────────────────────────────
(function initBannerVideo() {
  const video = document.getElementById('bannerVideo');
  const canvas = document.getElementById('bannerCanvas');
  
  if (video) {
    // Restore video time across refresh if available
    const savedTime = sessionStorage.getItem('banner_video_time');
    if (savedTime && !isNaN(savedTime)) {
      video.currentTime = parseFloat(savedTime);
    }
    
    // Play video smoothly
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to canvas particle loop if video fails or blocked
        if (canvas) renderCanvasLoop(canvas);
      });
    }

    // Save time continuously so on refresh it continues seamlessly
    video.addEventListener('timeupdate', () => {
      sessionStorage.setItem('banner_video_time', video.currentTime);
    });
  } else if (canvas) {
    renderCanvasLoop(canvas);
  }
})();

function renderCanvasLoop(canvas) {
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth || 880;
  let h = canvas.height = canvas.offsetHeight || 240;

  window.addEventListener('resize', () => {
    w = canvas.width = canvas.offsetWidth || 880;
    h = canvas.height = canvas.offsetHeight || 240;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.6 + 0.2
  }));

  let t = 0;
  function animate() {
    t += 0.01;
    ctx.fillStyle = root.classList.contains('dark') ? '#0c0d10' : '#111319';
    ctx.fillRect(0, 0, w, h);

    // Glowing motion mesh
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha * 0.8})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist/110) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ── MOBILE NAV & MORE DROPDOWN ───────────────────────────────
const navToggle  = document.getElementById('navToggle');
const navMobile  = document.getElementById('navMobile');

function closeMob() {
  navMobile?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', e => {
  e.stopPropagation();
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

document.addEventListener('click', e => {
  if (navMobile && navToggle && !navMobile.contains(e.target) && !navToggle.contains(e.target)) closeMob();
  document.querySelectorAll('.nav-more.open').forEach(el => {
    if (!el.contains(e.target)) el.classList.remove('open');
  });
});

document.querySelectorAll('.nav-more > button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const parent = btn.closest('.nav-more');
    const isOpen = parent.classList.contains('open');
    document.querySelectorAll('.nav-more.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) parent.classList.add('open');
  });
});

// ── COMMAND PALETTE ──────────────────────────────────────────
const cmdOverlay = document.getElementById('cmdOverlay');
const cmdSearch  = document.getElementById('cmdSearch');
let cmdFocusIdx  = -1;

function openCmd() {
  cmdOverlay?.classList.add('open');
  cmdSearch && setTimeout(() => cmdSearch.focus(), 50);
  cmdFocusIdx = -1;
}
function closeCmd() {
  cmdOverlay?.classList.remove('open');
  if (cmdSearch) cmdSearch.value = '';
  cmdItems().forEach(i => i.classList.remove('focused'));
}

function cmdItems() {
  return [...(cmdOverlay?.querySelectorAll('.cmd-item') ?? [])].filter(el => el.style.display !== 'none');
}

document.querySelectorAll('.cmd-open-btn').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openCmd(); }));
cmdOverlay?.addEventListener('click', e => { if (e.target === cmdOverlay) closeCmd(); });

document.addEventListener('keydown', e => {
  const isK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
  if (isK) { e.preventDefault(); cmdOverlay?.classList.contains('open') ? closeCmd() : openCmd(); return; }

  if (cmdOverlay?.classList.contains('open')) {
    if (e.key === 'Escape') { closeCmd(); return; }

    const items = cmdItems();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[cmdFocusIdx]?.classList.remove('focused');
      cmdFocusIdx = Math.min(cmdFocusIdx + 1, items.length - 1);
      items[cmdFocusIdx]?.classList.add('focused');
      items[cmdFocusIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[cmdFocusIdx]?.classList.remove('focused');
      cmdFocusIdx = Math.max(cmdFocusIdx - 1, 0);
      items[cmdFocusIdx]?.classList.add('focused');
      items[cmdFocusIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const focused = items[cmdFocusIdx];
      if (focused) { focused.click(); closeCmd(); }
    }
    return;
  }

  // Keyboard shortcuts when palette is closed
  if (e.shiftKey && !e.metaKey && !e.ctrlKey) {
    const expTarget = document.getElementById('experience') ? '#experience' : 'experience.html';
    const map = {
      'E': expTarget, 'P': 'projects.html',
      'B': 'favourites.html', 'O': 'https://github.com/aseel012',
      'S': 'ides.html',
      'T': () => applyTheme(false, true),
      'D': () => applyTheme(true, true),
      'Y': () => applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches, true),
      'C': () => {
        navigator.clipboard.writeText(location.href).catch(() => {});
        showToast('Link copied to clipboard!');
      }
    };
    const action = map[e.key.toUpperCase()];
    if (action) {
      e.preventDefault();
      if (typeof action === 'function') action();
      else if (action.startsWith('#')) document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' });
      else location.href = action;
    }
  }
});

cmdSearch?.addEventListener('input', () => {
  const q = cmdSearch.value.toLowerCase().trim();
  cmdOverlay?.querySelectorAll('.cmd-item').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
  cmdFocusIdx = -1;
});

cmdOverlay?.querySelectorAll('[data-action]').forEach(el => {
  el.addEventListener('click', e => {
    const a = el.dataset.action;
    if (a === 'copy-link') {
      e.preventDefault();
      navigator.clipboard.writeText(location.href).catch(() => {});
      showToast('Link copied!');
      closeCmd();
    } else if (a === 'light') { e.preventDefault(); applyTheme(false, true); closeCmd(); }
    else if (a === 'dark')  { e.preventDefault(); applyTheme(true, true);  closeCmd(); }
    else if (a === 'sys')   {
      e.preventDefault();
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches, true);
      closeCmd();
    }
  });
});

// ── DISCORD COPY ─────────────────────────────────────────────
document.getElementById('discordBtn')?.addEventListener('click', e => {
  e.preventDefault();
  navigator.clipboard.writeText('loser_enzo').then(() => showToast('Discord "loser_enzo" copied!'))
    .catch(() => showToast('Discord: loser_enzo'));
});

// ── MAIL COPY ────────────────────────────────────────────────
document.getElementById('mailBtn')?.addEventListener('click', e => {
  e.preventDefault();
  navigator.clipboard.writeText('shaikhmdaseel@gmail.com').then(() => showToast('Email copied!')).catch(() => {});
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2500);
}

// ── TECH STACK TABS ───────────────────────────────────────────
document.querySelectorAll('.tab-row .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-row .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.tech-pill').forEach(p => {
      p.classList.toggle('hidden', f !== 'all' && p.dataset.cat !== f);
    });
  });
});

// ── SYNTH MELODY (tech stack hover) ──────────────────────────
let ac = null, soundOn = true;
const notes = [261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880];
const _noteOnSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
const _noteOffSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>';

function updateSoundBtn() {
  const btn = document.getElementById('soundBtn');
  if (!btn) return;
  btn.innerHTML = soundOn ? _noteOnSVG : _noteOffSVG;
  btn.classList.toggle('off', !soundOn);
  btn.title = soundOn ? 'Mute tech sounds' : 'Enable tech sounds';
}
updateSoundBtn();

function note(freq) {
  if (!soundOn) return;
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.09, ac.currentTime + .01);
    g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .24);
    o.connect(g).connect(ac.destination);
    o.start(); o.stop(ac.currentTime + .25);
  } catch(e) {}
}

document.querySelectorAll('.tech-pill').forEach((p, i) =>
  p.addEventListener('mouseenter', () => note(notes[i % notes.length]))
);

document.getElementById('soundBtn')?.addEventListener('click', () => {
  soundOn = !soundOn;
  updateSoundBtn();
});

// ── GITHUB HEATMAP ────────────────────────────────────────────
(function heatmap() {
  const grid   = document.getElementById('heatmapGrid');
  const months = document.getElementById('heatmapMonths');
  const label  = document.getElementById('contribCount');
  if (!grid) return;

  const MN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const WEEKS = 52, DAYS = 7;
  const today = new Date();
  const end   = new Date(today); end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);   start.setDate(start.getDate() - (WEEKS * DAYS - 1));

  let total = 0, lastM = '';
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(start); date.setDate(start.getDate() + w*DAYS + d);
      const cell = document.createElement('i');
      if (date <= today) {
        const seed = date.getFullYear()*400 + date.getMonth()*31 + date.getDate();
        const r = Math.abs(Math.sin(seed)*10000) % 1;
        const lvl = r > .82 ? 4 : r > .65 ? 3 : r > .45 ? 2 : r > .28 ? 1 : 0;
        if (lvl) { cell.className = 'l' + lvl; total += lvl * 2 + Math.floor(r * 4); }
        cell.title = date.toISOString().slice(0,10) + ': ' + (lvl*3) + ' contributions';
      } else { cell.style.visibility = 'hidden'; }
      grid.appendChild(cell);

      if (d === 0 && months) {
        const m = MN[date.getMonth()];
        if (m !== lastM) {
          const s = document.createElement('span');
          s.textContent = m; months.appendChild(s); lastM = m;
        }
      }
    }
  }
  if (label) label.textContent = (total + 142) + ' contributions for @Aseel012';
})();

// ── LIVE GITHUB DATA ──────────────────────────────────────────
fetch('https://api.github.com/users/Aseel012')
  .then(r => r.json())
  .then(d => {
    document.querySelectorAll('.gh-repos').forEach(el => el.textContent = d.public_repos ?? 18);
    document.querySelectorAll('.gh-followers').forEach(el => el.textContent = d.followers ?? 4);
    document.querySelectorAll('.gh-bio').forEach(el => el.textContent = d.bio || el.textContent);
    document.querySelectorAll('.gh-avatar').forEach(el => {
      if (el.tagName !== 'IMG' || el.dataset.keepLocal === 'true') return;
      el.src = d.avatar_url;
    });
  })
  .catch(() => {});

// ── PROJECT ACCORDION (dropdown on click) ─────────────────────
const PROJ_DATA = {
  shareyou: {
    name: 'ShareYou — Private Chat',
    desc: 'A private messaging app focused on simple, secure conversations — built as a full-stack chat experience with real-time delivery and a clean UI.',
    tags: ['React','Node.js','WebSockets','MongoDB'],
    features: [
      'Private one-to-one and group conversations.',
      'Real-time message delivery and read states.',
      'Auth-backed sessions and user discovery.',
      'Responsive layout for mobile and desktop.',
    ],
    live: 'https://github.com/Aseel012/shareyou',
    liveLabel: 'View on GitHub ↗',
  },
  removeanything: {
    name: 'RemoveAnything.in — AI Image Processing',
    desc: 'AI-powered image background removal and object erasing tool. Built with Docker containerization, processing 500+ images to date. V2 with improved UI is in active development.',
    tags: ['Docker','Python','Flask','AI/ML','React'],
    features: [
      '500+ images processed with high accuracy AI model.',
      'Containerized with Docker for scalable deployment.',
      'Object detection + selective background removal.',
      'V2 in development with redesigned UI and batch processing.',
    ],
    live: 'https://removeanything.in',
    liveLabel: 'Visit Live Site ↗',
  },
  realestate: {
    name: 'Real Estate AI — Smart Property Assistant',
    desc: 'An AI-powered real estate assistant that handles intelligent property calling, note sharing, and lead management. Built as a full-stack solution combining AI calling with CRM functionality.',
    tags: ['Python','Flask','Twilio','OpenAI','React','MongoDB'],
    features: [
      'AI-powered voice calling for property inquiries.',
      'Real-time note sharing between agents and clients.',
      'Lead scoring and follow-up automation pipeline.',
      'Integrated dashboard for property tracking.',
    ],
    live: 'https://github.com/aseel012',
    liveLabel: 'View on GitHub ↗',
  },
  receiptapi: {
    name: 'Receipt API — Backend Engineering',
    desc: 'A learning-focused backend project building a complete RESTful API for receipt processing, storage, and analytics — with authentication, CRUD operations, and structured data.',
    tags: ['Node.js','Express.js','MongoDB','JWT','Postman'],
    features: [
      'Full REST API with authentication via JWT tokens.',
      'Structured data schemas for receipt parsing and storage.',
      'Postman collection for comprehensive API documentation.',
      'Error handling middleware and rate limiting.',
    ],
    live: 'https://github.com/aseel012',
    liveLabel: 'View on GitHub ↗',
  },
  carousel: {
    name: 'AI Carousel Design System',
    desc: 'Recently shipped — an accessible AI-driven carousel component and design system with keyboard navigation, touch gestures, and reusable TypeScript/React primitives.',
    tags: ['TypeScript','React','Tailwind CSS','Accessibility','Design System'],
    features: [
      'Smooth infinite carousel with native touch and keyboard support.',
      'Reusable design tokens and component architecture.',
      'WCAG-compliant focus management and ARIA patterns.',
      'Built for production apps and open-sourced on GitHub.',
    ],
    live: 'https://github.com/Aseel012/AI-Carousel-Design-System',
    liveLabel: 'View on GitHub ↗',
  },
  python: {
    name: 'Python Learning',
    desc: 'A dedicated repository for my daily Python learning, experiments, and fun projects. I update this repository daily with new scripts and concepts I am exploring.',
    tags: ['Python', 'Learning', 'Daily', 'Scripts'],
    features: [
      'Daily updates with new Python scripts and learning notes.',
      'Exploration of core Python concepts and libraries.',
      'Small fun projects built from scratch.',
      'Public log of my continuous learning journey.',
    ],
    live: 'https://github.com/Aseel012/python',
    liveLabel: 'View on GitHub ↗',
  }
};

function buildProjExpand(card, key) {
  const d = PROJ_DATA[key];
  if (!d) return;
  let panel = card.querySelector('.pcard-expand');
  if (panel) return;

  panel = document.createElement('div');
  panel.className = 'pcard-expand';
  panel.innerHTML = `
    <div class="pcard-expand-inner">
      <p class="pcard-expand-desc">${d.desc}</p>
      <h4>Key Features</h4>
      <ul>${d.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <div class="tag-row">${d.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="pcard-expand-actions">
        <a href="${d.live}" target="_blank" rel="noopener" class="pill" style="background:var(--text);color:var(--bg);border-color:var(--text);">${d.liveLabel || 'View Project ↗'}</a>
      </div>
    </div>`;
  card.appendChild(panel);
}

function toggleProj(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.pcard.open').forEach(c => {
    c.classList.remove('open');
    c.querySelector('.pcard-trigger')?.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    buildProjExpand(card, card.dataset.proj);
    card.classList.add('open');
    card.querySelector('.pcard-trigger')?.setAttribute('aria-expanded', 'true');
  }
}

document.querySelectorAll('[data-proj]').forEach(card => {
  if (!card.querySelector('.pcard-trigger')) {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'pcard-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    while (card.firstChild) trigger.appendChild(card.firstChild);
    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('class', 'pcard-chevron');
    chevron.setAttribute('width', '18');
    chevron.setAttribute('height', '18');
    chevron.setAttribute('viewBox', '0 0 24 24');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor');
    chevron.setAttribute('stroke-width', '2');
    chevron.innerHTML = '<path d="M6 9l6 6 6-6"/>';
    trigger.querySelector('.pcard-body')?.appendChild(chevron);
    card.prepend(trigger);
  }

  card.querySelector('.pcard-trigger')?.addEventListener('click', () => toggleProj(card));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCmd();
    closeMob();
    document.querySelectorAll('.pcard.open').forEach(c => c.classList.remove('open'));
  }
});
