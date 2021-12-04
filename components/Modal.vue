<template>
  <button v-if="props.showButton" @click="show">
    <slot/>
  </button>
  <teleport to="body">
    <transition name="fade" mode="out-in">
      <div v-if="open" class="modal">
        <div class="background"></div>
        <Center @click.self="hide" class="modal-body">
          <Panel>
            <div class="modal-content">
              <slot name="body"/>
            </div>
          </Panel>
        </Center>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface ModalExpose {
  show: () => void;
  hide: () => void;
}

export declare type ModalRef = ModalExpose|null;

interface ModalProps {
  showButton: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), { showButton: true });
const emit = defineEmits(['show', 'hide']);

const open = ref(false);

const show = () => {
  open.value = true;
  emit('show');
};
const hide = () => {
  open.value = false;
  emit('hide');
};

defineExpose<Modal>({
  show,
  hide,
});
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, .25);
  }

  &-body {
    position: relative;
  }

  &-content {
    p {
      align-self: center;
      margin-bottom: 2rem;
    }
  }
}
</style>