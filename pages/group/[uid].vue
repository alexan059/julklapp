<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="!data || pending"/>
    <div class="content" v-else>
      <Title>{{ data.group.name }}</Title>
      <ul class="actions">
        <li><button>Invite</button></li>
        <li><button>Close</button></li>
        <li><button>Delete</button></li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';

const { params } = useRoute();

const { data, pending, refresh } = useAsyncData('group', () => $fetch('/api/group', { params: { uid: params.uid } }));

onMounted(refresh);

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

    button {
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