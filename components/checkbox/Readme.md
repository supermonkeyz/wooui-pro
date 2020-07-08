## 单选
```vue
<template>
  <woo-checkbox v-model="check">评论并转发</woo-checkbox>
</template>

<script>
export default {
  data() {
    return {
      check: false
    };
  },
  watch: {
    check(val) {
      console.log(val);
    }
  }
};
</script>
```

## 切换选中值
```vue
<template>
  <woo-checkbox v-model="emoji" true-value="🙂" false-value="😒">{{ emoji }}</woo-checkbox>
</template>

<script>
export default {
  data() {
    return {
      emoji: '🙂'
    };
  }
};
</script>
```

## 复选
```vue
<template>
  <div>
    <h3>{{ fruit }}</h3>
    <woo-checkbox v-model="fruit" value="apple">🍎 苹果</woo-checkbox>
    <woo-checkbox v-model="fruit" value="banana">🍌 香蕉</woo-checkbox>
    <woo-checkbox v-model="fruit" value="grape">🍇 葡萄</woo-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruit: ['banana']
    };
  }
};
</script>
```

## 不可用

```
<woo-checkbox disabled>评论并转发</woo-checkbox>
```

## 选中颜色

```vue
<template>
  <woo-checkbox color="#00acee" v-model="check">评论并转发</woo-checkbox>
</template>

<script>
export default {
  data() {
    return {
      check: true
    };
  }
};
</script>
```

## 大小

```
<woo-checkbox size="24">评论并转发</woo-checkbox>
```