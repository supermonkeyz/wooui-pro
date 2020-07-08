import Box from './box';
import BoxItem from './box-item';
Box.install = function(Vue) {
  Vue.component(Box.name, Box);
};
BoxItem.install = function(Vue) {
  Vue.component(BoxItem.name, BoxItem);
};
export { Box, BoxItem };
