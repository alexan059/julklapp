<template>
  <Button v-bind="$props" :center="center" :primary="true" :disabled="disabled || loading">
    <IconSpinner v-if="loading" animate/>
    <slot v-else/>
  </Button>
</template>

<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
});
</script>