<template>
  <button :class="{ center }" v-bind="$props">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  center: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  min-width: 160px;

  border: none;
  border-radius: 50px;
  padding: .75rem 1.125rem;
  font-size: 18px;
  font-weight: 300;
  background-color: #5352ed;
  color: #fcfcfc;

  align-self: start;

  &.center {
    align-self: center;
  }

  &:hover {
    cursor: pointer;
    background-color: darken(#5352ed, 5%);
  }

  &:active {
    background-color: lighten(#5352ed, 10%);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
}
</style>