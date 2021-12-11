<template>
  <div class="content">
    <Heading>Dashboard</Heading>
    <p>Welcome to the Julklapp App.</p>
    <p>Please select your group or create a new one and invite your friends.</p>
    <p>You can change your name and avatar on the profile page.</p>
    <p>After closing the group, you will be matched to a buddy. <br>
      <strong>Only the group leader can close the group</strong></p>
  </div>
</template>

<style lang="scss" scoped>
.content {
  > :not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>