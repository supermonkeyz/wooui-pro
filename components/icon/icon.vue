<template lang="html">
  <span :class="$style.wrap" :title="title">
    <span
      :class="[$style.main, $style.vip]"
      :style="[iconSize, maxIconSize]"
      v-if="symbol === 'vip'"
    >
      <svg :class="$style.in">
        <use xlink:href="#vip"></use>
      </svg>
      <svg :class="$style.in" v-if="level">
        <use :xlink:href="vipLevel"></use>
      </svg>
    </span>
    <span
      :class="[$style.main, $style.vgold]"
      :style="[iconSize, maxIconSize]"
      v-else-if="symbol === 'vgold'"
    >
      <svg :class="$style.in">
        <use xlink:href="#vgold"></use>
      </svg>
      <span :class="$style.frames" ref="frames"></span>
    </span>
    <svg
      :class="[$style.main, iconClass]"
      :style="[iconSize, maxIconSize]"
      v-else
    >
      <use :xlink:href="iconSymbol"></use>
    </svg>
  </span>
</template>

<script>
import rootunit from '../_util/unit';
{
  const icons = require.context('./svgs/', true, /.*\.svg$/);
  icons.keys().forEach(key => icons(key));
}
export default {
  name: 'woo-icon',
  props: {
    symbol: String,
    level: Number,
    size: [Number, String],
    maxSize: String,
    title: String
  },
  computed: {
    vipLevel() {
      return this.level && `#vip${this.level}`;
    },
    iconClass() {
      return this.symbol && `woo-icon--${this.symbol}`;
    },
    iconSymbol() {
      return this.symbol && `#${this.symbol}`;
    },
    iconSize() {
      if (/^\d+(\.\d+)?%$/.test(this.size)) {
        return { width: this.size, height: this.size };
      }
      return (
        !isNaN(this.size) && {
          width: `${this.size / rootunit}rem`,
          height: `${this.size / rootunit}rem`
        }
      );
    },
    maxIconSize() {
      return (
        this.maxSize && {
          maxWidth: this.maxSize,
          maxHeight: this.maxSize
        }
      );
    }
  },
  mounted() {
    if (this.symbol === 'vgold') {
      const size = parseInt(this.$refs.frames.clientHeight, 10);
      this.$refs.frames.style.width = `${size}px`;
      this.$refs.frames.style.height = `${size}px`;
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-icon-size: em(14px);
  --w-icon-an-dur: 2.1s;
  --w-icon-an-step: 15;
  --w-icon-an-count: 3;
}

.wrap {
  line-height: 1;
  display: inline-flex;
}

.main {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: var(--w-icon-size);
  height: var(--w-icon-size);
}

.in {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.frames {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--w-index-flow);
  background-image: url('./frames/goldv.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: -666px;
  animation: wooSprite var(--w-icon-an-dur) steps(var(--w-icon-an-step))
    var(--w-icon-an-count) backwards;
}

@keyframes wooSprite {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 bottom;
  }
}
</style>
