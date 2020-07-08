## 基本用法
```vue
<template>
  <div>
    <woo-button
      class="modal-ctrl"
      @click="showModal(animation)"
      v-for="animation in animations"
      :key="animation"
    >
      {{animation}}
    </woo-button>
    <woo-modal :animation="animation" v-if="show" :stay="where">
      <div class="modal-demo">
        <woo-fonticon kind="dark" value="cross" @click.native="show = false"></woo-fonticon>
      </div>
    </woo-modal>
  </div>
</template>

<style>
.modal-ctrl {
  margin-right: 10px;
  margin-bottom: 10px;
  vertical-align: top;
}

.modal-demo {
  width: 240px;
  height: 120px;
  background: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      show: false,
      animations: [
        'pop',
        'fade',
        'slide-top',
        'slide-right',
        'slide-bottom',
        'slide-left',
        'drawer-top',
        'drawer-right',
        'drawer-bottom',
        'drawer-left',
      ],
      animation: ''
    };
  },
  computed: {
    where() {
      let position = 'center';
      if (this.animation.includes('drawer')) {
        const re = /^[^-]+-\s*/;
        position = this.animation.replace(re, '');
      }
      return position;
    }
  },
  methods: {
    showModal(animation) {
      this.show = true;
      this.animation = animation;
    }
  }
}
</script>
```

## 弹层位置

```vue
<template>
  <div>
    <woo-button
      class="modal-ctrl"
      @click="showModal1(where)"
      v-for="where in wheres"
      :key="where"
    >
      {{where}}
    </woo-button>
    <woo-modal animation="fade" :stay="where" v-if="show1">
      <div class="modal-demo">
        <woo-fonticon kind="dark" value="cross" @click.native="show1 = false"></woo-fonticon>
      </div>
    </woo-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      wheres: [
        'center',
        'top',
        'right',
        'bottom',
        'left'
      ],
      where: ''
    };
  },
  methods: {
    showModal1(stay) {
      this.show1 = true;
      this.where = stay;
    }
  }
}
</script>

<style>
.modal-ctrl {
  margin-right: 10px;
  vertical-align: top;
}

.modal-demo {
  width: 240px;
  height: 120px;
  background: #fff;
}
</style>
```

## 填充方式

```vue
<template>
  <div>
    <woo-button
      class="modal-ctrl"
      @click="showModal2(fill)"
      v-for="fill in fills"
      :key="fill"
    >
      {{fill}}
    </woo-button>
    <woo-modal animation="fade" stay="top" :fluid="fill" v-if="show2">
      <div class="modal-demo1">
        <woo-fonticon kind="dark" value="cross" @click.native="show2 = false"></woo-fonticon>
      </div>
    </woo-modal>
  </div>
</template>

<style>
.modal-demo1 {
  height: 100%;
  background: #fff;
}
.modal-ctrl {
  margin-right: 10px;
  vertical-align: top;
}
.modal-demo {
  width: 240px;
  height: 120px;
  background: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      show2: false,
      fills: [
        'stretch',
        'cover'
      ],
      fill: '',
    };
  },
  methods: {
    showModal2(fluid) {
      this.show2 = true;
      this.fill = fluid;
    }
  }
}
</script>
```

## 蒙层

取消蒙层Modal还是阻止行为的。如果你需要层下面内容不被阻隔，请设定cover="false"

```vue
<template>
  <div>
    <woo-button class="modal-ctrl" @click="show3 = true">无遮罩</woo-button>
    <woo-modal :mask="false" v-if="show3">
      <div class="modal-demo2">
        <woo-fonticon kind="dark" value="cross" @click.native="show3 = false"></woo-fonticon>
      </div>
    </woo-modal>
  </div>
</template>

<style>
.modal-demo2 {
  width: 240px;
  height: 120px;
  background: #ccc;
}
</style>

<script>
export default {
  data() {
    return {
      show3: false
    };
  }
}
</script>
```

## 蒙层点击关闭
弹层下的遮罩蒙层点击可关闭。默认开启。touchclose 为 false 时，点击蒙层不会关闭弹层。

## 持续时间

```vue
<template>
  <div>
    <woo-button class="modal-ctrl" @click="show = true">1000ms</woo-button>
    <woo-modal :duration="1000" v-if="show">
      <div class="modal-demo">
        <woo-fonticon kind="dark" value="cross" @click.native="show = false"></woo-fonticon>
      </div>
    </woo-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
}
</script>

<style>
.modal-demo {
  width: 240px;
  height: 120px;
  background: #fff;
}
</style>
```

## 禁止窗口滚动

```vue
<template>
<div>
  <woo-button class="modal-ctrl" @click="show = true">弹窗滚动</woo-button>
  <woo-modal v-show="show" lock-screen>
    <div class="modal-demo3">
      <woo-fonticon kind="dark" value="cross" @click.native="show = false"></woo-fonticon>
      <div class="modal-scroll" @touchmove.stop>
        许多年以后，面对行刑队，奥雷良诺.布恩地亚上校将会回想起，他父亲带他去见识冰块的那个遥远的下午。那时的马贡多是一个有二十户人家的村落，用泥巴和芦苇盖的房屋就排列在一条河边。清澈的流水急急地流过，河心那些光滑、洁白的巨石，宛若史前动物留下的巨大的蛋。这块天地如此之新，许多东西尚未命名，提起它们时还须用手指指点点。
      </div>
    </div>
  </woo-modal>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
}
</script>

<style>
.modal-demo3 {
  width: 300px;
  background: #fff;
  padding: 20px;
}
.modal-scroll {
  height: 120px;
  overflow: auto;
}
</style>
```

## 内部可滚动模态

```vue
<template>
<div>
  <woo-button class="modal-ctrl" @click="show = true">内部可滚动模态</woo-button>
  <woo-modal v-if="show" lock-screen inside-scroll animation="slide-bottom">
    <div class="modal-demo3">
      <woo-fonticon kind="dark" value="cross" @click.native="show = false"></woo-fonticon>
      <div class="modal-scroll" @touchmove.stop>
        许多年以后，面对行刑队，奥雷良诺.布恩地亚上校将会回想起，他父亲带他去见识冰块的那个遥远的下午。那时的马贡多是一个有二十户人家的村落，用泥巴和芦苇盖的房屋就排列在一条河边。清澈的流水急急地流过，河心那些光滑、洁白的巨石，宛若史前动物留下的巨大的蛋。这块天地如此之新，许多东西尚未命名，提起它们时还须用手指指点点。
      </div>
      <woo-button @click="showLayer = !showLayer">出现</woo-button>
      <div class="abs" v-if="showLayer"></div>
    </div>
  </woo-modal>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showLayer: false
    };
  }
}
</script>

<style>
.modal-demo3 {
  width: 300px;
  background: #fff;
  padding: 20px;
}
.modal-scroll {
  height: 120px;
  overflow: auto;
}
.abs {
  position: absolute;
  width: 200px;
  height: 2000px;
  background: #fff;
}
</style>
```