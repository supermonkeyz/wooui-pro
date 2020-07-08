<script>
import rootunit from '../_util/unit';

export default {
  name: 'woo-box-item',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    order: Number,
    grow: Number,
    shrink: Number,
    basis: [Number, String],
    align: String,
    width: [Number, String]
  },
  render(h) {
    return h(
      this.tag,
      {
        class: this.boxItem,
        style: this.boxItemStyles
      },
      this.$slots.default
    );
  },
  computed: {
    boxItem() {
      return this.$parent.old ? this.$style.inlineBlock : this.$style.flex;
    },
    boxItemStyles() {
      const gapRowType =
        this.$parent.direction === 'x' ? 'padding-left' : 'padding-top';
      const gapColType =
        this.$parent.direction === 'x' ? 'padding-top' : 'padding-left';
      const inlineBlockProps = {
        width: this.width
      };
      const flexProps = {
        order: this.order,
        flexGrow: this.grow,
        flexShrink: this.shrink,
        flexBasis: this.basis,
        alignSelf: this.align
      };
      return [
        {
          [gapRowType]: this.$parent.gapRow
            ? `${this.$parent.gapRow / rootunit}rem`
            : null,
          [gapColType]: this.$parent.gapCol
            ? `${this.$parent.gapCol / rootunit}rem`
            : null
        },
        this.old ? inlineBlockProps : flexProps
      ];
    }
  }
};
</script>

<style lang="postcss" module>
:root {
}

.flex {
  flex: 1;
  align-self: stretch;
  box-sizing: border-box;
}

.inlineBlock {
  display: inline-block;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
