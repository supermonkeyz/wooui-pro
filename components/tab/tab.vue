<template lang="html">
  <div :class="$style.main">
    <Box
      :class="$style.nav"
      :justify="justify"
      v-on="$listeners"
      @change="tabChange"
      @index="getCur"
    >
      <slot />
      <div :class="$style.border" :style="rect" v-if="animate"></div>
    </Box>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import * as Box from '../box';
import throttle from '../_util/throttle';

export default {
  name: 'woo-tab',
  components: {
    Box: Box.Box
  },
  props: {
    justify: {
      type: String,
      default: 'start'
    },
    animate: Boolean,
    animateDuration: [String, Number],
    visable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      infos: [],
      index: 0
    };
  },
  computed: {
    rect() {
      if (!this.infos.length || !this.animate) return null;
      return {
        width: `${this.infos[this.index].width}px`,
        transform: `translate3d(${this.infos[this.index].x}px, 0, 0)`,
        transitionDuration: this.animateDuration + 'ms'
      };
    }
  },
  watch: {
    visable(val) {
      if (val) {
        this.$nextTick(() => {
          this.getInfos();
        });
      }
    }
  },
  methods: {
    getCur(data) {
      this.index = data;
    },
    tabChange(index) {
      this.$children[0].$children.forEach(child => (child.isCur = false));
      this.$children[0].$children[index].isCur = true;
      this.index = index;
    },
    getInfos() {
      this.infos = [];
      if (this.$children && this.$children[0] && this.$children[0].$children) {
        let item = {};
        this.$children[0].$children.forEach(child => {
          item = {
            width: child.$el.offsetWidth,
            x: child.$el.offsetLeft
          };
          this.infos.push(item);
        });
      }
    },
    delayCall() {
      throttle(this.getInfos, 100)();
    }
  },
  mounted() {
    if (this.animate && this.visable) {
      this.$nextTick(() => {
        this.getInfos();
      });
      if (this.justify !== 'start') {
        window.addEventListener('resize', this.delayCall, false);
      }
    }
  },
  beforeDestroy() {
    if (this.animate && this.justify !== 'start') {
      window.removeEventListener('resize', this.delayCall, false);
    }
  }
};
</script>

<style lang="postcss" module>
:root {
}

.nav {
  position: relative;
}

.border {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--w-brand);
  transition: all 0.2s;
}
</style>
