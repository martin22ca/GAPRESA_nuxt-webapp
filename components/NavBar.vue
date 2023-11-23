<template>
    <header class="sticky top-0 z-50">
        <div class="flex flex-row p-2 bg-base-100 items-center">
            <div class="flex-none">
                <label class="btn swap">
                    <input type="checkbox" @click="toggleDrawer?.()" />
                    <Icon name="ic:baseline-menu" class="swap-off" size="24px" />
                    <Icon name="ic:round-menu-open" class="swap-on" size="24px" />
                </label>
            </div>
            <div class="flex-1">
                <div class="join">
                    <button class="join-item btn btn-neutral ml-2">
                        <Icon name="material-symbols:search" />
                    </button>
                    <input type="text" placeholder="Buscar..." class="join-item input input-bordered w-full max-w-xs">
                </div>
            </div>
            <div class="flex-none">
                <div class="mx-2 text-xl">
                    <button class="btn btn-sm rounded-xl bg-base-200 mx-1">
                        <Icon name="mdi:bell" class="w-4 h-4" />
                    </button>
                    <details class="dropdown dropdown-bottom dropdown-end">
                        <summary class="btn btn-sm rounded-xl bg-base-200 mx-1">
                            <Icon name="mdi:cog" class="w-4 h-4" />
                        </summary>
                        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64">
                            <ThemePicker />
                        </ul>
                    </details>
                    <button class="btn btn-sm rounded-xl bg-base-200 mx-1">
                        <Icon name="ic:baseline-fullscreen" class="w-4 h-4" />
                    </button>
                    <div class="avatar placeholder">
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-12 border-2 border-neutral">
                            <span class="text-xl text-neutral">K</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import ThemePicker from './Generic/ThemePicker.vue'


const props = defineProps({
    toggleDrawer: Function,
})

</script>



<style scoped></style>