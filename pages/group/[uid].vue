<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="!data || pending"/>
    <div class="content" v-else>
      <Title>{{ data.group.name }}</Title>
      <ul class="actions">
        <li>
          <button>Invite</button>
        </li>
        <li>
          <button>Close</button>
        </li>
        <li>
          <Prompt @confirm="deleteGroup">
            Delete
            <template #text>
              Are you sure?
            </template>
          </Prompt>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData } from '#app';

const { params } = useRoute();
const router = useRouter();

const { data, pending, refresh } = useAsyncData('group', () => $fetch('/api/group', { params: { uid: params.uid } }));

onMounted(refresh);

const updateGroups = inject('updateGroups');

async function deleteGroup() {
  const { success } = await $fetch('/api/groups', { method: 'DELETE', params: { uid: params.uid } });

  if (!success) {
    alert('Oops, something went wrong!');
  }

  updateGroups();
  await router.push('/lobby');
}

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;

  * > {
    margin-bottom: 2rem;
  }
}

ul.actions {
  display: flex;

  li {
    &:not(:first-child) {
      margin-left: .575rem;
    }

    &:deep button {
      padding: 4px 16px;
      background-color: #e0e0e0;
      color: #999999;
      border: none;
      cursor: pointer;
      font-size: 10px;
      border-radius: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;

      &:hover {
        background-color: darken(#e0e0e0, 10%);
        color: darken(#999999, 10%);
      }

      &:active {
        background-color: darken(#e0e0e0, 20%);
        color: darken(#999999, 20%);
      }
    }
  }
}
</style>