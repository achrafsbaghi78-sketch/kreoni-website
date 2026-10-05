"""Build the private source download pack from catalogue.js and original PNGs.
Uses only the standard library plus Pillow. Never upscales or substitutes WebP.
"""
import argparse,csv,hashlib,html,io,json,re,zipfile
from pathlib import Path
from datetime import datetime,timezone
from PIL import Image

p=argparse.ArgumentParser()
p.add_argument('--catalogue',type=Path,default=Path(__file__).resolve().parents[1]/'catalogue.js')
p.add_argument('--sources',type=Path,help='JSON mapping design references to original PNG paths')
p.add_argument('--previous',type=Path,help='Previous KREONI_Designotheque.zip, to retain original PNGs')
p.add_argument('--output',type=Path,required=True)
a=p.parse_args()
s=a.catalogue.read_text();catalog=json.loads(s[s.index('['):s.rindex(']')+1])
assert len({x['id'] for x in catalog})==len(catalog),'Duplicate design references'
sources=json.loads(a.sources.read_text()) if a.sources else {}
previous=zipfile.ZipFile(a.previous) if a.previous else None
rows=[];cards=[];manifest=[];file_count=0
a.output.parent.mkdir(parents=True,exist_ok=True)
staging=a.output.with_suffix('.building.zip')
with zipfile.ZipFile(staging,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=4) as z:
 for d in catalog:
  ref=d['id'];assert re.fullmatch(r'DTF-\d{3,}',ref),ref
  name=f'PNG/{ref}.png'
  if ref in sources:b=Path(sources[ref]).read_bytes()
  elif previous is not None:b=previous.read(name)
  else:raise ValueError('Missing original source: '+ref)
  with Image.open(io.BytesIO(b)) as im:
   im.load();assert im.format=='PNG' and im.mode=='RGBA',ref
   w,h=im.size;assert im.getextrema()[-1][0]==0,'Missing transparency: '+ref
  digest=hashlib.sha256(b).hexdigest();z.writestr(name,b);file_count+=1
  width=round(w/300*2.54,2);height=round(h/300*2.54,2)
  rows.append([ref,d['name'],d['category'],w,h,width,height,name,'Source native; préparation au format final à valider',d.get('collection','')])
  manifest.append(dict(id=ref,name=d['name'],category=d['category'],collection=d.get('collection',''),file=name,width_px=w,height_px=h,sha256=digest))
  extra=''
  if d.get('frontImage'):
   front_ref=ref+'-FRONT';front_name=f'PNG/{front_ref}.png'
   if front_ref in sources:front_bytes=Path(sources[front_ref]).read_bytes()
   elif previous is not None:front_bytes=previous.read(front_name)
   else:raise ValueError('Missing original front emblem: '+front_ref)
   with Image.open(io.BytesIO(front_bytes)) as im:
    im.load();assert im.format=='PNG' and im.mode=='RGBA' and im.getextrema()[-1][0]==0,front_ref
    fw,fh=im.size
   z.writestr(front_name,front_bytes);file_count+=1
   manifest[-1]['front']=dict(file=front_name,width_px=fw,height_px=fh,sha256=hashlib.sha256(front_bytes).hexdigest())
   rows.append([front_ref,d['name']+' — Emblème devant',d['category'],fw,fh,round(fw/300*2.54,2),round(fh/300*2.54,2),front_name,'Source native; préparation au format final à valider',d.get('collection','')])
   extra=f'<p>Duo : grande illustration au dos, petit emblème devant.</p><img class="emblem" src="{front_name}" alt="Emblème devant"><a href="{front_name}" download="{front_ref}.png">PNG emblème devant ↓</a>'
  label=html.escape(ref+' '+d['name']+' '+d['category']+' '+d.get('collection',''),quote=True)
  story=html.escape(d.get('story',''))
  cards.append(f'<article data-search="{label}"><img src="{name}" alt="{html.escape(d["name"],quote=True)}" loading="lazy"><div><small>{ref} · {html.escape(d["category"])}</small><h2>{html.escape(d["name"])}</h2><p>{story}</p><p>{w} × {h} px · cadre à 300 ppp : {width} × {height} cm</p><a href="{name}" download="{ref}.png">PNG illustration principale ↓</a>{extra}</div></article>')
 table=io.StringIO();writer=csv.writer(table);writer.writerow(['Référence','Nom','Catégorie','Largeur px','Hauteur px','Largeur cadre cm à 300 ppp','Hauteur cadre cm à 300 ppp','Fichier','Statut','Collection']);writer.writerows(rows)
 z.writestr('CATALOGUE.csv',table.getvalue().encode('utf-8-sig'))
 z.writestr('MANIFEST.json',json.dumps({'updated_utc':datetime.now(timezone.utc).isoformat(),'count':len(catalog),'png_count':file_count,'designs':manifest},ensure_ascii=False,indent=2))
 z.writestr('LIRE_MOI.txt',f'''KREONI — Designothèque — {len(catalog)} designs

1. Extraire entièrement ce ZIP (Windows : clic droit > Extraire tout).
2. Ouvrir INDEX.html pour voir les designs, rechercher une référence et télécharger le PNG voulu.
3. Le dossier PNG contient {file_count} fichiers originaux, sans textile, avec transparence. Les duos disposent d'une illustration principale et d'un fichier -FRONT pour le petit emblème devant.
4. CATALOGUE.csv répertorie les références et les dimensions réelles.

Ces sources ne sont pas des bons à tirer grand format. Les tailles indiquées à 300 ppp concernent le cadre complet, marges incluses. Fixer les dimensions d'impression en cm et valider contours, transparences, couleurs et échantillon avec le fournisseur DTF. Changer uniquement les DPI ou agrandir ne recrée pas les détails.

Pour chaque commande, préciser référence, taille en cm, textile, couleur, emplacement et quantité. Envoyer le PNG comme fichier/document pour éviter la compression.

Mises à jour : l'archive complète doit être remplacée sous le même nom après chaque ajout de design effectué avec l'assistant. Un ZIP déjà téléchargé reste une copie figée : retélécharger la nouvelle version. Cet index fonctionne hors ligne et ne se met pas à jour tout seul.
''')
 page='''<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KREONI · Designothèque</title><style>*{box-sizing:border-box}body{background:#111318;color:#eee;font:16px system-ui;margin:0;padding:28px}header,main{max-width:1200px;margin:auto}h1{font-size:34px;margin-bottom:8px}header p{color:#b9bdc8;line-height:1.6}input{display:block;width:100%;padding:14px;background:#20242c;color:white;border:1px solid #737b8d;border-radius:10px;margin:24px 0}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px}article{background:#20242c;border-radius:14px;overflow:hidden}article[hidden]{display:none}img{width:100%;height:260px;object-fit:contain;background:#ddd;padding:12px}article>div{padding:18px}h2{font-size:19px}small{color:#e7bd6c}article p{font-size:13px;line-height:1.5;color:#bac0cc}img.emblem{height:110px;margin:10px 0}a{display:inline-block;background:#e7bd6c;color:#17181b;padding:12px;border-radius:8px;text-decoration:none;font-weight:600}</style><header><h1>KREONI · Designothèque</h1><p>COUNT designs · FILECOUNT fichiers PNG originaux · sans vêtement · fond transparent.<br>Sources à préparer au format d'impression souhaité. Les dimensions sont indiquées sur chaque carte.</p><input type="search" placeholder="Rechercher par référence, nom ou catégorie…" aria-label="Rechercher un design"><p id="count" role="status">COUNT designs</p></header><main>CARDS</main><script>const norm=s=>s.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();document.querySelector('input').addEventListener('input',e=>{let n=0;document.querySelectorAll('article').forEach(c=>{c.hidden=!norm(c.dataset.search).includes(norm(e.target.value));if(!c.hidden)n++});document.getElementById('count').textContent=n+' designs'});</script></html>'''.replace('FILECOUNT',str(file_count)).replace('COUNT',str(len(catalog))).replace('CARDS',''.join(cards))
 z.writestr('INDEX.html',page)
 if previous:
  for extra_name in previous.namelist():
   if extra_name not in z.namelist() and not extra_name.startswith('PNG/'):
    z.writestr(extra_name,previous.read(extra_name))
if previous:previous.close()
with zipfile.ZipFile(staging) as z:
 assert z.testzip() is None
 assert len([x for x in z.namelist() if x.startswith('PNG/')])==file_count
staging.replace(a.output)
print(json.dumps({'path':str(a.output.resolve()),'designs':len(catalog),'bytes':a.output.stat().st_size}))
