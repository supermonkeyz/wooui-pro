<template>
  <Box
    align="center"
    :class="[$style.main, cur && $style.cur]"
    @click.native="clickHandle"
    :tag="tag"
    role="button"
  >
    <span :class="$style.icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <slot />
  </Box>
</template>

<script>
import * as Box from '../box';

export default {
  name: 'woo-pop-item',
  components: {
    Box: Box.Box
  },
  props: {
    cur: Boolean,
    tag: String
  },
  methods: {
    clickHandle() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-pop-item-hover: var(--w-color-gray-9);
  --w-pop-item-icon: 18px;
}

.main {
  padding: 15px 20px;
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
  color: var(--w-main);
  text-decoration: none;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;

  &:hover {
    background-color: var(--w-pop-item-hover);
  }
}

.cur {
  color: var(--w-brand);
}

.icon {
  font-size: var(--w-pop-item-icon);
  display: inherit;
  margin-right: 6px;

  & > img,
  & > svg {
    width: var(--w-pop-item-icon);
    height: var(--w-pop-item-icon);
  }
}
</style>
