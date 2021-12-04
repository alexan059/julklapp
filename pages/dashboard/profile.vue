<template>
  <FormSection @submit="onSubmit">

    <Title>Profile</Title>

    <p>Edit your profile here.</p>

    <div class="half">
      <EmojiPicker caption="Choose your avatar"/>

      <Field class="fullwidth" description="Choose your avatar emoji on the left (click).">
        <label>
          <input placeholder="Name" type="text">
        </label>
      </Field>
    </div>

    <div class="half">
      <div class="col bg fullwidth">
        <label>What I like</label>
        <EmojiPicker default="❓" caption="What I like"/>
      </div>
      <div class="col bg fullwidth">
        <label>What I don't like</label>
        <EmojiPicker default="❓" caption="What I don't like"/>
      </div>
    </div>

  </FormSection>
</template>

<script lang="ts" setup>
function onSubmit() {
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