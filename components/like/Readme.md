## 基本用法
```
<woo-like like count="1"></woo-like>
<woo-like></woo-like>
```

## 不可用态

```
<woo-like count="10" disabled></woo-like>
```

## 只带图标

```
<woo-like :with-count="false"></woo-like>
```

## 没有切换交互

```
<woo-like static></woo-like>
```

## 点赞效果

```
<div style="position: relative; height: 200px;">
  <woo-like effect></woo-like>
</div>
```

## 计数器

```vue
<template>
  <div>
    <h3>计数0显示赞</h3>
    <woo-like :count="likeCount" @status="likeHandle"></woo-like>
    <h3>计数0显示0</h3>
    <woo-like :count="likeCount" @status="likeHandle" original></woo-like>
    <h3>计数0不显示</h3>
    <woo-like :count="likeCount" @status="likeHandle" no-zero original></woo-like>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        valueLike: false,
        likeCount: 0
      }
    },
    methods: {
      likeHandle() {
        this.valueLike = !this.valueLike;
        this.likeCount = this.valueLike ? this.likeCount + 1 : this.likeCount - 1;
      }
    }
  }
</script>
```
