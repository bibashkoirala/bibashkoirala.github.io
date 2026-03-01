const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

const projectShowcase = document.getElementById('project-showcase');
const projectFeature = document.getElementById('project-feature');
const projectSideLeft = document.getElementById('project-side-left');
const projectSideRight = document.getElementById('project-side-right');

const fallbackSiteData = {
  site: { brand: 'Bibash Koirala', hireText: 'Hire Me' },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ],
  hero: {
    title: 'Digital systems with real impact.',
    description: 'Backend Developer and IT Officer working on e-governance, API architecture, and practical automation for public and private organizations.',
    image: 'assets/images/profile-pic.jpg',
    actions: [
      { label: 'View Timeline', href: '#experience', style: 'primary' },
      { label: 'Download CV', href: 'assets/docs/resume-example.pdf', style: 'soft', external: true }
    ]
  },
  about: {
    title: 'Secret About Me',
    image: 'assets/images/about-pic.jpg',
    paragraphs: [
      'I convert manual workflows into clean digital systems.',
      'I currently serve as Information Technology Officer at Chulachuli Rural Municipality.'
    ]
  },
  education: {
    title: 'Education Journey (2010-2025)',
    subtitle: 'Scroll horizontally through the timeline. The bubble animates each milestone.',
    items: [
      { year: '2010', title: 'Joined school education', institute: 'Shree Local School', message: 'Joined school level foundation studies.' },
      { year: '2012', title: 'Primary completed', institute: 'Shree Local School', message: 'Completed primary level and moved to lower secondary.' }
    ]
  },
  experience: {
    title: 'Experience, Projects, and Skills Timeline',
    subtitle: 'Animated dot grows from center and reveals milestones as you scroll.',
    items: [
      { side: 'left', title: 'Jan 2022 | Municipal Digital Profile', description: 'Built structured digital profiles for rural municipality operations.' },
      { side: 'right', title: 'Aug 2022 | Inventory System', description: 'Django-based stock and supplier management with process control.' }
    ]
  },
  projects: {
    title: 'My Projects and Consultant Services',
    subtitle: 'Add or edit up to 10 items in data/projects.json with client and product names.'
  },
  ticker: ['Backend Engineering', 'Django', 'REST API', 'E-Governance', 'Flutter', 'PostgreSQL'],
  contact: {
    title: 'Get In Touch',
    subtitle: 'We deliver practical digital systems with quality, speed, and clear communication.',
    items: [
      { icon: 'P', iconStyle: 'green', title: 'Phone', lines: ['+977 9814963098'] },
      { icon: 'M', iconStyle: 'pink', title: 'E-Mail', lines: ['bibashkoirala78@gmail.com'] }
    ],
    form: {
      title: 'Have Any Project? Say Hello....',
      fields: [
        { type: 'text', placeholder: 'Enter your full name here' },
        { type: 'email', placeholder: 'Enter your email here' },
        { type: 'textarea', placeholder: 'Enter your message here' }
      ],
      button: 'Send Message'
    }
  },
  footer: {
    columns: [
      { title: 'Bibash Koirala', text: 'Backend Developer and IT Officer building digital governance products and scalable platforms.' },
      { title: 'Contact', text: 'For quick questions:', links: [{ label: 'bibashkoirala78@gmail.com', href: 'mailto:bibashkoirala78@gmail.com' }] },
      { title: 'Social', social: true, links: [{ label: 'GitHub', href: 'https://github.com/' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/' }] }
    ],
    copyright: '2026 | All Rights Reserved by Bibash Koirala',
    bottomLinks: [{ label: 'Top', href: '#top' }]
  }
};

const fallbackProjects = [
  {
    title: 'Municipal Digital Profile',
    summary: 'Structured digital profile system for rural municipalities.',
    detail: 'Designed and delivered standardized public profile modules to improve data availability and reporting.',
    extra: 'Focused on data quality, digital workflows, and operational transparency.',
    logo: 'Gov Project',
    client: 'Chulachuli RM',
    product: 'Profile Portal',
    accent: 'pink',
    image: 'assets/images/project-1.png',
    tags: ['Government', 'Data', 'Portal']
  },
  {
    title: 'Inventory System',
    summary: 'Django-based stock and supplier management workflows.',
    detail: 'Implemented inventory lifecycle tracking, supplier records, and reporting for accountability.',
    logo: 'Django App',
    client: 'Municipal Ops',
    product: 'Inventory Core',
    accent: 'green',
    image: 'assets/images/project-2.png',
    tags: ['Django', 'Ops', 'Reports']
  }
];

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

function observeReveals() {
  document.querySelectorAll('.reveal').forEach((el) => {
    if (!el.dataset.observed) {
      el.dataset.observed = 'true';
      revealObserver.observe(el);
    }
  });
}

function setupMenu() {
  if (!menuButton || !menu) return;
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

function renderSite(data) {
  document.getElementById('brand-link').textContent = data.site.brand || 'Portfolio';
  document.getElementById('hire-btn').textContent = data.site.hireText || 'Hire Me';

  const nav = document.getElementById('menu');
  nav.innerHTML = (data.nav || []).map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('');

  const heroTitle = document.getElementById('hero-title');
  const heroDescription = document.getElementById('hero-description');
  const heroImage = document.getElementById('hero-image');
  const heroActions = document.getElementById('hero-actions');
  heroTitle.textContent = data.hero.title || '';
  heroDescription.textContent = data.hero.description || '';
  heroImage.src = data.hero.image || heroImage.src;
  heroActions.innerHTML = (data.hero.actions || []).map((action) => {
    const cls = action.style === 'soft' ? 'btn btn-soft' : 'btn btn-primary';
    const target = action.external ? ' target="_blank" rel="noopener"' : '';
    return `<a class="${cls}" href="${action.href || '#'}"${target}>${action.label || 'Action'}</a>`;
  }).join('');

  document.getElementById('about-title').textContent = data.about.title || '';
  document.getElementById('about-image').src = data.about.image || 'assets/images/about-pic.jpg';
  document.getElementById('about-paragraph-1').textContent = (data.about.paragraphs && data.about.paragraphs[0]) || '';
  document.getElementById('about-paragraph-2').textContent = (data.about.paragraphs && data.about.paragraphs[1]) || '';

  document.getElementById('education-title').textContent = data.education.title || '';
  document.getElementById('education-subtitle').textContent = data.education.subtitle || '';

  const eduScroller = document.getElementById('edu-scroller');
  eduScroller.innerHTML = (data.education.items || []).map((item, idx) => `
    <article class="edu-card${idx === 0 ? ' is-active' : ''}" data-year="${item.year || ''}" data-message="${item.message || ''}">
      <h3>${item.year || ''}</h3>
      <p>${item.title || ''}</p>
      <span>${item.institute || ''}</span>
    </article>
  `).join('');

  const firstEdu = data.education.items && data.education.items[0];
  document.getElementById('chat-year').textContent = firstEdu ? firstEdu.year : '';
  document.getElementById('chat-text').textContent = firstEdu ? firstEdu.message : '';

  document.getElementById('experience-title').textContent = data.experience.title || '';
  document.getElementById('experience-subtitle').textContent = data.experience.subtitle || '';
  document.getElementById('xp-items').innerHTML = (data.experience.items || []).map((item) => `
    <article class="xp-item ${item.side === 'right' ? 'right' : 'left'} reveal">
      <span class="xp-dot"></span>
      <div class="xp-card">
        <h3>${item.title || ''}</h3>
        <p>${item.description || ''}</p>
      </div>
    </article>
  `).join('');

  document.getElementById('projects-title').textContent = data.projects.title || '';
  document.getElementById('projects-subtitle').innerHTML = data.projects.subtitle || '';

  const tickerWords = data.ticker || [];
  const doubled = [...tickerWords, ...tickerWords];
  document.getElementById('ticker-track').innerHTML = doubled.map((word) => `<span>${word}</span>`).join('');

  document.getElementById('contact-title').textContent = data.contact.title || '';
  document.getElementById('contact-subtitle').textContent = data.contact.subtitle || '';
  const contactInfo = document.getElementById('contact-info');
  contactInfo.innerHTML = (data.contact.items || []).map((item) => `
    <article class="contact-item">
      <span class="ci-icon ${item.iconStyle === 'pink' ? 'ci-icon-pink' : 'ci-icon-green'}">${item.icon || ''}</span>
      <div>
        <h3>${item.title || ''}</h3>
        ${(item.lines || []).map((line) => `<p>${line}</p>`).join('')}
      </div>
    </article>
  `).join('');

  const form = data.contact.form || {};
  document.getElementById('contact-form-title').textContent = form.title || '';
  const fields = form.fields || [];
  const row1 = document.getElementById('contact-row-1');
  const row2 = document.getElementById('contact-row-2');
  row1.innerHTML = fields.slice(0, 2).map((field) => `<input type="${field.type || 'text'}" placeholder="${field.placeholder || ''}" />`).join('');
  const messageField = fields.find((field) => field.type === 'textarea');
  row2.innerHTML = messageField
    ? `<textarea rows="4" placeholder="${messageField.placeholder || ''}"></textarea>`
    : '<textarea rows="4" placeholder="Message"></textarea>';
  document.getElementById('contact-button').textContent = form.button || 'Send Message';

  const footerTop = document.getElementById('footer-top');
  footerTop.innerHTML = (data.footer.columns || []).map((col) => {
    const links = (col.links || []).map((l) => `<a href="${l.href}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${l.label}</a>`).join('');
    const socialCls = col.social ? 'footer-social' : '';
    return `
      <article>
        <h3>${col.title || ''}</h3>
        ${col.text ? `<p>${col.text}</p>` : ''}
        ${links ? `<div class="${socialCls}">${links}</div>` : ''}
      </article>
    `;
  }).join('');

  document.getElementById('footer-copyright').textContent = data.footer.copyright || '';
  document.getElementById('footer-links').innerHTML = (data.footer.bottomLinks || []).map((l) => `<a href="${l.href}">${l.label}</a>`).join('');

  setupMenu();
  setupEducationInteraction();
  updateTimelineProgress();
  observeReveals();
}

function setupEducationInteraction() {
  const eduScroller = document.getElementById('edu-scroller');
  const eduCards = Array.from(document.querySelectorAll('.edu-card'));
  const chatYear = document.getElementById('chat-year');
  const chatText = document.getElementById('chat-text');
  let typingTimer;

  if (!eduScroller || !eduCards.length || !chatYear || !chatText) return;

  function typeMessage(year, message) {
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

function projectCardMarkup(item, index, featured = false) {
  const num = String(index + 1).padStart(2, '0');
  const accentClass = item.accent === 'green' ? 'green' : 'pink';
  const hasExternalLink = item.link && item.link !== '#';
  const tags = Array.isArray(item.tags) && item.tags.length
    ? item.tags.slice(0, 3)
    : [item.logo || 'Project', item.accent === 'green' ? 'Scalable' : 'Product'];
  const tagsHtml = tags.map((tag) => `<span>${tag}</span>`).join('');
  const imageHtml = item.image ? `<img class="project-image" src="${item.image}" alt="${item.title} preview" />` : '';
  const client = item.client ? `<span class="project-client">Client: ${item.client}</span>` : '';
  const product = item.product ? `<span class="project-product">Product: ${item.product}</span>` : '';
  const wrapperClass = featured ? 'project-feature reveal' : 'project-tile reveal';

  return `
    <article class="${wrapperClass}">
      <div class="project-top">
        <span class="project-num ${accentClass}">${num}</span>
        <span class="project-logo">${item.logo || 'Project'}</span>
      </div>
      <h3 class="project-title">${item.title || 'Untitled Project'}</h3>
      <p class="project-summary">${item.summary || ''}</p>
      <div>${client}${product}</div>
      <div class="project-tags">${tagsHtml}</div>
      ${imageHtml}
      <p class="project-detail">${item.detail || ''}</p>
      <p class="project-extra">${item.extra || 'This project focused on performance, reliability, and production-ready implementation for real users.'}</p>
      <div class="project-actions">
        <button class="project-readmore" type="button">Read More +</button>
        ${hasExternalLink ? `<a class="project-link" href="${item.link}" target="_blank" rel="noopener">Visit Project</a>` : ''}
      </div>
    </article>
  `;
}

function renderProjects(items) {
  if (!projectShowcase || !projectFeature || !projectSideLeft || !projectSideRight) return;
  const projects = items.slice(0, 10);
  if (!projects.length) {
    projectFeature.innerHTML = '<h3>No projects added</h3><p>Add entries in <code>data/projects.json</code>.</p>';
    projectSideLeft.innerHTML = '';
    projectSideRight.innerHTML = '';
    return;
  }

  const featuredProject = projects[0];
  const remaining = projects.slice(1);
  const leftProjects = [];
  const rightProjects = [];

  remaining.forEach((project, idx) => {
    const entry = { ...project, _idx: idx + 1 };
    if (idx % 2 === 0) leftProjects.push(entry);
    else rightProjects.push(entry);
  });

  projectFeature.outerHTML = projectCardMarkup(featuredProject, 0, true);
  const refreshedFeature = document.getElementById('project-feature') || document.querySelector('.project-feature');
  if (refreshedFeature && refreshedFeature.id !== 'project-feature') refreshedFeature.id = 'project-feature';

  projectSideLeft.innerHTML = leftProjects.map((project) => projectCardMarkup(project, project._idx, false)).join('');
  projectSideRight.innerHTML = rightProjects.map((project) => projectCardMarkup(project, project._idx, false)).join('');

  document.querySelectorAll('#project-showcase .project-readmore').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-tile, .project-feature');
      if (!card) return;
      card.classList.toggle('expanded');
      button.textContent = card.classList.contains('expanded') ? 'Show Less -' : 'Read More +';
    });
  });

  observeReveals();
}

async function loadProjects() {
  try {
    const response = await fetch('data/projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid projects format');
    renderProjects(data);
  } catch (error) {
    renderProjects(fallbackProjects);
  }
}

async function loadSite() {
  try {
    const response = await fetch('data/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch site content');
    const data = await response.json();
    renderSite(data);
  } catch (error) {
    renderSite(fallbackSiteData);
  }
}

Promise.all([loadSite(), loadProjects()]);
