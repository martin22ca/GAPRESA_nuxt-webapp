<template>
    <dialog class="modal" :open="props.modalOpen" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box modalAnim">
            <button :class="'m-2 btn btn-sm btn-circle absolute right-2 top-2 btn-' + color"
                @click="props.toggleModal()">✕</button>
            <h3 class="font-bold text-2xl">
                <Icon :class="'mr-2 text-' + color" :name="modalIcon" size="20px" /> {{ props.modalTitle }}
            </h3>
            <span class="divider m-1" />
            <p class="py-4">{{ props.modalText }}</p>
            <div class="modal-action">
                <slot></slot>
            </div>
        </div>
    </dialog>
</template>

<script setup>

const props = defineProps({
    modalOpen: Boolean,
    modalTitle: String,
    modalText: String,
    toggleModal: Function,
    modalSucces: {
        type: Boolean,
        default: null
    }
})
const modalIcon = ref('material-symbols:info')
const color = ref('primary')


onMounted(() => {
    if (props.modalSucces != null) {
        if (props.modalSucces) {
            color.value = 'success';
            modalIcon.value = 'icon-park-solid:correct'
        }
        else {
            color.value = 'error';
            modalIcon.value = 'ic:sharp-error'
        }
    }
})

</script>

