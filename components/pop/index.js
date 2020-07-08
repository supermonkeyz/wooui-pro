import Pop from './pop';
import PopItem from './pop-wrap';
import PopWrap from './pop-item';
import PopGroup from './pop-group';
Pop.install = function(Vue) {
  Vue.component(Pop.name, Pop);
};
PopWrap.install = function(Vue) {
  Vue.component(PopWrap.name, PopWrap);
};
PopItem.install = function(Vue) {
  Vue.component(PopItem.name, PopItem);
};
PopGroup.install = function(Vue) {
  Vue.component(PopGroup.name, PopGroup);
};
export { Pop as default, PopWrap, PopItem, PopGroup };
