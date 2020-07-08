<template lang="html">
  <div
    :class="[$style.main, divClass]"
    :style="{
      color: borderColor,
      'margin-left': direction === 'x' && gapStartValue,
      'margin-right': direction === 'x' && gapEndValue
    }"
  >
    <div
      v-if="direction === 'y'"
      :class="$style.shadow"
      :style="{
        top: direction === 'y' && gapStartValue,
        bottom: direction === 'y' && gapEndValue
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'woo-divider',
  props: {
    direction: {
      type: String,
      default: 'x'
    },
    gap: {
      type: Boolean,
      default: false
    },
    gapStart: String,
    gapEnd: String,
    borderColor: String
  },
  computed: {
    divClass() {
      return [
        this.direction === 'x' ? this.$style.x : this.$style.y,
        this.gap && this.$style.gap
      ];
    },
    gapStartValue() {
      return this.gapStart;
    },
    gapEndValue() {
      return this.gapEnd;
    }
  }
};
</script>

<style lang="postcss" module>
.main {
  color: var(--w-dividing-line);
}

.x {
  border-bottom: 1px solid;

  &.gap {
    margin: 0 12px;
  }
}

.y {
  display: inline-block;
  width: 0;
  height: 100%;
  position: relative;
}

.shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  border-right: 1px solid;

  .gap & {
    top: 6px;
    bottom: 6px;
  }
}
</style>
