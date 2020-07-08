const active = {};

active.install = function(Vue) {
  Vue.directive('active', {
    bind: function(el, binding) {
      let activeColor = 'rgba(0, 0, 0, 0.1)';
      let startTime = 100;
      let stayTime = 0;
      let timer;
      let down;
      let up;
      const bg = el.style.background || el.style.backgroundColor;
      if (binding.value) {
        if (typeof binding.value === 'string') {
          activeColor = binding.value;
        } else {
          if (binding.value.activeColor) {
            activeColor = binding.value.activeColor;
          }
          if (
            binding.value.startTime &&
            typeof binding.value.startTime === 'number'
          ) {
            startTime = binding.value.startTime;
          }
          if (
            binding.value.stayTime &&
            typeof binding.value.stayTime === 'number'
          ) {
            stayTime = binding.value.stayTime;
          }
        }
      }

      if (typeof window.ontouchstart !== 'undefined') {
        down = 'touchstart';
        up = 'touchend';
      } else {
        down = 'mousedown';
        up = 'mouseup';
      }

      function setColor(color, delay) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          el.style.backgroundColor = color;
        }, delay);
      }

      function doActive() {
        setColor(activeColor, startTime);
      }

      function killActive() {
        setColor(bg, stayTime);
      }

      el.addEventListener(down, doActive, false);
      el.addEventListener(up, killActive, false);
      el.addEventListener('touchmove', killActive, false);
      el.addEventListener('touchcancel', killActive, false);
    }
  });
};

export default active;
