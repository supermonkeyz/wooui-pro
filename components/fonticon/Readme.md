## 所有图标

```vue
<template>
<div>
  <h3>fonticon value:</h3>
  <woo-box wrap :items="4">
    <woo-box-item v-for="(key, index) in keys" :key="key" class="item">
      <woo-fonticon :value="key" class="icon"></woo-fonticon>
      <h4 class="des">{{ key }}</h4>
    </woo-box-item>
  </woo-box>
</div>
</template>
<script>
import icons from '@woo/woo-iconfont/dist/fonticon.json';
const keys = Object.keys(icons);
export default {
  data() {
    return {
      keys
    };
  }
};
</script>
<style scope>
.item {
  margin-bottom: 30px;
  text-align: center;
}
.icon {
  font-size: 36px;
  color: #333;
}
.des {
  color: #666;
  font-size: 14px;
  font-weight: normal;
  margin: 5px 0 0;
}
</style>
```

## 复合图标

```
<div style="font-size: 36px">
  <woo-fonticon value="close" kind="dark"></woo-fonticon>
  <woo-fonticon value="edit" kind="dark"></woo-fonticon>
</div>
```