<script>
import rootunit from '../_util/unit';

export default {
  name: 'woo-box',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    old: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: [Boolean, String],
      default: false
    },
    direction: {
      type: String,
      default: 'x'
    },
    align: {
      type: String,
      default: 'stretch'
    },
    justify: {
      type: String,
      default: 'start'
    },
    items: Number,
    gapRow: {
      type: Number,
      default: 0
    },
    gapCol: {
      type: Number,
      default: 0
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        class: this.boxClasses,
        style: this.boxStyles
      },
      this.$slots.default
    );
  },
  computed: {
    boxClasses() {
      const directionMap = {
        x: 'row',
        'x-r': 'rowReverse',
        y: 'column',
        'y-r': 'columnReverse'
      };

      const alignMap = {
        start: 'alignStart',
        end: 'alignEnd',
        center: 'alignCenter',
        baseline: 'baseline',
        stretch: 'stretch'
      };

      const justifyMap = {
        start: 'justifyStart',
        end: 'justifyEnd',
        center: 'justifyCenter',
        between: 'justifyBetween',
        around: 'justifyAround',
        evenly: 'justifyEvenly'
      };
      const display = this.old ? this.$style.block : this.$style.flex;
      const colsCtrl = this.old
        ? this.items && `u-col-${this.items}`
        : this.items && `u-flex-col-${this.items}`;
      const wrap = this.wrap && this.$style.wrap;
      const direction = this.$style[directionMap[this.direction]];
      const align = this.$style[alignMap[this.align]];
      const justify = this.$style[justifyMap[this.justify]];

      return [display, colsCtrl, wrap, direction, align, justify];
    },
    boxStyles() {
      const gapRowType = this.direction === 'x' ? 'margin-left' : 'margin-top';
      const gapColType = this.direction === 'x' ? 'margin-top' : 'margin-left';
      return {
        [gapRowType]: this.gapRow ? `-${this.gapRow / rootunit}rem` : null,
        [gapColType]: this.gapCol ? `-${this.gapCol / rootunit}rem` : null
      };
    }
  }
};
</script>

<style lang="postcss" module>
:root {
}

.flex {
  display: flex;
}

.wrap {
  flex-wrap: wrap;
}

.rowReverse {
  flex-direction: row-reverse;
}

.column {
  flex-direction: column;
}

.columnReverse {
  flex-direction: column-reverse;
}

.alignStart {
  align-items: flex-start;
}

.alignEnd {
  align-items: flex-end;
}

.alignCenter {
  align-items: center;
}

.baseline {
  align-items: baseline;
}

.justifyEnd {
  justify-content: flex-end;
}

.justifyCenter {
  justify-content: center;
}

.justifyBetween {
  justify-content: space-between;
}

.justifyAround {
  justify-content: space-around;
}

.justifyEvenly {
  justify-content: space-evenly;
}
</style>
<style lang="postcss">
@for $i from 1 to 8 {
  .u-col-$(i) {
    & [class*='box-item'],
    & [data-type='w-box-item'] {
      width: calc(100% / $(i));
    }
  }

  .u-flex-col-$(i) {
    & [class*='box-item'],
    & [data-type='w-box-item'] {
      flex-basis: calc(100% / $(i));
    }
  }
}
</style>
