const clickOutside = {};
let handleOutsideClick;
let clicks = {};

clickOutside.install = function(Vue) {
  Vue.directive('click-outside', {
    bind: function(el, binding, vnode) {
      handleOutsideClick = event => {
        if (
          !(
            el == event.target ||
            el.contains(event.target) ||
            (el.parentNode && el.parentNode.contains(event.target))
          )
        ) {
          vnode.context[binding.expression](event);
        }
      };
      clicks[vnode.context.id] = handleOutsideClick;
      Object.keys(clicks).forEach(click => {
        const handleClick = clicks[click];
        document.documentElement.addEventListener('click', handleClick, false);
      });
    },
    unbind: function(el, binding, vnode) {
      document.documentElement.removeEventListener(
        'click',
        clicks[vnode.context.id],
        false
      );
      delete clicks[vnode.context.id];
    }
  });
};

export default clickOutside;
