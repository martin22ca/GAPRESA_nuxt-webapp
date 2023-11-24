<template>
    <div class="text-sm breadcrumbs p-2">
        <ul>
            <li><a>Home</a></li>
            <li><a>Expedientes</a></li>
        </ul>
    </div>
    <h1 class="text-2xl p-2">Expedientes</h1>
    <DTM :rows="records" :cols="headers" :loading="loadingData">
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
import { getRecords } from '@/services/recordsService'
const headers = [
    { id: 'id', text: 'id', selected: true },
    { id: 'id_provider', text: 'Prestador', selected: true },
    { id: 'date_liquid', text: 'fecha_liquid', selected: true },
    { id: 'date_recep', text: 'fecha_recep', selected: true },
    { id: 'date_audi_vto', text: 'fecha_audi_vto', selected: true },
    { id: 'date_period', text: 'Periodo', selected: true },
    { id: 'record_type', text: 'Tipo', selected: true },
    { id: 'totcal', text: 'totcal', selected: true },
    { id: 'bruto', text: 'bruto', selected: true },
    { id: 'ivacal', text: 'ivacal', selected: true },
    { id: 'prestac_grava', text: 'prestac_grava', selected: true },
    { id: 'debcal', text: 'debcal', selected: true },
    { id: 'inter_debcal', text: 'inter_debcal', selected: true },
    { id: 'debito', text: 'debito', selected: true },
    { id: 'debtot', text: 'debtot', selected: true },
    { id: 'a_pagar', text: 'a_pagar', selected: true },
    { id: 'debito_iva', text: 'debito_iva', selected: true },
    { id: 'receipt_num', text: 'Nro Comprobante', selected: true },
    { id: 'id_receipt_type', text: 'Tipo Comprobante', selected: true },
    { id: 'receipt_date', text: 'Fecha Comprobante', selected: true },
    { id: 'exento', text: 'exento', selected: true },
    { id: 'gravado', text: 'gravado', selected: true },
    { id: 'iva_factu', text: 'iva_factu', selected: true },
    { id: 'iva_perce', text: 'iva_perce', selected: true },
    { id: 'iibb', text: 'iibb', selected: true },
    { id: 'debi_moti', text: 'debi_moti', selected: true },
    { id: 'record_total', text: 'record_total', selected: true },
    { id: 'neto_impues', text: 'neto_impues', selected: true },
    { id: 'resu_liqui', text: 'resu_liqui', selected: true },
    { id: 'cuenta', text: 'cuenta', selected: true },
    { id: 'ambu_total', text: 'ambu_total', selected: true },
    { id: 'inter_total', text: 'inter_total', selected: true },
    { id: 'audit_group', text: 'audit_group', selected: true },
    { id: 'date_vto_carga', text: 'fecha_vto_carga', selected: true },
    { id: 'status', text: 'Estado', selected: true },
    { id: 'assigned_user', text: 'Usuario', selected: true },
    { id: 'avance', text: 'Avance', selected: true },
]
const records = ref([])
const loadingData = ref(true)

onMounted(async () => {
    const { data, refresh } = await getRecords()
    records.value = data.value
    if (data.value == null) refresh()
    setTimeout(() => { loadingData.value = false }, 500);

})


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