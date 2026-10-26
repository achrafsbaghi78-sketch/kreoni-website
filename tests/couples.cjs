const {JSDOM}=require('jsdom');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const code=['catalogue.js','script.js','couples.js','cart.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
function boot(saved){const dom=new JSDOM(html,{url:'https://kreoni.test',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
 w.matchMedia=()=>({matches:true,addEventListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 if(saved)w.localStorage.setItem('kreoni.quote-cart.v1',JSON.stringify(saved));w.eval(code);return w;}
const get=(w,id)=>w.document.getElementById(id),change=(w,id,value)=>{get(w,id).value=value;get(w,id).dispatchEvent(new w.Event('change',{bubbles:true}));};
const items=w=>JSON.parse(w.localStorage.getItem('kreoni.quote-cart.v1')).items;
let retained;
for(let i=0;i<12;i++){
 const w=boot();assert.equal(w.document.querySelectorAll('.design-card').length,260);
 change(w,'catalogCollection','À Deux');assert.equal([...w.document.querySelectorAll('.design-card')].filter(c=>!c.hidden).length,12);
 w.document.querySelector(`[data-choose-design="DTF-${249+i*2}"]`).click();assert.ok(get(w,'coupleDialog').open);
 change(w,'coupleProductA','hoodie');change(w,'coupleSizeA','XL');change(w,'coupleColorA','Blanc');change(w,'coupleSizeB','S');change(w,'coupleColorB','Noir');
 assert.equal(get(w,'coupleFrameA').dataset.product,'hoodie');assert.equal(get(w,'coupleFrameA').style.getPropertyValue('--panel-offset'),'-100%');
 assert.ok(get(w,'coupleArtB').src.endsWith('#couple-light'));assert.ok(!get(w,'coupleArtA').src.includes('#couple-light'));
 if(i>=8&&i<=10){get(w,'coupleNameA').value=i===8?'A':'Adam';get(w,'coupleNameB').value=i===8?'S':'Salma';if(i===9)get(w,'coupleDate').value='2026-02-14';}
 get(w,'coupleForm').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 const cart=items(w);assert.equal(cart.length,2);assert.equal(cart[0].product,'hoodie');assert.equal(cart[0].color,'Blanc');assert.equal(cart[0].size,'XL');assert.equal(cart[1].color,'Noir');assert.equal(cart[1].size,'S');assert.equal(cart[1].designId,`DTF-${250+i*2}`);
 if(i===9)assert.ok(cart[0].notes.includes('2026-02-14'));
 get(w,'prepareCartQuote').click();assert.ok(get(w,'cartQuoteText').value.includes(cart[1].designId));assert.ok(get(w,'cartQuoteText').value.includes('Total : 2 pièces'));
 if(i===0)retained={version:1,items:cart};w.close();
}
{const w=boot(retained);assert.equal(get(w,'cartBadge').textContent,'2');w.openCoupleDesigner('DTF-250');change(w,'couplePurchase','B');get(w,'coupleQty').value='2';get(w,'coupleForm').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(items(w).length,3);assert.equal(items(w)[2].designId,'DTF-250');assert.equal(items(w)[2].qty,2);w.close();}
{const full={version:1,items:Array.from({length:19},(_,i)=>({...retained.items[0],id:'full-'+i}))};const w=boot(full);w.openCoupleDesigner('DTF-249');get(w,'coupleForm').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(items(w).length,19);assert.ok(get(w,'coupleStatus').textContent.includes('20'));assert.ok(get(w,'coupleDialog').open);w.close();}
{const w=boot();w.openCoupleDesigner('DTF-267');get(w,'coupleForm').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(w.localStorage.getItem('kreoni.quote-cart.v1'),null);assert.ok(get(w,'coupleDialog').open);w.close();}
console.log('PASS: 12 pair cards, 24 references, independent garments/colors/sizes, personalization, quote, persistence, single gift, required fields and atomic basket limit.');
