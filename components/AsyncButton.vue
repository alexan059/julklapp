<template>
  <Button :center="center" :bottom="bottom" :primary="true" :disabled="disabled || loading">
    <IconSpinner v-if="loading" animate/>
    <slot v-else/>
  </Button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

interface AsyncButtonProps {
  loading?: boolean;
  disabled?: boolean;
  center?: boolean;
  bottom?: boolean;
}

const props = withDefaults(defineProps<AsyncButtonProps>(), {
  loading: false,
  disabled: false,
  center: false,
  bottom: false,
});

const { loading, disabled, center, bottom } = toRefs(props);
</script>