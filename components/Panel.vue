<template>
  <div class="panel">
    <div class="panel__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="panel__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 380px;
  background-color: #fcfcfc;
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.12);

  &__body {
    display: flex;
    flex-direction: column;
    padding: 26px 36px;

    > *:not(:last-child) {
      margin-bottom: 2rem;
    }

  }

  &__footer {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 20px 48px;
    background-color: #f0f0f0;
  }
}
</style>