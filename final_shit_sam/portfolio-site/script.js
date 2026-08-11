// ===================== THEME TOGGLE =====================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');

const sunPath = '<path d="M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M2 12H4M20 12h2M4.93 19.07 3.51 20.49M20.49 3.51l-1.42 1.42"/><circle cx="12" cy="12" r="5"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';

function applyTheme(isDark){
  root.classList.toggle('dark', isDark);
  iconMoon.innerHTML = isDark ? sunPath : moonPath;
}

// default to the user's system preference; falls back to light
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark);

themeToggle.addEventListener('click', () => {
  applyTheme(!root.classList.contains('dark'));
});

// Note: to remember the choice between visits once this is hosted on your
// own domain, store it with localStorage, e.g.:
//   localStorage.setItem('theme', isDark ? 'dark' : 'light');
// and read it back on load. Left out here since localStorage isn't
// available in every preview environment.

// ===================== MOBILE NAV (hamburger -> dropdown) =====================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

function closeMobileNav(){
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navMobile.classList.remove('open');
}

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navMobile.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ===================== DESKTOP "MORE" DROPDOWN =====================
const moreBtn = document.getElementById('moreBtn');
const moreMenu = document.getElementById('moreMenu');
const moreWrap = moreBtn.closest('.nav-more');

function closeMoreMenu(){
  moreWrap.classList.remove('open');
  moreBtn.setAttribute('aria-expanded', 'false');
}

moreBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = moreWrap.classList.toggle('open');
  moreBtn.setAttribute('aria-expanded', String(isOpen));
});

// ===================== CLOSE DROPDOWNS ON OUTSIDE CLICK =====================
document.addEventListener('click', (e) => {
  if (!moreWrap.contains(e.target)) closeMoreMenu();
  if (!navMobile.contains(e.target) && !navToggle.contains(e.target)) closeMobileNav();
});

// close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeMoreMenu();
    closeMobileNav();
  }
});

// ===================== TECH STACK FILTER TABS =====================
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

// ===================== GITHUB CONTRIBUTION HEATMAP =====================
(function buildHeatmap(){
  const grid = document.getElementById('heatmapGrid');
  const monthsRow = document.getElementById('heatmapMonths');
  const countLabel = document.getElementById('contribCount');
  if (!grid) return;

  const WEEKS = 53;
  const DAYS = 7;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // start the grid exactly one year back from today, aligned to the
  // most recent Sunday so the columns read left -> right, oldest -> newest
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
        // pseudo-random but stable intensity so it looks like real activity
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

      // capture a month label the first time a new month starts a column
      if (d === 0){
        const label = monthNames[cellDate.getMonth()];
        if (label !== lastMonthLabel){
          monthLabels.push(label);
          lastMonthLabel = label;
        } else {
          monthLabels.push('');
        }
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
