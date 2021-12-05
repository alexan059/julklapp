<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { provideGroups } from '~/composables/useGroups';
import { provideProfile } from '~/composables/useProfile';
import useAuth from '~/composables/useAuth';

const { isLoggedIn } = useAuth();

const [_, fetchGroups] = provideGroups();
const [__, fetchUser] = provideProfile();

onMounted(() => isLoggedIn() && Promise.all([fetchGroups(true), fetchUser(true)]));
</script>