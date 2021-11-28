<template>
  <div :class="['text-clip', { tooltipped }, 'tooltipped-n tooltipped-no-delay']" aria-label="Copied!" ref="clip"
       @click="() => tooltipped = true"
       @mouseleave="() => tooltipped = false"
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

const tooltipped = ref(false);

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

  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  color: #666666;
  cursor: pointer;
  border-radius: 8px;

  margin-bottom: 2rem !important;

  .icon {
    visibility: hidden;
  }

  &:hover {
    background-color: #e0e0e0;

    .icon {
      visibility: visible;
    }
  }
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

</style>