## 基本用法
```vue
<template>
  <div>
    <woo-icon symbol="vyellow" :size="24"></woo-icon>
    <woo-icon symbol="vblue" :size="24"></woo-icon>
    <woo-icon symbol="vgold" :size="24"></woo-icon>
    <woo-icon symbol="vgirl" :size="24"></woo-icon>
    <woo-icon symbol="club" :size="24"></woo-icon>
    <woo-icon symbol="male" :size="24"></woo-icon>
    <woo-icon symbol="female" :size="24"></woo-icon>
    <woo-icon symbol="vip" :size="24"></woo-icon>
    <woo-icon symbol="vipex" :size="24"></woo-icon>
    <woo-icon symbol="weibo" :size="24"></woo-icon>
  </div>
</template>
```

## 会员等级

```vue
<template>
<div>
  <woo-icon symbol="vip" v-for="n in 7" :level="n" :key="n" class="icon-n"></woo-icon>
</div>
</template>
```
