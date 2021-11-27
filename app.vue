<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue';

const groups = ref([]);

 const updateGroups = async () => {
  const data = await $fetch('/api/groups');
  groups.value = data.groups;
}

onMounted(() => updateGroups());

provide('groups', groups);
provide('updateGroups', updateGroups);
</script>