const {JSDOM}=require('jsdom'),fs=require('fs'),assert=require('assert');
const root=require('path').resolve(__dirname,'..')+'/';
const html=fs.readFileSync(root+'index.html','utf8');
const w=new JSDOM(html,{runScripts:'outside-only',url:'https://test.local/'}).window,d=w.document;
w.matchMedia=()=>({matches:true});w.HTMLElement.prototype.scrollIntoView=function(){};
let msg='';w.open=u=>msg=new URL(u).searchParams.get('text');
w.eval(fs.readFileSync(root+'catalogue.js','utf8')+'\n'+fs.readFileSync(root+'script.js','utf8'));
const get=id=>d.getElementById(id),form=get('productConfigurator');
const change=()=>form.dispatchEvent(new w.Event('change',{bubbles:true}));
const visible=()=>[...d.querySelectorAll('.design-card')].filter(x=>!x.hidden).length;
const cards=[...d.querySelectorAll('.design-card')];assert.equal(cards.length,50);assert.equal(visible(),12);
get('catalogMore').click();assert.equal(visible(),24);
for(const [category,count] of Object.entries({Anime:12,Fantasy:12,Illustrations:10,Streetwear:8,Maroc:8})){
 d.querySelector('.catalog-filters [data-category="'+category+'"]').click();assert.equal(visible(),count);assert(get('catalogMore').hidden);
}
d.querySelector('.catalog-filters [data-category=Tous]').click();assert.equal(visible(),12);
get('catalogSearch').value='kois';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),1);
get('catalogSearch').value='not-a-design';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),0);assert(!get('catalogEmpty').hidden);
get('catalogSearch').value='DTF-050';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),1);
get('catalogSearch').value='';get('catalogSearch').dispatchEvent(new w.Event('input'));
while(!get('catalogMore').hidden)get('catalogMore').click();assert.equal(visible(),50);
let combinations=0;
for(let i=1;i<=50;i++){
 const id='DTF-'+String(i).padStart(3,'0');
 assert(fs.existsSync(root+'assets/'+id+'.webp'));assert(fs.existsSync(root+'assets/thumbs/'+id+'.webp'));
 d.querySelector('[data-choose-design="'+id+'"]').click();assert.equal(form.dataset.designId,id);
 for(const key of ['tshirt','hoodie','tote']){
  d.querySelector('[data-product="'+key+'"]').click();
  for(const color of ['Noir','Blanc','Beige']){
   d.querySelector('[name=color][value="'+color+'"]').checked=true;
   for(const option of [...get('productPlacement').options]){
    get('productPlacement').value=option.value;change();
    const both=option.value.includes('+'),rear=['Dos','Verso'].includes(option.value),chest=option.value.startsWith('Poitrine');
    assert.equal(get('primaryFrame').dataset.product,key);
    assert.equal(get('primaryFrame').dataset.placement,rear?'back':chest?'chest':'front');
    assert(get('primaryFrame').classList.contains('color-strip'));
    const offset=(-100*['Noir','Blanc','Beige'].indexOf(color))+'%';
    assert.equal(get('primaryFrame').style.getPropertyValue('--panel-offset'),offset);
    assert.equal(get('catalogGrid').style.getPropertyValue('--catalog-offset'),offset);
    assert(get('productPreview').src.endsWith(key+'-blank-'+(rear?'back':'front')+'.webp'));
    assert(fs.existsSync(root+get('productPreview').getAttribute('src')));
    assert(!get('primaryArtwork').hidden);assert(get('primaryArtwork').src.endsWith(id+'.webp'));
    assert.equal(get('secondaryView').hidden,!both);assert.equal(get('secondaryArtwork').hidden,!both);
    if(both){assert(get('secondaryArtwork').src.endsWith(id+'.webp'));assert.equal(get('secondaryFrame').style.getPropertyValue('--panel-offset'),offset);assert(get('secondaryPreview').src.endsWith(key+'-blank-back.webp'));}
    form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(msg.includes(id));assert(msg.includes('Couleur : '+color));assert(msg.includes('Impression : '+option.value));
    combinations++;
   }
  }
 }
}
const color=d.querySelector('[name=catalogColor][value=Blanc]');color.checked=true;color.dispatchEvent(new w.Event('change'));assert(d.querySelector('[name=color][value=Blanc]').checked);assert.equal(get('primaryFrame').style.getPropertyValue('--panel-offset'),'-100%');
d.querySelector('[data-catalog-view=art]').click();assert.equal(get('catalogGrid').dataset.view,'art');
d.querySelector('[data-catalog-view=shirt]').click();assert.equal(get('catalogGrid').dataset.view,'shirt');
d.querySelector('[data-product=b2b]').click();assert(get('primaryArtwork').hidden);assert(get('secondaryView').hidden);assert(get('productPreview').src.endsWith('polo-studio.webp'));
d.querySelector('[data-product=tshirt]').click();get('designSource').value='Mon propre design';change();assert(get('primaryArtwork').hidden);assert(!get('primaryArtwork').hasAttribute('src'));form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(!msg.includes('DTF-050'));
get('designSource').value='Modèle DTF KREONI';change();assert(!get('primaryArtwork').hidden);get('clearDesign').click();assert(get('primaryArtwork').hidden);assert(get('selectedDesignPanel').hidden);
for(const key of ['hoodie','tote','tshirt']){d.querySelector('[data-hero-product="'+key+'"]').click();assert.equal(get('heroCustomize').dataset.product,key);get('heroCustomize').click();assert.equal(d.querySelector('[name=product]:checked').value,key);}
assert(html.indexOf('src="catalogue.js"')<html.indexOf('src="script.js"'));
console.log('PASS: 50 unique designs; '+combinations+' design/product/color/placement combinations; front/back/chest overlays; synchronized catalogue colors; filters/search/pagination; order references; B2B; removal; hero links.');
