<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="!data || pending"/>
    <div v-else>{{ data }}</div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';

const { params } = useRoute();

const { data, pending, refresh } = useAsyncData('group', () => $fetch('/api/group', { params: { uid: params.uid } }));

onMounted(refresh);

</script>