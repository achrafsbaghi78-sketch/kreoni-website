# KREONI catalogue workflow

When adding a design to this catalogue, also update the user's private downloadable source archive, `KREONI_Designotheque.zip`, during the same task. This is an explicit user preference.

- Keep stable DTF references. Retain the full original transparent PNG, separately from optimized website WebP previews and thumbnails.
- Find the exact archive name in ChatGPT Library and preserve its Library identity when replacing it. Never create duplicate complete archives when an existing one is available.
- Use `scripts/export_design_archive.py` with the previous ZIP and a JSON map of new references to original PNG paths. It keeps the original PNG bytes and rebuilds the offline index, CSV and manifest from `catalogue.js`. Missing sources are an error; do not substitute compressed WebP, silently enlarge images or label native-resolution sources as print-ready.
- Save the updated archive using the current Library skill; report the download link and actual design count. Confirm final physical print dimensions before claiming production readiness.
- Do not publish the source archive or Library metadata on the public website as part of this workflow. The website keeps optimized previews; the user receives the complete source archive privately.
- This is part of each assisted catalogue update, not a background synchronization service. A previously downloaded ZIP is an offline snapshot and must be downloaded again after an update.

- Paired designs use `frontImage` for a small chest emblem and `image` for the large back illustration. Preserve both originals: `PNG/DTF-xxx.png` and `PNG/DTF-xxx-FRONT.png`. Supply both keys in the source map. The export script retains paired sources and prompt metadata on subsequent updates.
