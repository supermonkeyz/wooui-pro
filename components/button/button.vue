<template lang="html">
  <button
    :class="[
      $style.main,
      $style[sort] || sort,
      $style[kind] || kind,
      $style[size] || size,
      round && $style.round,
      fluid && $style.fluid
    ]"
    @touchstart="() => {}"
    @click="clickHandle"
  >
    <span
      :class="[
        $style.wrap,
        vertical && $style.vertical,
        reverse && $style.reverse
      ]"
    >
      <img :src="icon" alt="icon" v-if="icon" :class="$style.icon" />
      <Fonticon
        :value="fonticon"
        :class="$style.icon"
        :style="iconSizeValue"
        v-if="fonticon"
      >
      </Fonticon>
      <Spinner :class="$style.icon" v-if="loading"></Spinner>
      <span :class="$style.content" v-if="$slots.default">
        <!-- @slot default slot -->
        <slot />
      </span>
    </span>
  </button>
</template>

<script>
import Spinner from '../spinner/spinner';
import Fonticon from '../fonticon/fonticon';
import rootunit from '../_util/unit';

export default {
  name: 'woo-button',
  components: {
    Spinner,
    Fonticon
  },
  props: {
    /**
     * The sort for the button.
     * `Options: line, flat, simple`
     */
    sort: {
      type: String,
      default: 'line'
    },
    /**
     * The kind for the button.
     * `Options: primary, secondary, success, danger, default`
     */
    kind: {
      type: String,
      default: 'primary'
    },
    /**
     * The size for the button.
     * `Options: S, M, L`
     */
    size: {
      type: String,
      default: 'm'
    },
    /**
     * The button round corner or not.
     * `Options: true false`
     */
    round: {
      type: Boolean,
      default: true
    },
    /**
     * The button full of container or not.
     * `Options: true false`
     */
    fluid: {
      type: Boolean,
      default: false
    },
    /**
     * Icon in button.
     */
    icon: {
      type: String,
      default: ''
    },
    iconSize: [Number, String],
    /**
     * Content vertical layout in button.
     */
    vertical: {
      type: Boolean,
      default: false
    },
    /**
     * Content reverse layout in button.
     */
    reverse: {
      type: Boolean,
      default: false
    },
    /**
     * Loading status.
     * `Options: true false`
     */
    loading: {
      type: Boolean,
      default: false
    },
    fonticon: String
  },
  computed: {
    iconSizeValue() {
      return (
        !isNaN(this.iconSize) && `font-size: ${this.iconSize / rootunit}rem`
      );
    }
  },
  methods: {
    clickHandle() {
      /**
       * Click event.
       */
      this.$emit('click');
    }
  }
};
</script>

<style lang="postcss" module>
/*button's definition*/
:root {
  --w-color-schemes: primary, default;

  --w-b-flat-primary: var(--w-color-light);
  --w-b-flat-primary-bg: var(--w-color-orange-1);
  --w-b-flat-primary-bg-hover: var(--w-color-orange-2);

  --w-b-flat-default: var(--w-color-gray-1);
  --w-b-flat-default-bg: #eee;
  --w-b-flat-default-bg-hover: #e0e0e0;

  --w-b-line-primary: var(--w-color-orange-1);
  --w-b-line-primary-bg-hover: color-mod(var(--w-color-orange-1) a(0.1));
  --w-b-line-primary-border: var(--w-color-orange-2);

  --w-b-line-default: var(--w-color-gray-1);
  --w-b-line-default-bg-hover: color-mod(var(--w-b-line-default) a(0.1));
  --w-b-line-default-border: var(--w-color-gray-2);

  --w-button-round: 36px;
  --w-button-size: l, m, s;
  --w-button-padding: 16px 24px, 9px 30px, 8px 14px;
  --w-button-font-size: 16px, 14px, 12px;
  --w-button-hover: 0.8;
  --w-button-disabled: 0.5;
  --w-button-trans-dur: 0.2s;
  --w-button-icon-gap: calc(1em * 6 / var(--w-base-font-size));
}

.main {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: #fff0;
  background-color: transparent;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  line-height: 1;
  font-weight: 600;

  &:disabled {
    opacity: var(--w-button-disabled);
    cursor: not-allowed;
  }

  &.round {
    border-radius: var(--w-button-round);
    & .inset {
      border-radius: var(--w-button-round);
    }
  }

  &.fluid {
    width: 100%;
  }
}

.wrap {
  position: relative;
  z-index: var(--w-index-flow);
  pointer-events: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;

  &.vertical {
    flex-direction: column;

    &.reverse {
      flex-direction: column-reverse;
    }
  }

  &.reverse {
    flex-direction: row-reverse;
  }
}

/*button sort="line" kinds css loop*/
.line {
  border: 1px solid;
  /* color from ./_style/const.css */
  @each $val in (var(--w-color-schemes)) {
    &.$(val) {
      color: var(--w-b-line-$(val));

      &:active {
        background: var(--w-b-line-$(val)-bg-hover);
      }

      @media (hover) {
        &:not(:disabled):hover,
        &:focus {
          background: var(--w-b-line-$(val)-bg-hover);
        }
      }
    }
  }
}

/*button sort="flat" kinds css loop*/
.flat {
  & .wrap {
    border: 1px solid transparent;
  }
  /* color from ./_style/const.css */
  @each $val in (var(--w-color-schemes)) {
    &.$(val) {
      color: var(--w-b-flat-$(val));
      background: var(--w-b-flat-$(val)-bg);

      &:active {
        background: var(--w-b-flat-$(val)-bg-hover);
      }

      @media (hover) {
        &:not(:disabled):hover,
        &:focus {
          background: var(--w-b-flat-$(val)-bg-hover);
        }
      }
    }
  }
}

/*button sizes css loop*/
@each $size, $padding, $fontSize in (var(--w-button-size)),
  (var(--w-button-padding)), (var(--w-button-font-size))
{
  .$(size) {
    padding: $(padding);
    font-size: $(fontSize);
  }
}

.simple {
  font-weight: 400;
  padding: 0;

  &:hover {
    opacity: var(--w-button-hover);
  }
  @each $val in (var(--w-color-schemes)) {
    &.$(val) {
      @if $val == default {
        color: currentColor;
      } @else {
        color: var(--w-b-line-$(val));
      }
    }
  }
}

.s {
  font-weight: 400;
}

.content {
  display: inline-flex;
  vertical-align: bottom;
}

.icon {
  height: 1em;
  vertical-align: bottom;
  font-size: inherit !important;
}

.icon + .content {
  margin-left: var(--w-button-icon-gap);

  .vertical & {
    margin: 0;
    margin-top: var(--w-button-icon-gap);
  }

  .reverse & {
    margin: 0;
    margin-right: var(--w-button-icon-gap);
  }

  .vertical.reverse & {
    margin: 0;
    margin-bottom: var(--w-button-icon-gap);
  }
}
</style>
