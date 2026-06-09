(function initLoader() {
  const canvas  = document.getElementById('loader-canvas');
  const bar     = document.getElementById('loader-bar');
  const status  = document.getElementById('loader-status');
  const loader  = document.getElementById('loader');

  function makeFaceTex(withLogo) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#111118');
    grad.addColorStop(1, '#1A1A2E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const glow = ctx.createRadialGradient(200, 56, 0, 200, 56, 120);
    glow.addColorStop(0, 'rgba(59,111,255,0.25)');
    glow.addColorStop(1, 'rgba(59,111,255,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);
    if (withLogo) {
      ctx.font = 'bold 72px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#F0EDE6';
      ctx.fillText('M', 100, 128);
      ctx.fillStyle = '#3B6FFF';
      ctx.fillText('P', 156, 128);
    }
    return new THREE.CanvasTexture(c);
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(140, 140);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 3.2);

  const geo  = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  const mats = [0,1,2,3,4,5].map(i => new THREE.MeshBasicMaterial({
    map: makeFaceTex(i === 4),
    transparent: true,
    opacity: 0.95,
  }));
  const cube = new THREE.Mesh(geo, mats);
  scene.add(cube);

  const edges    = new THREE.EdgesGeometry(geo);
  const lineMat  = new THREE.LineBasicMaterial({ color: 0x3B6FFF });
  const wireframe = new THREE.LineSegments(edges, lineMat);
  cube.add(wireframe);

  const ptLight = new THREE.PointLight(0x3B6FFF, 2, 8);
  ptLight.position.set(2, 2, 2);
  scene.add(ptLight);

  let speed = 0.008;
  let elapsed = 0;
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    elapsed += 0.016;
    speed = Math.min(speed + 0.0003, 0.022);
    cube.rotation.y += speed;
    cube.rotation.x += speed * 0.45;
    renderer.render(scene, camera);
  }
  animate();

  const steps = [
    [400,  30, 'INICIANDO SISTEMA...'],
    [800,  65, 'CARREGANDO PROJETOS...'],
    [1400, 90, 'PREPARANDO INTERFACE...'],
    [2000, 100, 'PRONTO'],
  ];
  steps.forEach(([delay, pct, msg]) => {
    setTimeout(() => {
      bar.style.width = pct + '%';
      status.textContent = msg;
    }, delay);
  });

  const exit = () => {
    loader.style.transition = 'opacity 0.6s ease';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      cancelAnimationFrame(rafId);
      renderer.dispose();
    }, 650);
  };
  setTimeout(exit, 2200);
  loader.addEventListener('click', () => { if (elapsed > 1) exit(); });
})();
