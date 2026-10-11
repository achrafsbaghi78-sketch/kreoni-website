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

// Add future catalogue imports here with a unique stable reference.

const productForm = document.getElementById('productConfigurator');
if (productForm) {
  const byId = id => document.getElementById(id);
  const products = {
    tshirt: {label: 'T-shirt personnalisé', image: 'assets/tshirt-dtf.webp', placements: ['Devant', 'Dos', 'Devant + dos', 'Poitrine / petit logo']},
    hoodie: {label: 'Hoodie personnalisé', image: 'assets/hoodie-dtf.webp', placements: ['Devant', 'Dos', 'Devant + dos', 'Poitrine / petit logo']},
    tote: {label: 'Sac / Tote bag personnalisé', image: 'assets/tote-dtf.webp', placements: ['Recto', 'Verso', 'Recto + verso']},
    b2b: {label: 'Devis professionnels / B2B', image: 'assets/polo-studio.webp', placements: []}
  };
  const current = () => productForm.querySelector('[name="product"]:checked').value;
  const color = () => productForm.querySelector('[name="color"]:checked').value;
  const toggle = (id, hidden) => {
    const el = byId(id); el.hidden = hidden;
    el.querySelectorAll('input,select,textarea').forEach(input => input.disabled = hidden);
  };
  const preview = byId('productPreview');
  const secondaryPreview = byId('secondaryPreview');
  [preview, secondaryPreview, byId('primaryArtwork'), byId('secondaryArtwork')].forEach(image => {
    image.addEventListener('load', () => { image.style.opacity = '1'; image.style.visibility = 'visible'; });
    image.addEventListener('error', () => {
      image.style.opacity = '1';
      image.style.visibility = 'hidden';
      byId('previewStatus').textContent = 'Image indisponible. Votre sélection reste enregistrée.';
    });
  });
  function setView(image, frame, src, strip, selectedColor, description) {
    frame.classList.toggle('color-strip', strip);
    frame.style.setProperty('--panel-offset', (-100 * ['Noir', 'Blanc', 'Beige'].indexOf(selectedColor)) + '%');
    if (image.getAttribute('src') !== src) {
      image.style.opacity = '.45';
      image.src = src;
      if (image.complete && image.naturalWidth) image.style.opacity = '1';
    }
    image.alt = description;
  }
  let previousProduct;
  function updateProduct() {
    const key = current(), product = products[key], business = key === 'b2b';
    toggle('b2bFields', !business);
    toggle('colorFields', business);
    toggle('sizeField', business || key === 'tote');
    toggle('placementField', business);
    if (key !== previousProduct) {
      const placement = byId('productPlacement');
      const previousPlacement = placement.value;
      placement.replaceChildren(...product.placements.map(value => new Option(value, value)));
      if (product.placements.includes(previousPlacement)) placement.value = previousPlacement;
      else {
        const selectedDesign = catalogDesigns.find(item => item.id === productForm.dataset.designId);
        if (selectedDesign?.defaultPlacement && product.placements.includes(selectedDesign.defaultPlacement)) placement.value = selectedDesign.defaultPlacement;
      }
      previousProduct = key;
    }
    const selectedColor = color();
    const placement = byId('productPlacement').value;
    const both = !business && (placement === 'Devant + dos' || placement === 'Recto + verso');
    const rear = !business && (placement === 'Dos' || placement === 'Verso');
    const chest = !business && placement === 'Poitrine / petit logo';
    const frontLabel = key === 'tote' ? 'Recto' : 'Devant';
    const backLabel = key === 'tote' ? 'Verso' : 'Dos';
    const viewLabel = business ? 'Exemple professionnel' : rear ? backLabel : chest ? 'Poitrine / petit logo' : frontLabel;
    const primarySrc = business ? product.image : 'assets/' + key + '-blank-' + (rear ? 'back' : 'front') + '.webp';
    const previewLabel = product.label + (business ? '' : ' · ' + selectedColor);
    setView(preview, byId('primaryFrame'), primarySrc, !business, selectedColor, previewLabel + ' · ' + viewLabel);
    byId('primaryFrame').dataset.product = key;
    byId('primaryFrame').dataset.placement = rear ? 'back' : chest ? 'chest' : 'front';
    byId('primaryCaption').textContent = viewLabel;
    byId('secondaryView').hidden = !both;
    byId('previewViews').classList.toggle('two-views', both);
    if (both) {
      setView(secondaryPreview, byId('secondaryFrame'), 'assets/' + key + '-blank-back.webp', true, selectedColor, previewLabel + ' · ' + backLabel);
      byId('secondaryFrame').dataset.product = key;
      byId('secondaryFrame').dataset.placement = 'back';
      byId('secondaryCaption').textContent = backLabel;
    }
    byId('productPreviewTitle').textContent = previewLabel;
    byId('previewStatus').textContent = business ? '' : selectedColor + ' · ' + placement;
    const quantity = byId('productQty').value;
    const parts = business
      ? ['Devis B2B', byId('businessProduct').value]
      : [product.label, color(), key === 'tote' ? '' : byId('productSize').value, byId('productPlacement').value];
    parts.push(quantity ? quantity + (quantity === '1' ? ' pièce' : ' pièces') : 'Quantité à préciser');
    byId('productRecap').textContent = parts.filter(Boolean).join(' · ');
    const design = byId('designSource').value;
    const selectedDesign = design === 'Modèle DTF KREONI' ? catalogDesigns.find(item => item.id === productForm.dataset.designId) : null;
    const pairedFront = !!selectedDesign?.frontImage && (key === 'tshirt' || key === 'hoodie') && !rear;
    if (pairedFront) {
      byId('primaryFrame').dataset.placement = 'chest';
      byId('primaryCaption').textContent = 'Devant · petit emblème';
    }
    byId('selectedDesignPanel').hidden = !selectedDesign;
    byId('previewNote').textContent = 'Aperçu indicatif de la couleur et de l’emplacement. Dimensions et visuel final validés avant production.';
    if (selectedDesign) {
      byId('selectedDesignImage').src = selectedDesign.image;
      byId('selectedDesignImage').alt = selectedDesign.name;
      byId('selectedDesignName').textContent = selectedDesign.id + ' · ' + selectedDesign.name;
      byId('selectedDesignStory').textContent = selectedDesign.story || '';
      byId('selectedDesignStory').hidden = !selectedDesign.story;
      byId('productRecap').textContent += ' · ' + selectedDesign.id;
    }
    [byId('primaryArtwork'), byId('secondaryArtwork')].forEach((art, index) => {
      art.hidden = !selectedDesign || business || (index === 1 && !both);
      if (selectedDesign && !business) {
        art.src = index === 0 && pairedFront ? selectedDesign.frontImage : selectedDesign.image;
        art.alt = selectedDesign.name + ' · ' + selectedDesign.id;
      } else {
        art.removeAttribute('src');
        art.alt = '';
      }
    });
    if (pairedFront) byId('previewNote').textContent = 'Duo assorti : petit emblème devant, grande illustration au dos. Choisissez Devant + dos pour voir les deux. Dimensions validées avant production.';
    byId('designHelp').textContent = design === 'Mon propre design'
      ? 'Joignez votre image ou votre logo dans la conversation WhatsApp.'
      : design === 'J’ai une idée' ? 'Décrivez votre idée dans les détails ou sur WhatsApp.'
      : selectedDesign ? 'Design sélectionné : ' + selectedDesign.id + '. Il sera inclus dans votre demande.' : 'Choisissez un design dans le catalogue, ou demandez conseil sur WhatsApp.';
    byId('sendProductConfig').textContent = business ? 'Demander un devis B2B sur WhatsApp' : 'Demander mon devis sur WhatsApp';
  }
  productForm.addEventListener('input', updateProduct);
  productForm.addEventListener('change', updateProduct);
  document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
    const input = productForm.querySelector('[name="product"][value="' + link.dataset.product + '"]');
    if (input) { input.checked = true; updateProduct(); }
  }));
  productForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!productForm.reportValidity()) return;
    const key = current(), business = key === 'b2b';
    const lines = ['Bonjour KREONI, je souhaite ' + (business ? 'un devis professionnel / B2B.' : 'un devis pour un ' + products[key].label.toLowerCase() + '.')];
    if (business) {
      if (byId('businessName').value.trim()) lines.push('Entreprise / association : ' + byId('businessName').value.trim());
      lines.push('Produit(s) : ' + byId('businessProduct').value);
    } else {
      lines.push('Produit : ' + products[key].label, 'Couleur : ' + color());
      if (key !== 'tote') lines.push('Taille : ' + byId('productSize').value);
      lines.push('Impression : ' + byId('productPlacement').value);
    }
    lines.push('Quantité : ' + byId('productQty').value, 'Visuel : ' + byId('designSource').value);
    const chosenDesign = byId('designSource').value === 'Modèle DTF KREONI' ? catalogDesigns.find(item => item.id === productForm.dataset.designId) : null;
    if (chosenDesign) lines.push('Référence design : ' + chosenDesign.id + ' — ' + chosenDesign.name);
    if (chosenDesign?.frontImage && !business) {
      const placement = byId('productPlacement').value;
      const garment = key === 'tshirt' || key === 'hoodie';
      lines.push('Visuels : ' + (garment && !['Dos','Verso'].includes(placement) ? 'emblème devant (' + chosenDesign.id + '-FRONT)' + (placement.includes('+') ? ' + illustration au dos (' + chosenDesign.id + ')' : '') : 'illustration principale (' + chosenDesign.id + ')'));
    }
    if (byId('productNotes').value.trim()) lines.push('Détails : ' + byId('productNotes').value.trim());
    lines.push(byId('designHelp').textContent, 'Merci de confirmer le prix, la disponibilité et le délai.');
    window.open('https://wa.me/212664521613?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener,noreferrer');
    byId('productHelp').textContent = 'Votre demande est prête dans WhatsApp. Ajoutez votre fichier si nécessaire, puis envoyez-la.';
  });
  updateProduct();
}

const heroButtons = document.querySelectorAll('[data-hero-product]');
if (heroButtons.length) {
  const heroProducts = {
    tshirt: {name: 'T-shirt personnalisé', detail: 'Votre univers, imprimé en couleurs.', cta: 'Personnaliser mon T-shirt', image: 'assets/tshirt-dtf.webp', number: '01 / 03'},
    hoodie: {name: 'Hoodie personnalisé', detail: 'Une pièce forte. Une création à vous.', cta: 'Personnaliser mon Hoodie', image: 'assets/hoodie-dtf.webp', number: '02 / 03'},
    tote: {name: 'Sac / Tote bag personnalisé', detail: 'Votre créativité vous accompagne.', cta: 'Personnaliser mon Sac', image: 'assets/tote-dtf.webp', number: '03 / 03'}
  };
  heroButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.heroProduct, product = heroProducts[key];
    heroButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('.hero-gallery').dataset.activeProduct = key;
    const image = document.getElementById('heroProductImage');
    image.src = product.image;
    image.alt = product.name + ' avec illustration DTF';
    document.getElementById('heroProductName').textContent = product.name;
    document.getElementById('heroProductDetail').textContent = product.detail;
    document.getElementById('heroProductNumber').textContent = product.number;
    const link = document.getElementById('heroCustomize');
    link.dataset.product = key;
    link.replaceChildren(document.createTextNode(product.cta + ' '));
    const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗'; link.append(arrow);
  }));
}

const catalogGrid = document.getElementById('catalogGrid');
if (catalogGrid) {
  const dialog = document.getElementById('designDialog');
  let lastDesignButton, detailDesign, dialogScroll = 0, acceptedDetail = false, pageLocked = false;
  const favoriteKey = 'kreoni.favorites.v1';
  const favoriteToggle = document.getElementById('catalogFavorites');
  const favoriteStatus = document.getElementById('favoritesStatus');
  let favorites = new Set(), favoritesOnly = false;
  function readFavorites(value) {
    const saved = JSON.parse(value || 'null');
    return new Set(Array.isArray(saved?.ids) && saved.version === 1 ? saved.ids.filter(id => catalogDesigns.some(design => design.id === id)) : []);
  }
  try { favorites = readFavorites(localStorage.getItem(favoriteKey)); }
  catch (_) { favoriteStatus.textContent = 'Favoris disponibles pour cette visite uniquement.'; }
  function syncFavorites() {
    document.getElementById('favoritesCount').textContent = String(favorites.size);
    favoriteToggle.setAttribute('aria-pressed', String(favoritesOnly));
    catalogGrid.querySelectorAll('[data-favorite]').forEach(button => {
      const saved = favorites.has(button.dataset.favorite);
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', (saved ? 'Retirer des favoris : ' : 'Ajouter aux favoris : ') + button.dataset.name);
      button.textContent = saved ? '♥' : '♡';
    });
    if (detailDesign) {
      const saved = favorites.has(detailDesign.id), button = document.getElementById('detailFavorite');
      button.setAttribute('aria-pressed', String(saved));
      button.textContent = saved ? '♥ Dans mes favoris' : '♡ Ajouter aux favoris';
    }
  }
  function toggleFavorite(id) {
    const saved = !favorites.has(id);
    if (saved) favorites.add(id); else favorites.delete(id);
    let persistent = true;
    try { localStorage.setItem(favoriteKey, JSON.stringify({version:1, ids:[...favorites]})); }
    catch (_) { persistent = false; }
    favoriteStatus.textContent = (saved ? 'Design ajouté aux favoris.' : 'Design retiré des favoris.') + (persistent ? '' : ' Sauvegarde disponible pour cette visite uniquement.');
    syncFavorites(); filterCatalogue();
  }

  const detailProduct = document.getElementById('detailProduct');
  const detailPlacement = document.getElementById('detailPlacement');
  const detailViewport = document.getElementById('detailViewport');
  const zoom = document.getElementById('detailZoom');
  let detailView = 'textile';
  function setDetailZoom(value) {
    zoom.value = Math.max(100, Math.min(250, Number(value)));
    document.getElementById('detailZoomValue').textContent = zoom.value + ' %';
    document.getElementById('detailCanvas').style.width = zoom.value + '%';
    document.getElementById('detailZoomOut').disabled = Number(zoom.value) === 100;
    document.getElementById('detailZoomIn').disabled = Number(zoom.value) === 250;
    if (Number(zoom.value) === 100) { detailViewport.scrollTop = 0; detailViewport.scrollLeft = 0; }
  }
  function setDetailPlacements() {
    const old = detailPlacement.value;
    const values = detailProduct.value === 'tote' ? ['Recto','Verso'] : ['Devant','Dos','Poitrine / petit logo'];
    detailPlacement.replaceChildren(...values.map(value => new Option(value, value)));
    detailPlacement.value = values.includes(old) ? old : values.includes(detailDesign.defaultPlacement) ? detailDesign.defaultPlacement : detailDesign.frontImage && detailProduct.value !== 'tote' ? 'Dos' : values[0];
  }
  function renderDetail() {
    if (!detailDesign) return;
    const product = detailProduct.value;
    const color = dialog.querySelector('[name="detailColor"]:checked').value;
    const rear = ['Dos','Verso'].includes(detailPlacement.value);
    const emblem = !!detailDesign.frontImage && product !== 'tote' && !rear;
    const frame = document.getElementById('detailFrame');
    frame.dataset.product = product;
    frame.dataset.placement = rear ? 'back' : emblem || detailPlacement.value.startsWith('Poitrine') ? 'chest' : 'front';
    frame.style.setProperty('--panel-offset', (-100 * ['Noir','Blanc','Beige'].indexOf(color)) + '%');
    const garment = document.getElementById('detailGarment');
    garment.src = 'assets/' + product + '-blank-' + (rear ? 'back' : 'front') + '.webp';
    garment.alt = detailProduct.selectedOptions[0].textContent + ' · ' + color;
    const art = document.getElementById('detailArtwork');
    art.src = emblem ? detailDesign.frontImage : detailDesign.image; art.alt = detailDesign.name;
    document.getElementById('detailTextile').hidden = detailView !== 'textile';
    document.getElementById('designDialogImage').hidden = detailView !== 'art';
    document.getElementById('detailPreviewStatus').textContent = detailView === 'art' ? 'Illustration principale · faites défiler l’aperçu après le zoom.' : garment.alt + ' · ' + (emblem ? 'Petit emblème devant' : detailPlacement.value);
  }
  function releaseDetailPage() {
    if (!pageLocked) return;
    pageLocked = false;
    document.documentElement.classList.remove('detail-open');
    window.scrollTo({top:dialogScroll,behavior:'instant'});
    if (acceptedDetail) requestAnimationFrame(() => document.getElementById('configurateur').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}));
    else (lastDesignButton?.closest('.design-card')?.hidden ? favoriteToggle : lastDesignButton)?.focus({preventScroll:true});
  }
  function chooseDesign(id, options) {
    const design = catalogDesigns.find(item => item.id === id);
    if (!design) return;
    if (options) {
      productForm.querySelector('[name="product"][value="'+options.product+'"]').checked = true;
      productForm.querySelector('[name="color"][value="'+options.color+'"]').checked = true;
    }
    productForm.dataset.designId = id;
    document.getElementById('designSource').value = 'Modèle DTF KREONI';
    productForm.dispatchEvent(new Event('change', {bubbles:true}));
    if (design.frontImage && ['tshirt','hoodie'].includes(productForm.querySelector('[name="product"]:checked').value)) {
      document.getElementById('productPlacement').value = 'Devant + dos';
      productForm.dispatchEvent(new Event('change', {bubbles:true}));
    }
    if (design.defaultPlacement && ['tshirt','hoodie'].includes(productForm.querySelector('[name="product"]:checked').value)) {
      document.getElementById('productPlacement').value = design.defaultPlacement;
      productForm.dispatchEvent(new Event('change', {bubbles:true}));
    }
    if (options && !(design.frontImage && ['tshirt','hoodie'].includes(options.product))) {
      document.getElementById('productPlacement').value = options.placement;
      productForm.dispatchEvent(new Event('change', {bubbles:true}));
    }
    if (dialog.open) { acceptedDetail = true; dialog.close(); releaseDetailPage(); }
    document.getElementById('configurateur').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  function openDesign(design,trigger) {
      lastDesignButton=trigger;
      detailDesign = design; acceptedDetail = false; syncFavorites();
      const selectedProduct = productForm.querySelector('[name="product"]:checked').value;
      detailProduct.value = selectedProduct === 'b2b' ? 'tshirt' : selectedProduct;
      dialog.querySelector('[name="detailColor"][value="'+productForm.querySelector('[name="color"]:checked').value+'"]').checked = true;
      detailPlacement.replaceChildren(); setDetailPlacements();
      detailView = 'textile';
      dialog.querySelectorAll('[data-detail-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.detailView === detailView)));
      setDetailZoom(100); renderDetail();
      document.getElementById('designDialogImage').src=design.image;
      document.getElementById('designDialogImage').alt=design.name;
      document.getElementById('designDialogTitle').textContent=design.name;
      document.getElementById('designDialogCategory').textContent=(design.collection || design.category)+((design.theme || design.series)?' · '+(design.theme || design.series):'')+' · '+design.id;
      document.getElementById('designDialogStory').textContent=design.story || '';
      document.getElementById('designDialogStory').hidden=!design.story;
      const frontPreview=document.getElementById('designDialogFront');
      frontPreview.hidden=!design.frontImage;
      const frontImage=document.getElementById('designDialogFrontImage');
      if(design.frontImage){frontImage.src=design.frontImage;frontImage.alt=design.name+' · petit emblème devant';}else{frontImage.removeAttribute('src');frontImage.alt='';}
      document.getElementById('chooseDialogDesign').dataset.designId=design.id;
      dialogScroll = window.scrollY;
      dialog.showModal();
      pageLocked = true; document.documentElement.classList.add('detail-open');
  }
  let activeCategory = 'Tous', visibleLimit = 12;
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const search = document.getElementById('catalogSearch');
  const collection = document.getElementById('catalogCollection');
  const more = document.getElementById('catalogMore');
  const miniTheme = document.getElementById('miniTheme');
  const miniThemeField = document.getElementById('miniThemeField');
  const miniThemes = [...new Set(catalogDesigns.filter(design => design.collection === 'Mini Prints').map(design => design.theme))];
  miniTheme.replaceChildren(new Option('Tous les univers', ''), ...miniThemes.map(theme => new Option(theme, theme)));
  function filterCatalogue() {
    const miniActive = collection.value === 'Mini Prints';
    miniThemeField.hidden = !miniActive;
    if (!miniActive) miniTheme.value = '';
    const query = normalize(search.value.trim());
    let matched = 0, shown = 0;
    catalogGrid.querySelectorAll('.design-card').forEach(card => {
      const matches = (!favoritesOnly || favorites.has(card.dataset.designId)) && (activeCategory === 'Tous' || card.dataset.category === activeCategory) && (!collection.value || card.dataset.collection === collection.value) && (!miniActive || !miniTheme.value || card.dataset.theme === miniTheme.value) && card.dataset.search.includes(query);
      card.hidden = !matches || matched >= visibleLimit;
      if (matches) { matched++; if (!card.hidden) shown++; }
    });
    document.getElementById('catalogCount').textContent = shown + ' / ' + matched + ' designs';
    document.getElementById('catalogEmpty').hidden = matched !== 0;
    more.hidden = shown >= matched;
    document.getElementById('catalogEmpty').textContent = favoritesOnly && !favorites.size ? 'Aucun favori pour le moment. Appuyez sur le cœur d’un design pour le retrouver ici.' : favoritesOnly ? 'Aucun favori ne correspond à ces filtres. Effacez les filtres pour retrouver tous les designs.' : 'Aucun design trouvé. Essayez un autre mot ou une autre catégorie.';
  }
  catalogDesigns.forEach(design => {
    const card = document.createElement('article'); card.className = 'design-card'; card.dataset.category = design.category; card.dataset.designId = design.id;
    const favorite = document.createElement('button'); favorite.type = 'button'; favorite.className = 'design-favorite'; favorite.dataset.favorite = design.id; favorite.dataset.name = design.name;
    favorite.addEventListener('click', () => { toggleFavorite(design.id); if (card.hidden) favoriteToggle.focus({preventScroll:true}); });
    card.dataset.collection = design.collection || '';
    card.dataset.theme = design.theme || '';
    card.dataset.search = normalize(design.id + ' ' + design.name + ' ' + design.category + ' ' + (design.collection || '') + ' ' + (design.series || '') + ' ' + (design.style || '') + ' ' + (design.theme || '') + ' ' + (design.message || ''));
    const view = document.createElement('button'); view.type='button'; view.className='design-art'; view.setAttribute('aria-label','Agrandir '+design.name);
    const stage = document.createElement('span'); stage.className = 'catalog-stage'; stage.dataset.placement = design.defaultPlacement === 'Poitrine / petit logo' ? 'chest' : 'standard';
    const shirt = document.createElement('img'); shirt.className='catalog-shirt'; shirt.src=(design.frontImage || design.defaultPlacement === 'Dos') ? 'assets/tshirt-blank-back.webp' : 'assets/tshirt-blank-front.webp'; shirt.alt=''; shirt.loading='lazy'; shirt.decoding='async';
    const img=document.createElement('img');img.className='catalog-artwork';img.src=design.thumbnail;img.alt=design.name;img.loading='lazy';img.decoding='async';
    stage.append(shirt,img);view.append(stage);
    const info=document.createElement('div');info.className='design-info';
    const ref=document.createElement('p');ref.className='design-ref';ref.textContent=(design.collection || design.category)+(design.theme?' · '+design.theme:'')+' / '+design.id;
    const title=document.createElement('h3');title.textContent=design.name;
    const choose=document.createElement('button');choose.type='button';choose.className='btn btn-gold';choose.textContent='Essayer ce design';choose.dataset.chooseDesign=design.id;choose.addEventListener('click',()=>chooseDesign(design.id));
    info.append(ref,title);
    if(design.frontImage){const badge=document.createElement('p');badge.className='design-duo';badge.textContent='Duo · petit devant + grand dos';info.append(badge);}
    if(design.message){const message=document.createElement('p');message.className='design-message';message.textContent=design.message;info.append(message);}
    info.append(choose);card.append(favorite,view,info);catalogGrid.append(card);
    view.addEventListener('click',()=>openDesign(design,view));
  });
  document.querySelectorAll('.catalog-filters [data-category]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.catalog-filters [data-category]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    activeCategory=button.dataset.category;collection.value='';visibleLimit=12;filterCatalogue();
  }));
  collection.addEventListener('change',()=>{
    activeCategory='Tous';
    document.querySelectorAll('.catalog-filters [data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category==='Tous')));
    visibleLimit=12;filterCatalogue();
  });
  miniTheme.addEventListener('change',()=>{visibleLimit=12;filterCatalogue();});
  search.addEventListener('input',()=>{visibleLimit=12;filterCatalogue();});
  more.addEventListener('click',()=>{visibleLimit+=12;filterCatalogue();});
  document.querySelectorAll('[name="catalogColor"]').forEach(input=>input.addEventListener('change',()=>{
    catalogGrid.style.setProperty('--catalog-offset',(-100 * ['Noir','Blanc','Beige'].indexOf(input.value))+'%');
    const colorInput = productForm.querySelector('[name="color"][value="'+input.value+'"]');
    colorInput.checked=true;productForm.dispatchEvent(new Event('change',{bubbles:true}));
  }));
  productForm.addEventListener('change',()=>{
    const selected=productForm.querySelector('[name="color"]:checked').value;
    document.querySelector('[name="catalogColor"][value="'+selected+'"]').checked=true;
    catalogGrid.style.setProperty('--catalog-offset',(-100 * ['Noir','Blanc','Beige'].indexOf(selected))+'%');
  });
  document.querySelectorAll('[data-catalog-view]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-catalog-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    catalogGrid.dataset.view=button.dataset.catalogView;
  }));
  syncFavorites();
  favoriteToggle.addEventListener('click', () => {
    favoritesOnly = !favoritesOnly; visibleLimit = 12;
    if (favoritesOnly) {
      search.value = ''; collection.value = ''; miniTheme.value = ''; activeCategory = 'Tous';
      document.querySelectorAll('.catalog-filters [data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === 'Tous')));
    }
    syncFavorites(); filterCatalogue();
  });
  document.getElementById('detailFavorite').addEventListener('click', () => toggleFavorite(detailDesign.id));
  window.addEventListener('storage', event => {
    if (event.key !== favoriteKey && event.key !== null) return;
    try { favorites = readFavorites(event.newValue); syncFavorites(); filterCatalogue(); } catch (_) { /* Ignore invalid data from another tab. */ }
  });
  filterCatalogue();
  document.getElementById('closeDesignDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close', releaseDetailPage);
  document.getElementById('chooseDialogDesign').addEventListener('click',event=>chooseDesign(event.currentTarget.dataset.designId,{product:detailProduct.value,color:dialog.querySelector('[name="detailColor"]:checked').value,placement:detailPlacement.value}));
  detailProduct.addEventListener('change',()=>{setDetailPlacements();renderDetail();});
  detailPlacement.addEventListener('change',renderDetail);
  dialog.querySelectorAll('[name="detailColor"]').forEach(input=>input.addEventListener('change',renderDetail));
  dialog.querySelectorAll('[data-detail-view]').forEach(button=>button.addEventListener('click',()=>{
    detailView=button.dataset.detailView;
    dialog.querySelectorAll('[data-detail-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    setDetailZoom(100);renderDetail();
  }));
  zoom.addEventListener('input',()=>setDetailZoom(zoom.value));
  document.getElementById('detailZoomIn').addEventListener('click',()=>setDetailZoom(Number(zoom.value)+25));
  document.getElementById('detailZoomOut').addEventListener('click',()=>setDetailZoom(Number(zoom.value)-25));
  document.getElementById('detailZoomReset').addEventListener('click',()=>setDetailZoom(100));
  document.getElementById('catalogReset').addEventListener('click',()=>{
    search.value='';collection.value='';miniTheme.value='';activeCategory='Tous';visibleLimit=12;favoritesOnly=false;syncFavorites();
    document.querySelectorAll('.catalog-filters [data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category==='Tous')));
    filterCatalogue();
  });
  document.getElementById('clearDesign').addEventListener('click',()=>{delete productForm.dataset.designId;productForm.dispatchEvent(new Event('change',{bubbles:true}));});
}



