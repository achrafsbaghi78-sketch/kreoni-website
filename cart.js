// A local quote basket: no payment, order submission or file upload happens here.
(() => {
  const form = document.getElementById('productConfigurator');
  if (!form || !document.getElementById('cartItems')) return;
  const get = id => document.getElementById(id);
  const storageKey = 'kreoni.quote-cart.v1';
  const labels = {tshirt:'T-shirt personnalisé',hoodie:'Hoodie personnalisé',tote:'Sac / Tote bag personnalisé'};
  const colors = ['Noir','Blanc','Beige'];
  const sources = ['Modèle DTF KREONI','Mon propre design','J’ai une idée'];
  const sizes = ['S','M','L','XL','XXL','Plusieurs tailles'];
  const placements = product => product === 'tote' ? ['Recto','Verso','Recto + verso'] : ['Devant','Dos','Devant + dos','Poitrine / petit logo'];
  const designFor = item => catalogDesigns.find(design => design.id === item.designId);
  const validQty = qty => Number.isInteger(qty) && qty >= 1 && qty <= 9999;
  let items = [], editingId = null;
  const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; };
  const status = message => { get('cartStatus').textContent = message; };
  function clean(item) {
    if (!item || !Object.hasOwn(labels,item.product) || !colors.includes(item.color) || !sources.includes(item.source) || !placements(item.product).includes(item.placement) || !validQty(item.qty)) return null;
    if (item.product !== 'tote' && !sizes.includes(item.size)) return null;
    if (item.source === sources[0] && !designFor(item)) return null;
    return {id:typeof item.id === 'string' ? item.id.slice(0,80) : makeId(),product:item.product,color:item.color,size:item.product === 'tote' ? '' : item.size,placement:item.placement,source:item.source,designId:item.source === sources[0] ? item.designId : '',qty:item.qty,notes:typeof item.notes === 'string' ? item.notes.slice(0,2000) : ''};
  }
  function makeId() { return 'item-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,10); }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved?.version === 1 && Array.isArray(saved.items)) {
      const ids = new Set();
      items = saved.items.slice(0,20).map(clean).filter(item => item && !ids.has(item.id) && ids.add(item.id));
    }
  } catch (_) { get('cartStorageNote').textContent = 'Panier disponible pour cette visite. La sauvegarde du navigateur est indisponible.'; }
  function save() {
    try { localStorage.setItem(storageKey,JSON.stringify({version:1,items})); }
    catch (_) { get('cartStorageNote').textContent = 'Panier disponible pour cette visite. La sauvegarde du navigateur est indisponible.'; }
  }
  function quote() {
    const lines = ['Bonjour KREONI, je souhaite un devis pour cette sélection :',''];
    items.forEach((item,index) => {
      const design = designFor(item);
      lines.push((index+1)+'. '+labels[item.product], 'Couleur : '+item.color);
      if (item.size) lines.push('Taille : '+item.size);
      lines.push('Impression : '+item.placement,'Quantité : '+item.qty,'Visuel : '+item.source);
      if (design) {
        lines.push('Référence design : '+design.id+' — '+design.name);
        if (design.frontImage && item.product !== 'tote' && item.placement !== 'Dos') lines.push('Emblème devant : '+design.id+'-FRONT');
        if (design.frontImage && item.placement.includes('+')) lines.push('Illustration principale : '+design.id);
      } else lines.push(item.source === sources[1] ? 'Fichier à joindre dans cette conversation.' : 'Création à définir avec KREONI.');
      if (item.notes) lines.push('Détails : '+item.notes);
      lines.push('');
    });
    lines.push('Total : '+items.reduce((sum,item)=>sum+item.qty,0)+' pièces.', 'Merci de confirmer les prix, la disponibilité, les frais de livraison et le délai avant validation.');
    return lines.join('\n');
  }
  function syncQuote() { if (!get('cartQuote').hidden) get('cartQuoteText').value = quote(); }
  function preview(item) {
    const box = document.createElement('div'); box.className = 'product-example cart-preview';
    const frame = document.createElement('div'); frame.className = 'preview-frame color-strip';
    const rear = ['Dos','Verso'].includes(item.placement),design = designFor(item);
    const emblem = !!design?.frontImage && item.product !== 'tote' && !rear;
    frame.dataset.product = item.product; frame.dataset.placement = rear ? 'back' : emblem || item.placement.startsWith('Poitrine') ? 'chest' : 'front';
    frame.style.setProperty('--panel-offset',(-100*colors.indexOf(item.color))+'%');
    const base = document.createElement('img');base.className='garment-base';base.src='assets/'+item.product+'-blank-'+(rear?'back':'front')+'.webp';base.alt=labels[item.product]+' · '+item.color;base.loading='lazy';frame.append(base);
    if (design) { const art=document.createElement('img');art.className='print-artwork';art.src=emblem?design.frontImage:design.image;art.alt=design.name;art.loading='lazy';frame.append(art); }
    box.append(frame);return box;
  }
  function updateEditingUI() {
    const business = form.querySelector('[name=product]:checked').value === 'b2b';
    get('cartAddControls').hidden = business;
    get('addToCart').textContent = editingId ? 'Enregistrer les modifications' : 'Ajouter au panier';
    get('cancelCartEdit').hidden = !editingId;
  }
  function render() {
    const list = get('cartItems');list.replaceChildren();
    get('cartEmpty').hidden = items.length > 0;get('cartContent').hidden = !items.length;
    const total = items.reduce((sum,item)=>sum+item.qty,0);
    get('cartBadge').textContent = String(total);
    get('cartTotal').textContent = total+' pièce'+(total>1?'s':'');
    get('cartModels').textContent = items.length+' configuration'+(items.length>1?'s':'');
    items.forEach((item,index) => {
      const row=document.createElement('article');row.className='cart-item';row.dataset.cartId=item.id;
      const info=document.createElement('div');info.className='cart-item-info';const design=designFor(item);
      info.append(text('h3',labels[item.product]),text('p',[item.color,item.size,item.placement].filter(Boolean).join(' · ')),text('p',design?design.id+' — '+design.name:item.source,'cart-item-design'));
      if(item.notes) info.append(text('p',item.notes,'cart-item-notes'));
      const controls=document.createElement('div');controls.className='cart-item-controls';
      const label=text('label','Quantité');const qty=document.createElement('input');qty.type='number';qty.min='1';qty.max='9999';qty.step='1';qty.value=String(item.qty);qty.inputMode='numeric';qty.setAttribute('aria-label','Quantité, article '+(index+1));label.append(qty);
      qty.addEventListener('change',()=>{const value=Number(qty.value);if(!validQty(value)){qty.value=String(item.qty);status('Saisissez une quantité entière entre 1 et 9999.');return;}item.qty=value;save();render();get('cartItems').querySelectorAll('input')[index]?.focus();status('Quantité mise à jour.');});
      const edit=text('button','Modifier');edit.type='button';edit.setAttribute('aria-label','Modifier l’article '+(index+1));edit.addEventListener('click',()=>editItem(item));
      const remove=text('button','Retirer','cart-remove');remove.type='button';remove.setAttribute('aria-label','Retirer l’article '+(index+1));remove.addEventListener('click',()=>{items=items.filter(x=>x.id!==item.id);if(editingId===item.id)editingId=null;save();render();status('Article retiré du panier.');const targets=get('cartItems').querySelectorAll('.cart-remove');(targets[Math.min(index,targets.length-1)]||get('cartEmpty').querySelector('a')).focus({preventScroll:true});});
      controls.append(label,edit,remove);info.append(controls);row.append(preview(item),info);list.append(row);
    });
    if(!items.length)get('cartQuote').hidden=true;
    syncQuote();updateEditingUI();
  }
  function editItem(item) {
    editingId=item.id;
    form.querySelector('[name=product][value="'+item.product+'"]').checked=true;
    form.querySelector('[name=color][value="'+item.color+'"]').checked=true;
    if(item.designId)form.dataset.designId=item.designId;else delete form.dataset.designId;
    get('designSource').value=item.source;get('productQty').value=String(item.qty);get('productNotes').value=item.notes;
    if(item.size)get('productSize').value=item.size;
    form.dispatchEvent(new Event('change',{bubbles:true}));get('productPlacement').value=item.placement;form.dispatchEvent(new Event('change',{bubbles:true}));
    updateEditingUI();get('productHelp').textContent='Modifiez cet article puis enregistrez les modifications pour mettre à jour le panier.';
    get('configurateur').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  get('addToCart').addEventListener('click',()=>{
    if(!form.reportValidity())return;
    const product=form.querySelector('[name=product]:checked').value;if(product==='b2b')return;
    const draft=clean({id:editingId||makeId(),product,color:form.querySelector('[name=color]:checked').value,size:get('productSize').value,placement:get('productPlacement').value,source:get('designSource').value,designId:form.dataset.designId||'',qty:Number(get('productQty').value),notes:get('productNotes').value.trim()});
    if(!draft){get('productHelp').textContent='Choisissez un design du catalogue (ou votre propre visuel) et une quantité entière entre 1 et 9999.';get('productHelp').scrollIntoView({block:'nearest'});return;}
    if(editingId){const index=items.findIndex(item=>item.id===editingId);if(index<0){editingId=null;updateEditingUI();return;}items[index]=draft;editingId=null;}
    else {
      const signature=item=>JSON.stringify([item.product,item.color,item.size,item.placement,item.source,item.designId,item.notes]);
      const duplicate=items.find(item=>signature(item)===signature(draft));
      if(duplicate){if(!validQty(duplicate.qty+draft.qty)){get('productHelp').textContent='La quantité cumulée de cet article dépasse 9999.';return;}duplicate.qty+=draft.qty;}
      else {if(items.length>=20){get('productHelp').textContent='Votre panier contient déjà 20 configurations. Préparez ce devis avant d’en créer un autre.';return;}items.push(draft);}
    }
    save();render();get('productHelp').textContent='Votre sélection est enregistrée dans le panier. Vous pouvez ajouter un autre modèle.';status('Panier mis à jour.');
    get('panier').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  });
  get('cancelCartEdit').addEventListener('click',()=>{editingId=null;updateEditingUI();get('productHelp').textContent='Modification annulée. L’article du panier reste inchangé.';});
  form.addEventListener('change',updateEditingUI);
  get('prepareCartQuote').addEventListener('click',()=>{if(!items.length)return;get('cartQuote').hidden=false;syncQuote();get('cartQuote').scrollIntoView({behavior:'smooth',block:'start'});get('cartQuoteText').focus({preventScroll:true});});
  get('copyCartQuote').addEventListener('click',async()=>{
    if(!items.length)return;
    syncQuote();
    try{await navigator.clipboard.writeText(quote());get('cartQuoteHint').textContent='Message copié. Vous pouvez le coller dans WhatsApp.';}
    catch(_){get('cartQuoteText').focus();get('cartQuoteText').select();get('cartQuoteHint').textContent='Sélectionnez Copier (Ctrl+C sur ordinateur), puis collez le message dans WhatsApp.';}
  });
  get('openCartWhatsApp').addEventListener('click',()=>{
    if(!items.length)return;
    const encoded=encodeURIComponent(quote());
    if(encoded.length>12000){get('cartQuoteHint').textContent='Votre demande est longue : copiez le message ci-dessus, puis collez-le dans WhatsApp.';window.open('https://wa.me/212664521613','_blank','noopener,noreferrer');}
    else {window.open('https://wa.me/212664521613?text='+encoded,'_blank','noopener,noreferrer');get('cartQuoteHint').textContent='La conversation WhatsApp est demandée. Vérifiez le message et envoyez-le vous-même. Si rien ne s’ouvre, utilisez Copier le message.';}
  });
  render();
})();
