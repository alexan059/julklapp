<template>
  <FormSection @submit="onSubmit" :loading="state.loading" button-label="Update">

    <Title>Profile</Title>

    <p>Edit your profile here.</p>

    <div class="half">
      <EmojiPicker caption="Choose your avatar" v-model="state.avatar"/>

      <Field class="fullwidth" description="Choose your avatar emoji on the left (click).">
        <label>
          <input placeholder="Name" type="text" v-model="state.name">
        </label>
      </Field>
    </div>

    <div class="half">
      <div class="col bg fullwidth">
        <label>What I like</label>
        <EmojiPicker default="❓" caption="What I like" v-model="state.item_like"/>
      </div>
      <div class="col bg fullwidth">
        <label>What I dislike</label>
        <EmojiPicker default="❓" caption="What I dislike" v-model="state.item_dislike"/>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <ErrorMessage v-if="state.error && !state.loading">{{ state.error }}</ErrorMessage>
    </transition>

  </FormSection>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import useProfile from '~/composables/useProfile';

const initialState = {
  name: '',
  avatar: '',
  item_like: '',
  item_dislike: '',
  loading: false,
  error: '',
};

const [user, { updateProfile }] = useProfile();

const state = reactive({ ...initialState, ...user.value });

async function onSubmit() {
  state.loading = true;
  state.error = '';

  const { name, avatar, item_like, item_dislike } = state;
  const { error } = await updateProfile(name, avatar, item_like, item_dislike);

  if (error) {
    state.error = error;
    state.loading = false;
    return;
  }

  state.loading = false;
}
</script>

<style lang="scss" scoped>
.half {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  .fullwidth {
    flex-basis: 0;
    flex-grow: 1;
  }

  .bg {
    background-color: #f0f0f0;
    padding: .95rem 1.125rem;
    border-radius: 20px;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>