<template>
  <Modal ref="modal">
    <slot/>
    <template #body>
      <Title><slot name="text"></slot></Title>
      <div class="actions">
        <Button @click="confirm" danger small>Delete</Button>
        <Button @click="cancel" small>Cancel</Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm']);

const modal = ref(null);

const confirm = () => {
  modal.value?.hide();
  emit('confirm');
};

const cancel = () => modal.value?.hide();

</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>