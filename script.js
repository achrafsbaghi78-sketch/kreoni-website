const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false')}))}
const p=document.getElementById('copyRequest'),m=document.getElementById('formNote');
if(p&&m){
  p.addEventListener('click',()=>{
    const f=p.closest('form');
    const fields=[...f.querySelectorAll('input,textarea')];
    const [name,city,request]=fields.map(e=>e.value.trim());
    if(!name&&!city&&!request){m.textContent='Ajoutez au moins votre nom, votre ville ou votre demande.';return;}
    const msg=[
      'Bonjour KREONI, je souhaite passer une commande.',
      name?'Nom : '+name:'',
      city?'Ville : '+city:'',
      request?'Demande : '+request:''
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/212664521613?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
    m.textContent='WhatsApp est ouvert avec votre demande préparée.';
  })
}

const tshirtForm=document.getElementById('tshirtConfigurator');
if(tshirtForm){
  const shirtBody=document.getElementById('shirtBody');
  const previewText=document.getElementById('previewText');
  const previewSummary=document.getElementById('previewSummary');
  const recap=document.getElementById('configRecap');
  const qty=document.getElementById('tshirtQty');
  const placement=document.getElementById('printPlacement');
  const customText=document.getElementById('customText');
  const notes=document.getElementById('configNotes');
  const help=document.getElementById('configHelp');

  const selected=(name)=>tshirtForm.querySelector('input[name="'+name+'"]:checked');

  function clampQty(){
    let v=parseInt(qty.value||'1',10);
    if(Number.isNaN(v)||v<1)v=1;
    if(v>100)v=100;
    qty.value=v;
    return v;
  }

  function updateConfigurator(){
    const color=selected('color');
    const size=selected('size');
    const q=clampQty();
    if(color&&shirtBody)shirtBody.setAttribute('fill',color.dataset.color);
    if(previewText){
      const value=(customText.value||'KREONI').trim().slice(0,18);
      previewText.textContent=value||'KREONI';
      const isLight=color&&['Blanc','Beige'].includes(color.value);
      previewText.setAttribute('fill',isLight?'#7b5714':'#d5a33b');
    }
    const unit=q===1?'pièce':'pièces';
    if(previewSummary)previewSummary.textContent=(color?color.value:'')+' • '+(size?size.value:'')+' • '+q+' '+unit;
    if(recap)recap.textContent='T-shirt '+(color?color.value:'')+' • '+(size?size.value:'')+' • '+q+' '+unit+' • '+placement.value;
  }

  tshirtForm.querySelectorAll('input,select,textarea').forEach(el=>el.addEventListener('input',updateConfigurator));
  tshirtForm.querySelectorAll('input[type="radio"]').forEach(el=>el.addEventListener('change',updateConfigurator));
  document.getElementById('qtyMinus')?.addEventListener('click',()=>{qty.value=Math.max(1,clampQty()-1);updateConfigurator()});
  document.getElementById('qtyPlus')?.addEventListener('click',()=>{qty.value=Math.min(100,clampQty()+1);updateConfigurator()});

  document.getElementById('sendTshirtConfig')?.addEventListener('click',()=>{
    const color=selected('color')?.value||'Non précisée';
    const size=selected('size')?.value||'Non précisée';
    const q=clampQty();
    const textValue=customText.value.trim();
    const noteValue=notes.value.trim();
    const msg=[
      'Bonjour KREONI, je souhaite un devis pour un T-shirt personnalisé.',
      '',
      'Produit : T-shirt personnalisé',
      'Couleur souhaitée : '+color,
      'Taille : '+size,
      'Quantité : '+q,
      'Impression : '+placement.value,
      'Visuel : '+(selected('designSource')?.value||'Non précisé'),
      textValue?'Texte / prénom : '+textValue:'',
      noteValue?'Détails : '+noteValue:'',
      '',
      'Merci de me confirmer le prix, la disponibilité et le délai.',
      selected('designSource')?.value==='Modèle DTF KREONI'?'Merci de me partager les modèles DTF KREONI disponibles.':'',
      selected('designSource')?.value==='Mon propre design'?'Je vais joindre mon design / image dans cette conversation WhatsApp.':'',
      selected('designSource')?.value==='J’ai une idée'?'Je vous explique mon idée pour que vous puissiez me guider.':''
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/212664521613?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
    help.textContent='WhatsApp est ouvert avec votre configuration. Ajoutez votre design/photo si nécessaire.';
  });

  updateConfigurator();
}


/* === KREONI premium motion layer === */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('motion-ready');

  const progress = document.createElement('div');
  progress.className = 'kreoni-progress';
  document.body.appendChild(progress);

  const loader = document.createElement('div');
  loader.className = 'kreoni-loader';
  loader.innerHTML = '<div class="kreoni-loader-inner"><img src="assets/brand-mark.svg" alt=""><strong>KREONI</strong><div class="kreoni-loader-line"></div></div>';
  document.body.appendChild(loader);

  const finishIntro = () => {
    loader.classList.add('is-done');
    document.body.classList.add('hero-loaded');
    window.setTimeout(() => loader.remove(), 650);
  };
  if (document.readyState === 'complete') window.setTimeout(finishIntro, 380);
  else window.addEventListener('load', () => window.setTimeout(finishIntro, 380), { once:true });
  window.setTimeout(finishIntro, 1800);

  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  let ticking = false;

  const updateScrollUI = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    progress.style.width = Math.min(100, (y / max) * 100) + '%';

    if (header) {
      header.classList.toggle('is-scrolled', y > 18);
      if (y > 180 && y > lastY + 8) header.classList.add('is-hidden');
      if (y < lastY - 6 || y < 120) header.classList.remove('is-hidden');
    }

    const hero = document.querySelector('.hero');
    const ambient = document.querySelector('.hero-ambient');
    if (hero && ambient && y < hero.offsetHeight) {
      ambient.style.transform = 'translate3d(0,' + (y * .12) + 'px,0) scale(' + (1 + y * .00008) + ')';
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive:true });
  updateScrollUI();

  const revealSingles = [
    '.section-head',
    '.config-preview',
    '.config-form',
    '.b2b-box',
    '.delivery',
    '.faq-wrap',
    '.contact-grid'
  ];
  document.querySelectorAll(revealSingles.join(',')).forEach(el => el.classList.add('motion-reveal'));

  const staggerGroups = ['.store-grid','.how-grid','.tags','.faq-list'];
  document.querySelectorAll(staggerGroups.join(',')).forEach(el => el.classList.add('motion-stagger'));

  const lineSections = document.querySelectorAll('.section,.products-showcase,.configurator-section,.contact-section');

  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.12, rootMargin:'0px 0px -7% 0px' });
    document.querySelectorAll('.motion-reveal,.motion-stagger').forEach(el => io.observe(el));

    const lineIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('line-visible');
      });
    }, { threshold:.08 });
    lineSections.forEach(el => lineIO.observe(el));
  } else {
    document.querySelectorAll('.motion-reveal,.motion-stagger').forEach(el => el.classList.add('is-visible'));
    lineSections.forEach(el => el.classList.add('line-visible'));
  }

  // Premium custom cursor on desktop.
  if (!reduce && window.matchMedia('(pointer:fine) and (min-width:1024px)').matches) {
    const ring = document.createElement('div');
    const dot = document.createElement('div');
    ring.className = 'kreoni-cursor';
    dot.className = 'kreoni-cursor-dot';
    document.body.append(ring, dot);

    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    const renderCursor = () => {
      rx += (x - rx) * .16;
      ry += (y - ry) * .16;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    window.addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      document.body.classList.add('cursor-active');
    }, { passive:true });

    document.querySelectorAll('a,button,summary,input,select,textarea,.store-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
    });
  }

  // Hero product parallax, inspired by the reference interaction but preserving current layout.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    const scene = document.querySelector('.hero-scene');
    const shirt = document.querySelector('.scene-tshirt');
    const hoodie = document.querySelector('.scene-hoodie');
    const tote = document.querySelector('.scene-tote');
    const brand = document.querySelector('.scene-brand');
    if (scene) {
      let raf = 0, px = 0, py = 0;
      const apply = () => {
        raf = 0;
        if (shirt) shirt.style.transform = 'translate3d(' + (px*12) + 'px,' + (py*8) + 'px,0) rotateY(' + (px*2.2) + 'deg)';
        if (hoodie) hoodie.style.transform = 'translate3d(' + (px*-16) + 'px,' + (py*10) + 'px,0) rotateY(' + (px*-2.8) + 'deg)';
        if (tote) tote.style.transform = 'translate3d(' + (px*20) + 'px,' + (py*-8) + 'px,0)';
        if (brand) brand.style.transform = 'translate3d(' + (px*-10) + 'px,' + (py*-6) + 'px,0)';
      };
      scene.addEventListener('mousemove', e => {
        const r = scene.getBoundingClientRect();
        px = ((e.clientX-r.left)/r.width - .5) * 2;
        py = ((e.clientY-r.top)/r.height - .5) * 2;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      scene.addEventListener('mouseleave', () => {
        px = 0; py = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      });
    }
  }

  // 3D tilt for product cards and configurator preview.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.store-card,.config-preview').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX-r.left)/r.width - .5;
        const ny = (e.clientY-r.top)/r.height - .5;
        card.style.transform = 'perspective(900px) rotateX(' + (-ny*5) + 'deg) rotateY(' + (nx*6) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  // Magnetic CTAs.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn,.nav-cta,.store-copy a,.models-link').forEach(el => {
      el.classList.add('magnetic');
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width/2);
        const dy = e.clientY - (r.top + r.height/2);
        el.style.transform = 'translate(' + (dx*.08) + 'px,' + (dy*.12) + 'px)';
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }

  // Active navigation section highlight.
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const targets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const navIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin:'-35% 0px -55% 0px', threshold:0 });
    targets.forEach(t => navIO.observe(t));
  }
})();
