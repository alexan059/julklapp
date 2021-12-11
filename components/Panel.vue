<template>
  <div class="panel">
    <div v-if="layout === 'sidebar' && $slots.sidebar" class="panel__sidebar__toggle">
      <Hamburger @open="() => open = true" @close="() => open = false"/>
    </div>
    <div ref="contentWrapper" class="panel__resize-wrapper">
      <div ref="innerContent" class="panel__content-wrapper">
        <div v-if="layout === 'sidebar' && $slots.sidebar" :class="['panel__sidebar__background', { open }]"/>
        <div v-if="layout === 'sidebar' && $slots.sidebar" :class="['panel__sidebar', { open }]">
          <slot name="sidebar"/>
        </div>
        <div class="panel__body">
          <slot/>
        </div>
      </div>
    </div>
    <div v-if="layout === 'default' && $slots.footer" class="panel__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import useResizer from '~/composables/useResizer';
import { useRouter } from 'vue-router';

const { beforeEach } = useRouter();

interface PanelProps {
  layout?: 'default' | 'sidebar';
  width?: 'auto' | string;
}

const props = withDefaults(defineProps<PanelProps>(), { layout: 'default', width: 'auto' });
const { layout, width } = toRefs(props);

const open = ref(false);

const contentWrapper = ref<null | any>(null);
const innerContent = ref<null | any>(null);

useResizer(contentWrapper, innerContent);

beforeEach(() => {
  open.value = false;
});
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-height: 60vh;
  overflow: hidden;
  background-color: #fcfcfc;
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.12);

  &.wide {
    width: 70vw;

    @media screen and (max-width: 767px) {
      width: 90vw;
    }
  }

  &__resize-wrapper {
    transition: height 200ms ease-out;
    overflow: hidden;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: row;
    max-height: 60vh;

    @media screen and (max-width: 767px) {
      max-height: 80vh;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 26px 36px;
    overflow-y: auto;
  }

  &__sidebar {
    padding: 26px 36px;
    min-width: 150px;
    background-color: #f0f0f0;
    overflow-y: auto;

    &__toggle {
      position: fixed;
      display: none;
      top: 0;
      right: 0;
      background: rgb(255, 255, 255);
      background: linear-gradient(-135deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 50%);
      z-index: 10;

      @media screen and (max-width: 767px) {
        display: block;
      }
    }

    &__background {
      position: fixed;
      display: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      opacity: 0;
      pointer-events: none;
      transition-property: opacity;
      transition-duration: 0.3s, 0.3s;
      z-index: 5;

      &.open {
        opacity: 1;
      }

      @media screen and (max-width: 767px) {
        display: block;
      }
    }

    @media screen and (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 60vw;
      min-width: initial;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.12);
      transform-origin: 0 0;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
      z-index: 10;

      &.open {
        transform: translate(0, 0);
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 20px 48px;
    background-color: #f0f0f0;
  }

  @media screen and (max-width: 767px) {
    min-width: initial;
    max-width: 90vw;
    max-height: initial;
  }
}
</style>