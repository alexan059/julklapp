<template>
  <FormSection @submit="onSubmit">

    <Title>Profile</Title>

    <p>Edit your profile here.</p>

    <div class="half">
      <EmojiPicker/>

      <Field description="Choose your avatar emoji on the left (click).">
        <label>
          <input placeholder="Name" type="text" >
        </label>
      </Field>
    </div>

  </FormSection>
</template>

<script lang="ts" setup>
function onSubmit() {}
</script>

<style lang="scss" scoped>
.half {
  display: flex;
  flex-direction: row;
  align-items: center;

  :deep .field {
    flex-grow: 1;
    margin-left: 2rem;
  }
}
</style>