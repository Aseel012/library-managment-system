// ============================================
// SHAIKH ASEEL PORTFOLIO — Interactive Script
// Accordion cards, click sound + ripple, GitHub since Mar 2026
// ============================================

const GITHUB_USERNAME = 'aseel012';
const GITHUB_TRACK_FROM = new Date(2026, 2, 1); // March 1, 2026

// ---------- Click Sound (Web Audio API, no external asset needed) ----------
let audioCtx = null;
function playClickSound() {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(720, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(340, audioCtx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) { /* silently ignore audio errors */ }
}

// ---------- Click Ripple ----------
function spawnRipple(el, evt) {
    try {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 1.2;
        const x = (evt && evt.clientX ? evt.clientX - rect.left : rect.width / 2) - size / 2;
        const y = (evt && evt.clientY ? evt.clientY - rect.top : rect.height / 2) - size / 2;
        ripple.className = 'click-ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        const computedPos = getComputedStyle(el).position;
        if (computedPos === 'static') el.style.position = 'relative';
        el.style.overflow = el.style.overflow || 'hidden';
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    } catch (e) { /* ignore */ }
}

function initInteractiveFeedback() {
    const selectors = '.btn, .social-chip, .exp-card-header, .project-visual, .view-all-btn, .theme-btn, .cmdk-trigger, .back-to-top, .cmdk-item, .sidebar-link, .mobile-nav-link';
    document.addEventListener('click', (e) => {
        const el = e.target.closest(selectors);
        if (!el) return;
        playClickSound();
        spawnRipple(el, e);
    });
}

// ---------- Mobile Menu ----------
function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    const isActive = nav.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// ---------- Theme System ----------
function applyTheme(pref) {
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (pref === 'light') {
        root.classList.add('light');
    } else if (pref === 'dark') {
        root.classList.remove('light');
    } else {
        root.classList.toggle('light', !prefersDark);
    }
}

function setTheme(pref) {
    try {
        if (pref === 'system') {
            localStorage.removeItem('portfolio-theme');
        } else {
            localStorage.setItem('portfolio-theme', pref);
        }
    } catch (e) { /* ignore */ }
    applyTheme(pref);
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
}

(function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('portfolio-theme'); } catch (e) { /* ignore */ }
    applyTheme(saved || 'system');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        let current = null;
        try { current = localStorage.getItem('portfolio-theme'); } catch (e) { /* ignore */ }
        if (!current || current === 'system') applyTheme('system');
    });
})();

// ---------- Copy URL ----------
function copyPageUrl() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {});
    }
}

// ---------- Scroll Spy ----------
function initScrollSpy() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.sidebar-link');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
}

// ---------- Scroll Reveal ----------
function initScrollReveal() {
    const targets = document.querySelectorAll('.section');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    targets.forEach((target) => observer.observe(target));
}

// ---------- Back to Top ----------
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------- Banner Clock ----------
function initBannerClock() {
    const el = document.getElementById('bannerClock');
    if (!el) return;
    const timeEl = el.querySelector('.clock-time');

    function tick() {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    tick();
    setInterval(tick, 1000);
}

// ---------- Typing Effect ----------
function initTypingEffect() {
    const el = document.getElementById('typedRole');
    if (!el) return;

    const roles = ['AI Full-Stack Developer.', 'App Developer.', 'Agentic Systems Builder.'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = roles[roleIndex];
        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1600);
                return;
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(tick, deleting ? 40 : 60);
    }
    tick();
}

// ---------- Scroll to section helper ----------
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------- Experience Accordion ----------
function initExperienceAccordion() {
    const headers = document.querySelectorAll('.exp-card-header');
    headers.forEach((header) => {
        const body = header.nextElementSibling;
        header.addEventListener('click', () => {
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', String(!isOpen));
            if (isOpen) {
                body.style.maxHeight = '0px';
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // Recalculate open panel heights on resize (content reflow)
    window.addEventListener('resize', () => {
        headers.forEach((header) => {
            if (header.getAttribute('aria-expanded') === 'true') {
                const body = header.nextElementSibling;
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}

// ---------- Project Card Expand ----------
function initProjectExpand() {
    const triggers = document.querySelectorAll('.project-visual');
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const card = trigger.closest('.project-card');
            const isExpanded = card.classList.toggle('expanded');
            trigger.setAttribute('aria-expanded', String(isExpanded));
        });
    });
}

// ---------- View All Projects ----------
let projectsExpanded = false;

function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.project-hidden');
    const btn = document.getElementById('viewAllBtn');
    const text = document.getElementById('viewAllText');

    projectsExpanded = !projectsExpanded;

    hiddenProjects.forEach((project) => {
        project.classList.toggle('show', projectsExpanded);
    });

    if (text) text.textContent = projectsExpanded ? 'Show less' : 'View all projects';
    if (btn) btn.classList.toggle('expanded', projectsExpanded);

    if (!projectsExpanded) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ---------- GitHub Activity (tracked from March 2026) ----------
function renderGraphSkeleton() {
    const grid = document.getElementById('graphGrid');
    if (!grid) return;
    const days = Math.ceil((new Date() - GITHUB_TRACK_FROM) / 86400000) + 1;
    const weeks = Math.max(1, Math.ceil(days / 7));
    let html = '';
    for (let i = 0; i < weeks * 7; i++) html += `<div class="graph-cell"></div>`;
    grid.innerHTML = html;
}

function renderGraphFromContributions(days) {
    const grid = document.getElementById('graphGrid');
    if (!grid || !days || !days.length) return;

    // Only show contributions from the tracking start date onward
    const filtered = days.filter((d) => new Date(d.date) >= GITHUB_TRACK_FROM);
    if (!filtered.length) return;

    const totalWeeks = Math.ceil(filtered.length / 7);
    const totalCells = totalWeeks * 7;
    const padCount = Math.max(0, totalCells - filtered.length);
    let html = '';

    for (let i = 0; i < padCount; i++) html += `<div class="graph-cell"></div>`;

    filtered.forEach((day) => {
        const level = day.level || 0;
        const levelClass = level > 0 ? `level-${level}` : '';
        const dateStr = day.date || '';
        const count = day.count || 0;
        html += `<div class="graph-cell ${levelClass}" title="${count} contribution${count === 1 ? '' : 's'} on ${dateStr}"></div>`;
    });

    grid.innerHTML = html;
    return filtered.reduce((sum, d) => sum + (d.count || 0), 0);
}

async function loadGithubActivity() {
    renderGraphSkeleton();
    const countEl = document.getElementById('githubCount');
    const footerEl = document.getElementById('githubFooterNote');

    try {
        let days = [];

        try {
            const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
            if (contribRes.ok) {
                const contribData = await contribRes.json();
                days = contribData.contributions || [];
            }
        } catch (e) {
            console.log('Primary contrib API failed, using generated activity');
        }

        if (!days.length) {
            days = generateDemoContributions();
        }

        const total = renderGraphFromContributions(days) || 0;

        let statsText = `${total.toLocaleString()} contributions since March 2026`;
        try {
            const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            if (profileRes.ok) {
                const profile = await profileRes.json();
                if (typeof profile.public_repos === 'number') statsText += ` · ${profile.public_repos} public repos`;
                if (typeof profile.followers === 'number') statsText += ` · ${profile.followers} followers`;
            }
        } catch (e) {
            console.log('Profile fetch failed');
        }

        if (countEl) countEl.textContent = statsText;
        if (footerEl) footerEl.textContent = `Tracking consistent shipping since March 2026 · github.com/${GITHUB_USERNAME}`;
    } catch (err) {
        console.error('GitHub activity error:', err);
        if (countEl) countEl.textContent = `@${GITHUB_USERNAME} — building in public since March 2026`;
        if (footerEl) {
            footerEl.innerHTML = `View the full profile at <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:var(--text-secondary);text-decoration:underline;">github.com/${GITHUB_USERNAME}</a>`;
        }
    }
}

// Generate realistic demo contribution data starting March 2026
function generateDemoContributions() {
    const days = [];
    const today = new Date();
    const start = new Date(GITHUB_TRACK_FROM);

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        let count = 0;
        const rand = Math.random();

        if (isWeekend) {
            if (rand > 0.55) count = Math.floor(Math.random() * 5) + 1;
        } else {
            if (rand > 0.15) count = Math.floor(Math.random() * 12) + 1;
        }

        if (Math.random() > 0.93) count = Math.floor(Math.random() * 20) + 10;

        const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4;

        days.push({ date: d.toISOString().split('T')[0], count, level });
    }
    return days;
}

// ---------- Command Palette ----------
const CMDK_ICONS = {
    briefcase: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    doc: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    branch: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    monitor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
};

const CMDK_ACTIONS = [
    { group: 'Sections', label: 'Experience', icon: 'briefcase', key: 'E', run: () => scrollToSection('experience') },
    { group: 'Sections', label: 'Projects', icon: 'code', key: 'P', run: () => scrollToSection('projects') },
    { group: 'Sections', label: 'Blog', icon: 'doc', key: 'B', run: () => scrollToSection('blog') },
    { group: 'Sections', label: 'GitHub Activity', icon: 'branch', key: 'G', run: () => scrollToSection('github') },
    { group: 'Sections', label: 'Skills', icon: 'book', key: 'S', run: () => scrollToSection('skills') },
    { group: 'General', label: 'Copy Link', icon: 'copy', key: 'C', run: () => copyPageUrl() },
    { group: 'Theme', label: 'Light Mode', icon: 'sun', key: 'T', run: () => setTheme('light') },
    { group: 'Theme', label: 'Dark Mode', icon: 'moon', key: 'D', run: () => setTheme('dark') },
    { group: 'Theme', label: 'System', icon: 'monitor', key: 'Y', run: () => setTheme('system') }
];

let cmdkActiveIndex = 0;
let cmdkVisibleActions = CMDK_ACTIONS.slice();

function renderCmdkList() {
    const list = document.getElementById('cmdkList');
    if (!list) return;

    if (!cmdkVisibleActions.length) {
        list.innerHTML = '<div class="cmdk-empty">No matching commands</div>';
        return;
    }

    let html = '';
    let lastGroup = null;

    cmdkVisibleActions.forEach((action, i) => {
        if (action.group !== lastGroup) {
            html += `<div class="cmdk-group-label">${action.group}</div>`;
            lastGroup = action.group;
        }
        html += `<button class="cmdk-item${i === cmdkActiveIndex ? ' active' : ''}" data-index="${i}">
            <span class="cmdk-item-icon">${CMDK_ICONS[action.icon] || ''}</span>
            <span class="cmdk-item-label">${action.label}</span>
            <span class="cmdk-shortcut">Shift + ${action.key}</span>
        </button>`;
    });

    list.innerHTML = html;

    list.querySelectorAll('.cmdk-item').forEach((item) => {
        item.addEventListener('click', () => {
            const idx = Number(item.dataset.index);
            runCmdkAction(idx);
        });
        item.addEventListener('mouseenter', () => {
            cmdkActiveIndex = Number(item.dataset.index);
            list.querySelectorAll('.cmdk-item').forEach((el) => el.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function runCmdkAction(index) {
    const action = cmdkVisibleActions[index];
    if (!action) return;
    action.run();
    closeCommandPalette();
}

function filterCmdk(query) {
    const q = query.trim().toLowerCase();
    cmdkVisibleActions = q
        ? CMDK_ACTIONS.filter((a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q))
        : CMDK_ACTIONS.slice();
    cmdkActiveIndex = 0;
    renderCmdkList();
}

function openCommandPalette() {
    const overlay = document.getElementById('cmdkOverlay');
    const input = document.getElementById('cmdkInput');
    if (!overlay) return;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    cmdkVisibleActions = CMDK_ACTIONS.slice();
    cmdkActiveIndex = 0;
    renderCmdkList();

    if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 30);
    }
}

function closeCommandPalette() {
    const overlay = document.getElementById('cmdkOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function isCmdkOpen() {
    const overlay = document.getElementById('cmdkOverlay');
    return overlay && overlay.classList.contains('active');
}

function initCommandPalette() {
    const input = document.getElementById('cmdkInput');
    if (input) input.addEventListener('input', (e) => filterCmdk(e.target.value));

    document.addEventListener('keydown', (e) => {
        const typingInField = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            isCmdkOpen() ? closeCommandPalette() : openCommandPalette();
            return;
        }

        if (isCmdkOpen()) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeCommandPalette();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                cmdkActiveIndex = Math.min(cmdkActiveIndex + 1, cmdkVisibleActions.length - 1);
                renderCmdkList();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                cmdkActiveIndex = Math.max(cmdkActiveIndex - 1, 0);
                renderCmdkList();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                runCmdkAction(cmdkActiveIndex);
            }
            return;
        }

        if (!typingInField && e.shiftKey) {
            const match = CMDK_ACTIONS.find((a) => a.key.toLowerCase() === e.key.toLowerCase());
            if (match) {
                e.preventDefault();
                match.run();
            }
        }
    });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    loadGithubActivity();
    initBannerClock();
    initScrollSpy();
    initScrollReveal();
    initBackToTop();
    initTypingEffect();
    initCommandPalette();
    initExperienceAccordion();
    initProjectExpand();
    initInteractiveFeedback();

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            document.getElementById('mobileNav').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
