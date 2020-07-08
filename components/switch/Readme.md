## 基本用法
```vue
<template>
  <woo-switch v-model="check"></woo-switch>
</template>

<script>
export default {
  data() {
    return {
      check: false
    };
  }
};
</script>

<style scoped>
</style>
```

## 传递值
```vue
<template>
  <div>
    <h3>当前状态：{{ value }}</h3>
    <woo-switch v-model="value" :on-value="100" :off-value="0"></woo-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    };
  }
};
</script>

<style scoped>
</style>
```

## 禁用

```
<woo-switch disabled></woo-switch>
```

## 更换颜色

```
<woo-switch color="rgb(0, 172, 238)"></woo-switch>
```

## 更换大小

```
<woo-switch :size=".75"></woo-switch>
```