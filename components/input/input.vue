<template lang="html">
  <div
    :class="[
      $style.wrap,
      type === 'textarea' && $style.text,
      disabled && $style.disabled,
      focus && $style.focus,
      error && $style.error,
      clearable && $style.clearable,
      countLimit && $style.countLimit,
      round && $style.round,
      $slots.icon && $style.hasIcon
    ]"
    ref="wrap"
  >
    <span :class="$style.icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <textarea
      :class="[
        $style.main,
        autosize && $style.noResize,
        type === 'textarea' && $style.textarea
      ]"
      :style="{ resize }"
      v-if="type === 'textarea'"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="handleInput('textarea')"
      @focus="focusHandle"
      @blur="blurHandle"
      @keyup="keyup($event)"
      @mouseup="keyup($event)"
      @keydown.enter="keydownEnter($event)"
      @keydown.down="keydownDown($event)"
      @keydown.up="keydownUp($event)"
      ref="textarea"
      v-model="inputValue"
    >
    </textarea>
    <input
      :class="$style.main"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="inputValue"
      :maxlength="maxlength"
      @focus="focusHandle"
      @blur="blurHandle"
      @input="handleInput('input')"
      v-bind="$attrs"
      ref="input"
      v-else
    />
    <span v-if="countLimit && maxlength" :class="$style.counter">
      {{ inputCount + '/' + maxlength }}
    </span>
    <Close
      :class="$style.close"
      v-if="inputValue && clearable"
      @click="clear"
    />
  </div>
</template>

<script>
import Close from '../_assets/close.svg';
import debounce from '../_util/debounce';

export default {
  name: 'woo-input',
  components: {
    Close
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    type: {
      type: String,
      default: 'input'
    },
    round: Boolean,
    modelValue: String,
    value: String,
    placeholder: String,
    disabled: Boolean,
    error: Boolean,
    clearable: Boolean,
    countLimit: Boolean,
    maxlength: Number,
    autosize: [Boolean, Object],
    debounce: [Boolean, Number],
    resize: String,
    isFocus: Boolean,
    isBlur: Boolean
  },
  data() {
    return {
      inputValue: this.value || this.modelValue,
      focus: false
    };
  },
  watch: {
    modelValue(val) {
      this.inputValue = val;
    },
    isFocus(val) {
      if (val) {
        this.focusHandle();
      }
    },
    isBlur(val) {
      if (val) {
        this.blurHandle();
      }
    }
  },
  computed: {
    inputCount() {
      return this.inputValue ? this.inputValue.length : 0;
    }
  },
  methods: {
    focusHandle() {
      this.focus = true;
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
      if (this.$refs.textarea) {
        this.$refs.textarea.focus();
      }
      this.$emit('focus');
    },
    blurHandle() {
      this.focus = false;
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
      if (this.$refs.textarea) {
        this.$refs.textarea.blur();
      }
      this.$emit('blur');
    },
    vmodelEmit() {
      this.$emit('input', this.inputValue);
    },
    handleInput(target) {
      this.inputValue = this.$refs[target].value;

      if (this.debounce) {
        debounce(
          this.vmodelEmit,
          typeof this.debounce === 'number' ? this.debounce : 50
        )();
      } else {
        this.vmodelEmit();
      }

      if (target === 'textarea' && this.autosize) {
        const t = this.$refs.textarea;
        t.style.height = 'auto';
        t.style.height = t.scrollHeight + 'px';
      }
    },
    clear() {
      this.inputValue = '';
    },
    getTextLineHeight(el) {
      const shadowText = el.cloneNode(true);
      shadowText.setAttribute('rows', 1);
      shadowText.value = '！';
      shadowText.style.position = 'absolute';
      shadowText.style.zIndex = -100;
      shadowText.style.height = 'auto';
      shadowText.style.padding = 0;
      document.body.appendChild(shadowText);
      const height = shadowText.offsetHeight;
      shadowText.parentNode.removeChild(shadowText);
      return height;
    },
    setTextHeight() {
      if (this.type === 'textarea' && this.autosize) {
        const lineHeight = this.getTextLineHeight(this.$refs.textarea);
        if (this.autosize.minRows) {
          this.$refs.textarea.style.minHeight =
            lineHeight * this.autosize.minRows + 'px';
        }
        if (this.autosize.maxRows) {
          this.$refs.textarea.style.maxHeight =
            lineHeight * this.autosize.maxRows + 'px';
        }
      }
    },
    keyup(e) {
      this.$emit('keyup', e);
    },
    keydownEnter(e) {
      this.$emit('keydown-enter', e);
    },
    keydownDown(e) {
      this.$emit('keydown-down', e);
    },
    keydownUp(e) {
      this.$emit('keydown-up', e);
    }
  },
  mounted() {
    this.setTextHeight();
    if (this.isFocus) {
      this.focusHandle();
    }
    if (this.isBlur) {
      this.blurHandle();
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-input-radius: em(8px);
  --w-input-height: em(38px);
  --w-input-indent: em(12px);
  --w-input-font-size: em(14px);
  --w-input-icon-size: em(16px);
}

.wrap {
  position: relative;
  display: inline-block;
  font-size: 16px;
  background-color: var(--w-input-background);
  border: 1px solid var(--w-input-background);
  border-radius: var(--w-input-radius);
  box-sizing: border-box;
  padding: 0 var(--w-input-indent);
}

.round {
  border-radius: 100px;
}

.disabled {
  background-color: var(--w-color-gray-7);
}

.focus {
  background-color: var(--w-card-background);
  border-color: var(--w-brand);

  & .icon {
    color: var(--w-brand);
  }
}

.main {
  -webkit-appearance: none;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  width: 100%;
  height: var(--w-input-height);
  color: var(--w-main);
  font-size: var(--w-input-font-size);
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--w-sub);
  }
}

.text {
  padding: 7px 12px;
}

.textarea {
  height: 100%;
  line-height: 1.75;
}

.error {
  border-color: var(--w-error);
  background-color: var(--w-card-background);
}

.clearable {
  padding-right: em(28px);
}

.close {
  position: absolute;
  right: em(5px);
  top: 50%;
  transform: translateY(-50%);
  width: em(14px);
  height: em(14px);
  fill: var(--w-sub);
  cursor: pointer;
}

.countLimit {
  padding-right: em(48px);
}

.counter {
  position: absolute;
  right: em(5px);
  top: 50%;
  transform: translateY(-50%);
  font-size: em(14px);
  color: var(--w-sub);
}

.hasIcon {
  padding-left: em(36px);
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: em(12px);
  font-size: var(--w-input-icon-size);

  & > img,
  & > svg {
    width: var(--w-input-icon-size);
    height: var(--w-input-icon-size);
    display: block;
  }
}

.noResize {
  resize: none;
}
</style>
