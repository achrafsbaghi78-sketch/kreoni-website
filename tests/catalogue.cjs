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
const cards=[...d.querySelectorAll('.design-card')];assert.equal(cards.length,128);assert.equal(visible(),12);
get('catalogMore').click();assert.equal(visible(),24);
for(const [category,count] of Object.entries({Anime:75,Fantasy:12,Illustrations:15,Streetwear:13,Maroc:13})){
 d.querySelector('.catalog-filters [data-category="'+category+'"]').click();assert.equal(visible(),Math.min(count,12));assert.equal(get('catalogMore').hidden,count<=12);
}
d.querySelector('.catalog-filters [data-category=Tous]').click();assert.equal(visible(),12);
for(const collection of ['Japan Street','Morocco Street','Wild Spirit','Naruto','Bleach','Solo Leveling','Demon Slayer','One Piece','Jujutsu Kaisen']){
 get('catalogCollection').value=collection;get('catalogCollection').dispatchEvent(new w.Event('change'));
 assert.equal(visible(),['Japan Street','Morocco Street','Wild Spirit'].includes(collection)?5:10);assert(get('catalogMore').hidden);
 assert([...d.querySelectorAll('.design-card')].filter(c=>!c.hidden).every(c=>c.dataset.collection===collection));
}
get('catalogSearch').value='Gojo';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),1);
get('catalogSearch').value='';get('catalogSearch').dispatchEvent(new w.Event('input'));
d.querySelector('.catalog-filters [data-category=Fantasy]').click();assert.equal(get('catalogCollection').value,'');assert.equal(visible(),12);
get('catalogCollection').value='Histoires & émotions';get('catalogCollection').dispatchEvent(new w.Event('change'));assert.equal(visible(),3);
d.querySelector('.catalog-filters [data-category=Tous]').click();assert.equal(get('catalogCollection').value,'');assert.equal(visible(),12);
get('catalogSearch').value='kois';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),1);
get('catalogSearch').value='not-a-design';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),0);assert(!get('catalogEmpty').hidden);
get('catalogSearch').value='DTF-050';get('catalogSearch').dispatchEvent(new w.Event('input'));assert.equal(visible(),1);
get('catalogSearch').value='';get('catalogSearch').dispatchEvent(new w.Event('input'));
while(!get('catalogMore').hidden)get('catalogMore').click();assert.equal(visible(),128);
let combinations=0;
for(let i=1;i<=128;i++){
 const id='DTF-'+String(i).padStart(3,'0');
 const paired=i>=114;
 if(paired)assert(fs.existsSync(root+'assets/'+id+'-FRONT.webp'));
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
    const emblem=paired&&key!=='tote'&&!rear;
    assert.equal(get('primaryFrame').dataset.placement,rear?'back':chest||emblem?'chest':'front');
    assert(get('primaryFrame').classList.contains('color-strip'));
    const offset=(-100*['Noir','Blanc','Beige'].indexOf(color))+'%';
    assert.equal(get('primaryFrame').style.getPropertyValue('--panel-offset'),offset);
    assert.equal(get('catalogGrid').style.getPropertyValue('--catalog-offset'),offset);
    assert(get('productPreview').src.endsWith(key+'-blank-'+(rear?'back':'front')+'.webp'));
    assert(fs.existsSync(root+get('productPreview').getAttribute('src')));
    assert(!get('primaryArtwork').hidden);assert(get('primaryArtwork').src.endsWith(id+(emblem?'-FRONT':'')+'.webp'));
    if(emblem)assert.equal(get('primaryCaption').textContent,'Devant · petit emblème');
    assert.equal(get('secondaryView').hidden,!both);assert.equal(get('secondaryArtwork').hidden,!both);
    if(both){assert(get('secondaryArtwork').src.endsWith(id+'.webp'));assert.equal(get('secondaryFrame').style.getPropertyValue('--panel-offset'),offset);assert(get('secondaryPreview').src.endsWith(key+'-blank-back.webp'));}
    form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(msg.includes(id));assert(msg.includes('Couleur : '+color));assert(msg.includes('Impression : '+option.value));
    if(emblem)assert(msg.includes(id+'-FRONT'));
    if(!emblem)assert(!msg.includes(id+'-FRONT'));
    combinations++;
   }
  }
 }
}
const color=d.querySelector('[name=catalogColor][value=Blanc]');color.checked=true;color.dispatchEvent(new w.Event('change'));assert(d.querySelector('[name=color][value=Blanc]').checked);assert.equal(get('primaryFrame').style.getPropertyValue('--panel-offset'),'-100%');
d.querySelector('[data-catalog-view=art]').click();assert.equal(get('catalogGrid').dataset.view,'art');
d.querySelector('[data-catalog-view=shirt]').click();assert.equal(get('catalogGrid').dataset.view,'shirt');
d.querySelector('[data-product=b2b]').click();assert(get('primaryArtwork').hidden);assert(get('secondaryView').hidden);assert(get('productPreview').src.endsWith('polo-studio.webp'));
d.querySelector('[data-product=tshirt]').click();get('designSource').value='Mon propre design';change();assert(get('primaryArtwork').hidden);assert(!get('primaryArtwork').hasAttribute('src'));form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(!msg.includes('DTF-053'));
get('designSource').value='Modèle DTF KREONI';change();assert(!get('primaryArtwork').hidden);get('clearDesign').click();assert(get('primaryArtwork').hidden);assert(get('selectedDesignPanel').hidden);
for(const key of ['hoodie','tote','tshirt']){d.querySelector('[data-hero-product="'+key+'"]').click();assert.equal(get('heroCustomize').dataset.product,key);get('heroCustomize').click();assert.equal(d.querySelector('[name=product]:checked').value,key);}
assert(html.indexOf('src="catalogue.js"')<html.indexOf('src="script.js"'));
console.log('PASS: 128 unique designs; '+combinations+' design/product/color/placement combinations; front/back/chest overlays; synchronized catalogue colors; filters/search/pagination; order references; B2B; removal; hero links.');

d.querySelector('[data-choose-design="DTF-051"]').click();assert(get('selectedDesignStory').textContent.includes('loup'));assert(!get('selectedDesignStory').hidden);assert.equal(d.querySelectorAll('.design-message').length,3);console.log('PASS: story collection retained and selected story displayed.');

d.querySelector("[data-product=tshirt]").click();d.querySelector("[data-choose-design=DTF-114]").click();
assert.equal(get("productPlacement").value,"Devant + dos");assert(get("primaryArtwork").src.endsWith("DTF-114-FRONT.webp"));assert(get("secondaryArtwork").src.endsWith("DTF-114.webp"));
get("clearDesign").click();assert.equal(get("primaryFrame").dataset.placement,"front");
console.log("PASS: paired front emblems, back artwork, order references and selection defaults.");
