<template lang="html">
  <label :class="[$style.main, disabled && $style.disabled]" :style="boxSize">
    <input
      type="checkbox"
      @change="handleChange"
      :disabled="disabled"
      :checked="checkedValue"
      :class="$style.input"
      :name="name"
      ref="input"
    />
    <span
      :class="[$style.shadow, checkedValue && $style.checked]"
      :style="checkedValue && { color: color, backgroundColor: color }"
    >
      <Check v-if="checkedValue" :class="$style.icon"></Check>
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
import Check from './assets/icon.svg';

export default {
  name: 'woo-checkbox',
  components: {
    Check
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {},
    value: [String, Number],
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    name: String,
    disabled: Boolean,
    color: String,
    textColor: String,
    size: [Number, String]
  },
  computed: {
    checkedValue() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    },
    boxSize() {
      return !isNaN(this.size) && `font-size: ${this.size / rootunit}rem`;
    }
  },
  methods: {
    handleChange() {
      const isChecked = this.$refs.input.checked;
      if (this.modelValue instanceof Array) {
        const value = [...this.modelValue];
        if (isChecked) {
          value.push(this.value);
        } else {
          value.splice(value.indexOf(this.value), 1);
        }
        this.$emit('change', value);
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue);
      }
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-checkbox-size: em(14px);
  --w-checkbox-border: var(--w-color-gray-7);
  --w-checkbox-icon: em(12px);
  --w-checkbox-check-color: var(--w-color-orange-1);
  --w-checkbox-gap: em(10px);
  --w-checkbox-radius: em(2px);
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
  width: var(--w-checkbox-size);
  height: var(--w-checkbox-size);
  color: var(--w-checkbox-border);
  border: 1px solid;
  vertical-align: middle;
  text-align: center;
  border-radius: var(--w-checkbox-radius);
}

.icon {
  width: var(--w-checkbox-icon);
  height: var(--w-checkbox-icon);
  vertical-align: top;
  color: #fff;
}

.checked {
  color: var(--w-checkbox-check-color);
  background-color: var(--w-checkbox-check-color);
}

.text {
  display: inline-block;
  font-size: var(--w-checkbox-size);
  margin-left: var(--w-checkbox-gap);
  vertical-align: middle;
  line-height: 1;
}
</style>
