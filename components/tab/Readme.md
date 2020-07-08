## 基本用法

由于tab组件使用场景多，形态太多。基本形态仅仅提供效果。

*index虽然可以不传，但是为了提升性能最好传一下*

```vue
<template>
  <woo-tab @change="tab">
    <woo-tab-item :index="0" :cur="cur">
      <woo-box class="face" justify="center">
        🙂
      </woo-box>
    </woo-tab-item>
    <woo-tab-item :index="1">
      <woo-box class="face" justify="center">
        🍌
      </woo-box>
    </woo-tab-item>
    <woo-tab-item :index="2">
      <woo-box class="face" justify="center">
        🇨🇳
      </woo-box>
    </woo-tab-item>
    <!-- tab展示内容区 -->
    <template v-slot:content>
      <div>
        {{ index }}
      </div>
    </template>
  </woo-tab>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      cur: false,
      show: false
    };
  },
  methods: {
    tab(number) {
      this.index = number;
    }
  },
  mounted() {
    setTimeout(() => {
      this.cur = true;
    }, 100)
  }
};
</script>
<style>
.face {
  width: 34px;
  height: 34px;
}
</style>
```

## 页签布局

```
<h3>居中布局</h3>
<woo-tab justify="center">
  <woo-tab-item v-for="n in 3" :index="n - 1" :key="n" :cur="n === 2">卡签{{n}}</woo-tab-item>
</woo-tab>

<h3>分散布局</h3>
<woo-tab justify="between">
  <woo-tab-item v-for="n in 3" :index="n - 1" :key="n" :cur="n === 2">卡签{{n}}</woo-tab-item>
</woo-tab>

<h3>居右布局</h3>
<woo-tab justify="end">
  <woo-tab-item v-for="n in 3" :index="n - 1" :key="n" :cur="n === 2">卡签{{n}}</woo-tab-item>
</woo-tab>
```

## 丰富化交互体验

### 自定制tab容器内容

### 增加动画效果

选中态会自动挂载`woo-tab-active`的class，通过继承可自定义选中状态

默认动画效果是被关闭了，因为实现动画效果会有些许性能损耗，通过`animate`属性可以将其开启

通过`animate-duration`属性可以设定动效时长，单位为ms

```vue
<template>
  <div>
    <woo-tab justify="around" animate :animate-duration="500">
      <woo-tab-item :index="0" cur>
        <div class="btn"><woo-fonticon value="emoticon" class="icon"></woo-fonticon>表情榜</div>
      </woo-tab-item>
      <woo-tab-item :index="1">
        <div class="btn"><woo-fonticon value="image" class="icon"></woo-fonticon>图片榜</div>
      </woo-tab-item>
      <woo-tab-item :index="2">
        <div class="btn"><woo-fonticon value="video" class="icon"></woo-fonticon>视频榜</div>
      </woo-tab-item>
    </woo-tab>
    <woo-tab justify="between" animate :animate-duration="500">
      <woo-tab-item :index="0" cur>
        <div class="btn"><woo-fonticon value="emoticon" class="icon"></woo-fonticon>表情榜</div>
      </woo-tab-item>
      <woo-tab-item :index="1">
        <div class="btn"><woo-fonticon value="image" class="icon"></woo-fonticon>图片榜</div>
      </woo-tab-item>
      <woo-tab-item :index="2">
        <div class="btn"><woo-fonticon value="video" class="icon"></woo-fonticon>视频榜</div>
      </woo-tab-item>
    </woo-tab>
  </div>
</template>

<style>
.btn {
  padding: 8px 10px;
  margin: 4px 0;
  border-radius: 32px;
}

.btn:hover {
  background-color: rgba(255, 130, 0, 0.1);
  color: #ff8200;
}

.icon {
  vertical-align: -2px;
  margin-right: 5px;
}

.woo-tab-active .btn {
  color: #ff8200;
}
</style>
```

## 可见性

由于开启动画，需要获取dom信息，如果有v-show切换的时候，请对`visable`传入数据

```vue
<template>
  <div>
    <woo-button @click="show = !show">显示tab</woo-button>
    <woo-tab justify="between" animate v-show="show" :visable="show">
      <woo-tab-item :index="0" cur>
        <div class="btn"><woo-fonticon value="emoticon" class="icon"></woo-fonticon>表情榜</div>
      </woo-tab-item>
      <woo-tab-item :index="1">
        <div class="btn"><woo-fonticon value="image" class="icon"></woo-fonticon>图片榜</div>
      </woo-tab-item>
      <woo-tab-item :index="2">
        <div class="btn"><woo-fonticon value="video" class="icon"></woo-fonticon>视频榜</div>
      </woo-tab-item>
    </woo-tab>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>
<style>
.btn {
  padding: 8px 10px;
  margin: 4px 0;
  border-radius: 32px;
}

.btn:hover {
  background-color: rgba(255, 130, 0, 0.1);
  color: #ff8200;
}

.icon {
  vertical-align: -2px;
  margin-right: 5px;
}

.woo-tab-active .btn {
  color: #ff8200;
}
</style>
```
