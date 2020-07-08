<template lang="html">
  <component
    :is="type"
    :class="[$style.main, filled && $style.filled]"
    :style="spinnerStyle"
  >
  </component>
</template>

<script>
import weibo from './assets/weibo.svg';

export default {
  name: 'woo-spinner',
  components: { weibo },
  props: {
    /**
     * The type of the spinner.
     * `Options: iOS, Android, Windows`
     */
    type: {
      type: String,
      default: 'weibo'
    },
    /**
     * The size of the spinner.
     * `Options: css units value`
     */
    size: String,
    /**
     * The color of the spinner.
     * `Options: css color value`
     */
    color: String,
    filled: Boolean
  },
  computed: {
    spinnerStyle() {
      return {
        color: this.color,
        fontSize: this.size
      };
    }
  }
};
</script>

<style lang="postcss" module>
.main {
  width: 1em;
  height: 1em;
}
.filled {
  color: var(--w-brand);
}

@keyframes _-rotate {
  100% {
    transform: translate3d(0, 0, 0);
    transform: rotate(360deg);
  }
}

@keyframes _-dash {
  0% {
    transform: translate3d(0, 0, 0);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .main {
    animation: _-rotate 1s linear infinite;
  }
}
</style>
