<template>
    <div class="dropdown dropdown-top">
        <div tabindex="0" role="button" class="btn btn-block my-2">Cambiar Tema
            <Icon name="material-symbols:arrow-drop-down" size="20px"
                class="text-accent rounded-xl cursor-pointer" />
        </div>
        <ul tabindex="0" class="dropdown-content show z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 h-64 overflow-auto">
            <li v-for="theme in themes">
                <a class="theme-controller btn btn-sm btn-block btn-ghost justify-start" @click="colorMode.preference = theme">
                    {{ theme }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const themes = [
    'system',
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
];
</script>

<!--   <div class="dropdown mb-72">
        <label tabindex="0" class="btn m-1 w-full">
            Theme
            <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
        </label>
        <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 oveflow-y-scroll h-64">
            <li v-for="theme in themes" class="oveflow-y-scroll">
                <input type="radio" name="theme-dropdown"
                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme"
                    :value="theme" @click="colorMode.preference = theme"/>
            </li>
        </ul>
    </div>   -->


    <!--    <select class="select select-bordered w-full max-w-xs my-4" v-model="colorMode.preference">
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
    </select>
-->