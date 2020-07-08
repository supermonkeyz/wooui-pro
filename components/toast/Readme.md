## 调用方法

```js static
this.$_w_toast(parameters);
```
手动关闭

```js static
this.$_w_toast_close();
```

## 可配置参数

```js static
/**
 * @param {Object} data - 参数对象
 * @param {Boolean} [data.autohide = true] - 是否自动消失.
 * @param {String} [data.type = 'success' || 'warn' || 'error' || 'help' || 'loading'] - 提示层类型.
 * @param {String} [data.custom = ''] - 自定义HTML结构 v0.0.6+.
 * @param {String} [data.message = ''] - 提示层文案.
 * @param {String} [data.animation = 'fade' || 'pop' || 'slide-top' || 'slide-right' || 'slide-bottom' || 'slide-left'] - 提示层动效.
 * @param {Boolean} [data.mask = false] - 提示层遮罩.
 * @param {Boolean} [data.touchclose = false] - 提示层遮罩点击关闭.
 * @param {Function} [data.action = () => {}] - 提示层关闭后执行动作.
 * @param {Number} [data.duration = 350] - !动画默认执行时间，不需要改变不传参数.
 * @param {Number} [data.hideDuration = 1500] - !自动隐藏停留时间，不需要改变不传参数.
 * @param {String} [data.cssClass = ''] - 外层挂载制定的css类名.
 */
```

```vue
<template>
  <div>
    <img src="https://image.flaticon.com/icons/svg/254/254080.svg" v-show="false"/>
    <woo-button class="toast-btn" v-for="type in types" :key="type" @click="showToast(type)">{{type}}</woo-button>
  </div>
</template>

<style>
.toast-btn {
  margin-right: 10px;
}
</style>

<script>
export default{
  data() {
    return {
      types: [
        'success',
        'warn',
        'error',
        'help',
        'loading',
        'custom'
      ],
      message: {
        success: '操作成功',
        warn: '开小差了<br>请重新再试',
        error: '操作失败',
        help: '有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用有需求可用',
        loading: '加载中…',
        custom: '老铁刷个火箭'
      }
    };
  },
  methods: {
    showToast(type) {
      this.$_w_toast({
        type: type,
        message: this.message[type],
        custom: type === 'custom' &&
          '<div style="margin-bottom: -10px">🚀 <img src="https://image.flaticon.com/icons/svg/254/254080.svg" style="width: 36px" /></div>'
      });
    }
  }
}
</script>
```

## 不自动隐藏

```vue
<template>
  <woo-button @click="showToastB">不自动隐藏</woo-button>
</template>

<script>
export default{
  methods: {
    showToastB() {
      this.$_w_toast({
        type: 'warn',
        message: '请重新检查',
        autohide: false
      });
    }
  }
}
</script>
```

## 提示层先Loding等待

```vue
<template>
  <woo-button @click="showToastD">关注</woo-button>
</template>

<script>
export default{
  methods: {
    showToastD() {
      this.$_w_toast({
        type: 'loading',
        message: '关注中',
        autohide: false
      });
      setTimeout(() => {
        this.$_w_toast({
          type: 'success',
          message: '关注成功',
          autohide: true,
          hideDuration: 1000
        });
      }, 1500)
    }
  }
}
</script>
```

## 提示层遮罩

```vue
<template>
  <woo-button @click="showToastC">活动结束</woo-button>
</template>

<script>
export default{
  methods: {
    showToastC() {
      this.$_w_toast({
        type: 'warn',
        message: '活动已结束',
        autohide: false,
        mask: true
      });
    }
  }
}
</script>
```

## 自定义

```vue
<template>
  <woo-button @click="showToastE">自定义Toast</woo-button>
</template>

<style>
.my-custom-toast {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  color: #333;
}
</style>

<script>
export default{
  methods: {
    showToastE() {
      this.$_w_toast({
        type: 'warn',
        message: '活动已结束',
        cssClass: 'my-custom-toast',
        autohide: true
      });
    }
  }
}
</script>
```

<style>
.my-custom-toast {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  color: #333;
}
</style>