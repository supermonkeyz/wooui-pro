## 基本用法
```vue
<template>
  <div>
    <h3>{{ fruit }}</h3>
    <woo-radio v-model="fruit" value="apple" class="radio-item">🍎 苹果</woo-radio>
    <woo-radio v-model="fruit" value="banana" class="radio-item">🍌 香蕉</woo-radio>
    <woo-radio v-model="fruit" value="grape" class="radio-item">🍇 香蕉</woo-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruit: 'banana'
    }
  }
};
</script>
```

## 不可用

```
<woo-radio value="apple" class="radio-item" disabled>苹果</woo-radio>
```

## 选中颜色

```
<woo-radio value="apple" class="radio-item" color="#00acee" checked>苹果</woo-radio>
```

## 文字颜色

```
<woo-radio value="apple" class="radio-item" style="color: #636363">苹果</woo-radio>
<woo-radio value="apple" class="radio-item" color="#00acee" text-color="#00acee" checked>苹果</woo-radio>
```

## 大小

```
<woo-radio value="apple" class="radio-item" size="24">苹果</woo-radio>
```
