<template>
    <div class="text-sm breadcrumbs p-2">
        <ul>
            <li><a>Home</a></li>
            <li><a>Carga Manual</a></li>
        </ul>
    </div>
    <div>
        <h1 class="text-2xl p-2">Carga Manual de Expedientes</h1>
    </div>
    <div class="w-full">
        <DTMManual :cols="headers" :rows="infoRecords">
            <template #table_options>
                <button class="btn btn mx-2" @click="addRecord()">
                    <Icon name="material-symbols:add" size="20px" class="text-accent" /> Expediente
                </button>
            </template>
            <template #id_record>
                <input class="input input-ghost">
                <button>
                    <Icon class="border-2 border-neutral text-primary m-2 h-full rounded" name="material-symbols:add"
                        size="30px"></Icon>
                </button>
            </template>
            <template #assigned>
                <input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
            </template>
            <template #date_assignment>
                <input class="input input-ghost" type="date">
            </template>
            <template #date_entry_digital>
                <input class="input input-ghost" type="date">
            </template>
            <template #date_entry_physical>
                <input class="input input-ghost" type="date">
            </template>
            <template #date_close>
                <input class="input input-ghost" type="date">
            </template>
            <template #seal_number>
                <input class="input input-ghost max-w-xs" type="text">
            </template>
            <template #observation>
                <textarea class="textarea textarea-ghost" placeholder="Observacion"></textarea>
            </template>
        </DTMManual>
    </div>
</template>


<script setup>
definePageMeta({ middleware: ['auth'] })

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

const infoRecords = ref([])
const newVal = ref([])

const addRecord = () => {
    const newExp = {
        'id_record': 0
    }
    infoRecords.value.push(newExp)
}

onMounted(async () => {
    fetchResources()
})
</script>