import Modal from './modal';
Modal.install = function(Vue) {
  Vue.component(Modal.name, Modal);
};
export default Modal;
