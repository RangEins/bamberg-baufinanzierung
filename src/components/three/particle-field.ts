/**
 * Vanilla-TS Particle-Layer (kein React).
 * Lazy via dynamic import in MidPageCTA.astro.
 * Three.js wird nur geladen, wenn das Canvas im Viewport sichtbar ist (md:block only).
 */

export async function initParticles(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const THREE = await import('three');

  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);

  // Generate particles
  const count = 380;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    sizes[i] = Math.random() * 0.08 + 0.02;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color: 0xc9a646,
    size: 0.06,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let mouseX = 0;
  let mouseY = 0;
  const onMouse = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouse, { passive: true });

  const onResize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize, { passive: true });

  let frame = 0;
  let rafId = 0;
  let running = true;

  const tick = () => {
    if (!running) return;
    frame += 0.001;
    points.rotation.y = frame * 0.4 + mouseX * 0.08;
    points.rotation.x = frame * 0.25 + mouseY * 0.05;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };

  // Pause when offscreen for battery friendliness
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !running) {
          running = true;
          tick();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      });
    },
    { threshold: 0.01 },
  );
  io.observe(canvas);

  tick();
}
