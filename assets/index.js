(function initLoader() {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loader-bar');
  const status = document.getElementById('loader-status');
  if (!loader || document.documentElement.classList.contains('no-loader')) return;
  try { sessionStorage.setItem('seen-loader', '1'); } catch (e) {}

  [[150, 40, 'CARREGANDO PROJETOS...'], [600, 80, 'PREPARANDO INTERFACE...'], [1000, 100, 'PRONTO']]
    .forEach(([delay, pct, msg]) => setTimeout(() => {
      bar.style.width = pct + '%';
      status.textContent = msg;
    }, delay));

  const exit = () => {
    loader.style.transition = 'opacity 0.4s ease';
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 400);
  };
  setTimeout(exit, 1200);
  loader.addEventListener('click', exit);
})();
