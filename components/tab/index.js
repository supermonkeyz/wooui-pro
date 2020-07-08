import Tab from './tab';
import TabItem from './tab-item';
Tab.install = function(Vue) {
  Vue.component(Tab.name, Tab);
};
TabItem.install = function(Vue) {
  Vue.component(TabItem.name, TabItem);
};
export { Tab, TabItem };
