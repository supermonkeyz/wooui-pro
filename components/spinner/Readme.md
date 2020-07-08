## 基本用法

```vue
<template>
  <div>
    <woo-spinner></woo-spinner>
  </div>
</template>
```

## 默认带填充色

```vue
<template>
  <div>
    <woo-spinner filled></woo-spinner>
  </div>
</template>
```

## 大小

```vue
<template>
  <div>
    <woo-spinner size="32px"></woo-spinner>
  </div>
</template>
```

## 颜色

```vue
<template>
  <div style="font-size: 32px">
    <woo-spinner color="#1b98e0"></woo-spinner>
  </div>
</template>
```

## 使用

```vue
<template>
  <div style="font-size: 32px">
    <div><woo-spinner v-if="show"></woo-spinner></div>
    <woo-button @click="show = true">请求数据</woo-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  watch: {
    show(val) {
      if(val) {
        setTimeout(() => {
          this.show = false;
        }, 2000);
      }
    }
  }
};
</script>
```