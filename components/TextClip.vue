<template>
  <div :class="['text-clip', { tooltip }]" aria-label="Copied!" ref="clip"
       @click="() => tooltip = true"
       @mouseleave="() => tooltip = false"
       :data-clipboard-text="value">
    <span class="spacer"/>
    <span class="text">
      <slot/>
    </span>
    <IconCopy/>
  </div>
</template>

<script lang="ts" setup>
import ClipboardJS from 'clipboard';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const tooltip = ref(false);

const clip = ref<HTMLElement | null>(null);
const clipboard = ref<ClipboardJS>();

onMounted(() => {
  clipboard.value = new ClipboardJS(clip.value as HTMLElement);
});

onBeforeUnmount(() => {
  clipboard.value?.destroy();
});

defineProps({
  value: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.text-clip {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  color: #666666;
  cursor: pointer;
  border-radius: 8px;

  margin-bottom: 2rem !important;

  .icon {
    visibility: hidden;
  }

  .text {
    font-size: 12px;
    line-height: 16px;
    margin: 0 .55rem;
    max-width: 16rem;
    white-space: nowrap;
    overflow: hidden;
  }

  .spacer {
    width: 20px;
  }

  &:hover {
    background-color: #e0e0e0;

    .icon {
      visibility: visible;
    }
  }
}

</style>