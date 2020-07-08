<template>
  <div id="app">
    <!-- <woo-icon symbol="vyellow" :size="24" class="icon-n"></woo-icon>
    <woo-fonticon value="chat"></woo-fonticon> -->
    <woo-button loading>loading</woo-button>
    <!-- <Icon symbol="vyellow">22</Icon> -->
    <div style="width: 100px; height: 100px" v-active>
      <div
        style="width: 50px; height: 50px; background: #ccc"
        v-active-stop
      ></div>
    </div>

    <woo-pop @click-outside="test" :show="show">
      <template v-slot:ctrl>
        <woo-button @click="show = true" class="main">点击出浮层</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
    <woo-pop>
      <template v-slot:ctrl>
        <woo-button>1</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
    <woo-pop @click-outside="test1" :show="show1">
      <template v-slot:ctrl>
        <woo-button @click="show1 = true" class="main">2</woo-button>
      </template>
      <div class="main layer">
        弹层
      </div>
    </woo-pop>
  </div>
</template>

<script>
// import Icon from '../components/icon';
import Button from '../components/button';

export default {
  name: 'app',
  components: {
    'woo-button': Button
  },
  data() {
    return {
      show: false,
      show1: false
    };
  },
  methods: {
    test() {
      console.log('0');
      this.show = false;
    },
    test1() {
      console.log('1');
      this.show1 = false;
    }
  },
  mounted() {
    console.log('x');
  }
};
</script>

<style lang="postcss" module>
.title {
  color: black;
  font-size: 32px;
  border-bottom: 1px;
  font-family: system-ui;
}

.btn {
  margin-right: 8px;
  vertical-align: top;
}
</style>
