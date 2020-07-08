<template lang="html">
  <div
    :class="[
      $style.main,
      pictureClass,
      error && $style.error,
      hoverMask && $style.hover
    ]"
    :style="pictureStyle"
  >
    <div v-if="show" :style="customRatio"></div>
    <img
      :alt="alt"
      :src="!lazyLoad && imgSrc"
      :data-src="lazyLoad && imgSrc"
      :data-tag="lazyLoad && 'woo-lazy'"
      :loading="lazyLoad && 'lazy'"
      v-if="imgSrc !== null"
      :class="$style.img"
      @load="load"
      @error="loadError"
      v-bind="$attrs"
    />
    <div :class="$style.cover" v-if="imgSrc !== null && border"></div>
    <div :class="$style.hoverMask" v-if="hoverMask"></div>
    <div :class="$style.slot" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import rootunit from '../_util/unit';

const typeMap = {
  '1:1': 'square',
  '5:4': 'wide54',
  '4:3': 'wide43',
  '3:2': 'wide32',
  '16:9': 'wide169'
};

const emptyImg =
  'data:image/svg+xml;utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20120%20120%22%3E%0A%20%20%3Cpath%20fill=%22%23eee%22%20d=%22M0%200h120v120H0z%22/%3E%0A%3C/svg%3E';

export default {
  name: 'woo-picture',
  props: {
    src: {
      type: String,
      default: emptyImg
    },
    alt: String,
    lazyLoad: Boolean,
    hoverMask: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    width: [String, Number],
    height: [String, Number],
    aspectRatio: {
      type: [String, Number],
      default: '1:1'
    }
  },
  data() {
    return {
      imgSrc: this.src,
      error: false,
      reload: 0
    };
  },
  watch: {
    src(val) {
      this.imgSrc = val;
      this.reload++;
    }
  },
  computed: {
    pictureClass() {
      return (
        typeMap[this.aspectRatio] && this.$style[typeMap[this.aspectRatio]]
      );
    },
    pictureStyle() {
      return {
        width:
          this.width && !isNaN(this.width)
            ? `${this.width / rootunit}rem`
            : this.width,
        height:
          this.height && !isNaN(this.height)
            ? `${this.height / rootunit}rem`
            : this.height
      };
    },
    show() {
      return !typeMap[this.aspectRatio];
    },
    customRatio() {
      return (
        !isNaN(this.aspectRatio) && `padding-bottom: ${this.aspectRatio * 100}%`
      );
    }
  },
  methods: {
    load() {
      if (this.reload) {
        this.error = false;
      }
    },
    loadError() {
      this.reload = 0;
      this.imgSrc = emptyImg;
      this.error = true;
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-picture-hover: color-mod(black a(0.15));
}

.main {
  display: inline-block;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 100%;
  }
}

.cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  pointer-events: none;
  border-radius: inherit;
  border: 1px solid var(--w-image-border);
}

.hover:hover {
  & .hoverMask {
    opacity: 1;
  }
}

.hoverMask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--w-index-flow);
  background-color: var(--w-picture-hover);
  pointer-events: none;
  border-radius: inherit;
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.slot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.error {
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    bottom: -10%;
    left: -10%;
    background: svg-load('./assets/error.svg') repeat;
    transform: rotate(-15deg);
    -webkit-backface-visibility: hidden;
  }
}

.square {
  &::before {
    padding-bottom: 100%;
  }
}

.wide54 {
  &::before {
    padding-bottom: calc(100% * 4 / 5);
  }
}

.wide43 {
  &::before {
    padding-bottom: calc(100% * 3 / 4);
  }
}

.wide32 {
  &::before {
    padding-bottom: calc(100% * 2 / 3);
  }
}

.wide169 {
  &::before {
    padding-bottom: calc(100% * 9 / 16);
  }
}
</style>
