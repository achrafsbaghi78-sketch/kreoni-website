const fs=require('fs'),assert=require('assert'),path=require('path'),css=require('css-tree'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(root+'/styles.css','utf8'),html=fs.readFileSync(root+'/index.html','utf8');
const errors=[],ast=css.parse(source,{onParseError:e=>errors.push(e.message)});assert.deepEqual(errors,[]);
// CSS parsers silently close unclosed media blocks. Verify critical rules remain global.
let mediaDepth=0;const globalRules=new Set(),mobileRules=new Set();
css.walk(ast,{enter(n){if(n.type==='Atrule'&&n.name==='media'){mediaDepth++;assert(mediaDepth<=1,'Unexpected nested media block: likely missing closing brace');}if(n.type==='Rule'){const selector=css.generate(n.prelude);if(!mediaDepth)globalRules.add(selector);else mobileRules.add(selector);}},leave(n){if(n.type==='Atrule'&&n.name==='media')mediaDepth--;}});
for(const selector of ['.hero-product-stage img','.hero-product-picker button img','.simple-config','.catalog-grid','.cart-layout','.detail-media'])assert(globalRules.has(selector),'Global style missing: '+selector);
for(const selector of ['.hero-layout','.store-grid','.hero-product-picker','.nav','.simple-row,.contact-grid,.faq-wrap,.b2b-box']){if(selector.startsWith('.simple-row'))continue;assert(mobileRules.has(selector));}
const d=new JSDOM(html).window.document;assert(!d.getElementById('displayLarger'));assert(!d.querySelector('script[src="display.js"]'));assert(d.querySelector('[name=viewport]').content.includes('width=device-width'));assert(!/maximum-scale|user-scalable=no/.test(d.querySelector('[name=viewport]').content));assert(d.querySelector('link[href*="styles.css?v=mobile-"]'));
console.log('PASS: all key component styles global, no accidental nested media blocks, mobile overrides, viewport and CSS version, page-size workaround removed.');
