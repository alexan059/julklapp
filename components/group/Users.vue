<template>
  <div class="grid">
    <div :class="['user', {'match':user?.item_like}]" v-for="user in users" :key="user.name">
      <EmojiIcon class="avatar" :char="user.avatar"/>
      <span class="name">{{ user.name }}</span>
      <div class="items" v-if="user?.item_like">
        <EmojiIcon class="item tooltip" aria-label="I like" :char="user.item_like"/>
        <EmojiIcon class="item tooltip" aria-label="I dislike" :char="user.item_dislike"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from '~/types';

interface GroupUsersProps {
  users: User[];
}

const { users } = defineProps<GroupUsersProps>();
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: .5rem;
}

.user {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: .95rem 1.125rem;
  border-radius: 20px;
  border: 2px solid #f0f0f0;

  &.match {
    border-color: lighten(#ff4757, 20%);
  }

  .avatar {
    margin-bottom: .25rem;

    :deep(.emoji) {
      width: 4em;
      height: 4em;
    }
  }

  .name {
    font-size: 1.25rem;
    font-weight: 300;
    word-break: break-all;
    text-align: center;
  }

  .items {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
}
</style>