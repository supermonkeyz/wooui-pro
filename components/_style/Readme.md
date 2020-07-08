## 全局定义
```[import](./const.css)
Text typed here will be entirely ignored. You can use it to describe the example imported for maintenance purposes
```
```vue
<template>
<div>
  <h3>品牌色</h3>
  <div class="box color-brand"></div>
  <h3>主文字色</h3>
  <div class="box color-main"></div>
  <h3>次文字色</h3>
  <div class="box color-sub"></div>
  <h3>Hover色</h3>
  <div class="box color-hover"></div>
  <h3>边框色</h3>
  <div class="box color-border"></div>
</div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
}

.color-brand {
  background: var(--w-brand);
}

.color-main {
  background: var(--w-main);
}

.color-sub {
  background: var(--w-sub);
}

.color-hover {
  background: var(--w-hover);
}

.color-border {
  background: var(--w-dividing-line);
}
</style>
```