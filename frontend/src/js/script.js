import StaticData from '@/lib/StaticData';

const init = () => {
  window.addEventListener('resize', onResize);
};

const onResize = () => {
  if (window.innerWidth <= StaticData.PC_MIN_WIDTH) {
    
  }
};

window.addEventListener('DOMContentLoaded', init);
