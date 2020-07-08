<template lang="html">
  <Modal
    v-if="show"
    :mask="data.mask"
    :touchclose="data.touchclose"
    :duration="data.duration"
    :animation="data.animation"
    @close="close()"
  >
    <Box
      justify="center"
      align="center"
      direction="y"
      :class="[$style.main, toastType, data.cssClass]"
      aria-modal="true"
      :aria-hidden="!show"
      :tabindex="show ? 0 : 1"
      role="alert"
    >
      <div :class="$style.head" v-if="data.type">
        <Spinner v-if="data.type === 'loading'"></Spinner>
        <div v-else-if="data.custom" v-html="data.custom"></div>
        <component :is="iconType" :class="$style.icon" v-else></component>
      </div>
      <div :class="$style.body" v-if="data.message">
        <span :class="$style.content" v-html="data.message"></span>
      </div>
    </Box>
  </Modal>
</template>

<script>
import Modal from '../modal';
import * as Box from '../box';
import Spinner from '../spinner';
import Success from '../_assets/successLine.svg';
import Warn from '../_assets/warnLine.svg';
import Error from '../_assets/errorLine.svg';
import Help from '../_assets/helpLine.svg';
import popup from '../_mixin/popup';

const typeMap = {
  success: 'Success',
  warn: 'Warn',
  error: 'Error',
  help: 'Help'
};

export default {
  name: 'woo-toast',
  components: {
    Modal,
    Box: Box.Box,
    Spinner,
    Success,
    Warn,
    Error,
    Help
  },
  mixins: [popup],
  data() {
    return {
      name: 'wooToast',
      defaults: {
        type: 'success',
        custom: '',
        message: '',
        animation: 'fade',
        mask: false,
        autohide: true,
        touchclose: false,
        action: () => {}
      }
    };
  },
  computed: {
    toastType() {
      return `woo-toast--${this.data.type}`;
    },
    iconType() {
      return typeMap[this.data.type] || '';
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-toast-width: 200px;
  --w-toast-height: 134px;
  --w-toast-radius: 8px;
  --w-toast-text: var(--w-color-light);
  --w-toast-background: color-mod(black a(0.8));
  --w-toast-icon: 42px;
  --w-toast-message: 14px;
  --w-toast-message-line: 20px;
  --w-toast-message-gap: 14px;
  --w-toast-gap: 30px;
}

.main {
  box-sizing: border-box;
  width: var(--w-toast-width);
  min-height: var(--w-toast-height);
  padding: var(--w-toast-message-line) 0;
  border-radius: var(--w-toast-radius);
  color: var(--w-toast-text);
  background-color: var(--w-toast-background);
  outline: 0;
}

.head {
  display: inherit;
  font-size: var(--w-toast-icon);
}

.icon {
  width: var(--w-toast-icon);
  height: var(--w-toast-icon);
  fill: #fff;
}

.body {
  font-size: var(--w-toast-message);
  line-height: var(--w-toast-message-line);
  margin-top: var(--w-toast-message-gap);
  padding-left: var(--w-toast-gap);
  padding-right: var(--w-toast-gap);
  text-align: center;
}
</style>
