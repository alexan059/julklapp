<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { provideGroups } from '~/composables/useGroups';
import { provideProfile } from '~/composables/useProfile';

const [_, fetchGroups] = provideGroups();
const [__, fetchUser] = provideProfile();

onMounted(() => Promise.all([fetchGroups(true), fetchUser(true)]));
</script>