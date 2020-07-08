/* Automatically generated by build/gen.js*/
import '@babel/polyfill';
import device from './_util/device';
import directives from './_directive';
import Button from './button';
import Spinner from './spinner';
import * as Box from './box';
import Icon from './icon';
import Picture from './picture';
import Avatar from './avatar';
import Fonticon from './fonticon';
import Badge from './badge';
import Like from './like';
import Panel from './panel';
import Divider from './divider';
import Radio from './radio';
import Checkbox from './checkbox';
import * as Tab from './tab';
import Modal from './modal';
import * as Pop from './pop';
import Switch from './switch';
import Toast from './toast';
import Dialog from './dialog';
import Input from './input';
import Tip from './tip';

const components = {
  Button,
  Spinner,
  ...Box,
  Icon,
  Picture,
  Avatar,
  Fonticon,
  Badge,
  Like,
  Panel,
  Divider,
  Radio,
  Checkbox,
  ...Tab,
  Modal,
  ...Pop,
  Switch,
  Toast,
  Dialog,
  Input,
  Tip
};

const WooUI = {
  install(Vue, options = {}) {
    device.init(options.device);
    Object.keys(components).forEach(key => {
      Vue.component(components[key].name, components[key]);
    });
    Vue.prototype.$_wooBus = Vue.$_wooBus = new Vue();

    const modalList = {
      $_w_toast: 'Toast',
      $_w_dialog: 'Dialog'
    };

    Object.keys(modalList).forEach(key => {
      if (options.modalsRegister) {
        const i = modalList[key];
        const Modal = Vue.extend(components[i]);
        const vm = new Modal();
        document.body.appendChild(vm.$mount().$el);
      }
      const action = modalList[key];
      const wooAction = `woo${action}`;
      Vue.prototype[key] = (data, type) =>
        Vue.$_wooBus.$emit(wooAction, data, type);
      Vue.prototype[key + 'Close'] = data =>
        Vue.$_wooBus.$emit(wooAction + 'Close', data);
    });
    Vue.use(directives);
  }
};

WooUI.version = process.env.PACKAGE_VERSION;
WooUI.name = process.env.PACKAGE_NAME;

// prettier-ignore
export {
  WooUI as default,
  Button,
  Spinner,
  Box,
  Icon,
  Picture,
  Avatar,
  Fonticon,
  Badge,
  Like,
  Panel,
  Divider,
  Radio,
  Checkbox,
  Tab,
  Modal,
  Pop,
  Switch,
  Toast,
  Dialog,
  Input,
  Tip
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WooUI);
}
