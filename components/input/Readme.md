## 基本用法
```vue
<template>
  <div>
    {{ input }}
    <woo-input v-model="input" placeholder="有什么新鲜事想分享给大家"></woo-input>
    <woo-input v-model="input" placeholder="有什么新鲜事想分享给大家" round></woo-input>
    <woo-input v-model="input2" placeholder="有什么新鲜事想分享给大家"></woo-input>
    <woo-button @click="test">测试</woo-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      input2: ''
    };
  },
  methods: {
    test() {
      this.input2 = '测试文案';
    }
  }
};
</script>

<style scoped>
</style>
```

## 防抖
```vue
<template>
  <div>
    {{ input }}
    <woo-input v-model="input" :debounce="100" placeholder="有什么新鲜事想分享给大家"></woo-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  }
};
</script>
```

## 禁用

```
<woo-input disabled></woo-input>
```

## 错误

```
<woo-input error></woo-input>
```

## 可清除

```
<woo-input clearable></woo-input>
```

## 计数器

```
<woo-input count-limit :maxlength="30"></woo-input>
```

## 左侧图标

```
<woo-input>
  <template v-slot:icon>
    <img src="https://image.flaticon.com/icons/svg/126/126483.svg" alt="" />
  </template>
</woo-input>
```

## 大小

```
<woo-input style="font-size: 24px">
  <template v-slot:icon>
    <img src="https://image.flaticon.com/icons/svg/126/126483.svg" alt="" />
  </template>
</woo-input>
```

## 聚焦

```
<woo-input is-focus></woo-input>
```

## 失焦

```vue
<template>
  <div>
    <woo-button @click="isBlur = true">失去焦点</woo-button>
    <woo-input is-focus :is-blur="isBlur"></woo-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBlur: false
    };
  }
}
</script>
```

## Textarea

```vue
<template>
  <div>
    <h4>{{ input }}</h4>
    <woo-input type="textarea" v-model="input" placeholder="textarea" resize="none"></woo-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: 'words'
    };
  }
};
</script>
```

## Textarea 大小

```
<woo-input type="textarea" style="width: 400px; height: 100px"></woo-input>
```

## 自适应

```
<woo-input type="textarea" autosize></woo-input>
```

`autosize` 传入对象参数{ minRows: num, maxRow: num }可支持自动适配输入框的最小与最大范围

```
<woo-input type="textarea" :autosize="{minRows: 3, maxRows: 6}"></woo-input>
```