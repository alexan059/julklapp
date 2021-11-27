<template>
  <Modal ref="modal">
    <slot/>
    <template #modal>
      <Title><slot name="text"></slot></Title>
      <div class="actions">
        <Button @click="confirm" danger>Delete</Button>
        <Button @click="() => modal.hideModal()">Cancel</Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modal = ref(null);

const emit = defineEmits(['confirm']);
const confirm = () => {
  emit('confirm');
  modal.hideModal();
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>