<template lang="html">
  <i class="woo-font" :class="[`woo-font--${this.value}`, kindClass]"></i>
</template>

<script>
export default {
  name: 'woo-fonticon',
  props: {
    value: {
      type: String,
      default: ''
    },
    kind: String
  },
  computed: {
    kindClass() {
      return this.kind && [this.$style.multi, this.$style[this.kind]];
    }
  }
};
</script>

<style lang="postcss" module>
.multi {
  border-radius: 50%;
  color: var(--w-color-light);
  cursor: pointer;
}

.dark {
  background-color: color-mod(black a(0.2));

  &:hover {
    color: var(--w-brand);
    background-color: color-mod(var(--w-brand) a(0.1));
  }
}
</style>
