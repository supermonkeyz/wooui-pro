import Vue from 'vue';
import WooUI from './components/index';
import '@woo/woo-iconfont';

export default function(previewComponent) {
  Vue.use(WooUI, { modalsRegister: true });
  return {
    render(createElement) {
      return createElement(previewComponent);
    }
  };
}
