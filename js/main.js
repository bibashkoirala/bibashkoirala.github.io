const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const eduScroller = document.getElementById('edu-scroller');
const eduCards = Array.from(document.querySelectorAll('.edu-card'));
const chatYear = document.getElementById('chat-year');
const chatText = document.getElementById('chat-text');
let typingTimer;

function typeMessage(year, message) {
  if (!chatYear || !chatText) return;
  clearInterval(typingTimer);
  chatYear.textContent = year;
  chatText.textContent = '';
  let i = 0;
  typingTimer = setInterval(() => {
    chatText.textContent += message.charAt(i);
    i += 1;
    if (i >= message.length) clearInterval(typingTimer);
  }, 22);
}

function setActiveEduCard(card) {
  eduCards.forEach((item) => item.classList.remove('is-active'));
  card.classList.add('is-active');
  typeMessage(card.dataset.year || '', card.dataset.message || '');
}

if (eduScroller && eduCards.length) {
  const eduObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveEduCard(entry.target);
      });
    },
    { root: eduScroller, threshold: 0.6 }
  );

  eduCards.forEach((card) => eduObserver.observe(card));

  eduScroller.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      eduScroller.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  setActiveEduCard(eduCards[0]);
}

const xpTimeline = document.getElementById('xp-timeline');
const xpProgress = document.getElementById('xp-progress');

function updateTimelineProgress() {
  if (!xpTimeline || !xpProgress) return;
  const rect = xpTimeline.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const start = viewportHeight * 0.25;
  const total = rect.height + viewportHeight * 0.5;
  const traveled = start - rect.top;
  const ratio = Math.max(0, Math.min(1, traveled / total));
  xpProgress.style.height = `${ratio * 100}%`;
}

window.addEventListener('scroll', updateTimelineProgress);
window.addEventListener('resize', updateTimelineProgress);
updateTimelineProgress();

const projectTrack = document.getElementById('project-track');
const projectPrev = document.getElementById('project-prev');
const projectNext = document.getElementById('project-next');

function renderProjects(items) {
  if (!projectTrack) return;
  const projects = items.slice(0, 10);

  projectTrack.innerHTML = projects.map((item, index) => {
    const num = String(index + 1).padStart(2, '0');
    const accentClass = item.accent === 'green' ? 'green' : 'pink';
    const imageHtml = item.image
      ? `<img class="project-image" src="${item.image}" alt="${item.title} preview" />`
      : '';

    return `
      <article class="project-card reveal">
        <div class="project-meta">
          <span class="project-num ${accentClass}">${num}</span>
          <span class="project-logo">${item.logo || 'Project'}</span>
        </div>
        <h3 class="project-title">${item.title || 'Untitled Project'}</h3>
        <p class="project-summary">${item.summary || ''}</p>
        ${imageHtml}
        <p class="project-detail">${item.detail || ''}</p>
        <a class="project-link" href="${item.link || '#'}" target="_blank" rel="noopener">Read More -></a>
      </article>
    `;
  }).join('');

  projectTrack.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

async function loadProjects() {
  if (!projectTrack) return;

  try {
    const response = await fetch('data/projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid projects format');
    renderProjects(data);
  } catch (error) {
    projectTrack.innerHTML = '<article class="project-card"><h3>Projects unavailable</h3><p>Add entries to <code>data/projects.json</code> and reload.</p></article>';
  }
}

function scrollProjects(direction) {
  if (!projectTrack) return;
  const amount = 360;
  projectTrack.scrollBy({ left: direction * amount, behavior: 'smooth' });
}

if (projectPrev) projectPrev.addEventListener('click', () => scrollProjects(-1));
if (projectNext) projectNext.addEventListener('click', () => scrollProjects(1));

loadProjects();