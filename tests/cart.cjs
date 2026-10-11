const {JSDOM}=require('jsdom'),fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),key='kreoni.quote-cart.v1';
function boot(saved,blocked=false){
 const w=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{runScripts:'outside-only',url:'https://test.local/'}).window,d=w.document,opened=[];
 w.matchMedia=()=>({matches:true});w.HTMLElement.prototype.scrollIntoView=function(){};w.open=url=>opened.push(url);w.scrollTo=()=>{};
 if(saved)w.localStorage.setItem(key,saved);
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});
 w.eval(['catalogue.js','script.js','cart.js'].map(f=>fs.readFileSync(root+'/'+f,'utf8')).join('\n'));
 const get=id=>d.getElementById(id),change=el=>el.dispatchEvent(new w.Event('change',{bubbles:true}));
 const select=id=>{get('catalogSearch').value=id;get('catalogSearch').dispatchEvent(new w.Event('input'));d.querySelector('[data-choose-design="'+id+'"]').click();};
 return {w,d,get,change,select,opened,rows:()=>d.querySelectorAll('.cart-item'),saved:()=>JSON.parse(w.localStorage.getItem(key))};
}
let a=boot();const {get,d,change,select}=a;
assert(!get('cartEmpty').hidden);select('DTF-147');get('addToCart').click();assert.equal(a.rows().length,1);assert.equal(get('cartBadge').textContent,'1');assert(a.saved().items[0].placement.includes('Poitrine'));
get('productQty').value='2';get('addToCart').click();assert.equal(a.rows().length,1);assert.equal(get('cartBadge').textContent,'3');
d.querySelector('[name=color][value=Blanc]').checked=true;change(d.querySelector('[name=color][value=Blanc]'));get('addToCart').click();assert.equal(a.rows().length,2);assert.equal(a.rows()[1].querySelector('.preview-frame').style.getPropertyValue('--panel-offset'),'-100%');
let qty=a.rows()[0].querySelector('input');qty.value='0';change(qty);assert.equal(qty.value,'3');qty.value='1.5';change(qty);assert.equal(qty.value,'3');qty.value='4';change(qty);assert.equal(a.saved().items[0].qty,4);
a.rows()[0].querySelector('button').click();get('productQty').value='7';get('addToCart').click();assert.equal(a.saved().items[0].qty,7);assert.equal(a.rows().length,2);
a.rows()[0].querySelector('button').click();get('productQty').value='9';get('cancelCartEdit').click();assert.equal(a.saved().items[0].qty,7);
get('designSource').value='Mon propre design';change(get('designSource'));get('productNotes').value='<img src=x onerror=alert(1)>';get('addToCart').click();assert.equal(a.rows().length,3);assert(!a.rows()[2].querySelector('.print-artwork'));assert.equal(a.rows()[2].querySelector('.cart-item-notes').textContent,'<img src=x onerror=alert(1)>');assert(!a.rows()[2].querySelector('.cart-item-notes img'));
select('DTF-114');get('productQty').value='1';get('productNotes').value='';get('addToCart').click();assert.equal(a.rows().length,4);assert(a.rows()[3].querySelector('.print-artwork').src.endsWith('DTF-114-FRONT.webp'));
get('prepareCartQuote').click();assert.equal(a.opened.length,0);assert(get('cartQuoteText').value.includes('DTF-114-FRONT'));assert(get('cartQuoteText').value.includes('Fichier à joindre'));get('openCartWhatsApp').click();assert(a.opened[0].startsWith('https://wa.me/212664521613?text='));assert.equal(a.rows().length,4);
const restored=boot(a.w.localStorage.getItem(key));assert.equal(restored.rows().length,4);assert.equal(restored.get('cartBadge').textContent,get('cartBadge').textContent);restored.w.close();
d.querySelector('[name=product][value=b2b]').checked=true;change(d.querySelector('[name=product][value=b2b]'));assert(get('cartAddControls').hidden);
while(a.rows().length)a.rows()[0].querySelector('.cart-remove').click();assert(!get('cartEmpty').hidden);assert(get('cartQuote').hidden);a.w.close();
a=boot('{invalid');assert.equal(a.rows().length,0);a.w.close();a=boot(null,true);a.select('DTF-147');a.get('addToCart').click();assert.equal(a.rows().length,1);assert(a.get('cartStorageNote').textContent.includes('indisponible'));a.w.close();
a=boot(JSON.stringify({version:1,items:[{product:'unknown',qty:1}]}));assert.equal(a.rows().length,0);a.w.close();
console.log('PASS: add/merge, color previews, quantities, edit/cancel/remove, safe custom notes, paired references, draft-only WhatsApp, persistence, B2B isolation and unavailable/corrupt storage.');
