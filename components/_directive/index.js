import active from './active';
import activeStop from './activeStop';
import clickOutside from './clickOutside';

const directives = {};

directives.install = function(Vue) {
  Vue.use(active);
  Vue.use(activeStop);
  Vue.use(clickOutside);
};

export default directives;
