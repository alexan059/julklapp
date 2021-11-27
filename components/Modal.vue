<template>
  <button @click="showModal">
    <slot/>
  </button>
  <teleport to="body">
    <transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <div class="background"></div>
        <Center @click.self="hideModal" class="modal-body">
          <Panel>
            <div class="modal-content">
              <slot name="modal"/>
            </div>
          </Panel>
        </Center>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);

const showModal = () => show.value = true;
const hideModal = () => show.value = false;

defineExpose({
  showModal,
  hideModal,
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