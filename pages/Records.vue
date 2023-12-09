<template>
    <div class="text-sm breadcrumbs p-2">
        <ul>
            <li><a>Home</a></li>
            <li><a>Expedientes</a></li>
        </ul>
    </div>
    <h1 class="text-2xl p-2">Expedientes</h1>
    <DTM :rows="records" :cols="headers" :loading="loadingData"  @updateFilters="updateFilters" class="w-full mr-2">
        <template #avance="{ row }">
            <div class="radial-progress bg-primary text-primary-content" style="--size:4rem; --thickness: 3px;" :style="'--value:' +row.avance" role="progressbar">{{roundVal(row.avance,0)}}%</div>
        </template>
        <template #id_provider="{ row }">
            <button class="btn btn-primary">
                {{row.id_provider}}
            </button>
        </template>
    </DTM>
</template>

<script setup>
import { getRecords } from '@/services/records'

definePageMeta({ middleware: ['auth'] })

const headers = [
    { id: 'id', text: 'id' },
    { id: 'id_provider', text: 'Prestador' },
    { id: 'date_liquid', text: 'fecha_liquid' },
    { id: 'date_recep', text: 'fecha_recep' },
    { id: 'date_audi_vto', text: 'fecha_audi_vto' },
    { id: 'date_period', text: 'Periodo' },
    { id: 'record_type', text: 'Tipo' },
    { id: 'totcal', text: 'totcal' },
    { id: 'bruto', text: 'bruto' },
    { id: 'ivacal', text: 'ivacal' },
    { id: 'prestac_grava', text: 'prestac_grava' },
    { id: 'debcal', text: 'debcal' },
    { id: 'inter_debcal', text: 'inter_debcal' },
    { id: 'debito', text: 'debito' },
    { id: 'debtot', text: 'debtot' },
    { id: 'a_pagar', text: 'a_pagar' },
    { id: 'debito_iva', text: 'debito_iva' },
    { id: 'receipt_num', text: 'Nro Comprobante' },
    { id: 'id_receipt_type', text: 'Tipo Comprobante' },
    { id: 'receipt_date', text: 'Fecha Comprobante' },
    { id: 'exento', text: 'exento' },
    { id: 'gravado', text: 'gravado' },
    { id: 'iva_factu', text: 'iva_factu' },
    { id: 'iva_perce', text: 'iva_perce' },
    { id: 'iibb', text: 'iibb' },
    { id: 'record_total', text: 'record_total' },
    { id: 'neto_impues', text: 'neto_impues' },
    { id: 'resu_liqui', text: 'resu_liqui' },
    { id: 'cuenta', text: 'cuenta' },
    { id: 'ambu_total', text: 'ambu_total' },
    { id: 'inter_total', text: 'inter_total' },
    { id: 'audit_group', text: 'audit_group' },
    { id: 'date_vto_carga', text: 'fecha_vto_carga' },
    { id: 'status', text: 'Estado' },
    { id: 'assigned_user', text: 'Usuario' },
    { id: 'avance', text: 'Avance' },
]
const records = ref([])
let filters = []
const loadingData = ref(true)

const fetchResources = async () => {
    const { data, refresh } = await getRecords(filters)
    records.value = data.value
    if (data.value == null) refresh()
    setTimeout(() => { loadingData.value = false }, 500);
}

onMounted(async () => {
    fetchResources()
})

const updateFilters = (appliedFilters) => {
    filters = appliedFilters;
    fetchResources()
}


const roundVal = (val,decimal)=>{
    return Math.round(val).toFixed(decimal);
}

</script>


<style scoped>
.tableContainer {
    max-width: 100%;
    overflow-x: auto;
}
</style>