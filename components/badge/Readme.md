## 基础用法
```vue
<template>
<div>
  <woo-badge dot></woo-badge>
  <woo-badge :value="18"></woo-badge>
  <woo-badge value="NEW"></woo-badge>
</div>
</template>
```

## 结合组件
```vue
<template>
  <div>
    <woo-badge dot>
      <woo-button sort="line">消息</woo-button>
    </woo-badge>
    <woo-badge :value="18">
      <woo-button sort="line">消息</woo-button>
    </woo-badge>
  </div>
</template>
```

## 最大值
```vue
<template>
  <woo-badge :value="218" :max="99">
    <woo-fonticon value="chat" class="icon"></woo-fonticon>
  </woo-badge>
</template>
<style>
.icon {
  font-size: 36px;
}
</style>
```

## 控制位置

```vue
<template>
  <div>
    <woo-badge dot x="24px" y="4px" class="item">
      <woo-fonticon value="home" class="icon"></woo-fonticon>
    </woo-badge>
    <woo-badge :value="218" x="18px" y="2px" class="item">
      <woo-fonticon value="home" class="icon"></woo-fonticon>
    </woo-badge>
    <woo-badge :value="10" x="18px" y="2px" class="item">
      <woo-fonticon value="home" class="icon"></woo-fonticon>
    </woo-badge>
  </div>
</template>
<style>
.icon {
  font-size: 36px;
}
.item {
  margin-right: 20px;
}
</style>
```

## 颜色
```vue
<template>
  <woo-badge :value="218" :max="99" color="#333333">
    <woo-fonticon value="chat" class="icon" style="font-size: 36px"></woo-fonticon>
  </woo-badge>
</template>
```

## 隐藏

```vue
<template>
  <div>
    <woo-badge :value="value" x="18px" y="2px" class="item" :show="!!value">
      <woo-fonticon value="home" class="icon" @click.native="value = 0"></woo-fonticon>
    </woo-badge>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 10
    }
  }
};
</script>
<style>
.icon {
  font-size: 36px;
}
</style>
```
