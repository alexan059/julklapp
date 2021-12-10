<template>
  <div class="digits">
    <input v-for="i in n"
           :ref="addInputRef"
           :disabled="disabled"
           :key="i"
           type="text"
           maxlength="1"
           @input="onInput"
           @keydown="onKeyDown">
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeUpdate } from 'vue';

const props = defineProps({
  digits: {
    type: Number,
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

let inputs = [];
const addInputRef = el => inputs.push(el);
onBeforeUpdate(() => inputs = []);
defineExpose({
  focus() {
    inputs[0].focus();
  },
  reset() {
    digits.splice(0, digits.length);
    inputs.forEach(input => input.value = '');
  },
});

const emit = defineEmits(['change']);

const n = [...Array(props.digits).keys()];
const digits = reactive([]);

function onInput(e: InputEvent) {
  const target = e.target as HTMLInputElement;
  const index = [...target.parentElement.children].indexOf(target);

  const nextTarget = target.nextSibling as HTMLInputElement;

  if (!isFinite(e.data as number)) {
    target.value = '';
    return;
  }

  if (nextTarget instanceof HTMLInputElement) {
    nextTarget.focus();
  }

  digits[index] = target.value;
  emit('change', digits.join(''));
}

function onKeyDown(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  const prevTarget = target.previousSibling as HTMLInputElement;

  if (prevTarget instanceof HTMLInputElement && e.key === 'Backspace') {
    prevTarget.value = '';
    prevTarget.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    prevTarget.focus();
  }
}
</script>

<style lang="scss" scoped>
.digits {
  display: flex;
  justify-content: center;

  input {
    width: 2rem;
    height: 2rem;
    text-align: center;
    background-color: #f0f0f0;
    margin: 0 .25rem;
    border: none;
    border-radius: 8px;
    font-size: 1.125rem;
    color: #333;

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: #e0e0e0;
      color: #a0a0a0;
      cursor: not-allowed;
    }
  }
}
</style>