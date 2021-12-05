<template>
  <div class="grid">
    <div class="user" v-for="user in users" :key="user.name">
      <EmojiIcon class="avatar" :char="user.avatar"/>
      <span class="name">{{ user.name }}</span>
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
  grid-template-columns: repeat(5, 1fr);
  gap: .5rem;
}

.user {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: .95rem 1.125rem;
  border-radius: 20px;
  border: 2px solid #f0f0f0;

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
  }
}
</style>