const activeStop = {};

let up;
let down;
if (typeof window.ontouchstart !== 'undefined') {
  down = 'touchstart';
  up = 'touchend';
} else {
  down = 'mousedown';
  up = 'mouseup';
}

function stop(e) {
  e.stopPropagation();
}

activeStop.install = function(Vue) {
  Vue.directive('active-stop', {
    bind(el) {
      el.addEventListener(down, stop, false);
    },
    unbind(el) {
      el.removeEventListener(up, stop, false);
    }
  });
};

export default activeStop;
