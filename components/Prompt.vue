<template>
  <Modal ref="modal">
    <slot/>
    <template #body>
      <Heading><slot name="text"></slot></Heading>
      <div class="actions">
        <Button @click="confirm" danger small><slot>Confirm</slot></Button>
        <Button @click="cancel" small>Cancel</Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ModalRef } from '~/components/Modal.vue';

const emit = defineEmits(['confirm']);

const modal = ref<ModalRef>(null);

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

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
}
</style>