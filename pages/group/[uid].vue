<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="pending"/>
    <div v-else>{{ data }}</div>
  </transition>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';

const { params } = useRoute();

const { data, pending } = useAsyncData('group', () => $fetch('/api/group', { params: { uid: params.uid } }))

</script>