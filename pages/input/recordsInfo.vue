<template>
    <div class="text-sm breadcrumbs p-2">
        <ul>
            <li><a>Home</a></li>
            <li><a>Registros de expedientes</a></li>
        </ul>
    </div>
    <ModalRecord/>
    <div class="flex flex-row">
        <div class="card bg-neutral text-neutral-content m-2 basis-1/3">
            <div class="card-body items-start">
                <h1 class="card-title text-2xl p-2">Registros de expedientes</h1>
                <div v-if="infoRecords.length > 0">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col">
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Expedientes</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].id" type="text"
                                    class="input input-bordered text-neutral" disabled>
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Fecha Asignacion</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].date_assignment" type="date"
                                    class="input input-bordered text-neutral-content w-full">
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Fecha Digital</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].date_entry_digital" type="date"
                                    class="input input-bordered text-neutral-content w-full">
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Fecha Fisico</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].date_entry_physical" type="date"
                                    class="input input-bordered text-neutral-content w-full">
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Fecha Cierre</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].date_close" type="date"
                                    class="input input-bordered text-neutral-content w-full">
                            </div>
                        </div>
                        <div>
                            <div class="flex flex-col ">
                                <label class="label">
                                    <span class="label-text text-neutral-content">Asignando por Prevencion</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].assigned" type="checkbox"
                                    class="checkbox checkbox-primary mx-auto w-20 h-12" />
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Lote Asignado</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].id_lot" type="text"
                                    class="input input-bordered text-neutral-content" placeholder="...">
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text text-neutral-content">Nro Precinto</span>
                                </label>
                                <input v-model="infoRecords[selectedRow].seal_number" type="text"
                                    class="input input-bordered text-neutral-content" placeholder="...">
                            </div>
                        </div>
                    </div>
                    <div class="py-4">
                        <label class="label">
                            <span class="label-text text-neutral-content">Observacion</span>
                        </label>
                        <textarea v-model="infoRecords[selectedRow].observation"
                            class="textarea textarea-bordered w-full h-40" placeholder="Observacion"></textarea>
                    </div>
                </div>
                <Loader v-else class="m-auto py-60" />
            </div>
            <div class="card-actions justify-end m-4 ">
                <button class="btn btn-secondary" @click="manageRowChange(1)">
                    Guardar modificaciones
                </button>
                <button class="btn btn-circle btn-primary" @click="manageRowChange(1)">
                    <Icon name="material-symbols:arrow-downward" size="30px" />
                </button>
                <button class="btn btn-circle btn-primary">
                    <Icon name="material-symbols:arrow-upward" size="30px" @click="manageRowChange(-1)" />
                </button>
            </div>
        </div>
        <DTM class="basis-2/3" :rows="infoRecords" :loading="loadingData" :cols="headers" :selected-row="selectedRow">
            <template #assigned="{ row }">
                <input type="checkbox" :checked="row.assigned" class="checkbox checkbox-secondary" disabled />
            </template>
        </DTM>
    </div>
</template>
  

<script setup>
import { getRecordsInfo } from '@/services/recordsService'
const infoRecords = ref([])
const loadingData = ref(true)
const selectedRow = ref(0)

const headers = [
    { id: 'id_record', text: 'Expediente', order: 9 },
    { id: 'assigned', text: 'Asignado', order: 8 },
    { id: 'id_lot', text: 'Lote', order: 9 },
    { id: 'date_assignment', text: 'Fecha Asignacion', order: 2 },
    { id: 'date_entry_digital', text: 'Entrada Digital', order: 3 },
    { id: 'date_entry_physical', text: 'Entrada Fisico', order: 4 },
    { id: 'date_close', text: 'Fecha Cierre', order: 7 },
    { id: 'seal_number', text: 'Precinto', order: 5 },
    { id: 'observation', text: 'Observacion', order: 6 },


]

const manageRowChange = (val) => {
    const newVal = selectedRow.value + (val)
    if (newVal < 0) { selectedRow.value = 0; return }
    if (newVal > infoRecords.value.length) { selectedRow.value = infoRecords.value.length; return }
    selectedRow.value = newVal
}


onMounted(async () => {
    const { data } = await getRecordsInfo()
    setTimeout(() => { loadingData.value = false }, 500);
    infoRecords.value = data.value
})
</script>

<style scoped>
.tableContainer {
    max-width: 100%;
    overflow-x: auto;
}
</style>