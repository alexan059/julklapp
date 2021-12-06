<template>
  <Button v-bind="$props" :center="center" :bottom="bottom" :primary="true" :disabled="disabled || loading">
    <IconSpinner v-if="loading" animate/>
    <slot v-else/>
  </Button>
</template>

<script lang="ts" setup>
interface AsyncButtonProps {
  loading?: boolean;
  disabled?: boolean;
  center?: boolean;
  bottom?: boolean;
}

const { loading, center, disabled, bottom } = withDefaults(defineProps<AsyncButtonProps>(), {
  loading: false,
  disabled: false,
  center: false,
  bottom: false,
});
</script>