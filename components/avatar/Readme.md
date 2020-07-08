## 基础用法
```vue
<template>
  <div>
    <woo-avatar></woo-avatar>
    <woo-avatar src></woo-avatar>
    <woo-avatar src="https://"></woo-avatar>
  </div>
</template>

<script>
  export default {
  };
</script>

<style scoped>
</style>
```

## 认证说明
```vue
<woo-avatar verified="vyellow" verified-title="个人认证" key="test"></woo-avatar>
```


## 更改大小
```vue
<template>
  <woo-avatar
    :size="50"
    src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
  >
  </woo-avatar>
</template>
```

## V标

```vue
<template>
  <div>
    <woo-avatar
      verified="vgold"
      src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
      class="avatar-users"
    >
    </woo-avatar>
    <woo-avatar
      verified="vyellow"
      :size="50"
      src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
      class="avatar-users"
    >
    </woo-avatar>
    <woo-avatar
      verified="vblue"
      :size="60"
      src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
      class="avatar-users"
    >
    </woo-avatar>
  </div>
</template>
```

## 设置标识大小

```vue
<template>
  <woo-avatar
    :size="70"
    :icon-size="18"
    verified="vgold"
    src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
  >
  </woo-avatar>
</template>
```

## 设置头像挂件

```vue
<template>
  <woo-avatar
    src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    cover="//h5.sinaimg.cn/upload/2017/03/22/550/gj_vip_140-150.png"
    class="avatar-users"
  >
  </woo-avatar>
</template>
```

## hover效果

默认开启 可以通过`hover-mask`关闭

```
<woo-avatar
  :size="50"
  src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
  :hover-mask="false"
>
</woo-avatar>
```