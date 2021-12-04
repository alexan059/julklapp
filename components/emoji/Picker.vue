<template>
  <EmojiIcon class="avatar" @click="open" :char="state.char"/>
  <Modal ref="modal" :show-button="false">
    <template #body>
      <Title center>Choose your avatar</Title>
      <div class="list">
        <EmojiIcon v-for="emoji in emojis" :char="emoji.char" @click="() => take(emoji)" :key="emoji.char" v-memo/>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import emojiJSON from 'emoji.json';
import { reactive, ref } from 'vue';
import { ModalRef } from '~/components/Modal.vue';

const state = reactive({
  open: false,
  char: emojiJSON[0].char,
});

const modal = ref<ModalRef>(null);

const emojis = emojiJSON
    .filter(e => e.group.match('Smileys & Emotion'))
    .filter(e => e.codes.split(' ').length === 1);

function open() {
  modal.value?.show();
  state.open = true;
}

function take({ char }: Emoji) {
  modal.value?.hide();
  state.char = char;
  state.open = false;
}

</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;

  :deep .emoji {
    height: 4em;
    width: 4em;
  }
}

.list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  justify-content: space-between;
  grid-gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 250px;
  max-width: 300px;
  padding: .95rem 1.125rem;

  background-color: #f0f0f0;
  border-radius: 20px;

  :deep .emoji {
    height: 2em;
    width: 2em;
    //margin: auto;
    padding: .25em;
    vertical-align: -0.1em;

    &:hover {
      transform: scale(2);
    }
  }
}
</style>