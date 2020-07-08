<template>
  <div :class="$style.main">
    <h4 :class="$style.title" v-if="title">{{ title }}</h4>
    <slot />
    <woo-divider v-if="title" />
  </div>
</template>

<script>
export default {
  name: 'woo-pop-group',
  props: {
    title: String
  }
};
</script>

<style lang="postcss" module>
.title {
  color: var(--w-color-gray-7);
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  margin: 0;
  padding: 10px 20px;
}
</style>
