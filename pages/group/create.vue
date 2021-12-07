<template>
  <FormSection @submit="onSubmit" :loading="state.loading" button-label="Create">

    <Title>Create a new Group</Title>

    <p>Choose an appropriate name for your group.</p>

    <Field description="Only lowercase without special character and spaces.">
      <label>
        <input placeholder="Group Name" type="text" v-model.trim="state.name">
      </label>
    </Field>

<!--    <Field>
      <label>
        <textarea placeholder="Description" rows="4" v-model.trim="state.description"></textarea>
      </label>
    </Field>-->

    <transition name="fade" mode="out-in">
      <ErrorMessage v-if="state.error && !state.loading">{{ state.error }}</ErrorMessage>
    </transition>

  </FormSection>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useGroups from '~/composables/useGroups';

const router = useRouter();

const [_, { createGroup }] = useGroups();

const initialState = {
  name: '',
  description: '',
  loading: false,
  error: '',
};

const state = reactive({ ...initialState });

async function onSubmit() {
  state.loading = true;
  state.error = '';

  const { uid, error } = await createGroup(state.name, state.description);

  if (error) {
    state.error = error;
    state.loading = false;
    return;
  }

  await router.push(`/group/${ uid }`);
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