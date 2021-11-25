<template>
  <aside>
    <h3 class="title">Welcome</h3>
    <ul class="menu">
      <li>
        <NuxtLink to="/lobby/create">
          <IconPlus/>
          New Group
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/lobby/settings">
          <IconSettings/>
          Settings
        </NuxtLink>
      </li>
      <li>
        <a href="/logout">
          <IconLogout/>
          Logout
        </a>
      </li>
    </ul>
    <h3 class="title">Lobby</h3>
    <ul class="menu">
      <li>
        <NuxtLink to="/group/njDvzwttIHbO">
          #group1
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/group/z5ETu8BrLeAq">
          #group2
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>

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

      &.router-link-active {
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