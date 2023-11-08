<template>
  <div class="flex flex-row bg-base-300 h-screen w-screen">
    <div :class="'duration-200 ' + (drawerStatus ? 'ease-out w-60' : 'ease-in w-0')">
      <Drawer v-if="drawerStatus" :drawer-open="drawerStatus" />
    </div>
    <div class="flex flex-col flex-grow ">
      <NavBar :toggle-drawer="toggleDrawer" />
      <slot></slot>

    </div>
  </div>
</template>

<script setup lang="ts">
const drawerStatus = useState('drawer', () => true)

const toggleDrawer = () => {
  console.log(drawerStatus.value)
  drawerStatus.value = !drawerStatus.value
}
</script>
