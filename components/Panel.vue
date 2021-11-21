<template>
  <div class="panel">
    <div ref="contentWrapper" class="panel__body">
      <div ref="innerContent" class="panel__body__content">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="panel__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const contentWrapper = ref<null | any>(null);
const innerContent = ref<null | any>(null);

let panelObserver: ResizeObserver;

function calculateContentHeight(el) {
  const style = getComputedStyle(el);
  const margin = parseInt(style.marginTop) + parseInt(style.marginBottom);

  return el.offsetHeight + margin;
}

onMounted(() => {
  panelObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      if (entry.target === innerContent.value) {
        const contentHeight = calculateContentHeight(entry.target);
        contentWrapper.value.style.height = contentHeight + 'px';
      }
    }
  });
  panelObserver.observe(innerContent.value);
});

onBeforeUnmount(() => panelObserver.disconnect());

</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 380px;
  background-color: #fcfcfc;
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.12);


  &__body {
    padding: 26px 36px;
    overflow: hidden;
    transition: height 200ms ease-out;

    &__content {
      display: flex;
      flex-direction: column;

      > *:not(:last-child) {
        margin-bottom: 2rem;
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
}
</style>