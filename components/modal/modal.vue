<template lang="html">
  <transition
    appear
    :name="animationType"
    :duration="duration"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <Box
      :class="[
        $style.wrap,
        !mask && !cover && $style.noPrevent,
        insideScroll && $style.scroll
      ]"
      :style="dur"
      justify="center"
      align="center"
      :direction="stay === 'left' || stay === 'right' ? 'y' : 'x'"
      @touchmove.prevent
      ref="wrap"
    >
      <div :class="[$style.main, stayClass]" :style="dur">
        <slot></slot>
      </div>
      <div
        :class="$style.mask"
        v-if="mask"
        :style="dur"
        @touchstart="close"
        @click="close"
      ></div>
    </Box>
  </transition>
</template>

<script>
import Box from '../box/box';

export default {
  name: 'woo-modal',
  components: {
    Box
  },
  props: {
    animation: {
      type: String,
      default: 'pop'
    },
    stay: String,
    fluid: String,
    mask: {
      type: Boolean,
      default: true
    },
    cover: {
      type: Boolean,
      default: true
    },
    touchclose: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number
    },
    lockScreen: {
      type: Boolean,
      default: false
    },
    insideScroll: Boolean
  },
  data() {
    return {
      canClose: true,
      docTop: 0,
      docLeft: 0,
      scrollTop: 0,
      scrollLeft: 0
    };
  },
  watch: {
    touchclose(val) {
      this.touchclose = val;
    }
  },
  computed: {
    animationType() {
      return `woo-modal-an--${this.animation}`;
    },
    dur() {
      return this.duration && `transition-duration: ${this.duration}ms`;
    },
    stayClass() {
      return [this.$style[this.stay], this.$style[this.fluid]];
    }
  },
  methods: {
    vShow() {
      return (
        this.$refs.wrap &&
        this.$refs.wrap.$el &&
        this.$refs.wrap.$el.style &&
        this.$refs.wrap.$el.style.display === 'none'
      );
    },
    close() {
      if (this.touchclose && this.canClose) {
        this.$emit('close');
      }
    },
    beforeEnter() {
      if (this.vShow()) return;
      this.$emit('before-enter');
    },
    enter() {
      this.canClose = false;
      this.$parent.isActing = true;
      this.$emit('enter');
      if (this.vShow()) return;
      if (this.lockScreen) {
        this.setLock();
      }
    },
    afterEnter() {
      if (this.vShow()) return;
      this.canClose = true;
      this.$emit('after-enter');
      this.$parent.isActing = false;
    },
    beforeLeave() {
      this.$emit('before-leave');
    },
    leave() {
      this.$parent.isActing = true;
      this.canClose = false;
      this.$emit('leave');
    },
    afterLeave() {
      this.$parent.$emit('modalRemove', true);
      this.$parent.isActing = false;
      this.canClose = true;
      this.$emit('after-leave');
      if (this.lockScreen) {
        this.removeLock();
      }
    },
    setLock() {
      this.scrollTop =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollLeft =
        window.pageXOffset ||
        window.scrollX ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft;
      const root = document.documentElement;
      const docStyle = window.getComputedStyle(root);
      this.docTop = docStyle.getPropertyValue('top');
      this.docLeft = docStyle.getPropertyValue('left');
      root.style.top = `-${this.scrollTop}px`;
      root.style.left = `-${this.scrollLeft}px`;
      root.classList.add('woo-lockscreen');
      this.addBackListener();
    },
    removeLock() {
      const root = document.documentElement;
      if (!root.classList.contains('woo-lockscreen')) return;
      root.classList.remove('woo-lockscreen');
      this.removeBackListener();
      window.scrollTo(this.scrollLeft, this.scrollTop);
      root.style.top = this.docTop === 'auto' ? null : this.docTop;
      root.style.left = this.docLeft === 'auto' ? null : this.docLeft;
    },
    addBackListener() {
      window.addEventListener('popstate', this.removeLock, false);
    },
    removeBackListener() {
      window.removeEventListener('popstate', this.removeLock, false);
    }
  },
  beforeDestroy() {
    if (this.canClose) {
      this.afterLeave();
    }
  }
};
</script>

<style>
.woo-lockscreen {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  overscroll-behavior: none;
}
</style>

<style lang="postcss" module>
:root {
  --w-mask-background: #000;
  --w-mask-opacity: 0.5;
  --w-modal-dur: 0.2s;
}
.wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--w-index-layer);
  -webkit-tap-highlight-color: color-mod(#fff a(0%));
  transition: opacity var(--w-modal-dur) ease;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--w-index-mask);
  background-color: var(--w-mask-background);
  opacity: var(--w-mask-opacity);
  transition: opacity var(--w-modal-dur) ease;
}
.main {
  position: relative;
  z-index: var(--w-index-layer);
  /* transform: scale3d(1, 1, 1) translate3d(0, 0, 0); */
  backface-visibility: hidden;
  /* perspective: 1000; */
  transition: all var(--w-modal-dur) ease;
}

.main {
  &.stretch {
    flex-basis: 100%;
  }

  &.cover {
    align-self: stretch;
    flex-basis: 100%;
  }
}

.top {
  align-self: flex-start;
}

.left {
  align-self: flex-start;
}

.bottom {
  align-self: flex-end;
}

.right {
  align-self: flex-end;
}

.noPrevent {
  pointer-events: none;

  & .main {
    pointer-events: auto;
  }
}

.scroll {
  overflow: auto;
}
</style>

<style lang="postcss">
@define-mixin modaltrans {
  &-enter,
  &-leave-to {
    .woo-modal-main {
      @mixin-content;
    }

    .woo-modal-mask {
      opacity: 0;
    }
  }
}

.woo-modal {
  &-an {
    &--fade {
      @mixin modaltrans {
        opacity: 0;
      }
    }

    &--pop {
      @mixin modaltrans {
        opacity: 0;
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }

    &--slide-top {
      @mixin modaltrans {
        opacity: 0;
        transform: translate3d(0, -50%, 0);
      }
    }

    &--slide-bottom {
      @mixin modaltrans {
        opacity: 0;
        transform: translate3d(0, 50%, 0);
      }
    }

    &--slide-left {
      @mixin modaltrans {
        opacity: 0;
        transform: translate3d(-50%, 0, 0);
      }
    }

    &--slide-right {
      @mixin modaltrans {
        opacity: 0;
        transform: translate3d(50%, 0, 0);
      }
    }

    &--drawer-top {
      @mixin modaltrans {
        transform: translate3d(0, -100%, 0);
      }
    }

    &--drawer-bottom {
      @mixin modaltrans {
        transform: translate3d(0, 100%, 0);
      }
    }

    &--drawer-left {
      @mixin modaltrans {
        transform: translate3d(-100%, 0, 0);
      }
    }

    &--drawer-right {
      @mixin modaltrans {
        transform: translate3d(100%, 0, 0);
      }
    }
  }
}
</style>
