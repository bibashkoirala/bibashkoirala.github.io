const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

const projectShowcase = document.getElementById('project-showcase');

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
    title: 'Experience, Progress, and Skills Timeline',
    subtitle: 'See my milestones as you scroll.',
    items: [
      { side: 'left', title: 'Jan 2022 | Municipal Digital Profile', description: 'Built structured digital profiles for rural municipality operations.' },
      { side: 'right', title: 'Aug 2022 | Inventory System', description: 'Django-based stock and supplier management with process control.' }
    ]
  },
  projects: {
    title: 'My Projects and Consultant Services',
    subtitle: 'Some important clients and signature products list:'
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

function projectCardMarkup(item, index, options = {}) {
  const featured = Boolean(options.featured);
  const layoutClass = options.layoutClass ? ` ${options.layoutClass}` : '';
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
  const wrapperClass = featured ? `project-feature reveal${layoutClass}` : `project-tile reveal${layoutClass}`;

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
  if (!projectShowcase) return;
  const projects = items.slice(0, 30);
  if (!projects.length) {
    projectShowcase.innerHTML = '<article class="project-feature"><h3>No projects added</h3><p>Add entries in <code>data/projects.json</code>.</p></article>';
    return;
  }

  const leftProjects = [];
  const centerProjects = [];
  const rightProjects = [];

  projects.forEach((project, idx) => {
    const entry = { ...project, _idx: idx };
    if (idx === 0) {
      centerProjects.push({ ...entry, _featured: true });
      return;
    }
    if (idx === 1) {
      leftProjects.push({ ...entry, _upper: true });
      return;
    }
    if (idx === 2) {
      rightProjects.push({ ...entry, _upper: true });
      return;
    }

    const cycle = ['left', 'right', 'center'][(idx - 3) % 3];
    if (cycle === 'left') leftProjects.push(entry);
    else if (cycle === 'right') rightProjects.push(entry);
    else centerProjects.push(entry);
  });

  const leftHtml = leftProjects.map((project) => projectCardMarkup(project, project._idx, { layoutClass: project._upper ? 'is-upper' : '' })).join('');
  const centerHtml = centerProjects.map((project) => projectCardMarkup(project, project._idx, { featured: Boolean(project._featured) })).join('');
  const rightHtml = rightProjects.map((project) => projectCardMarkup(project, project._idx, { layoutClass: project._upper ? 'is-upper' : '' })).join('');

  projectShowcase.innerHTML = `
    <div class="project-column project-column-left" id="project-side-left">${leftHtml}</div>
    <div class="project-column project-column-center" id="project-center">${centerHtml}</div>
    <div class="project-column project-column-right" id="project-side-right">${rightHtml}</div>
  `;
  projectShowcase.dataset.count = String(projects.length);

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

function initMagicCursor() {
  const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
  const supportsCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  if (!supportsFinePointer && supportsCoarsePointer) {
    initTouchCursorGlow();
    return;
  }
  if (!supportsFinePointer) return;

  const layer = document.createElement('div');
  layer.className = 'magic-cursor-layer';

  const core = document.createElement('div');
  core.className = 'magic-cursor-core';

  const ring = document.createElement('div');
  ring.className = 'magic-cursor-ring';

  layer.appendChild(ring);
  layer.appendChild(core);
  document.body.appendChild(layer);

  let x = window.innerWidth * 0.5;
  let y = window.innerHeight * 0.5;
  let tx = x;
  let ty = y;
  let rafId = 0;
  let lastSparkTime = 0;
  let lastSparkX = x;
  let lastSparkY = y;

  function spawnSpark(px, py) {
    const spark = document.createElement('span');
    spark.className = 'magic-cursor-spark';
    spark.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    spark.style.animation = 'spark-fade 460ms ease-out forwards';
    layer.appendChild(spark);
    window.setTimeout(() => spark.remove(), 520);
  }

  function animate() {
    x += (tx - x) * 0.23;
    y += (ty - y) * 0.23;
    core.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    rafId = window.requestAnimationFrame(animate);
  }

  function handleMove(event) {
    tx = event.clientX;
    ty = event.clientY;

    const now = performance.now();
    const dx = tx - lastSparkX;
    const dy = ty - lastSparkY;
    const moved = Math.hypot(dx, dy);
    if (moved > 14 && now - lastSparkTime > 34) {
      spawnSpark(tx, ty);
      lastSparkTime = now;
      lastSparkX = tx;
      lastSparkY = ty;
    }

    const interactive = event.target && event.target.closest && event.target.closest('a, button, input, textarea, select, [role="button"]');
    ring.classList.toggle('is-active', Boolean(interactive));
  }

  function hideCursor() {
    layer.style.opacity = '0';
  }

  function showCursor() {
    layer.style.opacity = '1';
  }

  animate();

  window.addEventListener('pointermove', handleMove, { passive: true });
  window.addEventListener('pointerdown', () => ring.classList.add('is-active'));
  window.addEventListener('pointerup', () => ring.classList.remove('is-active'));
  window.addEventListener('blur', hideCursor);
  window.addEventListener('focus', showCursor);
  document.addEventListener('mouseleave', hideCursor);
  document.addEventListener('mouseenter', showCursor);

  window.addEventListener('beforeunload', () => {
    if (rafId) window.cancelAnimationFrame(rafId);
  });
}

function initTouchCursorGlow() {
  const layer = document.createElement('div');
  layer.className = 'magic-cursor-layer';
  document.body.appendChild(layer);
  let lastPulse = 0;

  function spawnPulse(x, y) {
    const spark = document.createElement('span');
    spark.className = 'magic-cursor-spark';
    spark.style.width = '18px';
    spark.style.height = '18px';
    spark.style.margin = '-9px 0 0 -9px';
    spark.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    spark.style.animation = 'spark-fade 560ms ease-out forwards';
    layer.appendChild(spark);
    window.setTimeout(() => spark.remove(), 620);
  }

  function handleTouchMove(event) {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    const now = performance.now();
    if (now - lastPulse < 42) return;
    lastPulse = now;
    spawnPulse(touch.clientX, touch.clientY);
  }

  function handleTouchStart(event) {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    spawnPulse(touch.clientX, touch.clientY);
  }

  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
}

function initStupaSketch() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'mountain-line-layer';
  footer.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    width = footer.clientWidth;
    height = 360;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawPolylineProgress(points, progress) {
    const clamped = Math.max(0, Math.min(1, progress));
    if (clamped <= 0 || points.length < 2) return;
    const total = points.length - 1;
    const scaled = clamped * total;
    const whole = Math.floor(scaled);
    const frac = scaled - whole;

    ctx.beginPath();
    ctx.moveTo(points[0][0] * width, points[0][1] * height);
    for (let i = 1; i <= whole && i < points.length; i += 1) {
      ctx.lineTo(points[i][0] * width, points[i][1] * height);
    }
    if (whole + 1 < points.length) {
      const a = points[whole];
      const b = points[whole + 1];
      ctx.lineTo((a[0] + (b[0] - a[0]) * frac) * width, (a[1] + (b[1] - a[1]) * frac) * height);
    }
    ctx.stroke();
  }

  function drawArcProgress(cx, cy, r, start, end, progress) {
    if (progress <= 0) return;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + (end - start) * Math.min(1, progress));
    ctx.stroke();
  }

  function frame(time) {
    const cycle = 10800;
    const t = (time % cycle) / cycle;
    const drawWindow = 0.78;
    const fadeWindow = 0.12;
    const progress = t < drawWindow ? t / drawWindow : 1;
    const fade = t < (1 - fadeWindow) ? 1 : Math.max(0, 1 - (t - (1 - fadeWindow)) / fadeWindow);

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = `rgba(74, 224, 178, ${0.9 * fade})`;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = `rgba(74, 224, 178, ${0.34 * fade})`;
    ctx.shadowBlur = 7;

    const cx = width * 0.5;
    const domeY = height * 0.69;
    const domeR = Math.min(width, height) * 0.21;

    const structures = [
      [[0.17, 0.98], [0.83, 0.98], [0.83, 0.92], [0.17, 0.92], [0.17, 0.98]],
      [[0.2, 0.92], [0.8, 0.92], [0.8, 0.86], [0.2, 0.86], [0.2, 0.92]],
      [[0.24, 0.86], [0.76, 0.86], [0.76, 0.81], [0.24, 0.81], [0.24, 0.86]],
      [[0.29, 0.81], [0.71, 0.81], [0.71, 0.77], [0.29, 0.77], [0.29, 0.81]],
      [[0.36, 0.77], [0.64, 0.77], [0.64, 0.74], [0.36, 0.74], [0.36, 0.77]],
      [[0.472, 0.59], [0.528, 0.59], [0.528, 0.64], [0.472, 0.64], [0.472, 0.59]],
      [[0.452, 0.64], [0.548, 0.64], [0.548, 0.68], [0.452, 0.68], [0.452, 0.64]],
      [[0.468, 0.56], [0.532, 0.56], [0.532, 0.59], [0.468, 0.59], [0.468, 0.56]],
      [[0.478, 0.53], [0.522, 0.53], [0.522, 0.56], [0.478, 0.56], [0.478, 0.53]],
      [[0.485, 0.53], [0.5, 0.39], [0.515, 0.53]],
      [[0.49, 0.39], [0.51, 0.39], [0.51, 0.35], [0.49, 0.35], [0.49, 0.39]],
      [[0.495, 0.35], [0.505, 0.35], [0.505, 0.31], [0.495, 0.31], [0.495, 0.35]],
      [[0.5, 0.31], [0.5, 0.24]],
      [[0.493, 0.24], [0.507, 0.24]],
      [[0.46, 0.675], [0.49, 0.67], [0.52, 0.675]],
      [[0.54, 0.675], [0.57, 0.67], [0.6, 0.675]],
      [[0.505, 0.69], [0.498, 0.707], [0.512, 0.716]]
    ];

    const total = structures.length + 3;
    structures.forEach((path, idx) => {
      const local = Math.max(0, Math.min(1, progress * total - idx));
      ctx.lineWidth = idx < 5 ? 2.5 : 2;
      drawPolylineProgress(path, local);
    });

    const domePhase = Math.max(0, Math.min(1, progress * total - (total - 3)));
    ctx.lineWidth = 2.3;
    drawArcProgress(cx, domeY, domeR, Math.PI, Math.PI * 2, domePhase);

    if (domePhase > 0.45) {
      const panelPhase = Math.max(0, Math.min(1, (domePhase - 0.45) / 0.55));
      ctx.lineWidth = 1.25;
      for (let i = -5; i <= 5; i += 1) {
        const px = cx + i * domeR * 0.16;
        const pr = domeR * 0.12;
        drawArcProgress(px, domeY + domeR * 0.02, pr, Math.PI, Math.PI * 2, panelPhase);
      }
    }

    const prayerPhase = Math.max(0, Math.min(1, progress * total - (total - 2)));
    const top = [0.5, 0.36];
    const ribbons = [
      [0.03, 0.85], [0.06, 0.8], [0.1, 0.75], [0.15, 0.7], [0.2, 0.66], [0.26, 0.62],
      [0.74, 0.62], [0.8, 0.66], [0.85, 0.7], [0.9, 0.75], [0.94, 0.8], [0.97, 0.85]
    ];
    ctx.lineWidth = 1.15;
    ribbons.forEach((end) => drawPolylineProgress([top, end], prayerPhase));

    const stairPhase = Math.max(0, Math.min(1, progress * total - (total - 1)));
    const stairs = [
      [[0.515, 0.98], [0.55, 0.98], [0.55, 0.92], [0.515, 0.92], [0.515, 0.98]],
      [[0.52, 0.92], [0.545, 0.92], [0.545, 0.88], [0.52, 0.88], [0.52, 0.92]],
      [[0.524, 0.88], [0.541, 0.88], [0.541, 0.85], [0.524, 0.85], [0.524, 0.88]]
    ];
    ctx.lineWidth = 1.8;
    stairs.forEach((s) => drawPolylineProgress(s, stairPhase));

    const labelPhase = Math.max(0, Math.min(1, (progress - 0.86) / 0.14));
    if (labelPhase > 0) {
      ctx.font = `${Math.max(12, Math.floor(width * 0.015))}px "Sora", sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = `rgba(74, 224, 178, ${0.92 * fade * labelPhase})`;
      ctx.fillText('Boudhanath Stupa, Nepal', width * 0.97, height * 0.965);
    }

    ctx.shadowBlur = 0;

    rafId = window.requestAnimationFrame(frame);
  }

  resize();
  rafId = window.requestAnimationFrame(frame);
  window.addEventListener('resize', resize);
  window.addEventListener('beforeunload', () => {
    if (rafId) window.cancelAnimationFrame(rafId);
  });
}

function initForegroundMountain() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'foreground-mountain-layer';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;

  const mainPeak = [
    [0.08, 0.9],
    [0.2, 0.84],
    [0.31, 0.75],
    [0.43, 0.62],
    [0.5, 0.46],
    [0.56, 0.6],
    [0.67, 0.74],
    [0.8, 0.84],
    [0.92, 0.9]
  ];
  const ridgeLeft = [
    [0.27, 0.83],
    [0.37, 0.72],
    [0.45, 0.59],
    [0.5, 0.46]
  ];
  const ridgeRight = [
    [0.5, 0.46],
    [0.57, 0.61],
    [0.66, 0.75],
    [0.75, 0.84]
  ];

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    width = window.innerWidth;
    height = Math.max(260, Math.floor(window.innerHeight * 0.42));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawPathProgress(points, progress, lineWidth, alpha) {
    const clamped = Math.max(0, Math.min(1, progress));
    if (clamped <= 0 || points.length < 2) return;

    const total = points.length - 1;
    const scaled = clamped * total;
    const whole = Math.floor(scaled);
    const frac = scaled - whole;

    ctx.beginPath();
    ctx.moveTo(points[0][0] * width, points[0][1] * height);
    for (let i = 1; i <= whole && i < points.length; i += 1) {
      ctx.lineTo(points[i][0] * width, points[i][1] * height);
    }
    if (whole + 1 < points.length) {
      const a = points[whole];
      const b = points[whole + 1];
      ctx.lineTo((a[0] + (b[0] - a[0]) * frac) * width, (a[1] + (b[1] - a[1]) * frac) * height);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = `rgba(74, 224, 178, ${alpha})`;
    ctx.stroke();
  }

  function frame(time) {
    const cycle = 6000;
    const t = (time % cycle) / cycle;
    const drawWindow = 0.82;
    const progress = t < drawWindow ? t / drawWindow : 1;
    const alphaBase = 0.44;
    const leftRidgeProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.82));
    const rightRidgeProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.7));

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = `rgba(74, 224, 178, ${alphaBase * 0.7})`;
    ctx.shadowBlur = 10;

    drawPathProgress(mainPeak, progress, 2.6, alphaBase);
    drawPathProgress(ridgeLeft, leftRidgeProgress, 1.7, alphaBase * 0.78);
    drawPathProgress(ridgeRight, rightRidgeProgress, 1.7, alphaBase * 0.78);

    ctx.shadowBlur = 0;
    rafId = window.requestAnimationFrame(frame);
  }

  resize();
  rafId = window.requestAnimationFrame(frame);
  window.addEventListener('resize', resize);
  window.addEventListener('beforeunload', () => {
    if (rafId) window.cancelAnimationFrame(rafId);
  });
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
initMagicCursor();
initForegroundMountain();
initStupaSketch();

