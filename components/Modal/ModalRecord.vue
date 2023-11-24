<template>
    <dialog class="modal" :open="modalControl" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box" id="modalBox">
            <div class="card w-full bg-neutral text-neutral-content">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">Expedientes</h2>
                    <p>We are using cookies for no reason.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Accept</button>
                        <button class="btn btn-ghost">Deny</button>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">

const modalControl = ref(false)

onMounted(() => {
    modalControl.value = true
})

</script>

<style>
#modalBox {
    max-width: 90%;
}
</style>

