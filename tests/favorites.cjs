const {JSDOM}=require('jsdom'),fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),key='kreoni.favorites.v1';
function boot(saved,blocked=false){
 const w=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{runScripts:'outside-only',url:'https://test.local/'}).window,d=w.document;
 w.matchMedia=()=>({matches:true});w.HTMLElement.prototype.scrollIntoView=function(){};w.scrollTo=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 if(saved)w.localStorage.setItem(key,saved);if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});
 w.eval(['catalogue.js','script.js','cart.js'].map(f=>fs.readFileSync(root+'/'+f,'utf8')).join('\n'));
 return {w,d,get:id=>d.getElementById(id),heart:id=>d.querySelector('[data-favorite="'+id+'"]'),visible:()=>[...d.querySelectorAll('.design-card')].filter(c=>!c.hidden)};
}
let a=boot();a.get('catalogFavorites').click();assert.equal(a.visible().length,0);assert(!a.get('catalogEmpty').hidden);a.get('catalogReset').click();assert.equal(a.visible().length,12);
a.heart('DTF-001').click();a.heart('DTF-147').click();assert.equal(a.get('favoritesCount').textContent,'2');assert.equal(a.heart('DTF-001').getAttribute('aria-pressed'),'true');a.get('catalogFavorites').click();assert.equal(a.visible().length,2);
a.get('catalogSearch').value='DTF-147';a.get('catalogSearch').dispatchEvent(new a.w.Event('input'));assert.equal(a.visible().length,1);a.visible()[0].querySelector('.design-art').click();assert.equal(a.get('detailFavorite').getAttribute('aria-pressed'),'true');a.get('detailFavorite').click();a.get('closeDesignDialog').click();assert.equal(a.d.activeElement,a.get('catalogFavorites'));assert.equal(a.visible().length,0);a.get('catalogReset').click();assert.equal(a.get('favoritesCount').textContent,'1');
const b=boot(a.w.localStorage.getItem(key));b.get('catalogFavorites').click();assert.equal(b.visible().length,1);b.visible()[0].querySelector('[data-choose-design]').click();b.get('addToCart').click();assert.equal(b.get('cartBadge').textContent,'1');b.heart('DTF-001').click();assert.equal(b.visible().length,0);assert.equal(b.d.activeElement,b.get('catalogFavorites'));b.w.close();
a.w.dispatchEvent(new a.w.StorageEvent('storage',{key,newValue:JSON.stringify({version:1,ids:['DTF-147','bad','DTF-147']})}));assert.equal(a.get('favoritesCount').textContent,'1');assert.equal(a.heart('DTF-147').getAttribute('aria-pressed'),'true');a.w.close();
a=boot('bad-json');assert.equal(a.get('favoritesCount').textContent,'0');a.heart('DTF-001').click();assert.equal(a.get('favoritesCount').textContent,'1');a.w.close();a=boot(null,true);a.heart('DTF-001').click();assert.equal(a.get('favoritesCount').textContent,'1');assert(a.get('favoritesStatus').textContent.includes('visite uniquement'));a.w.close();
console.log('PASS: favorite toggle, filters, detail synchronization, hidden-card focus recovery, persistence, basket handoff, cross-tab updates, corrupt/blocked storage.');
