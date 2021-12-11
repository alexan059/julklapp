<template>
  <h3 :class="['title', { center }]">
    <slot/>
  </h3>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

interface TitleProps {
  center?: boolean;
}

const props = withDefaults(defineProps<TitleProps>(), { center: false });

const { center } = toRefs(props);
</script>

<style lang="scss" scoped>
.title {
  margin: 0 0 1rem 0 !important;
  color: #999;
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;

  &.center {
    text-align: center;
  }
}
</style>