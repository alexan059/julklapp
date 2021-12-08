<template>
  <img ref="codeImage" :src="imageURL" :alt="text">
</template>

<script lang="ts" setup>
import { watchEffect, toRefs, ref } from 'vue';
import QRCode from 'qrcode';

interface QRCodeProps {
  text: string;
}

const props = withDefaults(defineProps<QRCodeProps>(), { text: '' });

const { text } = toRefs(props);

const imageURL = ref('');

watchEffect(async () => {
  imageURL.value = await QRCode.toDataURL(text.value, {
    errorCorrectionLevel: 'L',
    color: { light: '#fcfcfc' },
  });
});

</script>

<style lang="scss" scoped>
img {
  width: auto;
  height: auto;
}
</style>