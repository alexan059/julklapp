<template>
  <Center>
    <form @submit.prevent>
      <Panel>
        <HeroTitle>
          Type your code
        </HeroTitle>

        <DigitInput @change="onChange"/>

        <template #footer>
          <Button type="submit">Submit</Button>
        </template>
      </Panel>
    </form>
  </Center>
</template>

<script lang="ts" setup>
import DigitInput from '~/components/DigitInput.vue';

function onChange(e) {
  console.log(e);
}
</script>

<style lang="scss" scoped>

</style>