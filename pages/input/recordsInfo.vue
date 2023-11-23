<template>
    <div class="text-sm breadcrumbs p-2">
        <ul>
            <li><a>Home</a></li>
            <li><a>Registros de expedientes</a></li>
        </ul>
    </div>
    <h1 class="text-2xl p-2">Registros de expedientes</h1>
    <div class="card bg-transparent ">
        <div class="card-body">
            <div class="flex flex-row flex-grow">
                <select class="mx-2 select select-bordered basis-1/4">
                    <option disabled selected>Selecionar Columnas</option>
                    <option>Col 1</option>
                    <option>Col 2</option>
                    <option>Col 3</option>
                    <option>Col 4</option>
                    <option>Col 5</option>
                </select>
                <input type="text" placeholder="Type here" class="mx-2 input input-bordered basis-3/4" />
            </div>
        </div>
    </div>
    <div class="tableContainer">
        <UTable :rows="providers">

        </UTable>
    </div>
</template>
  

<script setup>
import { getProviders } from '@/services/providerService'
const providers = ref([])

onMounted(async () => {
    const { data } = await getProviders()
    providers.value = data.value
    console.log(providers.value)
})
</script>

<style scoped>
.tableContainer {
    max-width: 100%;
    overflow-x: auto;
}
</style>