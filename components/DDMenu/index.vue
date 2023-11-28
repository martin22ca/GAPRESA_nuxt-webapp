<template>
    <div :class="'dropdown dropdown-bottom dropdown-' + (location)">
        <div tabindex="0" role="button" class="">
            <Icon name="mdi:dots-vertical" :size="props.size"
                class="bg-primary text-primary-content rounded-xl cursor-pointer" />
        </div>
        <ul class="dropdown-content show z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
            <slot></slot>
        </ul>
    </div>
</template>
  
<script setup lang="ts">

const props = defineProps({
    size: {
        type: String,
        default: '20px',
    },
    location: {
        type: String,
        default: 'right'
    }
})

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value)
};


</script>
  
<style>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
}

.dropdown-content.show {
    display: block;
}
</style>