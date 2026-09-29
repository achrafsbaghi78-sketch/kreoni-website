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
      <path data-fill d="M190 125l76-46c18 28 82 28 100 0l76 46 101 66-68 109-72-43v264H197V257l-72 43-68-109z" fill="#111"/>
      <path d="M266 79c8 39 92 39 100 0" fill="none" stroke="rgba(255,255,255,.26)" stroke-width="15" stroke-linecap="round"/>
      <path d="M197 510h206" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
    `,
    hoodie: () => `
      <path data-fill d="M185 190l77-50c18 22 90 22 108 0l77 50 92 66-68 105-71-43v229H200V318l-71 43-68-105z" fill="#111"/>
      <path data-fill d="M242 151c18-94 130-94 148 0-17 61-131 61-148 0z" fill="#111" stroke="rgba(255,255,255,.16)" stroke-width="6"/>
      <path d="M278 172l-22 108M354 172l22 108" stroke="rgba(255,255,255,.55)" stroke-width="5" stroke-linecap="round"/>
      <path d="M257 435c31-25 87-25 118 0l12 73H245z" fill="rgba(0,0,0,.16)" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
    `,
    tote: () => `
      <path data-fill d="M178 220h244l46 300H132z" fill="#d6c09d" stroke="rgba(0,0,0,.14)" stroke-width="6"/>
      <path d="M220 226c0-128 160-128 160 0" fill="none" stroke="var(--product-color)" stroke-width="22" stroke-linecap="round"/>
      <path d="M178 220h244" stroke="rgba(0,0,0,.16)" stroke-width="6"/>
    `,
    cap: () => `
      <path data-fill d="M155 315c0-118 83-191 190-191 121 0 201 86 201 205v95H155z" fill="#111"/>
      <path data-fill d="M156 423c64-42 151-61 248-61 77 0 146 13 204 42-35 71-104 113-207 113-118 0-201-34-245-94z" fill="#111"/>
      <path d="M344 132v239" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
      <path d="M211 214c74-41 190-45 279-8" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="4"/>
    `
  };

  const zones = {
    tshirt:{left:39,top:34,width:22,height:29},
    hoodie:{left:38,top:35,width:24,height:27},
    tote:{left:34,top:38,width:32,height:31},
    cap:{left:40,top:44,width:20,height:16}
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
