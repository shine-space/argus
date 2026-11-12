import { n as initReactDOM, r as createRoot, o as jsx } from '/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/react.iNMCLRE-.mjs';
import { n as initCapabilities, t as PlatformCapabilities } from './FcLogos.mjs?v=39';
import props from './platform-capabilities-props.mjs?v=2';

initReactDOM();
initCapabilities();

class ServicesCapabilities extends HTMLElement {
  connectedCallback() {
    this.root = createRoot(this);
    this.root.render(jsx(PlatformCapabilities, props));
  }

  disconnectedCallback() {
    this.root.unmount();
  }
}

customElements.define('services-capabilities', ServicesCapabilities);

function mount() {
  const intro = document.getElementById('orynthiq-intro');
  if (!intro || intro.nextElementSibling?.matches('services-capabilities')) return;
  const section = document.createElement('services-capabilities');
  intro.after(section);
}

new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
mount();
