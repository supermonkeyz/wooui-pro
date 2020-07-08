<template lang="html">
  <label :class="[$style.main, disabled && $style.disabled]" :style="radioSize">
    <input
      type="radio"
      @change="handleChange"
      :disabled="disabled"
      :checked="checkedValue"
      :class="$style.input"
      :name="name"
    />
    <span
      :class="[$style.shadow, checkedValue && $style.checked]"
      :style="checkedValue && { color: color, backgroundColor: color }"
    >
    </span>
    <span
      :class="$style.text"
      :style="checkedValue && { color: textColor }"
      v-if="$slots.default"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script>
import rootunit from '../_util/unit';
export default {
  name: 'woo-radio',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: [String, Number],
    value: [String, Number],
    name: String,
    checked: Boolean,
    disabled: Boolean,
    color: String,
    textColor: String,
    size: [Number, String]
  },
  computed: {
    checkedValue() {
      return this.modelValue === this.value || this.checked;
    },
    radioSize() {
      return !isNaN(this.size) && `font-size: ${this.size / rootunit}rem`;
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.value);
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-radio-size: em(14px);
  --w-radio-border: var(--w-color-gray-7);
  --w-radio-inset: em(3px);
  --w-radio-check-color: var(--w-color-orange-1);
  --w-radio-gap: em(10px);
}

.main {
  position: relative;
}

.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
}

.shadow {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: var(--w-radio-size);
  height: var(--w-radio-size);
  color: var(--w-radio-border);
  border: 1px solid;
  border-radius: 50%;
  vertical-align: middle;

  &::before {
    content: '';
    position: absolute;
    top: var(--w-radio-inset);
    right: var(--w-radio-inset);
    bottom: var(--w-radio-inset);
    left: var(--w-radio-inset);
    border-radius: 50%;
    background-color: #fff;
    visibility: hidden;
  }
}

.checked {
  color: var(--w-radio-check-color);
  background-color: var(--w-radio-check-color);
  &::before {
    visibility: visible;
  }
}

.text {
  font-size: var(--w-radio-size);
  margin-left: var(--w-radio-gap);
  vertical-align: middle;
  line-height: 1;
}
</style>
