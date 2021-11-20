<template>
  <button v-bind="$props">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
button {
  border: none;
  border-radius: 50px;
  padding: .75rem 1.125rem;
  font-size: 18px;
  font-weight: 300;
  background-color: #5352ed;
  color: #fcfcfc;

  align-self: center;
  min-width: 160px;

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
}
</style>