<template>
    <div class="bg-base-300 h-auto">
        <div class="text-sm breadcrumbs p-2">
            <ul>
                <li><a>Home</a></li>
                <li><a>Prestadores</a></li>
            </ul>
        </div>
        <h1 class="text-2xl p-2">Prestadores</h1>
        <DTM :rows="providers" :cols="headers" />
    </div>
</template>
<script setup>
import { getProviders } from '@/services/providerService'
const headers = [
    { id: 'id', text: 'id', order: 1 },
    { id: 'coordinator_number', text: 'coordinador', order: 2 },
    { id: 'cuit', text: 'Cuit', order: 3 },
    { id: 'business_name', text: 'Razon Social', order: 4 },
    { id: 'business_location', text: 'Localidad', order: 5 },
    { id: 'sancor_zone', text: 'Zona Sancor', order: 6 },
    { id: 'observation', text: 'Observacion', order: 7 },
    { id: 'id_priority', text: 'Prioridad', order: 8 },
    { id: 'id_pecularity', text: 'Particularidad', order: 9 },
]

const providers = ref([])

onMounted(async () => {
    const { data, refresh } = await getProviders()
    providers.value = data.value
    if (data.value == null) refresh()
})


</script>
