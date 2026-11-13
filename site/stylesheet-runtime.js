/* Share external CSS between the HTML snapshot and client-rendered components. */
(() => {
  const cache = new Map();
  const available = new Set(/* stylesheet-manifest:start */["0071b4a2-5390.css","009606e7-1c3.css","02748d66-38a9.css","09bd15d6-3f9a.css","0a8505c5-388e.css","0aa86a4d-4d.css","0c081480-30.css","14d59d07-1c3.css","167973dc-ee6d.css","1849b048-ede4.css","19a12b21-35b5.css","19ccab5f-44f1.css","23106b12-1c2.css","25215331-368b.css","2727580f-3d88.css","288bd491-1c1.css","29b1942f-3704.css","2cdd8720-200.css","2e6b37f0-444d.css","40069f90-3221.css","41cbdfcd-3c0a.css","43794799-3ae3.css","4634a732-3acc.css","48325999-39f0.css","4a5b4394-38ae.css","4b9137ba-372f.css","51c97e4e-3a17.css","5301cdd8-1c0.css","53b31a63-ee26.css","5be9542f-32c5.css","5cbb79f0-ede4.css","5de00abd-1c0.css","5f3585c4-1c2.css","627d98e8-1c1.css","656a18cf-ede4.css","6944c28e-1c1.css","6b24a498-4deb.css","6be71b81-3805.css","6c8fadfe-3b35.css","70b1a9ee-eef4.css","70f5d59e-46f1.css","77338fc0-3a17.css","775af686-3cae.css","7831b28b-2d.css","7a6c1422-f65.css","7eaebd2b-4ba8.css","7f6cce44-37ea.css","800ca6b1-4191.css","8191c63a-3511.css","8200feab-3a5a.css","83e9d8f2-3e2c.css","869f0c0c-4c.css","882e176e-40ed.css","8afc931d-3bd9.css","91c7d5d6-54fd.css","94b405b4-1e5e.css","95291cbb-f172.css","96f17139-3c8a.css","98460316-eeb1.css","a0e8122e-1c2.css","a896d19d-3abb.css","a8ad092b-3abb.css","aa52fa03-3ada.css","ab9a9ecc-3be6.css","af7ba301-55a1.css","b34aa5d4-1c1.css","b59b5cee-3a36.css","bcc3f993-519a.css","bdf07a37-3a28.css","c2c3b6dd-4795.css","c6e12605-ee69.css","c6ea4be9-3a3a.css","c810575c-3cae.css","c91deaa8-ee25.css","c9ed3646-3660.css","ccb9a4bb-4e8f.css","d14041fd-3829.css","d16eb85f-ee24.css","d20f0fe8-3ade.css","d538f68d-1c1.css","d66bcaf9-eead.css","d8e9c325-1c1.css","d94c7416-38cd.css","d9a30ca6-523e.css","dd74016b-5434.css","dd98dec0-394c.css","e57822da-4b04.css","ec94733b-3d52.css","f072a3ef-ee69.css","f1cc4789-3952.css","f90d17a6-39b6.css","fadfdf6a-3a3f.css","fbbd4a3a-885.css"]/* stylesheet-manifest:end */);
  const encoder = new TextEncoder();
  // Keep cached component CSS aligned with the current surface palette.
  const panelHex = new RegExp('#(?:' + [[13, 27, 22], [45, 46, 51]].map(channels => channels.map(value => value.toString(16).padStart(2, '0')).join('')).join('|') + ')([a-f0-9]{2})?(?![a-f0-9])', 'gi');
  window.__argusStylesheet = source => {
    const css = source.replace(panelHex, (_, alpha = '') => '#222222' + alpha).replace(/http:\/\/127\.0\.0\.1:\d+/g, '')
      .replace(/@import\s+url\(["']?[^)\n]*fonts\.googleapis\.com[^)\n]*(?:Geist|Figtree|IBM\+Plex\+Mono)[^)\n]*\)\s*;/g, '');
    if (cache.has(css)) return cache.get(css);
    const bytes = encoder.encode(css);
    let hash = 2166136261;
    for (const byte of bytes) hash = Math.imul(hash ^ byte, 16777619) >>> 0;
    const name = `${hash.toString(16).padStart(8, '0')}-${bytes.length.toString(16)}.css`;
    // Prop-dependent styles may not exist in the static HTML export.
    // Retain their exact CSS without a failing request or a flash of unstyled content.
    const href = available.has(name) ? `/styles/blocks/${name}?panel=222222-20261113${name === "6be71b81-3805.css" ? "&navigation=shared-3" : ""}` :
      URL.createObjectURL(new Blob([css], { type: 'text/css' }));
    cache.set(css, href);
    return href;
  };
})();
