<template lang="html">
  <div :class="$style.wrap" ref="wrap">
    <span :class="$style.ctrl" @click.stop ref="ctrl">
      <slot name="ctrl" />
    </span>
    <!-- transition duration not working -->
    <transition :name="animation">
      <div
        v-click-outside="outsideClick"
        :class="[
          $style.main,
          fluid && $style.fluid,
          custom && `woo-pop-${custom}`,
          $style[direction],
          $style[align]
        ]"
        :style="[layerGap, transDuration, flowStyle]"
        v-if="show"
        ref="layer"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import rootunit from '../_util/unit';
import throttle from '../_util/throttle';
import getScrollParent from '../_util/getScrollParent';

export default {
  name: 'woo-pop',
  props: {
    show: Boolean,
    direction: {
      type: String,
      default: 'down'
    },
    align: {
      type: String,
      default: 'start'
    },
    gap: [String, Number],
    custom: String,
    animate: Boolean,
    animateDuration: [String, Number],
    flow: Boolean,
    fluid: Boolean
  },
  data() {
    return {
      id: 'pop' + this._uid,
      exist: this.show
    };
  },
  watch: {
    show(val) {
      if (this.flow) {
        if (val) {
          this.$nextTick(() => {
            // this.cloneNode(this.$refs.layer, this.id);
            this.setPosition(this.$refs.layer);
            this.addListener();
          });
        } else {
          // this.removeNode(this.id);
          this.removeListener();
        }
      }
    }
  },
  computed: {
    layerGap() {
      let margin;
      const value = negative =>
        !isNaN(this.gap) && `${((negative ? -1 : 1) * this.gap) / rootunit}rem`;
      switch (this.direction) {
        case 'up':
          margin = { marginTop: value(true) };
          break;
        case 'down':
          margin = { marginTop: value() };
          break;
        case 'left':
          margin = { marginLeft: value(true) };
          break;
        case 'right':
          margin = { marginLeft: value() };
          break;
        default:
          margin = null;
      }
      return margin;
    },
    animation() {
      let animate;
      if (this.animate) {
        animate =
          this.direction === 'up' || this.direction === 'down'
            ? 'woo-pop-an-slide-y'
            : 'woo-pop-an-slide-x';
      }
      return animate;
    },
    transDuration() {
      return (
        this.animate && { transitionDuration: this.animateDuration + 'ms' }
      );
    },
    flowStyle() {
      return this.flow && { opacity: 0 };
    }
  },
  methods: {
    outsideClick() {
      this.$emit('click-outside');
    },
    getNode(el) {
      if (!el) return;
      const elInfo = el.getBoundingClientRect();
      const top = elInfo.top;
      const left = elInfo.left;
      const x = left + window.scrollX;
      const y = top + window.scrollY;
      const width = elInfo.width;
      const height = elInfo.height;
      return { top, left, x, y, width, height };
    },
    getLayerPosition(el) {
      if (!this.getNode(this.$refs.ctrl)) return;
      const ctrlHeight = this.getNode(this.$refs.ctrl).height;
      const ctrlWidth = this.getNode(this.$refs.ctrl).width;

      // let x;
      // let y;

      let map = {};
      let mainAxis;
      let crossAxis;
      let line;

      if (this.direction === 'up' || this.direction === 'down') {
        mainAxis = 'x';
        crossAxis = 'y';
        line = ctrlHeight;
      }

      if (this.direction === 'left' || this.direction === 'right') {
        mainAxis = 'y';
        crossAxis = 'x';
        line = ctrlWidth;
      }

      switch (this.direction) {
        case 'up':
        case 'left':
          map[crossAxis] = 0;
          break;
        case 'down':
        case 'right':
          map[crossAxis] = line;
          break;
        default:
          map[crossAxis] = line;
      }

      switch (this.align) {
        case 'start':
          map[mainAxis] = 0;
          break;
        case 'center':
          map[mainAxis] = line / 2;
          break;
        case 'end':
          map[mainAxis] = line;
          break;
        default:
          map[mainAxis] = 0;
      }

      // if (this.direction === 'up') {
      //   y = 0;
      //   if (this.align === 'start') {
      //     x = 0;
      //   } else if (this.align === 'center') {
      //     x = ctrlWidth / 2;
      //   } else if (this.align === 'end') {
      //     x = ctrlWidth;
      //   }
      // }

      // if (this.direction === 'down') {
      //   y = ctrlHeight;
      //   if (this.align === 'start') {
      //     x = 0;
      //   } else if (this.align === 'center') {
      //     x = ctrlWidth / 2;
      //   } else if (this.align === 'end') {
      //     x = ctrlWidth;
      //   }
      // }

      // if (this.direction === 'left') {
      //   x = 0;
      //   if (this.align === 'start') {
      //     y = 0;
      //   } else if (this.align === 'center') {
      //     y = ctrlHeight / 2;
      //   } else if (this.align === 'end') {
      //     y = ctrlHeight;
      //   }
      // }

      // if (this.direction === 'right') {
      //   x = ctrlWidth;
      //   if (this.align === 'start') {
      //     y = 0;
      //   } else if (this.align === 'center') {
      //     y = ctrlHeight / 2;
      //   } else if (this.align === 'end') {
      //     y = ctrlHeight;
      //   }
      // }

      const layerY = this.getNode(this.$refs.wrap).top + map.y;
      const layerX = this.getNode(this.$refs.wrap).left + map.x;

      el.style.left = layerX + 'px';
      el.style.top = layerY + 'px';
    },
    setPosition(el) {
      el.style.position = 'fixed';
      el.style.opacity = 1;
      // el.style.transform = 'none';
      el.style.bottom = 'auto';
      el.style.right = 'auto';
      this.getLayerPosition(el);
    },
    // cloneNode(el, id) {
    //   if (!el && !id) return;
    //   const shadowEl = el.cloneNode(true);
    //   shadowEl.style.opacity = 1;
    //   shadowEl.style.transform = 'none';
    //   shadowEl.style.bottom = 'auto';
    //   shadowEl.style.right = 'auto';
    //   shadowEl.style.left = this.getNode(el).x + 'px';
    //   shadowEl.style.top = this.getNode(el).y + 'px';
    //   shadowEl.id = id;
    //   document.body.appendChild(shadowEl);
    // },
    // whereNode(el, id) {
    //   if (!document.getElementById(id) && !el && !id) return;
    //   const node = document.getElementById(id);
    //   node.style.left = this.getNode(el).x + 'px';
    //   node.style.top = this.getNode(el).y + 'px';
    //   el.style.left = this.getNode(this.$refs.wrap).x + 'px';
    //   el.style.top = this.getNode(this.$refs.wrap).y + 'px';
    // },
    // removeNode(id) {
    //   if (id && document.getElementById(id)) {
    //     document.getElementById(id).remove();
    //   }
    // },
    track() {
      if (!this.$refs.wrap) return;
      this.getLayerPosition(this.$refs.layer);
    },
    trace() {
      throttle(this.track, 100)();
    },
    eventTag() {
      if (!this.$refs.wrap) return;
      const scroller = getScrollParent(this.$refs.wrap);
      const scrollRoot =
        scroller.tagName.toLowerCase() === 'html' ? window : scroller;
      return scrollRoot;
    },
    addListener() {
      window.addEventListener('resize', this.trace);
      if (this.eventTag()) {
        this.eventTag().addEventListener('scroll', this.trace);
      }
    },
    removeListener() {
      window.removeEventListener('resize', this.trace);
      if (this.eventTag()) {
        this.eventTag().removeEventListener('scroll', this.trace);
      }
    }
  },
  beforeDestroy() {
    if (this.flow) {
      this.removeListener();
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-layer-radius: 8px;
  --w-layer-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.wrap {
  display: inline-block;
  position: relative;
}

.ctrl {
}

.main {
  position: absolute;
  z-index: var(--w-index-layer);
  border: 1px solid var(--w-layer-border);
  background-color: var(--w-card-background);
  border-radius: var(--w-layer-radius);
  box-shadow: var(--w-layer-shadow);
  min-width: 100px;
}

.up {
  transform: translateY(-100%);
  top: 0;

  &.center {
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
  }

  &.end {
    left: 100%;
    transform: translateX(-100%) translateY(-100%);
  }
}

.down {
  &.center {
    left: 50%;
    transform: translateX(-50%);
  }

  &.end {
    left: 100%;
    transform: translateX(-100%);
  }
}

.left {
  transform: translateX(-100%);

  &.start {
    top: 0;
    transform: translateX(-100%) translateY(-100%);
  }

  &.center {
    top: 50%;
    transform: translateX(-100%) translateY(-50%);
  }
}

.right {
  left: 100%;

  &.start {
    top: 0;
    transform: translateY(-100%);
  }

  &.center {
    top: 50%;
    transform: translateY(-50%);
  }
}

.fluid {
  width: 100%;
}
</style>
<style lang="postcss">
[class*='woo-pop-an'] {
  overflow: hidden;
  transition: all 0.25s ease-in-out;
}
.woo-pop-an {
  &-slide {
    &-x {
      &-enter {
        max-width: 0;
        opacity: 0;
        &-to {
          max-width: 400px;
          opacity: 1;
        }
      }

      &-leave {
        max-width: 400px;
        opacity: 1;
        &-to {
          max-width: 0;
          opacity: 0;
        }
      }
    }

    &-y {
      &-enter {
        max-height: 0;
        opacity: 0;
        &-to {
          max-height: 400px;
          opacity: 1;
        }
      }

      &-leave {
        max-height: 400px;
        opacity: 1;
        &-to {
          max-height: 0;
          opacity: 0;
        }
      }
    }
  }
}
</style>
