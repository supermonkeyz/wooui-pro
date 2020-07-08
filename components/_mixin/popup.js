import { isObject } from '../_util/type';
export default {
  data() {
    return {
      show: false,
      defaults: {
        hideDuration: 1500,
        action: () => {},
        cssClass: ''
      },
      data: {},
      timers: [],
      isActing: false
    };
  },
  watch: {
    show(val) {
      if (val) this.countDown();
    },
    data(val) {
      if (val.autohide) this.countDown();
    }
  },
  created() {
    if (!this.$_wooBus) return;
    this.$_wooBus.$on(this.name, (data, type) => {
      if (!isObject(data)) return;
      if (type === 'changeData') {
        this.data = { ...this.data, ...data };
      } else {
        this.$nextTick(() => {
          this.show = true;
          this.data = Object.assign({}, this.defaults, data);
        });
      }
    });
    this.$_wooBus.$on(`${this.name}Close`, () => {
      this.$nextTick(() => {
        this.show = false;
      });
    });
  },
  methods: {
    countDown() {
      if (this.data.autohide) {
        this.timers.forEach(timer => {
          window.clearTimeout(timer);
        });
        this.timers = [];
        const t = setTimeout(() => {
          this.confirm(this.data.action);
          // this.close();
        }, this.data.hideDuration);
        this.timers.push(t);
      }
    },
    close() {
      if (!this.$_wooBus) return;
      this.$_wooBus.$emit(`${this.name}Close`);
    },
    doAction(fn, close = true) {
      if (!this.$_wooBus) return;
      if (close) {
        if (!this.isActing) {
          this.close();
          this.$on('modalRemove', () => {
            this.$nextTick(() => {
              if (fn instanceof Function) {
                fn();
              }
              this.$off('modalRemove');
            });
          });
        }
      } else {
        if (fn instanceof Function) {
          fn();
        }
      }
    },
    confirm(fn, close) {
      this.doAction(fn || this.data.action, close);
    },
    cancel(fn) {
      this.doAction(fn || this.data.cancel);
    }
  }
};
