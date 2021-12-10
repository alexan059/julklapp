<template>
  <div class="center">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.center {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>