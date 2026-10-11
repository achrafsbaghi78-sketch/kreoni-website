const {JSDOM}=require('jsdom'),fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),w=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{runScripts:'outside-only',url:'https://test.local/'}).window,d=w.document;
w.matchMedia=()=>({matches:true});w.HTMLElement.prototype.scrollIntoView=function(){};w.scrollTo=()=>{};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
w.eval(['catalogue.js','script.js','cart.js'].map(f=>fs.readFileSync(root+'/'+f,'utf8')).join('\n'));
const get=id=>d.getElementById(id),change=el=>el.dispatchEvent(new w.Event('change',{bubbles:true}));
get('catalogCollection').value='Mindset';change(get('catalogCollection'));assert.equal(get('catalogCount').textContent,'12 / 12 designs');
for(let i=197;i<=208;i++){
 const ref='DTF-'+i,choose=d.querySelector('[data-choose-design="'+ref+'"]');assert(!choose.closest('.design-card').hidden);choose.click();
 for(const product of ['tshirt','hoodie','tote']){
  const radio=d.querySelector('[name=product][value='+product+']');radio.checked=true;change(radio);
  for(const color of ['Noir','Blanc','Beige']){
   const input=d.querySelector('[name=color][value='+color+']');input.checked=true;change(input);const ink=color==='Noir'?'':'-LIGHT';
   assert(get('primaryArtwork').src.endsWith(ref+(product==='tote'?'':'-FRONT')+ink+'.webp'));
   if(product!=='tote'){assert.equal(get('productPlacement').value,'Devant + dos');assert(get('secondaryArtwork').src.endsWith(ref+ink+'.webp'));}
  }
 }
 get('addToCart').click();
 choose.closest('.design-card').querySelector('.design-art').click();get('detailProduct').value='hoodie';change(get('detailProduct'));
 for(const color of ['Noir','Blanc']){const c=d.querySelector('[name=detailColor][value='+color+']');c.checked=true;change(c);for(const placement of ['Devant','Dos']){get('detailPlacement').value=placement;change(get('detailPlacement'));assert(get('detailArtwork').src.endsWith(ref+(placement==='Devant'?'-FRONT':'')+(color==='Noir'?'':'-LIGHT')+'.webp'));}}
 get('closeDesignDialog').click();
}
assert.equal(get('cartBadge').textContent,'12');get('prepareCartQuote').click();for(let i=197;i<=208;i++)assert(get('cartQuoteText').value.includes('DTF-'+i));
get('catalogReset').click();assert.equal(get('catalogCount').textContent,'12 / 208 designs');
console.log('PASS: 12 Mindset duos; front/back and light/dark ink switch across products and detail modal; basket references and 208-design reset.');w.close();
