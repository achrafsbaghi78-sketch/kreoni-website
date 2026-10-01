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
  const colorImages = {
    tshirt: {Noir: 'assets/tshirt-dtf.webp', Blanc: 'assets/tshirt-white.webp', Beige: 'assets/tshirt-beige.webp'},
    hoodie: {Noir: 'assets/hoodie-dtf.webp', Blanc: 'assets/hoodie-white.webp', Beige: 'assets/hoodie-beige.webp'},
    tote: {Noir: 'assets/tote-black.webp', Blanc: 'assets/tote-white.webp', Beige: 'assets/tote-dtf.webp'}
  };
  const preview = byId('productPreview');
  const secondaryPreview = byId('secondaryPreview');
  [preview, secondaryPreview].forEach(image => {
    image.addEventListener('load', () => { image.style.opacity = '1'; });
    image.addEventListener('error', () => {
      image.style.opacity = '1';
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
      placement.replaceChildren(...product.placements.map(value => new Option(value, value)));
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
    const primarySrc = business ? product.image : rear || chest
      ? 'assets/' + key + (rear ? '-back-colors.webp' : '-chest-colors.webp')
      : colorImages[key][selectedColor];
    const previewLabel = product.label + (business ? '' : ' · ' + selectedColor);
    setView(preview, byId('primaryFrame'), primarySrc, rear || chest, selectedColor, previewLabel + ' · ' + viewLabel);
    byId('primaryCaption').textContent = viewLabel;
    byId('secondaryView').hidden = !both;
    byId('previewViews').classList.toggle('two-views', both);
    if (both) {
      setView(secondaryPreview, byId('secondaryFrame'), 'assets/' + key + '-back-colors.webp', true, selectedColor, previewLabel + ' · ' + backLabel);
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
    byId('designHelp').textContent = design === 'Mon propre design'
      ? 'Joignez votre image ou votre logo dans la conversation WhatsApp.'
      : design === 'J’ai une idée' ? 'Décrivez votre idée dans les détails ou sur WhatsApp.'
      : 'Nous vous partageons les modèles disponibles sur WhatsApp.';
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
