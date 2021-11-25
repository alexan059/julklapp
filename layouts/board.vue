<template>
  <Center>
    <Panel layout="sidebar" width="70vw">

      <template #sidebar>
        <Sidebar/>
      </template>

      <slot/>
    </Panel>
  </Center>
</template>
