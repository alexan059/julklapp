<template>
  <button @click="showModal">
    <slot/>
  </button>
  <teleport to="body">
    <transition name="fade" mode="out-in">
      <div v-if="show" class="prompt">
        <div class="background"></div>
        <Center @click.self="hideModal" class="prompt-body">
          <Panel>
            <div class="prompt-content">
              <Title>Are you sure?</Title>
              <div class="prompt-actions">
                <Button @click="confirm" danger>Delete</Button>
                <Button @click="hideModal">Cancel</Button>
              </div>
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

const emit = defineEmits(['confirm']);
const confirm = () => {
  emit('confirm');
  hideModal();
}
</script>

<style lang="scss" scoped>
.prompt {
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

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>