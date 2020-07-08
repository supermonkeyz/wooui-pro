<template lang="html">
  <div :class="$style.box">
    <slot></slot>
    <span
      :class="[$style.main, dot && $style.dot, $slots.default && $style.bubble]"
      v-if="show && (dot || message)"
      :style="[badgeColor, badgePosi]"
      v-text="message"
    >
    </span>
  </div>
</template>

<script>
export default {
  name: 'woo-badge',
  props: {
    dot: {
      type: Boolean
    },
    show: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: Number,
      default: 99
    },
    color: {
      type: String,
      default: ''
    },
    x: {
      type: String,
      default: ''
    },
    y: {
      type: String,
      default: ''
    }
  },
  computed: {
    message() {
      if (this.dot) {
        return '';
      }
      if (typeof this.value === 'number' && typeof this.max === 'number') {
        return this.max < this.value ? `${this.max}+` : this.value;
      }
      return this.value;
    },
    badgeColor() {
      return {
        backgroundColor: this.color
      };
    },
    badgePosi() {
      return {
        transform: 'none',
        right: 'auto',
        left: this.x,
        top: this.y
      };
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-badge-size: 16px;
  --w-badge-gap: 5px;
  --w-badge-text: var(--w-color-light);
  --w-badge-background: #f00;
  --w-badge-message: 10px;
  --w-badge-dot: 8px;
}

.box {
  position: relative;
  display: inline-block;
}

.main {
  pointer-events: none;
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  min-width: var(--w-badge-size);
  border-radius: var(--w-badge-size);
  height: var(--w-badge-size);
  line-height: var(--w-badge-size);
  padding: 0 var(--w-badge-gap);
  color: var(--w-badge-text);
  background-color: var(--w-badge-background);
  font-size: var(--w-badge-message);
}

.dot {
  min-width: inherit;
  width: var(--w-badge-dot);
  height: var(--w-badge-dot);
  padding: 0;
  vertical-align: 2px;

  &.bubble {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}

.bubble {
  position: absolute;
  top: -5px;
  right: 5px;
  transform: translate(100%, 0);
}
</style>
