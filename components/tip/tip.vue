<template lang="html">
  <Box
    :align="align"
    :justify="justify"
    :class="[
      $style.main,
      sort === 'inherit' && $style.inherit,
      sort === 'simple' && $style.simple,
      sort === 'flat' && $style.flat,
      sort === 'flat' && $style[type],
      sort === 'vertical' && $style.vertical,
      reverse && $style.reverse,
      (inline || sort === 'simple') && $style.inline
    ]"
    :direction="sort === 'vertical' ? 'y' : reverse ? 'x-r' : 'x'"
  >
    <component
      :is="iconType"
      :class="[$style.icon, sort !== 'inherit' && $style[type + 'Fill']]"
      :style="iconGap"
      @click="iconClick"
      v-if="hasIcon"
    >
    </component>
    <span :class="$style.text" :style="gap && 'margin: 0'"><slot /></span>
  </Box>
</template>

<script>
import * as Box from '../box';
import Success from '../_assets/success.svg';
import Warn from '../_assets/warn.svg';
import Error from '../_assets/error.svg';
import Help from '../_assets/help.svg';
import rootunit from '../_util/unit';

const typeMap = {
  success: 'Success',
  warn: 'Warn',
  error: 'Error',
  help: 'Help'
};

export default {
  name: 'woo-tip',
  components: {
    Box: Box.Box,
    Success,
    Warn,
    Error,
    Help
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    sort: {
      type: String,
      default: 'normal'
    },
    reverse: Boolean,
    align: {
      type: String,
      default: 'center'
    },
    justify: {
      type: String,
      default: 'center'
    },
    inline: Boolean,
    gap: [String, Number],
    hasIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconType() {
      return typeMap[this.type] || '';
    },
    iconGap() {
      let gap = 0;
      if (!isNaN(this.gap)) {
        const value = `${this.gap / rootunit}rem`;
        gap = this.reverse ? { marginLeft: value } : { marginRight: value };
      }
      return gap;
    }
  },
  methods: {
    iconClick() {
      this.$emit('icon-click');
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-tip-icon-size: 16px;
  --w-tip-border: color-mod(black a(0.1));
  --w-tip-error-bg: color-mod(#ffeddb a(0.95));
  --w-tip-warn-bg: #daeeff;
  --w-tip-warn: #507daf;
}

.successFill {
  color: #8cd232;
}

.warnFill {
  color: #507daf;
}

.errorFill {
  color: #f48800;
}

.helpFill {
  color: #41bbf8;
}

.main {
  border-radius: 3px;
  color: var(--w-main);
  line-height: 1;
}

.icon {
  width: var(--w-tip-icon-size);
  height: var(--w-tip-icon-size);
}

.text {
  font-size: 12px;
  margin-left: 8px;
  line-height: 16px;
}

.reverse .text {
  margin-left: 0;
  margin-right: 8px;
}

.error {
  color: var(--w-brand);
  background-color: var(--w-tip-error-bg);
}

.warn {
  color: var(--w-tip-warn);
  background-color: var(--w-tip-warn-bg);
}

.simple {
  background-color: var(--w-card-background);
  border: 1px solid var(--w-tip-border);
  padding: 6px 15px 6px 9px;
}

.flat {
  padding: 7px 16px 7px 10px;
}

.inline {
  display: inline-flex;
}

.vertical {
  & .icon {
    width: 37px;
    height: 37px;
  }

  & .text {
    font-size: 14px;
    line-height: 18px;
    margin: 0;
    margin-top: 16px;
    color: var(--w-main);
  }
}
</style>
