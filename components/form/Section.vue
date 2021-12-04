<template>
  <form class="form" @submit.prevent="onSubmitDelegate">
    <slot/>
    <AsyncButton center type="submit" :loading="loading">
      {{ submitLabel }}
    </AsyncButton>
  </form>
</template>

<script lang="ts" setup>

declare type OnSubmitCallback = (event: SubmitEvent) => Promise<void>;

interface FormSectionProps {
  onSubmit: OnSubmitCallback,
  loading?: boolean,
  submitLabel?: string
}

const { onSubmit, submitLabel, loading } = withDefaults(
    defineProps<FormSectionProps>(),
    { loading: false, submitLabel: 'Submit' },
);

const emit = defineEmits(['submit']);

const onSubmitDelegate = (e) => emit('submit', e);

</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;

  > :deep:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
