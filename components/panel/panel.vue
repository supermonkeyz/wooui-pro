<script>
export default {
  name: 'woo-panel',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    border: {
      type: String,
      default: 'top,bottom'
    },
    borderColor: String,
    backgroundColor: String
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [this.$style.main, this.lineType],
        style: {
          'border-color': this.borderColor,
          'background-color': this.backgroundColor
        }
      },
      this.$slots.default
    );
  },
  computed: {
    lineType() {
      if (this.border === 'none') return '';
      let classes = '';
      let b = this.border;
      if (this.border === 'all') {
        b = 'top,right,bottom,left';
      }
      b.replace(/\s/g, '')
        .split(',')
        .forEach(key => {
          classes += ` ${this.$style[key]}`;
        });
      classes = classes.trim();
      return classes;
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-panel-background: var(--w-card-background);
}

.main {
  background-color: var(--w-panel-background);
}

@each $dir in (top, right, bottom, left) {
  .$(dir) {
    border-$(dir): 1px solid var(--w-dividing-line);
  }
}
</style>
