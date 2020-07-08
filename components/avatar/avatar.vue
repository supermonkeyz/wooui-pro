<template lang="html">
  <div
    :class="[
      $style.main,
      size === 'auto' && $style.isAuto,
      hoverMask && $style.hover
    ]"
    :style="avatarSize"
  >
    <img
      :src="!lazyLoad && avatarSrc"
      :alt="alt"
      :data-src="lazyLoad && avatarSrc"
      :data-tag="lazyLoad && 'woo-lazy'"
      :class="$style.img"
      @error="loadError"
      v-bind="$attrs"
    />
    <div v-if="cover" :class="$style.cover" :style="coverSrc"></div>
    <Icon
      v-if="verified"
      :symbol="verified"
      :class="$style.icon"
      :size="getIconSize"
      :max-size="iconMax"
      :title="verifiedTitle"
    >
    </Icon>
    <div :class="$style.hoverMask" v-if="hoverMask"></div>
    <slot></slot>
  </div>
</template>

<script>
import Icon from '../icon/icon';
import rootunit from '../_util/unit';

const defaultAvatar =
  '//tva1.sinaimg.cn/default/images/default_avatar_male_180.gif';

export default {
  name: 'woo-avatar',
  components: {
    Icon
  },
  props: {
    size: {
      type: [Number, String]
    },
    iconSize: [Number, String],
    iconMax: String,
    src: {
      type: String,
      default: defaultAvatar
    },
    verified: {
      type: String
    },
    verifiedTitle: String,
    cover: {
      type: String
    },
    alt: String,
    lazyLoad: Boolean,
    hoverMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      avatarSrc: this.src || defaultAvatar
    };
  },
  watch: {
    src(val) {
      this.avatarSrc = val;
    }
  },
  computed: {
    avatarSize() {
      if (this.size === 'auto') {
        return `width: 100%; height: 100%`;
      }
      return (
        !isNaN(this.size) && {
          width: `${this.size / rootunit}rem`,
          height: `${this.size / rootunit}rem`
        }
      );
    },
    getIconSize() {
      let iconSize = 0.35 * this.size;

      if (this.size === 'auto' && !this.iconSize) {
        iconSize = '33.33%';
      } else if (this.iconSize) {
        iconSize = this.iconSize;
      }

      return iconSize;
    },
    coverSrc() {
      return this.cover && `background-image: url(${this.cover})`;
    }
  },
  methods: {
    loadError() {
      this.avatarSrc = defaultAvatar;
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-avatar-size: em(40px);
  --w-avatar-default: 16px;
  --w-avatar-line: color-mod(black a(0.05));
  --w-avatar-cover: em(-8px) em(-2px) 0 em(-2px);
  --w-avatar-hover: color-mod(black a(0.15));
}

.main {
  display: inline-block;
  position: relative;
  width: var(--w-avatar-size);
  height: var(--w-avatar-size);
  border-radius: 50%;
  font-size: var(--w-avatar-default);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    z-index: var(--w-index-flow);
    border: 1px solid var(--w-image-border);
  }
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
  /* z-index: var(--w-index-flow); */
  background-color: var(--w-avatar-hover);
  border-radius: 50%;
  pointer-events: none;
}

.img {
  vertical-align: top;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.cover {
  position: absolute;
  top: em(-8px);
  right: em(-2px);
  bottom: 0;
  left: em(-2px);
  background-size: cover;
  z-index: var(--w-index-flow);
}

.icon {
  position: absolute;
  right: em(-1px);
  bottom: em(-1px);
  z-index: var(--w-index-flow);
  font-size: inherit;
}
</style>
