<template lang="html">
  <div :class="[$style.main, isCur && 'woo-tab-active']">
    <div :class="$style.btn" @click="!isCur && clickHandle()">
      <slot></slot>
    </div>
    <div :class="$style.border" v-if="isCur && !animate"></div>
  </div>
</template>

<script>
export default {
  name: 'woo-tab-item',
  props: {
    cur: Boolean,
    index: Number
  },
  data() {
    return {
      isCur: this.cur,
      animate: false
    };
  },
  watch: {
    cur(val) {
      this.isCur = val;
      if (val) {
        this.curEmit();
      }
    }
  },
  computed: {
    curIndex() {
      return this.index || this.getIndex();
    }
  },
  methods: {
    getIndex() {
      if (this.$parent && this.$parent.$children) {
        return this.$parent.$children.findIndex(
          child => child._uid === this._uid
        );
      }
    },
    clickHandle() {
      this.$parent.$emit('change', this.curIndex);
    },
    curEmit() {
      this.$parent.$emit('index', this.curIndex);
    }
  },
  mounted() {
    if (this.cur) {
      this.curEmit();
    }
    this.animate = this.$parent.$parent.animate || false;
  }
};
</script>

<style lang="postcss" module>
:root {
}

.main {
  cursor: pointer;
  position: relative;
}

.border {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--w-brand);
}
</style>
