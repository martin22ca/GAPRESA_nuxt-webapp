<template>
    <div :class="'dropdown dropdown-bottom dropdown-' + (location)">
        <div tabindex="0" role="button" class="">
            {{ buttonText }}
            <Icon :name="iconName" :size="props.size" class="bg-primary text-primary-content rounded-xl cursor-pointer" />
        </div>
        <ul class="dropdown-content show menu p-2 shadow bg-base-100 rounded-box overflow-y-auto"
            style="max-height: 70vh; z-index: {{zValue}};">
            <slot></slot>
        </ul>
    </div>
</template>
  
<script setup lang="ts">

const props = defineProps({
    zValue: {
        type: Number,
        default: 50,
    },
    size: {
        type: String,
        default: '20px',
    },
    buttonText: {
        type: (String||Number),
        default: '',
    },
    location: {
        type: String,
        default: ''
    },
    iconName: {
        type: String,
        default: 'mdi:dots-vertical'
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