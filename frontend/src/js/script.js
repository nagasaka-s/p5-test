import StaticData from '@/lib/StaticData';
// import Sketch from '@/lib/Sketch';
import BallBounce from '@/lib/BallBounce';

const init = () => {
  window.addEventListener('resize', onResize);
};

const onResize = () => {
  if (window.innerWidth <= StaticData.PC_MIN_WIDTH) {
    
  }
};

window.addEventListener('DOMContentLoaded', init);
