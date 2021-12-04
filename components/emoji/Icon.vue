<template>
  <span v-html="emoji.img"/>
</template>

<script lang="ts" setup>
import twemoji from 'twemoji';
import { watchEffect, reactive } from 'vue';

interface EmojiProps {
  char: string;
}

const props = defineProps<EmojiProps>();

const emoji = reactive({
  img: '',
  ...props
});

watchEffect(() => {
  emoji.img = twemoji.parse(props.char, {
    folder: 'svg',
    ext: '.svg',
  });
});
</script>

<style lang="scss" scoped>
:deep .emoji {
  height: 1.5em;
  width: 1.5em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
</style>