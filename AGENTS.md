# KREONI catalogue workflow

## Delivery preference — updated 2026-10-08

The user confirmed that the complete archive downloaded successfully. For future additions, provide a ZIP containing only the new designs from that update. Do not resend or rebuild the entire catalogue by default. This supersedes the earlier full-archive replacement workflow.

- Current delivered baseline: 158 designs, DTF-001 through DTF-158, with 173 original PNGs including paired front emblems.
- Name each new ZIP with its actual design count, for example `KREONI_Ajout_12_Designs_DTF-159-170.zip`. Include the reference range or date so batches remain distinct.
- Count designs, not PNG files: a front/back pair is one design with two original PNGs.
- Preserve stable DTF references and full original transparent PNG bytes. Keep optimized website WebP previews separate.
- Deliver the new batch archive during the same task as the catalogue addition. Include a batch-only offline index, CSV and manifest; identify the included references clearly.
- Save new batch archives using the current Library skill. Each new batch is a separate item; replace the same batch identity only when correcting that batch.
- The existing complete archive is a historical baseline. Produce a new complete archive only if the user asks for one.
- `scripts/export_design_archive.py` exports its supplied catalogue in full: use a temporary batch-only catalogue with `--catalogue` and the new PNG source map with `--sources` for incremental deliveries. Do not pass the entire site catalogue for a new-designs-only ZIP.
- Missing originals are an error. Never substitute compressed WebP, silently upscale images or label native-resolution sources as print-ready. Confirm final physical print dimensions before claiming production readiness.
- Paired designs use `frontImage` for the small chest emblem and `image` for the large back illustration. Include both originals in the batch: `PNG/DTF-xxx.png` and `PNG/DTF-xxx-FRONT.png`.
- Keep source archives and Library metadata private; the public site contains optimized previews only.
- This workflow applies during assisted updates, not through a background synchronization service.
