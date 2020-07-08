## 基础用法
```vue
<template>
  <div style="overflow: auto; height: 100px">
    <div style="height: 300px">
      <woo-pop @click-outside="test" :show="show">
        <template v-slot:ctrl>
          <woo-button @click="click" class="main">点击出浮层</woo-button>
        </template>
        <div class="main layer">
          弹层
        </div>
      </woo-pop>
      <woo-pop :show="show1">
        <template v-slot:ctrl>
          <woo-button @mouseover.native="show1 = true" @mouseout.native="show1 = false" class="main">
            划过出弹层
          </woo-button>
        </template>
        <div class="main layer">
          弹层
        </div>
      </woo-pop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show1: false
    };
  },
  methods: {
    test() {
      this.show = false;
    },
    click() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.main {
  width: 200px;
}
.layer {
  line-height: 100px;
  text-align: center;
}
</style>
```
## 脱离文档流的层

通过flow设置层脱离文档， 如果你的父级容器不存在overflow属性的时候，或者不是必要的情况请不要打开这个属性，因为这么做会造成些许的性能损耗。

```vue
<template>
  <div>
    <woo-button @click="modal = true">弹出模态</woo-button>
    <woo-modal v-if="modal">
      <woo-fonticon value="close" @click.native="modal = false" style="position: absolute; right: 10px; top: 10px"></woo-fonticon>
      <div class="box">
        <woo-pop @click-outside="test" :show="show" flow direction="up" align="end">
          <template v-slot:ctrl>
            <woo-fonticon value="askCircle" @click.native="showLayer"></woo-fonticon>
          </template>
          <div class="main layer">
            弹层
            <woo-button @click="show = false">关闭</woo-button>
          </div>
        </woo-pop>
      </div>
    </woo-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      show: false,
      el: ''
    };
  },
  methods: {
    test() {
      console.log('close');
      this.show = false;
    },
    close() {
      this.modal = false;
      this.$nextTick(() => {
        this.test();
      });
    },
    showLayer() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.main {
  width: 200px;
}
.layer {
  line-height: 100px;
  text-align: center;
}
.box {
  height: 100px;
  width: 200px;
  background: #fff;
}
</style>
```

## 层充满容器

```vue
<template>
  <div>
    <woo-pop @click-outside="test" fluid :show="show">
      <template v-slot:ctrl>
        <woo-button @click="show = !show" class="main">点击出浮层</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    test() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.layer {
  line-height: 100px;
  text-align: center;
}
</style>
```

## 弹层布局
```vue
<template>
  <div style="text-align: center">
    <div style="text-align: left">
      <p>direction:
        <woo-radio v-model="direction" v-for="item in map.direction" :value="item" :key="item">
          {{ item }}
        </woo-radio>
      </p>
      <p>align:
        <woo-radio v-model="align" v-for="item in map.align" :value="item" :key="item">
          {{ item }}
        </woo-radio>
      </p>
      <p>gap:
        <input type="text" v-model="margin"/>
      </p>
    </div>
    <woo-pop @click-outside="test" :show="show" :direction="direction" :align="align" :gap="margin">
      <template v-slot:ctrl>
        <woo-fonticon value="emoticon" @click.native="show = !show" class="emoji"/>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      map: {
        direction: ['up', 'down', 'left', 'right'],
        align: ['start', 'center', 'end']
      },
      direction: 'down',
      align: 'start',
      margin: 10
    };
  },
  methods: {
    test() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.emoji {
  font-size: 24px;
}
.layer {
  width: 400px;
  height: 400px;
}
</style>
```

## 增加动效

设置`animate`属性，可以增加动画效果

```vue
<template>
  <div>
    <woo-pop @click-outside="test" :show="show" animate>
      <template v-slot:ctrl>
        <woo-button @click="show = !show" class="main">点击出浮层</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    test() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.main {
  width: 200px;
}
.layer {
  line-height: 300px;
  text-align: center;
}
</style>
```

## 自定义

通过`custom`属性，可以设定类名woo-pop-${custom}，可根据需要设定class，单独控制弹出层

```vue
<template>
  <div>
    <woo-pop @click-outside="test" :show="show" custom="message">
      <template v-slot:ctrl>
        <woo-button @click="show = !show" class="main">点击出浮层</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    test() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.main {
  width: 200px;
}
.layer {
  line-height: 100px;
  text-align: center;
}
.woo-pop-message {
  border: 1px solid red;
}
</style>
```
<style>
.woo-pop-message {
  border: 1px solid red;
  margin-top: 15px;
}
</style>

## 菜单

```vue
<template>
  <div>
    <woo-pop @click-outside="close" :show="show" direction="up">
      <template v-slot:ctrl>
        <woo-button @click="show = !show" class="main">点击出浮层</woo-button>
      </template>
      <woo-pop-wrap>
        <woo-pop-item cur>
          <template v-slot:icon>
            <woo-fonticon value="emoticon" />
          </template>
          菜单内容
        </woo-pop-item>
        <woo-pop-item>
          <template v-slot:icon>
            <img src="https://image.flaticon.com/icons/svg/126/126483.svg" alt="" />
          </template>
          菜单内容
        </woo-pop-item>
        <woo-pop-item>
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.2 471.2" style="enable-background:new 0 0 471.2 471.2"><path d="M457.7 230.15c-7.5 0-13.5 6-13.5 13.5v122.8c0 33.4-27.2 60.5-60.5 60.5H87.5c-33.4 0-60.5-27.2-60.5-60.5v-124.8c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v124.8c0 48.3 39.3 87.5 87.5 87.5h296.2c48.3 0 87.5-39.3 87.5-87.5v-122.8c0-7.4-6-13.5-13.5-13.5z"/><path d="M159.3 126.15l62.8-62.8v273.9c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5V63.35l62.8 62.8c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.8-85.8c-2.5-2.5-6-4-9.5-4-3.6 0-7 1.4-9.5 4l-85.8 85.8c-5.3 5.3-5.3 13.8 0 19.1 5.2 5.2 13.8 5.2 19 0z"/></svg>
          </template>
          菜单内容
        </woo-pop-item>
        <woo-divider />
        <woo-pop-item>
          <template v-slot:icon>
            <woo-fonticon value="setup" />
          </template>
          菜单内容
        </woo-pop-item>
      </woo-pop-wrap>
    </woo-pop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    }
  }
}
</script>
```
菜单组

```vue
<template>
  <div>
    <woo-pop @click-outside="close" :show="show" direction="up">
      <template v-slot:ctrl>
        <woo-button @click="show = !show" class="main">点击出浮层</woo-button>
      </template>
      <woo-pop-wrap>
        <woo-pop-group title="@我的微博">
          <woo-pop-item cur>
            <template v-slot:icon>
              <woo-fonticon value="emoticon" />
            </template>
            菜单内容
          </woo-pop-item>
          <woo-pop-item>
            <template v-slot:icon>
              <img src="https://image.flaticon.com/icons/svg/126/126483.svg" alt="" />
            </template>
            菜单内容
          </woo-pop-item>
        </woo-pop-group>
        <woo-pop-group title="@我的评论">
          <woo-pop-item cur>
            <template v-slot:icon>
              <woo-fonticon value="emoticon" />
            </template>
            菜单内容
          </woo-pop-item>
          <woo-pop-item>
            <template v-slot:icon>
              <img src="https://image.flaticon.com/icons/svg/126/126483.svg" alt="" />
            </template>
            菜单内容
          </woo-pop-item>
        </woo-pop-group>
      </woo-pop-wrap>
    </woo-pop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    }
  }
}
</script>
```