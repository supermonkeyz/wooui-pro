<template>
  <woo-box align="center" class="demo">
    <woo-avatar
      verified="vgold"
      src="//tva4.sinaimg.cn/crop.0.32.687.687.180/621ff2c2jw1em78i0mk5kj20j60y3117.jpg"
      class="avatar-users"
    >
    </woo-avatar>
    <woo-input
      v-model="value"
      :placeholder="placeholder"
      style="font-size: 14px"
      class="input"
    />
    <woo-tip v-if="value" class="tip" />
  </woo-box>
</template>

<script>
export default {
  props: {
    placeholder: String
  },
  data() {
    return {
      value: ''
    };
  },
  watch: {
    value(val) {
      this.$_wooBus.$emit('customComponentValue', val);
    }
  }
};
</script>

<style scoped>
.demo {
  padding-top: 60px;
}
.input {
  margin-left: 10px;
  width: 120px;
}
.tip {
  margin-left: 5px;
}
</style>
