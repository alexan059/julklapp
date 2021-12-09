<template>
  <div>
    <div id="snow"/>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { tsParticles } from 'tsparticles';
import { loadSnowPreset } from 'tsparticles-preset-snow';
import { provideGroups } from '~/composables/useGroups';
import { provideProfile } from '~/composables/useProfile';
import useAuth from '~/composables/useAuth';

const { isLoggedIn } = useAuth();

const [_, fetchGroups] = provideGroups();
const [__, fetchUser] = provideProfile();

onMounted(() => {
  isLoggedIn() && Promise.all([fetchGroups(true), fetchUser(true)]);

  loadSnowPreset(tsParticles);
  tsParticles.load('snow', {
    preset: 'snow',
    background: {
      opacity: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
#snow {
  position: fixed;
  z-index: -1;
}
</style>