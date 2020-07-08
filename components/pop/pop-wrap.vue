<template>
  <div :class="$style.main"><slot /></div>
</template>

<script>
export default {
  name: 'woo-pop-wrap'
};
</script>

<style lang="postcss" module>
:root {
  --w-pop-wrap-radius: 7px;
}
.main {
  overflow: hidden;
  border-radius: var(--w-pop-wrap-radius);
}
</style>
