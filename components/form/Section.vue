<template>
  <form class="form" @submit.prevent="(e) => emit('submit', e)">
    <slot/>
    <AsyncButton center bottom type="submit" :loading="props.loading">
      {{ props.buttonLabel }}
    </AsyncButton>
  </form>
</template>

<script lang="ts" setup>
interface FormSectionProps {
  loading?: boolean,
  buttonLabel?: string
}

const props = withDefaults(defineProps<FormSectionProps>(), { loading: false, buttonLabel: 'Submit' });

const emit = defineEmits(['submit']);
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  > :deep(:not(:last-child)) {
    margin-bottom: 2rem;
  }
}
</style>
