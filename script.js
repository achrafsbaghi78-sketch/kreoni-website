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


/* === Homepage interaction v2 === */
(() => {
  const searchToggle=document.getElementById('siteSearchToggle');
  const searchPanel=document.getElementById('siteSearchPanel');
  const searchClose=document.getElementById('siteSearchClose');
  const setSearch=(open)=>{
    if(!searchPanel)return;
    searchPanel.classList.toggle('open',open);
    searchPanel.setAttribute('aria-hidden',String(!open));
    document.body.style.overflow=open?'hidden':'';
  };
  searchToggle?.addEventListener('click',()=>setSearch(true));
  searchClose?.addEventListener('click',()=>setSearch(false));
  searchPanel?.addEventListener('click',e=>{if(e.target===searchPanel)setSearch(false)});
  searchPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setSearch(false)));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')setSearch(false)});

  const scene=document.getElementById('heroScene');
  const prev=document.getElementById('scenePrev');
  const next=document.getElementById('sceneNext');
  const toggleScene=()=>scene?.classList.toggle('scene-alt');
  prev?.addEventListener('click',toggleScene);
  next?.addEventListener('click',toggleScene);
})();


/* === Hero dots sync === */
(() => {
  const scene=document.getElementById('heroScene');
  const dot1=document.getElementById('heroDotOne');
  const dot2=document.getElementById('heroDotTwo');
  const prev=document.getElementById('scenePrev');
  const next=document.getElementById('sceneNext');
  if(!scene||!dot1||!dot2)return;
  const sync=()=>{
    const alt=scene.classList.contains('scene-alt');
    dot1.classList.toggle('active',!alt);
    dot2.classList.toggle('active',alt);
  };
  const setAlt=(alt)=>{scene.classList.toggle('scene-alt',alt);sync()};
  dot1.addEventListener('click',()=>setAlt(false));
  dot2.addEventListener('click',()=>setAlt(true));
  prev?.addEventListener('click',()=>requestAnimationFrame(sync));
  next?.addEventListener('click',()=>requestAnimationFrame(sync));
  sync();
})();


/* === MOBILE NAV POLISH + SMART HERO === */
(() => {
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  const setNavState=()=>{
    const open=nav?.classList.contains('open');
    document.body.classList.toggle('nav-open',!!open);
    if(menu) menu.textContent=open?'×':'☰';
  };
  menu?.addEventListener('click',()=>requestAnimationFrame(setNavState));
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>requestAnimationFrame(setNavState)));
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&nav?.classList.contains('open')){
      nav.classList.remove('open');
      menu?.setAttribute('aria-expanded','false');
      setNavState();
    }
  });
  window.addEventListener('resize',()=>{
    if(innerWidth>900&&nav?.classList.contains('open')){
      nav.classList.remove('open');
      menu?.setAttribute('aria-expanded','false');
      setNavState();
    }
  });

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene=document.getElementById('heroScene');
  const dot1=document.getElementById('heroDotOne');
  const dot2=document.getElementById('heroDotTwo');
  if(!reduce&&scene&&dot1&&dot2){
    let timer=0;
    const rotate=()=>{
      scene.classList.toggle('scene-alt');
      const alt=scene.classList.contains('scene-alt');
      dot1.classList.toggle('active',!alt);
      dot2.classList.toggle('active',alt);
    };
    const start=()=>{
      clearInterval(timer);
      if(document.visibilityState==='visible')timer=setInterval(rotate,6500);
    };
    const stop=()=>clearInterval(timer);
    scene.addEventListener('mouseenter',stop);
    scene.addEventListener('mouseleave',start);
    document.addEventListener('visibilitychange',()=>document.visibilityState==='visible'?start():stop());
    dot1.addEventListener('click',start);
    dot2.addEventListener('click',start);
    start();
  }
})();


/* === KREONI LIVE CUSTOMIZER V1 === */
(() => {
  const form = document.getElementById('kreoniCustomizer');
  if (!form) return;

  const stage = document.getElementById('mockupStage');
  const svg = document.getElementById('productMockup');
  const zone = document.getElementById('designZone');
  const upload = document.getElementById('designUpload');
  const uploadState = document.getElementById('uploadState');
  const previewImg = document.getElementById('uploadedDesignPreview');
  const placeholder = document.getElementById('designPlaceholder');
  const scaleInput = document.getElementById('designScale');
  const controls = document.getElementById('designControls');
  const recap = document.getElementById('customizerRecap');
  const previewTitle = document.getElementById('customPreviewTitle');
  const previewSummary = document.getElementById('customPreviewSummary');
  const qty = document.getElementById('customQty');
  const sizeBlock = document.getElementById('customSizeBlock');
  const placement = document.getElementById('customPlacement');
  const notes = document.getElementById('customNotes');
  const help = document.getElementById('customizerHelp');

  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let originX = 0;
  let originY = 0;
  let uploadedName = '';

  const shapes = {
    tshirt: () => `
      <ellipse cx="300" cy="527" rx="170" ry="24" fill="rgba(0,0,0,.12)"/>
      <path data-fill d="M214 126
        C231 116 249 104 266 92
        C278 115 322 123 347 93
        C366 104 386 116 405 128
        L510 188
        C525 197 530 215 520 230
        L466 315
        C459 326 444 329 433 321
        L397 295
        L397 503
        C397 520 387 531 371 533
        L229 533
        C213 531 203 520 203 503
        L203 295
        L167 321
        C156 329 141 326 134 315
        L80 230
        C70 215 75 197 90 188
        Z" fill="#111"/>
      <path d="M260 94 C270 138 332 145 349 94" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="17" stroke-linecap="round"/>
      <path d="M261 96 C273 126 327 130 347 96" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="5" stroke-linecap="round"/>
      <path d="M213 143 C190 165 173 185 157 214" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="4"/>
      <path d="M405 143 C428 165 445 185 461 214" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="4"/>
      <path d="M207 279 C238 300 270 309 300 309 C330 309 362 300 393 279" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="4"/>
      <path d="M205 512 H395" stroke="rgba(255,255,255,.12)" stroke-width="5"/>
      <path d="M232 138 C218 240 224 390 240 507" fill="none" stroke="rgba(255,255,255,.035)" stroke-width="17"/>
      <path d="M368 138 C382 240 376 390 360 507" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="19"/>
      <path d="M96 194 C126 214 154 237 178 268" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="7"/>
      <path d="M504 194 C474 214 446 237 422 268" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="7"/>
    `,
    hoodie: () => `
      <ellipse cx="300" cy="535" rx="176" ry="24" fill="rgba(0,0,0,.13)"/>
      <path data-fill d="M220 178
        C235 164 251 151 267 141
        C280 153 320 156 337 141
        C355 151 372 165 388 179
        L494 234
        C512 244 517 263 507 279
        L459 356
        C451 368 437 372 425 364
        L396 345
        L396 506
        C396 526 382 538 362 540
        L238 540
        C218 538 204 526 204 506
        L204 345
        L175 364
        C163 372 149 368 141 356
        L93 279
        C83 263 88 244 106 234
        Z" fill="#111"/>
      <path data-fill d="M240 177
        C231 130 251 84 300 73
        C349 84 369 130 360 177
        C344 198 325 209 300 211
        C275 209 256 198 240 177 Z" fill="#111"/>
      <path d="M253 168 C270 185 286 193 300 194 C314 193 330 185 347 168" fill="none" stroke="rgba(255,255,255,.13)" stroke-width="5"/>
      <path d="M275 182 L261 279 M325 182 L339 279" stroke="rgba(235,235,235,.82)" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="259" cy="282" r="6" fill="rgba(235,235,235,.85)"/>
      <circle cx="341" cy="282" r="6" fill="rgba(235,235,235,.85)"/>
      <path d="M245 408
        C266 391 334 391 355 408
        L372 489
        H228 Z" fill="rgba(0,0,0,.13)" stroke="rgba(255,255,255,.10)" stroke-width="4"/>
      <path d="M205 498 H395" stroke="rgba(255,255,255,.11)" stroke-width="12"/>
      <path d="M221 203 C210 300 218 410 231 498" fill="none" stroke="rgba(255,255,255,.035)" stroke-width="18"/>
      <path d="M379 203 C390 300 382 410 369 498" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="20"/>
      <path d="M106 246 C136 268 158 293 179 327" fill="none" stroke="rgba(255,255,255,.055)" stroke-width="7"/>
      <path d="M494 246 C464 268 442 293 421 327" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="7"/>
    `,
    tote: () => `
      <ellipse cx="300" cy="525" rx="145" ry="22" fill="rgba(0,0,0,.12)"/>
      <path data-fill d="M171 222
        C170 210 180 201 192 201
        H408
        C420 201 430 210 429 222
        L450 499
        C451 515 440 526 424 526
        H176
        C160 526 149 515 150 499 Z" fill="#d6c09d"/>
      <path d="M212 211
        C212 125 250 88 300 88
        C350 88 388 125 388 211" fill="none" stroke="var(--product-color)" stroke-width="24" stroke-linecap="round"/>
      <path d="M212 211 C212 125 250 88 300 88 C350 88 388 125 388 211" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="5" stroke-linecap="round"/>
      <path d="M170 231 H430" stroke="rgba(0,0,0,.13)" stroke-width="5"/>
      <path d="M184 245 L171 494 M416 245 L429 494" stroke="rgba(0,0,0,.07)" stroke-width="4"/>
      <path d="M196 230 V204 M404 230 V204" stroke="rgba(0,0,0,.15)" stroke-width="7" stroke-linecap="round"/>
      <path d="M177 505 H423" stroke="rgba(0,0,0,.10)" stroke-width="5"/>
      <path d="M197 234 C205 323 206 412 194 498" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="18"/>
      <path d="M403 234 C395 323 394 412 406 498" fill="none" stroke="rgba(0,0,0,.05)" stroke-width="18"/>
    `,
    cap: () => `
      <ellipse cx="308" cy="488" rx="188" ry="26" fill="rgba(0,0,0,.12)"/>
      <path data-fill d="M161 342
        C161 219 227 129 325 119
        C422 129 486 216 486 340
        C454 372 413 393 364 402
        C304 413 239 398 194 371
        C181 363 170 353 161 342 Z" fill="#111"/>
      <path data-fill d="M181 360
        C243 336 328 335 401 350
        C469 364 523 389 560 426
        C532 468 468 488 381 486
        C293 484 216 448 181 399 Z" fill="#111"/>
      <path d="M325 124 V395" stroke="rgba(255,255,255,.13)" stroke-width="4"/>
      <path d="M325 126 C270 135 226 171 202 224" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="4"/>
      <path d="M325 126 C380 135 425 170 451 222" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="4"/>
      <path d="M197 282 C269 248 390 247 465 282" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="4"/>
      <path d="M190 361 C261 340 350 340 414 354" fill="none" stroke="rgba(0,0,0,.15)" stroke-width="5"/>
      <path d="M201 386 C290 416 418 433 523 423" fill="none" stroke="rgba(255,255,255,.055)" stroke-width="5"/>
      <circle cx="325" cy="121" r="12" fill="var(--product-color)" stroke="rgba(255,255,255,.13)" stroke-width="3"/>
      <path d="M183 362 C209 279 235 194 292 141" fill="none" stroke="rgba(255,255,255,.025)" stroke-width="23"/>
    `
  };

  const zones = {
    tshirt:{left:39,top:34,width:22,height:28},
    hoodie:{left:38,top:35,width:24,height:26},
    tote:{left:34,top:39,width:32,height:30},
    cap:{left:39,top:43,width:22,height:15}
  };

  const selected = name => form.querySelector('input[name="'+name+'"]:checked');
  const getProductKey = () => selected('product')?.dataset.product || 'tshirt';

  function clampQty(){
    let v = parseInt(qty.value || '1',10);
    if (!Number.isFinite(v) || v < 1) v = 1;
    if (v > 100) v = 100;
    qty.value = v;
    return v;
  }

  function applyColor(){
    const color = selected('mockupColor')?.dataset.color || '#111111';
    stage.style.setProperty('--product-color',color);
    svg.querySelectorAll('[data-fill]').forEach(el => el.setAttribute('fill', color));
    const light = ['#f4f3ef','#d6c09d'].includes(color.toLowerCase());
    svg.querySelectorAll('path[stroke*="255"]').forEach(el => {
      if (light) el.setAttribute('stroke','rgba(0,0,0,.16)');
    });
  }

  function setZone(product){
    const z = zones[product] || zones.tshirt;
    Object.assign(zone.style,{
      left:z.left+'%',top:z.top+'%',width:z.width+'%',height:z.height+'%'
    });
  }

  function renderProduct(){
    const product = getProductKey();
    stage.dataset.product = product;
    svg.innerHTML = shapes[product]();
    setZone(product);
    applyColor();
    const name = selected('product')?.value || 'T-shirt';
    previewTitle.textContent = name + ' personnalisé';
    sizeBlock.hidden = ['tote','cap'].includes(product);
    resetDesign(false);
    updateRecap();
  }

  function applyDesignTransform(){
    previewImg.style.transform = 'translate('+offsetX+'px,'+offsetY+'px) scale('+scale+')';
    scaleInput.value = Math.round(scale*100);
  }

  function resetDesign(resetScale=true){
    offsetX = 0; offsetY = 0;
    if (resetScale) scale = 1;
    applyDesignTransform();
  }

  function updateRecap(){
    const product = selected('product')?.value || 'T-shirt';
    const key = getProductKey();
    const color = selected('mockupColor')?.value || 'Noir';
    const size = selected('customSize')?.value || 'M';
    const q = clampQty();
    const unit = q === 1 ? 'pièce' : 'pièces';
    const sizePart = ['tote','cap'].includes(key) ? '' : ' • '+size;
    const summary = color + sizePart + ' • ' + q + ' ' + unit;
    recap.textContent = product + ' • ' + summary;
    previewSummary.textContent = summary;
  }

  form.querySelectorAll('input[name="product"]').forEach(el => el.addEventListener('change',renderProduct));
  form.querySelectorAll('input[name="mockupColor"]').forEach(el => el.addEventListener('change',()=>{applyColor();updateRecap()}));
  form.querySelectorAll('input[name="customSize"]').forEach(el => el.addEventListener('change',updateRecap));
  qty.addEventListener('input',updateRecap);

  document.getElementById('customQtyMinus')?.addEventListener('click',()=>{qty.value=Math.max(1,clampQty()-1);updateRecap()});
  document.getElementById('customQtyPlus')?.addEventListener('click',()=>{qty.value=Math.min(100,clampQty()+1);updateRecap()});

  upload.addEventListener('change',() => {
    const file = upload.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
      uploadState.textContent = 'Format non pris en charge.';
      return;
    }
    if (file.size > 10*1024*1024) {
      uploadState.textContent = 'Fichier trop lourd — 10 Mo maximum.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.hidden = false;
      placeholder.hidden = true;
      zone.classList.add('has-design');
      uploadedName = file.name;
      uploadState.textContent = file.name;
      controls.classList.remove('is-disabled');
      resetDesign(true);
    };
    reader.readAsDataURL(file);
  });

  scaleInput.addEventListener('input',()=>{
    scale = Number(scaleInput.value)/100;
    applyDesignTransform();
  });
  document.getElementById('designZoomOut')?.addEventListener('click',()=>{
    scale=Math.max(.45,scale-.1);applyDesignTransform();
  });
  document.getElementById('designZoomIn')?.addEventListener('click',()=>{
    scale=Math.min(1.8,scale+.1);applyDesignTransform();
  });
  document.getElementById('designReset')?.addEventListener('click',()=>resetDesign(true));
  document.getElementById('designRemove')?.addEventListener('click',()=>{
    upload.value='';uploadedName='';previewImg.removeAttribute('src');previewImg.hidden=true;
    placeholder.hidden=false;zone.classList.remove('has-design');
    uploadState.textContent='Cliquez ici pour choisir votre fichier';resetDesign(true);
  });

  zone.addEventListener('pointerdown',e=>{
    if (previewImg.hidden) return;
    dragging=true;zone.setPointerCapture(e.pointerId);
    dragStartX=e.clientX;dragStartY=e.clientY;originX=offsetX;originY=offsetY;
  });
  zone.addEventListener('pointermove',e=>{
    if(!dragging)return;
    offsetX=originX+(e.clientX-dragStartX);
    offsetY=originY+(e.clientY-dragStartY);
    applyDesignTransform();
  });
  const stopDrag=e=>{dragging=false;try{zone.releasePointerCapture(e.pointerId)}catch(_){}};
  zone.addEventListener('pointerup',stopDrag);
  zone.addEventListener('pointercancel',stopDrag);

  document.getElementById('sendCustomConfig')?.addEventListener('click',()=>{
    const product = selected('product')?.value || 'T-shirt';
    const key = getProductKey();
    const color = selected('mockupColor')?.value || 'Noir';
    const size = selected('customSize')?.value || 'M';
    const q = clampQty();
    const note = notes.value.trim();
    const msg = [
      'Bonjour KREONI, je souhaite un devis pour une personnalisation.',
      '',
      'Produit : '+product,
      'Couleur : '+color,
      !['tote','cap'].includes(key) ? 'Taille : '+size : '',
      'Quantité : '+q,
      'Emplacement : '+placement.value,
      uploadedName ? 'Fichier préparé : '+uploadedName : 'Design : à envoyer sur WhatsApp',
      note ? 'Détails : '+note : '',
      '',
      'J’ai préparé un aperçu sur votre configurateur. Je joins mon fichier ici pour validation du BAT.'
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/212664521613?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
    help.textContent='WhatsApp est ouvert. Ajoutez votre fichier original dans la conversation pour finaliser la demande.';
  });

  controls.classList.add('is-disabled');
  renderProduct();
})();
