<template>
  <button :class="{ center, danger, primary, small, bottom }" :disabled="disabled">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

interface ButtonProps {
  disabled?: boolean;
  center?: boolean;
  danger?: boolean;
  primary?: boolean;
  small?: boolean;
  bottom?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  center: false,
  danger: false,
  primary: false,
  small: false,
  bottom: false,
});

const { center, danger, primary, small, bottom, disabled } = toRefs(props);
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
  font-weight: 400;
  background-color: #999999;
  color: #fcfcfc;

  align-self: start;

  &.small {
    height: 36px;
    padding: .325rem .5625rem;
    font-size: 14px;
  }

  &.danger {
    background-color: darken(#ff4757, 20%);
  }

  &.primary {
    background-color: #5352ed;
  }

  &.center {
    align-self: center;
  }

  &.bottom {
    margin-top: auto;
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