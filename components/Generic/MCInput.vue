<template>
    <div>
        <div class="label">
            <span class="label-text">
                <Icon :name="props.textIcon" size="20px" class="mx-2" />{{ props.textLabel }}
            </span>
        </div>
        <slot></slot>
        <div class="label">
            <span class="label-text-alt text-error"  id="error-text">{{ props.textError }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    textIcon: { default: 'icon-park-outline:edit-name', type: String },
    textLabel: { default: 'Input', type: String },
    textError: { default: '', type: String },
});
</script>

<style>
#text-error {
  opacity: 0;
}

/* Define animation */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Apply animation to the error text */
#text-error {
  animation: fade-in 0.5s ease-in-out forwards;
}
</style>