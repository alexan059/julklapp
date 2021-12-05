<template>
  <NuxtChild/>
</template>

<script lang="ts">
export default {
  layout: 'board',
};
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import useGroups from '~/composables/useGroups';
import useProfile from '~/composables/useProfile';

const [_, { joinGroup, fetchGroups }] = useGroups();
const [__, { fetchUser }] = useProfile();

const { query } = useRoute();
const router = useRouter();

onMounted(async () => {
  await Promise.all([fetchGroups(), fetchUser()]);

  if (query?.ref) {
    const { success, redirect } = await joinGroup(query.ref as string);

    if (success) {
      await router.push(redirect);
    }
  }
});
</script>