
## 基本用法

```vue
<template>
<woo-box align="center" justify="center" class="box">
  ABC
</woo-box>
</template>

<style scoped>
.box {
  font-size: 40px;
  height: 80px;
}
</style>
```

## 布局方向

```vue
<template>
<div>
  <woo-box :direction="value" v-for="(value, index) in directions" :key="index" class="box">
    <div>A</div>
    <div>B</div>
    <div>C</div>
  </woo-box>
</div>
</template>

<script>
export default {
  data() {
    return {
      directions: ['x', 'x-r', 'y', 'y-r'],
    };
  }
};
</script>

<style scoped>
.box {
  background: #ccc;
  height: 80px;
  margin-bottom: 10px;
}
</style>
```

## 对齐方式

### 通过justify属性，可以控制沿主轴元素对齐方式

```vue
<template>
<div>
  <div v-for="(value, index) in justifys" :key="index">
    <h3>justify: {{ value }}</h3>
    <woo-box :justify="value" class="box">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </woo-box>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      justifys: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    };
  }
};
</script>

<style scoped>
.box {
  background: #ccc;
  margin-bottom: 20px;
}
</style>
```

### 通过align属性，可以控制沿从轴元素对齐方式

```vue
<template>
<div>
  <div v-for="(value, index) in aligns" :key="index">
    <h3>align: {{ value }}</h3>
    <woo-box :align="value" class="box">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </woo-box>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      aligns: ['start', 'end', 'center', 'baseline', 'stretch'],
    };
  }
};
</script>

<style scoped>
.box {
  background: #ccc;
  height: 60px;
  margin-bottom: 20px;
}
</style>
```

## 布局栅格

### 横向

```vue
<template>
  <woo-box :gap-row="8">
    <woo-box-item v-for="n in 6" :key="n">
      <div style="background-color: #ccc;">
        {{ n }}
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

### 纵向

```vue
<template>
  <woo-box :gap-row="8" direction="y">
    <woo-box-item v-for="n in 3" :key="n">
      <div style="background-color: #ccc;">
        {{ n }}
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

## 可换行栅格

### 横向

```vue
<template>
  <woo-box wrap="wrap" :gap-row="8" :gap-col="8" :items="3">
    <woo-box-item v-for="n in 6" :key="n">
      <div style="background-color: #ccc;">
        {{ n }}
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

### 纵向

```vue
<template>
  <woo-box direction="y" wrap="wrap" :gap-row="5" :gap-col="5" :items="3" style="height: 5.4375rem">
    <woo-box-item v-for="n in 6" :key="n">
      <div style="background-color: #ccc; height: 100%">
        {{ n }}
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

## 传统inline-block布局

```vue
<template>
  <woo-box old>
    <woo-box-item v-for="n in 3" :key="n" class="box-item">
        <div style="background-color: #ccc;">
          {{ n }}
        </div>
      </woo-box-item>
  </woo-box>
</template>

<style scope>
.box-item {
  width: 100px;
  text-align: center;
  margin-right: 10px;
}
</style>
```

### inline-block栅格布局

```vue
<template>
  <woo-box old :items="2" :gap-row="8" :gap-col="8">
    <woo-box-item v-for="n in 10" :key="n">
      <div style="background-color: #ccc; text-align: center">
        {{ n }}
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

## box-item配置

```vue
<template>
  <woo-box style="height: 3rem">
    <woo-box-item :order="2">
      <div style="background-color: #ccc; text-align: center">
        1
      </div>
    </woo-box-item>
    <woo-box-item basis="20%" align="flex-end">
      <div style="background-color: #ccc; text-align: center">
        2
      </div>
    </woo-box-item>
  </woo-box>
</template>
```

## 标签语义化

```vue
<template>
  <woo-box tag="ul" :items="3">
    <woo-box-item tag="li" style="line-height: 100px" v-for="n in 3" :key="n">
      li items
    </woo-box-item>
  </woo-box>
</template>
```