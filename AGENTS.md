# KREONI catalogue workflow

The user confirmed downloading the full archive. Future deliveries are incremental ZIPs only, with actual design count in the filename. Do not rebuild or resend the full catalogue unless requested. This supersedes the old full-archive replacement instructions.

- Prior baseline: 158 designs, DTF-001 through DTF-158, with 173 original PNGs.
- Palestine batch: DTF-159 through DTF-161, three designs and six original transparent PNGs including paired front emblems.
- Keep stable references. Paired front emblems use DTF-xxx-FRONT.png and frontImage in the catalogue.
- Retain untouched original PNG bytes separately from optimized public WebP previews. Never substitute WebP for originals or silently upscale.
- For additions, export a batch-only catalogue using scripts/export_design_archive.py --catalogue with the matching --sources map. Include offline index, CSV and manifest.
- Save the new incremental ZIP persistently and deliver it in the same task as the website update. Source archives stay private, never in the public repo.
- Confirm physical print dimensions, effective resolution and printer requirements before claiming print readiness. Sources are not automatically oversized print-ready files.
- Do not merge the feature branch into main without the user's request.


- Palestine second batch: DTF-162 to DTF-164, three single-print designs. Total catalogue 164 designs; Palestine 6 designs. Deliver only the new three PNGs in their incremental ZIP.


- Dark Bloom batch: DTF-165 through DTF-180, 16 designs with 16 transparent PNGs; total catalogue 180. DTF-165 adapts the user-provided illustration; preserve the original supplied EPS and JPG privately with the incremental archive.


- Gorilla Street batch: DTF-181 through DTF-196, 16 monochrome designs and 16 original transparent PNGs. Total catalogue: 196. Deliver its incremental ZIP separately, preserve native source pixels and keep print-size validation explicit.


- Mindset batch: DTF-197 through DTF-208, 12 typographic duos. Total 208 designs. Outlined SVG masters and PNG sources are private in the incremental ZIP. Each has front/back and light-textile ink variants; lightImage/lightFrontImage select dark ink for Blanc/Beige. Never replace original vectors with WebP.


- Mindset EN/AR batch: DTF-209 through DTF-232, 24 new duos (12 English, 12 Arabic adaptations), 96 PNG and 96 outlined SVG masters in incremental ZIP. Catalogue total 232; Mindset 36. Same lightImage/lightFrontImage behavior.


- Sceaux & Symboles: DTF-233 through DTF-248, 16 monochrome seals. Total 248 designs. Native PNG crops and untouched source sheet retained privately in incremental ZIP. monochromeSeal enables contrasting preview ink. User requested these 16 seals centered on the front: defaultPlacement is Devant, including catalogue cards and garment previews. Validate source resolution and physical size before printing.


- À Deux: DTF-249 through DTF-272, 24 separate print designs grouped into 12 couple models (COUPLE-01 through COUPLE-12). Catalogue cards use side A and partnerId; side B remains addressable for orders. couples.js configures each garment independently and adds one or both atomically through kreoni:add-couple. Personalization is captured in quote notes; previews use sample names/dates. Keep native transparent PNGs and generated pair sheets private in incremental ZIP. Current total: 272 designs, 260 catalogue models. Run NODE_PATH=<jsdom modules> node tests/couples.cjs for pair/cart flow checks.
