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
