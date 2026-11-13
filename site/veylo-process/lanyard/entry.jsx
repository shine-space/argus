import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard';

export function mountLanyard(host) {
  const root = createRoot(host);
  root.render(
    <Lanyard
      frontImage="/veylo-process/lanyard/assets/card-front-employee-color.svg"
      backImage="/veylo-process/lanyard/assets/card-back-chaoxi.svg"
      strapImage="/veylo-process/lanyard/assets/lanyard-chaoxi-white.svg"
      imageFit="cover"
      cardColor="#ffffff"
      orientation="portrait"
      finish="glossy"
      cornerRadius={0.3}
      size={0.5}
      anchor="center"
      strapLength={0.4}
      strapColor="#111111"
      strapWidth={0.65}
      metal="silver"
      gravity={1}
      damping={0.5}
      elasticity={0.5}
      breeze={0.5}
      interactive
      intro
    />
  );
  return () => root.unmount();
}
