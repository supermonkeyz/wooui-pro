<template lang="html">
  <label :class="$style.main" :style="switchSize">
    <input
      :class="$style.input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :true-value="onValue"
      :false-value="offValue"
      :disabled="disabled"
    />
    <span
      :class="{
        [$style.shadow]: true,
        [$style.disabled]: disabled,
        [$style.checked]: checked
      }"
      ref="main"
      role="switch"
    >
    </span>
  </label>
</template>

<script>
export default {
  name: 'woo-switch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: true
    },
    size: [Number, String],
    color: String,
    disabled: {
      type: Boolean,
      default: false
    },
    onValue: {
      type: [Boolean, String, Number],
      default: true
    },
    offValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: String
  },
  computed: {
    switchSize() {
      return !isNaN(this.size) && `font-size: ${this.size}rem`;
    },
    checked() {
      return this.value === this.onValue;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
      if (this.color) {
        if (this.checked) {
          this.setColor();
        } else {
          this.$refs.main.removeAttribute('style');
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', !this.checked ? this.onValue : this.offValue);
      this.$emit('change', !this.checked ? this.onValue : this.offValue);
      this.$nextTick(() => {
        this.$refs.input.checked = this.checked;
      });
    },
    setColor() {
      const switchColor = this.color;
      const switchInset = this.$refs.main.clientHeight;
      this.$refs.main.style.boxShadow = `inset 0 0 0 ${switchInset}px  ${switchColor}`;
    }
  },
  mounted() {
    this.$refs.input.checked = this.checked;
    if (this.color) {
      if (this.checked) {
        this.setColor();
        this.$refs.main.style.transition = 'none';
      }
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-switch-default-size: 16px;
  --w-switch-border-width: em(1.5px);
  --w-switch-width: em(51px);
  --w-switch-height: em(32px);
  --w-switch-button: em(30px);
  --w-switch-dur: 0.3s;
  --w-switch-radius: var(--w-switch-height);
  --w-switch-inset: var(--w-switch-height);
  --w-switch-off-background: var(--w-color-light);
  --w-switch-off-border-color: var(--w-color-gray-8);
  --w-switch-on-background: var(--w-brand);
}

.main {
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: var(--w-switch-default-size);
  touch-action: manipulation;
}

.input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.shadow {
  position: relative;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  width: var(--w-switch-width);
  height: var(--w-switch-height);
  background-color: var(--w-switch-off-background);
  box-shadow: inset 0 0 0 var(--w-switch-border-width)
    var(--w-switch-off-border-color);
  border-radius: var(--w-switch-radius);
  transition: box-shadow var(--w-switch-dur)
    cubic-bezier(0.17, 0.67, 0.43, 0.98);

  &::after {
    content: '';
    position: absolute;
    top: calc((var(--w-switch-height) - var(--w-switch-button)) / 2);
    left: 0;
    width: var(--w-switch-button);
    height: var(--w-switch-button);
    border-radius: 50%;
    box-sizing: border-box;
    background-color: var(--w-switch-off-background);
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 em(3px) em(8px) 0 color-mod(black a(0.15)),
      0 em(1px) em(1px) 0 color-mod(black a(0.16)),
      0 em(3px) em(1px) 0 color-mod(black a(0.1));
    transition: transform var(--w-switch-dur)
      cubic-bezier(0.42, 0.42, 0.25, 1.25);
  }
}

.checked {
  box-shadow: inset 0 0 0 var(--w-switch-inset) var(--w-switch-on-background);

  &::after {
    transform: translate3d(
      calc(
        var(--w-switch-width) - var(--w-switch-button) -
          (var(--w-switch-height) - var(--w-switch-button)) / 2
      ),
      0,
      0
    );
  }
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
