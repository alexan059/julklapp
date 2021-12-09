<template>
  <Center>
    <form @submit.prevent="submit">
      <Panel>

        <transition name="fade" mode="out-in">
          <HeroTitle v-if="!state.verification">Login</HeroTitle>
          <HeroTitle v-else>Type your code</HeroTitle>
        </transition>

        <transition @after-enter="afterEnter" name="fade" mode="out-in">
          <Field v-if="!state.verification" description="Type your email to receive a login url.">
            <label>
              <IconEnvelope/>
              <input placeholder="Email" type="email" name="email" v-model.trim="email">
            </label>
          </Field>
          <DigitInput v-else ref="digitInput" :disabled="state.loading" @change="onDigitsChange"/>
        </transition>

        <transition name="fade">
          <ErrorMessage v-if="state.error && !state.loading">{{ state.error }}</ErrorMessage>
        </transition>

        <template #footer>
          <AsyncButton type="submit" center :disabled="state.verification" :loading="state.loading">
            <span v-if="!state.verification">Submit</span>
            <span v-else>{{ time }}s</span>
          </AsyncButton>
        </template>

      </Panel>
    </form>
  </Center>
</template>

<script lang="ts" setup>
import { useState } from '#app';
import { reactive, ref, nextTick, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useTimer from '~/composables/useTimer';
import useAuth from '~/composables/useAuth';

const { query } = useRoute();
const router = useRouter();

const [time, startTimer, stopTimer] = useTimer();
const { logIn, logOut } = useAuth();

const email = useState<string>('email', () => '');
const state = reactive({
  loading: false,
  verification: false,
  error: '',
});

onMounted(() => logOut()); // login route is skipped if logged in

const digitInput = ref<null | any>(null);

function afterEnter() {
  state.loading = false;
  digitInput.value?.focus();
}

async function onDigitsChange(otp) {
  if (otp.length === 4) {
    state.error = '';
    state.loading = true;

    try {
      const { success } = await $fetch('/api/auth', { method: 'POST', body: { email: email.value, otp } });

      if (success) {
        stopTimer();
        logIn();
        await router.push({ path: '/dashboard', query });
      }
    } catch (e) {
      if (e.data.statusCode === 401) {
        state.loading = false;
        state.error = 'Code invalid.';
        digitInput.value.reset();
        await nextTick(() => digitInput.value.focus());
      }
    }
  }
}

async function submit() {
  state.error = '';
  state.loading = true;
  const { expires, success } = await $fetch('/api/auth', { method: 'POST', body: { email: email.value } });

  if (success) {
    state.loading = false;
    state.verification = true;
    startTimer(expires, () => {
      state.error = 'Timeout.';
      state.verification = false;
      state.loading = true;
    });
  }
}
</script>

<style lang="scss" scoped>

</style>

