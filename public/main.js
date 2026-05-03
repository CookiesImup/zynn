// ── THEME ──
const savedTheme = localStorage.getItem('zyn_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeBtn(savedTheme);

document.getElementById('themeBtn').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('zyn_theme', next);
  updateThemeBtn(next);
});

function updateThemeBtn(theme) {
  document.getElementById('themeBtn').textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ── GAMES DATA ──
const GAMES = [
  {
    id: 'ugc1',
    name: 'ZYN UGC PREVIEW',
    cat: 'ugc',
    catLabel: 'User Generated Content',
    image: '/image/zyncc.jpeg',
    link: 'https://www.roblox.com/id/games/92516004494473/ZYN-UGC-CODES',
    desc: 'Preview exclusive UGC items'
  },
  {
    id: 'ugc2',
    name: 'Zyn Code Creator',
    cat: 'ugc',
    catLabel: 'User Generated Content',
    image: '/image/zyncc.jpeg',
    link: 'https://www.roblox.com/id/games/92516004494473/ZYN-UGC-CODES',
    desc: 'Create and preview UGC codes'
  },
  {
    id: 'tower1',
    name: 'XDDCC Tower',
    cat: 'tower',
    catLabel: 'Tower Obby',
    image: '/image/xddcc.jpeg',
    link: 'https://www.roblox.com/id/games/94375075919130/XDDCC-Tower',
    desc: 'Classic tower obby challenge'
  },
  {
    id: 'tower2',
    name: 'Kanan Kiri Tower',
    cat: 'tower',
    catLabel: 'Tower Obby',
    image: '/image/kanankiri.jpeg',
    link: 'https://www.roblox.com/id/games/94375075919130/XDDCC-Tower',
    desc: 'Left and right tower obby'
  },
  {
    id: 'tower3',
    name: 'Energy Tower',
    cat: 'tower',
    catLabel: 'Tower Obby',
    image: '/image/energy.jpeg',
    link: 'https://www.roblox.com/id/games/130226507132168/Energy-Tower',
    desc: 'High energy tower obby'
  },
  {
    id: 'tower4',
    name: 'Kok Gini Sih Lasernya',
    cat: 'tower',
    catLabel: 'Tower Obby',
    image: '/image/kokginisih.jpeg',
    link: 'https://www.roblox.com/id/games/83896695734882/Kok-Gini-Sih-Lasernya-Tower',
    desc: 'Laser tower obby experience'
  }
];

let activeCat = 'all';

// ── RENDER GAMES ──
function renderGames(cat) {
  const grid = document.getElementById('gamesGrid');
  const filtered = cat === 'all' ? GAMES : GAMES.filter(g => g.cat === cat);

  // Update section title
  const titles = { all: 'All', ugc: 'User Generated Content', tower: 'Tower Obby' };
  document.querySelector('.section-title').innerHTML = `Games <span>/ ${titles[cat]}</span>`;

  grid.innerHTML = filtered.map((g, i) => `
    <a href="${g.link}" target="_blank" rel="noreferrer"
      class="game-card reveal reveal-delay-${(i % 4) + 1}"
      style="transition-delay:${i * 0.07}s">
      <div class="game-thumb">
        <img src="${g.image}" alt="${g.name}"
          onerror="this.src='https://placehold.co/480x270/1a1a1a/555555?text=No+Image'">
        <div class="game-thumb-overlay">
          <div class="play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
        <div class="game-cat-badge">${g.catLabel}</div>
      </div>
      <div class="game-info">
        <div class="game-name">${g.name}</div>
        <div class="game-meta">
          <span>${g.desc}</span>
          <span class="game-meta-dot"></span>
          <span>Roblox</span>
        </div>
      </div>
    </a>
  `).join('');

  // Trigger reveal for new cards
  requestAnimationFrame(() => {
    document.querySelectorAll('.game-card.reveal').forEach(el => {
      el.classList.add('visible');
    });
  });
}

// ── CATEGORY TABS ──
document.querySelectorAll('.cat-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderGames(activeCat);
  });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.background = document.documentElement.getAttribute('data-theme') === 'light'
      ? 'rgba(245,245,245,0.98)'
      : 'rgba(10,10,10,0.98)';
  } else {
    nav.style.background = '';
  }
}, { passive: true });

// ── INIT ──
renderGames('all');
observeReveal();

