// À Deux: independent garments, an atomic basket addition, and an accessible dialog.
(() => {
  const dialog = document.getElementById('coupleDialog');
  if (!dialog) return;
  const form = document.getElementById('coupleForm');
  const get = id => document.getElementById(id);
  let pair = [], trigger = null;
  const fields = side => ({product:get('coupleProduct'+side),color:get('coupleColor'+side),size:get('coupleSize'+side),name:get('coupleName'+side)});
  const sides = () => get('couplePurchase').value === 'both' ? ['A','B'] : [get('couplePurchase').value];
  function render() {
    if (!pair.length) return;
    const included = sides();
    ['A','B'].forEach((side,i) => {
      const f=fields(side), frame=get('coupleFrame'+side), design=pair[i];
      frame.dataset.product=f.product.value;
      frame.style.setProperty('--panel-offset',f.color.value==='Noir'?'0%':'-100%');
      get('coupleGarment'+side).src='assets/'+f.product.value+'-blank-front.webp';
      get('coupleGarment'+side).alt=(f.product.value==='hoodie'?'Hoodie':'T-shirt')+' · '+f.color.value+' · pièce '+side;
      get('coupleArt'+side).src=designArtwork(design,f.color.value);
      get('coupleArt'+side).alt=design.name;
      get('couplePanel'+side).classList.toggle('couple-excluded',!included.includes(side));
      for(const field of Object.values(f))field.disabled=!included.includes(side);
      get('coupleNameLabel'+side).hidden=!design.personalization;
      f.name.required=!!design.personalization && (included.includes(side) || design.personalization==='initials');
      if(design.personalization==='initials')f.name.disabled=false;
      f.name.maxLength=design.personalization==='initials'?2:30;
      get('coupleNameCaption'+side).textContent=design.personalization==='initials'?'Votre initiale':'Prénom';
      f.name.placeholder=design.personalization==='initials'?(side==='A'?'A':'S'):(side==='A'?'Adam':'Salma');
    });
    const dated=pair[0].personalization==='date';
    get('coupleDateLabel').hidden=!dated;get('coupleDate').required=dated;get('coupleDate').disabled=!dated;
    get('couplePersonalizationNote').hidden=!pair[0].personalization;
    get('coupleAdd').textContent=included.length===2?'Ajouter les 2 pièces au panier':'Ajouter la pièce '+included[0]+' au panier';
  }
  window.openCoupleDesigner = (id, source) => {
    const selected=catalogDesigns.find(d=>d.id===id);
    if(!selected?.coupleId)return;
    pair=catalogDesigns.filter(d=>d.coupleId===selected.coupleId).sort((a,b)=>a.coupleSide.localeCompare(b.coupleSide));
    if(pair.length!==2)return;
    trigger=source || document.activeElement;form.reset();get('coupleStatus').textContent='';
    get('coupleTitle').textContent=selected.coupleName;
    get('coupleRefs').textContent=pair.map(d=>d.id).join(' + ');
    render();dialog.showModal();document.documentElement.classList.add('couple-open');get('closeCoupleDialog').focus();
  };
  get('closeCoupleDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('couple-open');trigger?.focus({preventScroll:true});});
  form.addEventListener('change',render);
  form.addEventListener('input',event=>{if(event.target instanceof HTMLInputElement)event.target.setCustomValidity('');});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    ['A','B'].forEach(side=>{const f=fields(side).name;if(f.required&&!f.disabled)f.setCustomValidity(f.value.trim()?'':'Indiquez le texte à imprimer.');});
    if(!form.reportValidity()||pair.length!==2)return;
    const qty=Number(get('coupleQty').value);
    if(!Number.isInteger(qty)||qty<1||qty>9999)return;
    const selectedSides=sides(), group='À Deux · '+pair[0].coupleName;
    const drafts=selectedSides.map(side=>{
      const i=side==='A'?0:1,f=fields(side),design=pair[i];
      const notes=[group+' · pièce '+side+(selectedSides.length===2?' · duo':' · cadeau individuel')];
      if(design.personalization){
        notes.push((design.personalization==='initials'?'Initiale':'Prénom')+' : '+f.name.value.trim());
        if(design.personalization==='initials')notes.push('Initiale partenaire : '+fields(side==='A'?'B':'A').name.value.trim());
        if(design.personalization==='date')notes.push('Date : '+get('coupleDate').value);
      }
      if(get('coupleNotes').value.trim())notes.push(get('coupleNotes').value.trim());
      return {product:f.product.value,color:f.color.value,size:f.size.value,placement:'Devant',source:'Modèle DTF KREONI',designId:design.id,qty,notes:notes.join('\n')};
    });
    const detail={drafts,accepted:false,error:''};
    document.dispatchEvent(new CustomEvent('kreoni:add-couple',{detail}));
    if(!detail.accepted){get('coupleStatus').textContent=detail.error || 'Ajout indisponible. Réessayez après avoir actualisé la page.';return;}
    dialog.close();get('panier').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});get('cartStatus').focus({preventScroll:true});
  });
})();
