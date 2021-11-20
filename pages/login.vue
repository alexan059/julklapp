<template>
  <Center>
    <form @submit.prevent="submit">
      <Panel>

        <HeroTitle>Login</HeroTitle>

        <div class="field">
          <label>
            <IconEnvelope/>
            <input placeholder="Email" type="email" name="email" v-model.trim="email">
          </label>
          <p>
            <small>Type your email to receive a login url.</small>
          </p>
        </div>

        <template #footer>
          <Button type="submit">Submit</Button>
        </template>

      </Panel>
    </form>
  </Center>
</template>

<script lang="ts" setup>
import { useState } from '#app';
import HeroTitle from '~/components/HeroTitle.vue';

const email = useState<string>('email', () => 'alex@mail.de');

async function submit() {
  const response = await $fetch('/api/auth', { method: 'POST', body: { email: email.value } });
  console.log(response);
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    text-align: center;
    color: #666;
  }

  label {
    display: flex;
    margin-bottom: .25rem;
    background-color: #f0f0f0;
    border-radius: 50px;
    padding: .5rem 1.125rem;

    .icon {
      color: #aaa;
      margin-right: .35rem;
    }

    input {
      background: none;
      border: none;
      font-size: 1.125rem;
      color: #333;

      &::placeholder {
        color: #aaa;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>

