<template>
    <div>
        <li v-if="hasChilds" class="rounded-lg">
            <a @click="showMenu" class="p-0 menu-dropdown-toggle text-md">
                <button class="btn btn-ghost hover:bg-transparent">
                    <Icon :name="props.icon ?? 'file-icons:default'" class="text-xl" />
                    {{ props.title }}
                </button>
            </a>
            <ul :class="menuVis ? 'menu-dropdown menu-dropdown-show' : 'menu-dropdown'">
                <DrawerItem v-for="child in props.children" :key="child.title" :title="child.title" :icon="child.icon"
                    :route="child.route" :children="child.children" />
            </ul>
        </li>
        <li v-else class="rounded-lg">
            <NuxtLink :to='props.route' class="p-0 text-md">
                <button class="btn btn-ghost hover:bg-transparent">
                    <Icon :name="props.icon ?? 'file-icons:default'" class="text-xl" />
                    {{ props.title }}
                </button>
            </NuxtLink>
        </li>
    </div>
</template>

<script setup lang="ts">
import type { MenuItem } from './menuItems';
const props = defineProps({
    title: String,
    icon: String,
    route: String,
    children: Array<MenuItem>,
});

const hasChilds = props.children != null
const menuVis = ref(false)

const showMenu = () => {
    menuVis.value = !menuVis.value
}
</script>