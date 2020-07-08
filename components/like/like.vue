<template lang="html">
  <button :class="$style.main" @click="toggle">
    <span :class="$style.iconWrap">
      <svg :class="[$style.icon, isAN && $style.an]" ref="like">
        <use :xlink:href="likeValue"></use>
      </svg>
    </span>
    <span
      :class="[$style.count, active && $style.liked]"
      v-if="withCount && (!noZero || counter)"
      v-text="counter"
    >
    </span>
    <span v-if="active && effect && isAN" :class="$style.anBox">
      <like-effect @effect-end="isAN = false"></like-effect>
    </span>
  </button>
</template>

<script>
import './assets/like.svg';
import './assets/liked.svg';
import LikeEffect from './likeEffect';

export default {
  name: 'woo-like',
  components: {
    LikeEffect
  },
  props: {
    like: {
      type: Boolean,
      defaulf: false
    },
    likeText: {
      type: String,
      default: '赞'
    },
    count: {
      type: [Number, String],
      default: 0
    },
    withCount: {
      type: Boolean,
      default: true
    },
    effect: {
      type: Boolean,
      defaulf: false
    },
    static: {
      type: Boolean,
      default: false
    },
    original: {
      type: Boolean,
      default: false
    },
    noZero: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.like,
      isAN: false
    };
  },
  computed: {
    iconClass() {
      return {
        'is-an': this.isAN,
        'is-large': this.large
      };
    },
    likeValue() {
      return this.active ? '#liked' : '#like';
    },
    counter: {
      get() {
        return this.count === 0 && !this.original ? this.likeText : this.count;
      },
      set() {
        this.count = this.active ? this.count + 1 : this.count - 1;
      }
    }
  },
  methods: {
    toggle() {
      if (this.static) return;
      this.active = !this.active;
      this.isAN = this.active;
      this.$emit('status', this.active);
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-like-size: 16px;
  --w-like-icon-size: em(15px);
  --w-like-font-size: em(12px);
  --w-like-space: em(10px);
  --w-liked-color: var(--w-color-red);
  --w-like-an-dur: 1s;
  --w-like-effect-size: 180px;
}

.main {
  border: 0;
  background: none;
  outline: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  height: 100%;
  line-height: 1;
  flex-basis: 100%;
  font-size: var(--w-like-size);
  color: currentColor;
  cursor: pointer;

  &:not(:disabled):hover {
    color: var(--w-brand);
    & .count {
      color: var(--w-brand);
    }

    & .iconWrap {
      &::before {
        opacity: 1;
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.iconWrap {
  position: relative;
  display: inline-flex;
  vertical-align: bottom;
  line-height: 1;

  &::before {
    content: '';
    background-color: var(--w-hover);
    position: absolute;
    top: em(-4px);
    right: em(-4px);
    bottom: em(-5px);
    left: em(-5px);
    border-radius: 50%;
    opacity: 0;
  }
}

.icon {
  width: var(--w-like-icon-size);
  height: var(--w-like-icon-size);
  vertical-align: bottom;
}

.count {
  font-size: var(--w-like-font-size);
  margin-left: var(--w-like-space);
  vertical-align: bottom;
}

.liked {
  color: var(--w-liked-color);
}

.an {
  animation: bounceIn var(--w-like-an-dur) ease both;
}

.anBox {
  @mixin staycenter all, absolute, var(--w-index-nav);
  margin-top: calc(-1 * var(--like-effect-size) / 6);
  pointer-events: none;
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.5, 1.5, 1.5);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
