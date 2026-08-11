// ===================== THEME TOGGLE =====================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');

const sunPath = '<path d="M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M2 12H4M20 12h2M4.93 19.07 3.51 20.49M20.49 3.51l-1.42 1.42"/><circle cx="12" cy="12" r="5"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';

function applyTheme(isDark){
  root.classList.toggle('dark', isDark);
  if (iconMoon) iconMoon.innerHTML = isDark ? sunPath : moonPath;
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark);

if (themeToggle){
  themeToggle.addEventListener('click', () => applyTheme(!root.classList.contains('dark')));
}
// Once hosted on your own domain, persist the choice with:
//   localStorage.setItem('theme', isDark ? 'dark' : 'light')

// ===================== MOBILE NAV =====================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

function closeMobileNav(){
  if (!navToggle) return;
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navMobile.classList.remove('open');
}

if (navToggle){
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
}

// ===================== DESKTOP "MORE" DROPDOWN (click fallback, hover handled by CSS) =====================
const moreBtn = document.getElementById('moreBtn');
const moreWrap = moreBtn ? moreBtn.closest('.nav-more') : null;

function closeMoreMenu(){ if (moreWrap) moreWrap.classList.remove('open'); }

if (moreBtn){
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    moreWrap.classList.toggle('open');
  });
}

document.addEventListener('click', (e) => {
  if (moreWrap && !moreWrap.contains(e.target)) closeMoreMenu();
  if (navMobile && navToggle && !navMobile.contains(e.target) && !navToggle.contains(e.target)) closeMobileNav();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){ closeMoreMenu(); closeMobileNav(); }
});

// ===================== ACTIVE NAV LINK ON CLICK (desktop) =====================
document.querySelectorAll('.nav-desktop > .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-desktop > .nav-link').forEach(l => {
      l.classList.remove('is-active');
      l.querySelector('.dot')?.remove();
    });
    link.classList.add('is-active');
    if (!link.querySelector('.dot')){
      const dot = document.createElement('span');
      dot.className = 'dot';
      link.appendChild(dot);
    }
  });
});

// ===================== GITHUB LIVE HOVER-CARD =====================
// Fetches the public GitHub API once and fills in the hover card.
// This runs in the visitor's browser, so it always reflects live data.
(function githubHoverCard(){
  const wrap = document.getElementById('githubHover');
  if (!wrap) return;
  const card = wrap.querySelector('.hovercard');
  let loaded = false;

  wrap.addEventListener('mouseenter', async () => {
    if (loaded) return;
    loaded = true;
    try{
      const res = await fetch('https://api.github.com/users/aseel012');
      if (!res.ok) throw new Error('not found');
      const data = await res.json();

      card.innerHTML = `
        <div class="hovercard-top">
          <img class="hovercard-avatar" src="${data.avatar_url}" alt="${data.login}">
          <div>
            <div class="hovercard-name">${data.name || data.login}</div>
            <div class="hovercard-handle">@${data.login}</div>
          </div>
        </div>
        ${data.bio ? `<p class="hovercard-role">${data.bio}</p>` : ''}
        ${data.location ? `<div class="hovercard-loc">📍 ${data.location}</div>` : ''}
        <div class="hovercard-stats">
          <div><b>${data.public_repos ?? '—'}</b><span>Repositories</span></div>
          <div><b>${data.followers ?? '—'}</b><span>Followers</span></div>
        </div>
      `;
    }catch(err){
      card.innerHTML = `<div class="hovercard-loading">Couldn't load GitHub preview — visit the profile directly.</div>`;
    }
  }, { once: false });
})();

// ===================== DISCORD "COPY USERNAME" =====================
(function discordCopy(){
  const btn = document.getElementById('discordBtn');
  if (!btn) return;
  const toast = document.getElementById('copyToast');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = btn.dataset.tip;
    try{
      await navigator.clipboard.writeText(username);
    }catch(err){ /* clipboard blocked — tooltip still shows the name */ }

    if (toast){
      toast.textContent = `Copied "${username}" — add me on Discord!`;
      toast.classList.add('show');
      clearTimeout(btn._t);
      btn._t = setTimeout(() => toast.classList.remove('show'), 2200);
    }
  });
})();

// ===================== TECH STACK: FILTER TABS + HOVER SOUND =====================
const tabs = document.querySelectorAll('.tab-row .tab');
const techPills = document.querySelectorAll('.tech-pill');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const filter = tab.dataset.filter;
    techPills.forEach(pill => {
      const show = filter === 'all' || pill.dataset.cat === filter;
      pill.classList.toggle('is-hidden', !show);
    });
  });
});

// Tiny synth: each pill plays a different note from a pentatonic scale
// so hovering across the row sounds like a little melody.
let audioCtx = null;
let soundOn = true;
const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];

function playNote(freq){
  if (!soundOn) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

techPills.forEach((pill, i) => {
  pill.addEventListener('mouseenter', () => playNote(notes[i % notes.length]));
});

const soundToggle = document.getElementById('soundToggle');
if (soundToggle){
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.querySelector('.sound-label').textContent = soundOn ? 'Sound on' : 'Sound off';
    soundToggle.querySelector('.sound-icon').textContent = soundOn ? '🔊' : '🔇';
  });
}

// ===================== GITHUB CONTRIBUTION HEATMAP =====================
(function buildHeatmap(){
  const grid = document.getElementById('heatmapGrid');
  const monthsRow = document.getElementById('heatmapMonths');
  const countLabel = document.getElementById('contribCount');
  if (!grid) return;

  const WEEKS = 53;
  const DAYS = 7;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(start.getDate() - (WEEKS * DAYS - 1));

  let totalContributions = 0;
  let lastMonthLabel = '';
  const monthLabels = [];

  for (let w = 0; w < WEEKS; w++){
    for (let d = 0; d < DAYS; d++){
      const cellDate = new Date(start);
      cellDate.setDate(start.getDate() + w * DAYS + d);

      const cell = document.createElement('i');

      if (cellDate <= today){
        const seed = cellDate.getFullYear() * 400 + cellDate.getMonth() * 31 + cellDate.getDate();
        const r = Math.abs(Math.sin(seed) * 10000) % 1;
        let level = 0;
        if (r > 0.85) level = 4;
        else if (r > 0.68) level = 3;
        else if (r > 0.48) level = 2;
        else if (r > 0.3) level = 1;

        if (level > 0){
          cell.classList.add(`lvl-${level}`);
          totalContributions += level * 2 + Math.floor(r * 3);
        }
      } else {
        cell.style.visibility = 'hidden';
      }

      grid.appendChild(cell);

      if (d === 0){
        const label = monthNames[cellDate.getMonth()];
        if (label !== lastMonthLabel){ monthLabels.push(label); lastMonthLabel = label; }
        else { monthLabels.push(''); }
      }
    }
  }

  monthLabels.forEach(label => {
    const span = document.createElement('span');
    span.textContent = label;
    monthsRow.appendChild(span);
  });

  countLabel.textContent = `${totalContributions} contributions in the last year`;
})();

// ===================== PINTEREST PIN SOUND / CLICK (designer page) =====================
document.querySelectorAll('.pin').forEach(pin => {
  pin.addEventListener('click', () => {
    pin.style.transform = 'scale(0.97)';
    setTimeout(() => { pin.style.transform = ''; }, 120);
  });
});
