## 普通提示条
```vue
<woo-tip type="success" sort="simple">提示文案</woo-tip>
<woo-tip type="warn" sort="simple">提示文案</woo-tip>
<woo-tip type="error" sort="simple">提示文案</woo-tip>
<woo-tip type="help" sort="simple">提示文案</woo-tip>
```

## 通栏提示条
```vue
<template>
<div>
  <woo-tip type="success" sort="flat" class="tip">提示文案</woo-tip>
  <woo-tip type="warn" sort="flat" class="tip">提示文案</woo-tip>
  <woo-tip type="error" sort="flat" class="tip">提示文案</woo-tip>
  <woo-tip type="help" sort="flat" class="tip">提示文案</woo-tip>

  <woo-tip type="warn" sort="flat" class="tip" :has-icon="false">提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案</woo-tip>
</div>
</template>
<style>
.tip {
  margin-bottom: 10px;
}
</style>
```

## 纵向提示
```vue
<woo-tip type="success" sort="vertical">提示文案</woo-tip>
<woo-tip type="warn" sort="vertical">提示文案</woo-tip>
<woo-tip type="error" sort="vertical">提示文案</woo-tip>
<woo-tip type="help" sort="vertical">提示文案</woo-tip>
```

## 继承式提示
```vue
<woo-tip type="success" sort="inherit" style="color: #ccc">提示文案</woo-tip>
<woo-tip type="warn" sort="inherit" style="color: #ccc">提示文案</woo-tip>
<woo-tip type="error" sort="inherit" style="color: #ccc">提示文案</woo-tip>
<woo-tip type="help" sort="inherit" style="color: #ccc">提示文案</woo-tip>
```

## 反向提示

```vue
<woo-tip type="error" reverse>提示文案</woo-tip>
<woo-tip type="help" reverse><woo-input /></woo-tip>
```

## 宽度自适应

```
<woo-tip type="help" reverse inline><woo-button>按钮</woo-button></woo-tip>
```

## 设定图标间距

```
<woo-tip type="help" reverse inline gap="20"><woo-button>按钮</woo-button></woo-tip>
```
将tip作为一个icon使用
```
<div><woo-tip type="help" gap="20" inline></woo-tip>123</div>
<div>321<woo-tip type="help" gap="20" inline reverse></woo-tip></div>
```

## icon点击事件

```vue
<template>
  <woo-tip type="help" reverse @icon-click="tip"><woo-input /></woo-tip>
</template>
<script>
export default {
  methods: {
    tip() {
      this.$_w_toast({
        message: '点击成功'
      });
    }
  }
};
</script>
```