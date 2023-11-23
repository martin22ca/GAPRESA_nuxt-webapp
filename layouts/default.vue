<template>
  <div class="flex flex-row h-screen w-screen bg-base-300">
    <div :class="'duration-200 ease-out ' + (drawerStatus ? 'w-60' : 'w-0')">
      <Drawer v-if="drawerStatus" :drawer-open="drawerStatus" />
    </div>
    <div class="w-full" :style="contentStyles">
      <NavBar :toggle-drawer="toggleDrawer" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawerStatus = useState('drawer', () => true)

const toggleDrawer = () => {
  drawerStatus.value = !drawerStatus.value
}

const contentStyles = computed(() => {
  if (process.browser) {
    const screenWidth = window.innerWidth;
    const drawerWidth = drawerStatus.value ? 240 : 0; // Adjust these values accordingly
    return { 'max-width': `${screenWidth - drawerWidth}px` };
  }
  return { 'max-width': '100%' }; // Default to 100% in non-browser environments
});
</script>
