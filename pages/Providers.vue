<template>
    <div class="bg-base-300 h-auto">
        <div class="text-sm breadcrumbs p-2">
            <ul>
                <li><a>Home</a></li>
                <li><a>Prestadores</a></li>
            </ul>
        </div>
        <div>
            <h1 class="text-2xl p-2">Prestadores</h1>
        </div>
        <hot-table :data="providers" :rowHeaders="true" :colHeaders="true">

        </hot-table>
    </div>
</template>

<script setup>
import { hotTable } from '@handsontable/vue3'
import { getProviders } from '@/services/providers'
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

definePageMeta({ middleware: ['auth'] })
const headers = [
    { id: 'id', text: 'id', order: 1, selected: true },
    { id: 'coordinator_number', text: 'coordinador', order: 2, selected: true },
    { id: 'cuit', text: 'Cuit', order: 3, selected: true },
    { id: 'business_name', text: 'Razon Social', order: 4, selected: true },
    { id: 'business_location', text: 'Localidad', order: 5, selected: true },
    { id: 'sancor_zone', text: 'Zona Sancor', order: 6, selected: true },
    { id: 'observation', text: 'Observacion', order: 7, selected: true },
    { id: 'id_priority', text: 'Prioridad', order: 8, selected: true },
    { id: 'id_pecularity', text: 'Particularidad', order: 9, selected: true },
]

const loading = ref(true)
const providers = ref([])
let filters = []

const fetchResources = async () => {
    const { data, refresh } = await getProviders(filters)
    providers.value = data.value
    if (data.value == null) refresh()
    setTimeout(() => { loading.value = false }, 500);
}

onMounted(async () => {
    fetchResources()
})

const updateFilters = (appliedFilters) => {
    filters = appliedFilters;
    fetchResources()
}

</script>
