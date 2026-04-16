  // reveal on scroll
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }), { threshold: 0.07 });
  document.querySelectorAll('.r').forEach(el => obs.observe(el));

  // navbar
  const nav = document.getElementById('navbar');
  const topBtn = document.getElementById('top-btn');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 30);
    topBtn.classList.toggle('show', scrollY > 500);
  }, { passive: true });

  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 110) cur = s.id; });
    links.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    });
  }, { passive: true });

  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob');
  hbg.addEventListener('click', () => { hbg.classList.toggle('open'); mob.classList.toggle('open'); });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hbg.classList.remove('open'); mob.classList.remove('open'); }));
  hbg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') hbg.click(); });

  // Carousel
  const wrapper = document.getElementById('carouselTrackWrapper');
  document.getElementById('carouselLeft').addEventListener('click', () => wrapper.scrollBy({ left: -424, behavior: 'smooth' }));
  document.getElementById('carouselRight').addEventListener('click', () => wrapper.scrollBy({ left: 424, behavior: 'smooth' }));

  // Portfolio manifest
  const defaultManifest = [
    { file: "T-Shirt Design for DM Maths Team.png", title: "DM Maths Team Tee", url: "https://www.behance.net/gallery/123456789/DM-Maths-Team" },
    { file: "Encore'26 - Creative Partner.png", title: "Encore'26 Creative Partner", url: "https://www.behance.net/gallery/987654321/Encore-26" }
  ];

  async function loadPortfolio() {
    let items = [];
    if (window.portfolioManifest && Array.isArray(window.portfolioManifest)) items = window.portfolioManifest;
    else {
      try { const res = await fetch('./portfolio/manifest.json'); if (res.ok) items = await res.json(); else items = defaultManifest; }
      catch { items = defaultManifest; }
    }
    items = items.map(item => ({ ...item, url: item.url || 'https://www.behance.net/randinuj', title: item.title || item.file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').trim() }));
    const track = document.getElementById('carouselTrack');
    track.innerHTML = items.map((item, i) => `
      <a href="${item.url}" target="_blank" rel="noopener" class="p-card r${i % 2 === 1 ? ' d1' : ''}">
        <img src="portfolio/${encodeURIComponent(item.file).replace(/%2F/g, '/')}" alt="${item.title}" loading="lazy">
        <div class="p-over"><div class="p-cat">PROJECT</div><div class="p-title">${item.title}</div></div>
        <div class="p-arrow"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>
    `).join('');
    document.querySelectorAll('.p-card.r').forEach(el => obs.observe(el));
  }
  loadPortfolio();

  // Reviews (EASILY EDITABLE ARRAY)
  const reviewsData = [
    { name: "2022 O/L & 2025 A/L Batch", role: "President's College", quote: "Hexo handled almost everything from promotions to e-ticketing for our batch party. The designs really helped us build hype and reach more students." },
    { name: "2022 O/L & 2025 A/L Batch", role: "Marapola Maha Vidyalaya", quote: "The work done for our batch party was top quality and the e-ticketing system was very helpful. The posts were clean, engaging, and helped us get strong attention online." },
    { name: "Nethum S. Liyanage", role: "O/L Maths Tutor", quote: "Got a custom class poster done for my tuition classes, and the design came out clean and eye-catching. It really helped attract more students." }
  ];

  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = reviewsData.map(r => `
    <div class="review-card r">
      <div class="review-quote">${r.quote}</div>
      <div class="review-author">
        <div class="review-info"><h4>${r.name}</h4><p>${r.role}</p></div>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.review-card.r').forEach(el => obs.observe(el));

  // Contact form -> WhatsApp
  function handleFormSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const name = f.fname.value.trim() + ' ' + f.lname.value.trim();
    const email = f.email.value.trim();
    const service = f.service.value;
    const message = f.message.value.trim();
    const text = `*New Project Enquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Service:* ${service}%0A%0A*Message:*%0A${message}`;
    window.open(`https://wa.me/94726215434?text=${text}`, '_blank');
    f.reset();
    f.classList.add('hidden');
    document.getElementById('form-success').classList.add('show');
    setTimeout(() => { f.classList.remove('hidden'); document.getElementById('form-success').classList.remove('show'); }, 3000);
  }

  document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);

