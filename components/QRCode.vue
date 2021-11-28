<template>
  <img ref="codeImage" :src="codeImage.imageURL" :alt="codeImage.text">
</template>

<script lang="ts" setup>
import { watchEffect, reactive } from 'vue';
import QRCode from 'qrcode';

interface QRCodeProps {
  text: string;
}

const { text } = withDefaults(defineProps<QRCodeProps>(), { text: '' });

const codeImage = reactive({
  text,
  imageURL: '',
});

watchEffect(async () => {
  if (codeImage.text) {
    codeImage.imageURL = await QRCode.toDataURL(codeImage.text, {
      errorCorrectionLevel: 'L',
      color: { light: '#fcfcfc' },
    });
  }
});

</script>

<style lang="scss" scoped>
img {
  width: auto;
  height: auto;
}
</style>