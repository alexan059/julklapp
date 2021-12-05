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

const [_, { joinGroup, fetchGroups }] = useGroups();

const { query } = useRoute();
const router = useRouter();

onMounted(async () => {
  await fetchGroups();

  if (query?.ref) {
    const { success, redirect } = await joinGroup(query.ref);

    if (success) {
      await router.push(redirect);
    }
  }
});
</script>