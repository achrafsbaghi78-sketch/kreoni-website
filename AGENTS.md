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
