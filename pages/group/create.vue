<template>
  <form class="form" @submit.prevent="onSubmit">

    <Title>Create a new Group</Title>

    <p>Choose an appropriate name for your group.</p>

    <Field description="Only lowercase without special character and spaces.">
      <label>
        <input placeholder="Group Name" type="text" v-model.trim="state.name">
      </label>
    </Field>

    <Field>
      <label>
        <textarea placeholder="Description" rows="4" v-model.trim="state.description"></textarea>
      </label>
    </Field>

    <transition name="fade" mode="out-in">
      <ErrorMessage v-if="state.error && !state.loading">{{ state.error }}</ErrorMessage>
    </transition>

    <AsyncButton center type="submit" :loading="state.loading">Create</AsyncButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const updateGroups = inject('updateGroups');

const initialState = {
  name: '',
  description: '',
  loading: false,
  error: '',
};

const state = reactive({ ...initialState });

async function onSubmit() {
  state.loading = true;
  const { exists } = await $fetch('/api/group/exists', { params: { name: state.name } });

  if (exists) {
    state.error = 'Name already exists.';
    state.loading = false;
    return;
  }

  try {
    const result = await $fetch('/api/group', {
      method: 'POST',
      body: { name: state.name, description: state.description },
    });

    await updateGroups();
    await router.push(`/group/${ result.uid }`);

    console.log(result);
  } catch (e) {
    state.error = e.data.statusMessage;
    state.loading = false;
  }
}

</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;

  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>