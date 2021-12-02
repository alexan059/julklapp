<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="!data || pending"/>
    <div class="content" v-else>
      <Title>{{ data.group.name }}</Title>
      <ul class="actions">
        <li>
          <Modal @show="onOpenModal" @hide="onHideModal" ref="invitationModal">
            Invite
            <template #body>
              <transition name="fade" mode="out-in">
                <Loader v-if="!invitationURL"/>
                <div v-else class="invite-modal">
                  <Title>Invite your friends</Title>
                  <p>Scan QR Code</p>
                  <QRCode :text="invitationURL"/>
                  <p>Or Copy Link (click)</p>
                  <TextClip :value="invitationURL">
                    {{ invitationURL }}
                  </TextClip>
                  <Button @click="invitationModal?.hide" center small>Close</Button>
                </div>
              </transition>
            </template>
          </Modal>
        </li>
        <li v-if="data.group.is_admin">
          <button>Close</button>
        </li>
        <li v-if="data.group.is_admin">
          <Prompt @confirm="onDeleteGroup">
            Delete
            <template #text>
              Are you sure?
            </template>
          </Prompt>
        </li>
        <li v-else>
          <Prompt @confirm="onLeaveGroup">
            Leave
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData } from '#app';
import useGroups from '~/composables/useGroups';

const { params, fullPath } = useRoute();
const router = useRouter();

const [_, { deleteGroup, leaveGroup }] = useGroups();

const { data, pending, refresh } = useAsyncData('group', () => $fetch('/api/group', { params: { uid: params.uid } }));

const invitationURL = ref('');
const invitationModal = ref(null);

onMounted(refresh);

async function onDeleteGroup() {
  const success = await deleteGroup(params.uid);

  if (!success) { // TODO Notification
    return alert('Oops, something went wrong!');
  }

  await router.push('/lobby');
}

async function onLeaveGroup() {
  await leaveGroup(params.uid);

  await router.push('/lobby');
}

const onHideModal = () => invitationURL.value = '';
async function onOpenModal() {
  const data = await $fetch('/api/group/invitation', { params: { uid: params.uid } });
  invitationURL.value = data.url;
}

</script>

<style lang="scss" scoped>
.invite-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.content {
  display: flex;
  flex-direction: column;

  > * {
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