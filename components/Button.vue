<template>
  <button :class="{ center, danger, primary }" v-bind="$props">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  center: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  }
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
  background-color: #999999;
  color: #fcfcfc;

  align-self: start;

  &.danger {
    background-color: darken(#ff4757, 20%);
  }

  &.primary {
    background-color: #5352ed;
  }

  &.center {
    align-self: center;
  }

  &:hover {
    cursor: pointer;
    background-color: darken(#999999, 5%);

    &.danger {
      background-color: darken(#ff4757, 25%);
    }
    &.primary {
      background-color: darken(#5352ed, 5%);
    }
  }

  &:active {
    background-color: lighten(#999999, 10%);

    &.danger {
      background-color: darken(#ff4757, 10%);
    }
    &.primary {
      background-color: lighten(#5352ed, 10%);
    }
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    &, &:hover, &:active {
      background-color: #666;
      cursor: not-allowed;
    }
  }
}
</style>