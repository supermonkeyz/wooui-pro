## 基本形态

```vue
<template>
<div>
  <p>
    <woo-button class="button" v-for="(kind, index) in kinds" sort="flat" :kind="kind" :key="index">
      {{ kind }}
    </woo-button>
  </p>
  <p>
    <woo-button class="button" v-for="(kind, index) in kinds" sort="line" :kind="kind" :key="index">
      {{ kind }}
    </woo-button>
  </p>
  <p>
    <woo-button class="button" v-for="(kind, index) in kinds" sort="simple" :kind="kind" :key="index">
      {{ kind }}
    </woo-button>
  </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      kinds: ['primary', 'default']
    };
  }
};
</script>

<style scoped>
.button{
  margin-right: 10px;
  margin-bottom: 10px;
  vertical-align: top;
}
</style>
```

## 不可用状态

```vue
<template>
<div>
  <p>
    <woo-button class="button" sort="flat" kind="primary" disabled>
      primary
    </woo-button>
    <woo-button class="button" v-for="(kind, index) in kinds" sort="line" :kind="kind" :key="index" disabled>
      {{ kind }}
    </woo-button>
  </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      kinds: ['primary', 'default']
    };
  }
}
</script>

<style scoped>
.button{
  margin-right: 10px;
  margin-bottom: 10px;
  vertical-align: top;
}
</style>
```

## 尺寸

```vue
<template>
<div>
  <p>
    <woo-button class="button" v-for="(size, index) in sizes" :size="size" sort="line" kind="primary" :key="index">
      {{ names[size] }}
    </woo-button>
  </p>
  <p>
    <woo-button class="button" v-for="(size, index) in sizes" :size="size" sort="flat" kind="primary" :key="index">
      {{ names[size] }}
    </woo-button>
  </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      sizes: ['l', 'm', 's'],
      names: {
        l: 'large',
        m: 'medium',
        s: 'small'
      }
    };
  }
};
</script>

<style scoped>
.button{
  margin-right: 10px;
}
</style>
```

## 圆角取消

```vue
<template>
<div>
  <p>
    <woo-button sort="line" kind="primary" :round="false" style="vertical-align: top">
      Like
    </woo-button>
    <woo-button sort="flat" kind="primary" :round="false">
      Like
    </woo-button>
  </p>
</div>
</template>
```

## 充满状态

```vue
<template>
<div>
  <p>
    <woo-button sort="line" kind="primary" fluid>
      Like
    </woo-button>
  </p>
  <p>
    <woo-button sort="line" kind="primary" fluid round>
      Like
    </woo-button>
  </p>
</div>
</template>
```

## 带图标状态
```vue
<template>
<div>
  <p>
    <woo-button sort="line" kind="primary" icon="https://image.flaticon.com/icons/svg/291/291212.svg">
      Like
    </woo-button>
    <woo-button sort="line" kind="primary" size="l" icon="https://image.flaticon.com/icons/svg/291/291212.svg">
      Like
    </woo-button>
    <woo-button sort="simple" kind="default" icon="https://image.flaticon.com/icons/svg/126/126495.svg">
      Share
    </woo-button>
    <woo-button sort="simple" kind="default" size="l" icon="https://image.flaticon.com/icons/svg/126/126495.svg">
      Share
    </woo-button>
  </p>
  <div style="color: #808080">
    <woo-button sort="simple" kind="default" fonticon="retweet" style="font-size: 14px;" class="btn">
      <span style="font-size: 12px;">转发</span>
    </woo-button>
    <woo-button sort="simple" kind="default" fonticon="comment" style="font-size: 14px;" class="btn">
      <span style="font-size: 12px;">评论</span>
    </woo-button>
    <woo-like :count="0" style="vertical-align: bottom" class="btn"></woo-like>
  </div>
</div>
</template>

<style>
.btn {
  vertical-align: bottom;
}
</style>
```
## 反转状态

```vue
<template>
<div>
  <p>
    <woo-button sort="line" kind="default" icon="https://image.flaticon.com/icons/svg/126/126490.svg" reverse>
      More
    </woo-button>
    <woo-button sort="simple" kind="default" icon="https://image.flaticon.com/icons/svg/126/126469.svg" reverse>
      Share
    </woo-button>
  </p>
</div>
</template>
```

## 垂直按钮

```vue
<template>
<div>
  <p>
    <woo-button sort="simple" kind="default" icon="https://image.flaticon.com/icons/svg/126/126469.svg" vertical>
      share
    </woo-button>
    <woo-button sort="simple" kind="default" icon="https://image.flaticon.com/icons/svg/126/126469.svg" vertical reverse>
      share
    </woo-button>
    <woo-button sort="simple" kind="default" size="l" icon="https://image.flaticon.com/icons/svg/126/126469.svg" vertical>
      share
    </woo-button>
  </p>
</div>
</template>
```

## 加载中

```vue
<template>
<div>
  <p>
    <woo-button loading sort="flat">加载中</woo-button>
  </p>
  <p>
    <woo-button
      sort="line"
      :kind="!followed ? 'primary' : 'default'"
      :loading="loading"
      :disabled="loading"
      @click="follow"
    >
      {{ followed ? 'Following' : 'Follow' }}
    </woo-button>
  </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      followed: false
    };
  },
  methods: {
    follow() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.followed = !this.followed;
      }, 500)
    }
  }
};
</script>

<style scoped>
.button{
  margin-right: 10px;
}
</style>
```