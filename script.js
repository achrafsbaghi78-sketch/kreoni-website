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
      byId('productPreview').src = product.image;
      byId('productPreview').alt = 'Exemple : ' + product.label;
      byId('productPreviewTitle').textContent = product.label;
      previousProduct = key;
    }
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
