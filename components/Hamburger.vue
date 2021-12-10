<template>
  <button :class="['hamburger', { active }]" @click="toggle">
    <span/>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { beforeEach } = useRouter();

const emit = defineEmits(['open', 'close']);

const active = ref(false);

function toggle() {
  active.value = !active.value;
  (active.value) ? emit('open') : emit('close');
}

beforeEach(() => {
  active.value = false;
});
</script>

<style lang="scss" scoped>
.hamburger {
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 48px;
  font-size: 0;
  text-indent: -9999px;
  appearance: none;
  box-shadow: none;
  border-radius: 0;
  border: none;
  cursor: pointer;
  background: none;

  &:focus {
    outline: none;
  }

  span {
    display: block;
    position: absolute;
    top: 21px;
    left: 12px;
    right: 12px;
    height: 3px;
    background-color: #e0e0e0;
    border-radius: 8px;
    transition-property: background;
    transition-duration: 0.3s, 0.3s;
    transition-delay: 0.3s, 0s;

    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 3px;
      background-color: #e0e0e0;
      border-radius: 8px;
      transition-duration: 0.3s, 0.3s;
      transition-delay: 0.3s, 0s;
    }

    &:before {
      top: -8px;
      transition-property: top, transform;
    }

    &:after {
      bottom: -8px;
      transition-property: bottom, transform;
    }
  }

  &.active {
    span {
      background: none;

      &:before,
      &:after {
        transition-delay: 0s, 0.3s;
      }

      &:before {
        top: 0;
        transform: rotate(45deg);
      }

      &:after {
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }

}
</style>