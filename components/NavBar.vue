<template>
    <div class="navbar bg-base-100 rounded-lg text-white m-x2 p-4 flex items-center justify-between overflow-x-hidden">
        <div class="flex items-center">
            <div class="mx-2">
                <label class="btn swap hover:bg-primary">
                    <input type="checkbox" @click="toggleDrawer?.()" />
                    <Icon class="swap-off fill-current" size="22" name="ic:sharp-menu" color="white" />
                    <Icon class="swap-on fill-current" size="22" name="ic:sharp-menu-open" color="white" />
                </label>
            </div>
        </div>

        <div class="flex items-center">
            <div class="mx-2">Home </div>
        </div>

        <div class="flex items-center">
            <div class="mx-2 text-xl">
                <button class="btn-sm rounded-xl bg-base-200 mx-1">
                    <Icon name="mdi:bell" class="w-4 h-4" />
                </button>
                <button class="btn-sm rounded-xl bg-base-200 mx-1">
                    <Icon name="mdi:cog" class="w-4 h-4" />
                </button>
                <button class="btn-sm rounded-xl bg-base-200 mx-1">
                    <Icon name="ic:baseline-fullscreen" class="w-4 h-4" />
                </button>
                <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span class="text-xl">K</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    toggleDrawer: Function,
})
</script>


<style scoped></style>