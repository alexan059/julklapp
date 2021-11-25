<template>
  <svg :class="['icon spinner', { animate }, iconSize]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle stroke-opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path stroke-opacity="0.75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

interface SpinnerProps {
  animate?: boolean;
  size?: 'default' | '2x';
}

const { animate, size } = withDefaults(defineProps<SpinnerProps>(), { animate: false, size: 'default' });

const iconSize = computed(() => size !== 'default' && `icon-${ size }`);
</script>