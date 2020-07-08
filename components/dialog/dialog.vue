<template lang="html">
  <Modal
    v-if="show"
    :mask="data.mask"
    :touchclose="data.touchclose"
    :duration="data.duration"
    :animation="data.animation"
    @close="data.maskCancel ? cancel() : close()"
  >
    <Box
      :class="[$style.main, data.cssClass]"
      direction="y"
      align="center"
      aria-modal="true"
      :aria-hidden="!show"
      :tabindex="show ? 0 : 1"
      role="alertdialog"
    >
      <Close
        :class="[$style.close, data.kind === 'bar' && $style.close1]"
        @click="cancel()"
        v-if="data.close"
      ></Close>
      <div
        :class="[$style.title, data.kind === 'bar' && $style.bar]"
        v-if="data.title"
      >
        {{ data.title }}
      </div>
      <div :class="$style.body">
        <div
          :class="[
            $style.message,
            data.kind !== 'bar' && !data.title && $style.gap
          ]"
          v-if="data.message || data.checkbox.label"
        >
          {{ data.message }}
        </div>
        <div
          :class="$style.form"
          v-if="data.checkbox.length || data.input.length"
        >
          <!-- 对象引用才会触发值的变更响应 -->
          <div
            v-for="(item, index) in data.input"
            :class="$style.checkbox"
            :key="index"
          >
            <input
              :class="$style.input"
              v-model="item.value"
              :placeholder="item.holder"
            />
          </div>
          <div
            v-for="(item, index) in data.checkbox"
            :key="index"
            :class="$style.checkbox"
          >
            <Checkbox v-model="item.value">
              {{ item.label }}
            </Checkbox>
            <div v-if="item.info" :class="$style.checkboxInfo">
              {{ item.info }}
            </div>
          </div>
        </div>
        <div :class="$style.component" v-if="data.component">
          <component :is="data.component" v-bind="data.componentProps">
          </component>
        </div>
      </div>
      <div :class="$style.ctrl" v-if="!data.btns.length">
        <Button
          sort="flat"
          kind="default"
          :class="$style.btn"
          @click="cancel()"
          v-if="data.type !== 'alert'"
        >
          {{ data.btnCancel }}
        </Button>
        <Button
          sort="flat"
          kind="primary"
          :class="$style.btn"
          @click="confirm(data.action, data.btnConfirmClose)"
        >
          {{ data.btnConfirm }}
        </Button>
      </div>
      <div :class="$style.ctrl" v-else>
        <woo-button
          v-for="(btn, index) in data.btns"
          :key="index"
          sort="flat"
          fluid
          :kind="btn.kind"
          :class="$style.custBtn"
          @click="confirm(btn.action, btn.ConfirmClose)"
        >
          {{ btn.text }}
        </woo-button>
      </div>
    </Box>
  </Modal>
</template>

<script>
import Modal from '../modal';
import * as Box from '../box';
import Button from '../button';
import Checkbox from '../checkbox';
import popup from '../_mixin/popup';
import Close from '../_assets/close.svg';

export default {
  name: 'woo-dialog',
  components: {
    Modal,
    Box: Box.Box,
    Button,
    Close,
    Checkbox
  },
  mixins: [popup],
  data() {
    return {
      name: 'wooDialog',
      defaults: {
        type: 'alert',
        kind: '',
        from: '',
        title: '',
        message: '',
        checkbox: [],
        input: [],
        animation: 'pop',
        mask: true,
        btnConfirm: '确认',
        btnConfirmClose: true,
        btnCancel: '取消',
        btnActive: '',
        btns: [],
        maskCancel: false,
        action: () => {},
        cancel: () => {},
        close: false,
        component: null,
        componentProps: {}
      }
    };
  },
  watch: {
    data(val) {
      this.data = val;
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-dialog-min-width: 246px;
  --w-dialog-max-width: 400px;
  --w-dialog-radius: 8px;
  --w-dialog-close-color: var(--w-color-gray-3);
  --w-dialog-gap: 30px;
}

.main {
  box-sizing: border-box;
  min-width: var(--w-dialog-min-width);
  max-width: var(--w-dialog-max-width);
  min-height: 144px;
  background-color: var(--w-card-background);
  border-radius: var(--w-dialog-radius);
  box-sizing: border-box;
  border: 1px solid color-mod(black a(10%));
  color: var(--w-main);
  position: relative;
  outline: 0;
  padding-bottom: var(--w-dialog-gap);
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 13px;
  height: 13px;
  fill: var(--w-dialog-close-color);
  cursor: pointer;
}

.close1 {
  top: 16px;
}

.title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
  padding: var(--w-dialog-gap) var(--w-dialog-gap) 0;
}

.gap {
  padding-top: var(--w-dialog-gap);
}

.bar {
  align-self: stretch;
  padding: 0;
  border-bottom: 1px solid var(--w-dividing-line);
  padding: 12px 20px;
}

.body {
  padding: 0 var(--w-dialog-gap);
}

.message {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.ctrl {
  margin-top: auto;
  padding: 0 var(--w-dialog-gap);
}

.btn {
  margin: 0 5px;
}

.custBtn + .custBtn {
  margin-top: 10px;
}

.form {
  margin-bottom: 20px;
}

.checkbox {
  margin-bottom: 10px;
  text-align: left;
}

.checkboxInfo {
  font-size: 12px;
  line-height: 1.5;
  color: var(--w-sub);
  margin: 4px 0 4px 23px;
}

.input {
  width: 100%;
  height: 38px;
  border-radius: 8px;
  border: 0;
  width: 360px;
  font-size: 14px;
  text-indent: 12px;
  background-color: var(--w-input-background);
  outline: 0;
}

.component {
  width: 100%;
  margin-bottom: 30px;
}
</style>
