<template>
  <EmojiIcon class="avatar" @click="open" :char="state.char"/>
  <Modal ref="modal" :show-button="false">
    <template #body>
      <Title v-if="props.caption" center>{{ props.caption }}</Title>
      <div class="list">
        <ul class="groups">
          <li v-for="group in groups"
              :class="[{selected: group.name === selectedGroup}]"
              @click="() => selectGroup(group.name)"
              :key="group.name">
            <EmojiIcon :char="group.char"/>
          </li>
        </ul>
        <div class="container">
          <EmojiIcon v-for="emoji in emojis" :char="emoji.char" @click="() => take(emoji)" :key="emoji.char" v-memo/>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ModalRef } from '~/components/Modal.vue';
import useEmojis from '~/composables/useEmojis';

interface EmojiPickerProps {
  default?: string;
  caption?: string;
}

const props = withDefaults(defineProps<EmojiPickerProps>(), { default: '😀', caption: '' });

const state = reactive({
  open: false,
  char: props.default,
  group: '',
});

const [emojis, groups, { selectGroup }, selectedGroup] = useEmojis();

const modal = ref<ModalRef>(null);

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

.groups {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1rem;

  :deep .emoji {
    height: 2em;
    width: 2em;

    &:hover {
      transform: scale(1.5);
    }
  }

  .selected :deep .emoji {
    transform: scale(1.5);
  }
}

.container {
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
    padding: .25em;

    &:hover {
      transform: scale(2);
    }
  }
}
</style>