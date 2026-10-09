// Reflowing page size, independent of native browser pinch-to-zoom.
(() => {
  const root = document.documentElement;
  const smaller = document.getElementById('displaySmaller');
  if (!smaller) return;
  const larger = document.getElementById('displayLarger');
  const reset = document.getElementById('displayReset');
  const steps = [85, 100, 115, 130, 150];
  const key = 'kreoni.display.v1';
  let size = 100;
  try { const saved = Number(localStorage.getItem(key)); if (steps.includes(saved)) size = saved; } catch (_) {}
  function apply(announce = false) {
    root.style.fontSize = size + '%';
    root.dataset.displaySize = String(size);
    document.getElementById('displayValue').textContent = size + ' %';
    smaller.disabled = size === steps[0]; larger.disabled = size === steps.at(-1);
    if (announce) {
      let message = 'Affichage ' + size + ' %. La page se réorganise automatiquement.';
      try { localStorage.setItem(key, String(size)); }
      catch (_) { message += ' Réglage conservé pour cette visite uniquement.'; }
      document.getElementById('displayStatus').textContent = message;
    }
  }
  smaller.addEventListener('click', () => { size = steps[Math.max(0, steps.indexOf(size) - 1)]; apply(true); });
  larger.addEventListener('click', () => { size = steps[Math.min(steps.length - 1, steps.indexOf(size) + 1)]; apply(true); });
  reset.addEventListener('click', () => { size = 100; apply(true); });
  apply();
})();
