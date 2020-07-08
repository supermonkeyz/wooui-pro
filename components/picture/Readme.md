## 基础用法
```vue
<template>
  <div style="max-width: 20rem">
    <woo-picture
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
      alt="等比图"
      style="border-radius: 16px"
    >
    </woo-picture>
    <woo-picture
      src="//wx1.sinaimg.cn/orj360/7f1ef208gy1g9s5x4dngcj20ln0lndh3.jpg"
      alt="等比图"
      style="border-radius: 16px"
    >
    </woo-picture>
  </div>
</template>
```

## 按比例显示

```vue
<template>
  <div style="max-width: 20rem">
    5:4
    <woo-picture
      aspect-ratio="5:4"
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    >
    </woo-picture>
    4:3
    <woo-picture
      aspect-ratio="4:3"
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    >
    </woo-picture>
    3:2
    <woo-picture
      aspect-ratio="3:2"
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    >
    </woo-picture>
    16:9
    <woo-picture
      aspect-ratio="16:9"
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    >
    </woo-picture>
  </div>
</template>
```

## 自定义图片比例

```vue
<template>
  <div style="max-width: 20rem">
    <woo-picture
      :aspect-ratio="0.333"
      src="//tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
    >
    </woo-picture>
  </div>
</template>
```

## 图片异常处理

```
<woo-picture width="200" src="//www.google.com.hk/images/branding/googlelogo/2x/googlelogo.png">
</woo-picture>
```

```vue
<template>
  <woo-picture width="200" :src="src">
  </woo-picture>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    };
  },
  created() {
    setTimeout(() => {
      this.src = 'https://tva4.sinaimg.cn/crop.0.32.687.687/621ff2c2jw1em78i0mk5kj20j60y3117.jpg';
    }, 500)
    setTimeout(() => {
      this.src = '0';
    }, 1200)
  }
}
</script>
```

## 取消border

```
<woo-picture
  :aspect-ratio="0.333"
  src="//wx1.sinaimg.cn/orj360/7f1ef208gy1g9s5x4dngcj20ln0lndh3.jpg"
  :border="false"
>
</woo-picture>
```

## hover效果

默认开启 可以通过`hover-mask`关闭

```
<woo-picture
  :aspect-ratio="0.333"
  src="//wx1.sinaimg.cn/orj360/7f1ef208gy1g9s5x4dngcj20ln0lndh3.jpg"
  :hover-mask="false"
>
</woo-picture>
```