<template>
  <aside>
    <h3 class="title">Welcome</h3>
    <ul class="menu">
      <li>
        <NuxtLink to="/dashboard">
          <IconHome/>
          Dashboard
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/dashboard/profile">
          <IconUser/>
          Profile
        </NuxtLink>
      </li>
      <li>
        <a href="/logout">
          <IconLogout/>
          Logout
        </a>
      </li>
    </ul>
    <h3 class="title">Groups</h3>
    <ul v-if="groups" class="menu">
      <li>
        <NuxtLink to="/group/create">
          <IconPlus/>
          New Group
        </NuxtLink>
      </li>
      <li v-for="group in groups" :key="group.uid">
        <NuxtLink :to="`/group/${ group.uid }`">
          #{{ group.name }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import useGroups from '~/composables/useGroups';

const [groups] = useGroups();
</script>

<style lang="scss" scoped>
.title {
  margin-top: 0;
  color: #aaa;
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
}

ul.menu {
  margin: 0;
  overflow-x: hidden;
  word-break: break-all;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  li {
    color: #666;
    margin-bottom: .5rem;

    border-radius: 8px;
    font-size: .825rem;

    a {
      display: flex;
      align-items: center;
      padding: .5rem .75rem;
      color: currentColor;
      border-radius: 8px;
      text-decoration: none;
      text-transform: uppercase;


      &.router-link-exact-active {
        color: #5352ed;
        font-weight: 600;
      }

      .icon {
        margin-right: .5rem
      }
    }

    &:hover {
      background-color: #e0e0e0;
    }
  }
}
</style>