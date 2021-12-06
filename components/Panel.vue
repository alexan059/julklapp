<template>
  <div class="panel" :style="{ width }">
    <div ref="contentWrapper" class="panel__resize-wrapper">
      <div ref="innerContent" class="panel__content-wrapper">
        <div v-if="layout === 'sidebar' && $slots.sidebar" class="panel__sidebar">
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
import { ref } from 'vue';
import useResizer from '~/composables/useResizer';

interface PanelProps {
  layout?: 'default' | 'sidebar';
  width?: 'auto' | string;
}

const { layout, width } = withDefaults(defineProps<PanelProps>(), { layout: 'default', width: 'auto' });

const contentWrapper = ref<null | any>(null);
const innerContent = ref<null | any>(null);

useResizer(contentWrapper, innerContent);

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

  &__resize-wrapper {
    transition: height 200ms ease-out;
    overflow: hidden;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: row;
    max-height: 60vh;
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
  }

  &__footer {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 20px 48px;
    background-color: #f0f0f0;
  }
}
</style>