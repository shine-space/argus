// Server-rendered content prepares beneath the opening, independently of the canvas.
export function prepareHeroEntrance(hero, _hasParticleFrame, enter) {
  const root = document.documentElement;
  let cleanupTimer = 0;
  const ready = () => {
    document.removeEventListener('fc:hero-ready', ready);
    hero.classList.add('is-entering');
    enter();
    cleanupTimer = setTimeout(() => hero.classList.remove('is-entering'), 800);
  };
  if (!root.classList.contains('fc-hold-early') || root.classList.contains('fc-hero-ready')) ready();
  else document.addEventListener('fc:hero-ready', ready, {once: true});
  return () => {
    document.removeEventListener('fc:hero-ready', ready);
    clearTimeout(cleanupTimer);
    hero.classList.remove('is-entering');
  };
}
