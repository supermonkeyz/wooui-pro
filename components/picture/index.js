import Picture from './picture';
Picture.install = function(Vue) {
  Vue.component(Picture.name, Picture);
};
export default Picture;
