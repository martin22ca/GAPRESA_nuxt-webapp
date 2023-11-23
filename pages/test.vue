<template>
    <DTM v-if="providers != null" :rows="providers" :cols="headers" />
    <button v-else @click="getProv" class="btn m-2"> fetchPrv </button>
</template>

<script setup>
import { getProviders } from '@/services/providerService'

definePageMeta({
  layout: false,
});

const providers = ref([])

const headers = [
    {id:'id',text:'id',order:1},
    {id:'coordinator_number',text:'coordinador',order:2},
    {id:'cuit',text:'Cuit',order:3},
    {id:'business_name',text:'Razon Social',order:4},
    {id:'business_location',text:'Localidad',order:4},
    {id:'sancor_zone',text:'Zona Sancor',order:4},
    {id:'observation',text:'Observacion',order:4},
    {id:'id_priority',text:'Prioridad',order:4},
    {id:'id_pecularity',text:'Particularidad',order:4},
]

const getProv = async ()  =>{
    const { data } = await getProviders()
    providers.value = data.value
}

onMounted(async () => {
    const { data } = await getProviders()
    providers.value = data.value
    console.log(providers.value)
})


</script>