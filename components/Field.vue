<template>
  <div class="field">
    <slot/>
    <p v-if="description">
      <small>{{ description }}</small>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  description: String
});
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

  ::v-slotted(label) {
    display: flex;
    align-items: center;
    margin-bottom: .25rem;
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: .5rem 1.125rem;

    .icon {
      color: #aaa;
      margin-right: .35rem;
    }

    textarea {
      resize: vertical;
    }

    input, textarea {
      flex-grow: 1;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 400;
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