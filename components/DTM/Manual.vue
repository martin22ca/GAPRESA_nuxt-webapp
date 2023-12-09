<template>
    <dialog class="modal" :open="filtersDialog" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box max-w-full h-5/6 bg-base-100">
            <form method="dialog">
                <button @click="filtersDialog = false"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h1 class="text-2xl">Columna: <div class="badge badge-primary badge-lg text-lg">{{
                selectedCols[selectedColIndex]?.text }}</div>
            </h1>
            <div class="flex flex-col flex-1">
                <div v-for="obj in filterByGroup('order')" class="m-2">
                    <button class="btn btn-neutral btn-block btn-sm" @click="createNewFilter(obj, selectedColIndex)">
                        {{ obj.name }} <Icon :name="obj.icon"></Icon>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="bg-base-300 p-4">
                    <h1 class="text-xl mb-4">Condicion</h1>
                    <div class="flex flex-row px-2 gap-4">
                        <button class="bg-neutral p-4 rounded">
                            <DDMenu buttonText="Filtros Genericos" :zValue="99" location="bottom">
                                <div class="flex flex-col">
                                    <button v-for="obj in filterByGroup('generic')"
                                        class="btn btn-neutral btn-wide btn-sm m-2"
                                        @click="createNewFilter(obj, selectedColIndex)">
                                        {{ obj.name }} <Icon :name="obj.icon"></Icon>
                                    </button>
                                </div>
                            </DDMenu>
                        </button>
                        <button class="bg-neutral p-4 rounded">
                            <DDMenu buttonText="Filtros Numericos" :zValue="99" location="bottom">
                                <div class="flex flex-col">
                                    <button v-for="obj in filterByGroup('Numerico')"
                                        class="btn btn-neutral btn-wide btn-sm m-2"
                                        @click="createNewFilter(obj, selectedColIndex)">
                                        {{ obj.name }} <Icon :name="obj.icon"></Icon>
                                    </button>
                                </div>
                            </DDMenu>
                        </button>
                        <button class="bg-neutral p-4 rounded">
                            <DDMenu buttonText="Filtros Fechas" :zValue="99" location="bottom">
                                <div class="flex flex-col">
                                    <button v-for="obj in filterByGroup('Fecha')"
                                        class="btn btn-neutral btn-wide btn-sm m-2"
                                        @click="createNewFilter(obj, selectedColIndex)">
                                        {{ obj.name }} <Icon :name="obj.icon"></Icon>
                                    </button>
                                </div>
                            </DDMenu>
                        </button>
                        <button class="bg-neutral p-4 rounded">
                            <DDMenu buttonText="Filtros Texto" :zValue="99" location="bottom">
                                <div class="flex flex-col">
                                    <button v-for="obj in filterByGroup('Texto')"
                                        class="btn btn-neutral btn-wide btn-sm m-2"
                                        @click="createNewFilter(obj, selectedColIndex)">
                                        {{ obj.name }} <Icon :name="obj.icon"></Icon>
                                    </button>
                                </div>
                            </DDMenu>
                        </button>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="bg-base-300 p-4">
                <h1 class="text-xl mb-4">Filtros aplicados</h1>
                <div v-if="getColFilters(selectedColIndex)?.length > 0">
                    <div v-for="(filter, index) in getColFilters(selectedColIndex)"
                        class="my-4 bg-base-200 p-2 rounded-xl border-2 border-primary">
                        <div class="flex flex- gap-4 overflow-y-auto">
                            <div class="mt-2">Columna:
                                <div class="badge badge-secondary">{{ selectedCols[filter.col]?.text }}</div>
                            </div>
                            <div class="mt-2 basis-1/3 text-start">Condicion:
                                <div class="badge badge-secondary"> {{ filter.label }}</div>
                            </div>
                            <input v-if="filter.values_needed > 0" v-model="filter.val" :type="filter.ftype"
                                placeholder="Valor..." class="input input-md input-bordered grow" />
                            <div class="flex-grow"></div>
                            <button class="btn btn-circle btn-error mx-2 self-end" @click="removeFilter(filter.id)">
                                X
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>
                        No Hay filtros en esta columna
                    </p>
                </div>
            </div>
            <div class="divider flex-grow "></div>
            <button class="btn btn-primary my-2 self-end" @click="applyFilters()">
                Aplicar
            </button>
        </div>
    </dialog>
    <!--   TABLA   -->
    <div class="table-wrapper ">
        <div class="flex flex-row p-4 gap-2 bg-neutral sticky left-0">
            <button v-if="appliedFilters.length > 0" class="btn bt-primary mx-2" @click="removeFilter(1, true)">
                Limpiar filtros
                <Icon name="material-symbols:cleaning-services" size="20px" class="text-accent rounded-xl cursor-pointer" />
            </button>
            <button class="btn  bt-primary mx-2" @click="downloadExcel">
                Exportar
                <Icon name="mdi:file-export" size="30px" />
            </button>
            <div class="grow"></div>
            <!-- Extra button Cols-->
            <div>
                <slot name="table_options">

                </slot>
            </div>
        </div>
        <table v-if="!loading" class="DMTable" id="tablID">
            <div>
                <thead>
                    <tr>
                        <!-- Generate table header based on cols prop -->
                        <th v-for="(col, index) in selectedCols" :key="col.id">
                            <div v-if="getColFilters(index).length > 0" class="indicator mx-2">
                                <span class="indicator-item badge badge-sm badge-secondary">{{ getColFilters(index).length
                                }}</span>
                                {{ col.text }}
                                <button @click="filtersDialog = true; selectedColIndex = index" class="mx-2 mr-4">
                                    <Icon name="mdi:dots-vertical" size="20"
                                        class="bg-primary text-primary-content rounded-xl cursor-pointer" />
                                </button>
                            </div>
                            <div v-else>
                                {{ col.text }}
                                <button @click="filtersDialog = true; selectedColIndex = index">
                                    <Icon name="mdi:dots-vertical" size="20"
                                        class="bg-primary text-primary-content rounded-xl cursor-pointer" />
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="props.rows != null && props.rows.length > 0">
                    <tr v-for="(item, index) in slicedRows" :key="index" :id="(index == selectedRow) ? 'selectedRow' : ''">
                        <td v-for="col in selectedCols" :key="col.id">
                            <!-- Check if slot for this column exists -->
                            <template v-if="!$slots[col.id]">
                                {{ item[col.id] }}
                            </template>
                            <template v-else :v-slot="[col.id]">
                                <!-- Render scoped slot content for this column -->
                                <slot :name="col.id" :row="item"></slot>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </div>
            <div v-if="props.rows == null || props.rows.length <= 0" class="text-xl py-40 text-center">
                No Hay elementos
            </div>

        </table>
        <div class="flex flex-1 justify-center py-40 " v-else>
            <Loader />
        </div>
        <div class="justify-end sticky bottom-0 bg-base-200 left-0">
            <button class="btn m-2" @click="currentPage > 1 && (currentPage -= 1)">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn m-2" @click="currentPage < totalPages && (currentPage += 1)">Next</button>
        </div>
    </div>
</template>
  
<script setup>
import { getfilters } from '@/services/config'
import * as XLSX from 'xlsx';

const props = defineProps({
    selectedRow: { default: null, },
    filters: { default: [], type: Array },
    loading: { default: false, type: Boolean },
    cols: { default: null },
    rows: { default: null }
});

const emits = defineEmits(['updateFilters'])

let filterIdCounter = 0;
const filters = ref()
const selectedColIndex = ref(0)
const appliedFilters = ref([])
const filtersDialog = ref(false);
const tableContainer = ref(null);
const baseCols = ref([]);
const selectedCols = ref([]);
const rowsPerPage = ref(500); // Number of rows per page
const currentPage = ref(1); // Current page number
const totalPages = computed(() => Math.ceil(props.rows.length / rowsPerPage.value));


// Function to slice rows based on current page and rows per page
const slicedRows = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return props.rows.slice(start, end);
});

function filterByGroup(groupName) {
    return filters.value?.filter(filter => filter.group === groupName);
}


const getColFilters = (colIndex) => {
    return appliedFilters.value.filter(item => item.col === colIndex);
}

const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    // Convert table data to worksheet
    const wsData = [
        baseCols.value.map(col => col.text), // Headers
        ...props.rows.map(row => baseCols.value.map(col => row[col.id])) // Rows
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = `data_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
};

const createNewFilter = (filterOpt, idCol, val = '') => {
    const newFilter = {
        'id': filterIdCounter,
        'col': idCol,
        'label': filterOpt.name,
        'funct': filterOpt.function,
        'ftype': filterOpt.val_type,
        'values_needed': filterOpt.values_needed,
        'val': val
    }
    appliedFilters.value.push(newFilter)
    filterIdCounter++;
    console.log(appliedFilters.value)
}

const removeFilter = (itemId, all = false) => {
    if (all) {
        appliedFilters.value = []
        filterIdCounter = 1
    } else {
        const index = appliedFilters.value.findIndex((item) => item.id === itemId)
        appliedFilters.value.splice(index, 1)
    }
    const Sentfilters = appliedFilters.value
    let newArray = Sentfilters.map(item => {
        return {
            'col': selectedCols.value[item.col].id,
            'funct': item.funct,
            'val': item.val
        };
    });
    filtersDialog.value = false
    emits('updateFilters', newArray);
    return
}

const applyFilters = () => {
    const Sentfilters = appliedFilters.value
    let newArray = Sentfilters.map(item => {
        return {
            'col': selectedCols.value[item.col].id,
            'funct': item.funct,
            'val': item.val
        };
    });
    filtersDialog.value = false
    emits('updateFilters', newArray);
}

watch(
    () => props.selectedRow,
    (newValue) => {
        if (newValue !== null && tableContainer.value) {
            const selectedRowElement = tableContainer.value.querySelector(
                `tr:nth-child(${newValue + 1})`
            )

            if (selectedRowElement) {
                selectedRowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        tableContainer.value = document.getElementById('tablID')
    }
);

onMounted(async () => {
    tableContainer.value = document.getElementById('tablID')
    if (!props.cols && props.rows.length > 0) {
        const firstRow = props.rows[0];
        const cols = Object.keys(firstRow).map((key, index) => ({
            id: key,
            text: key,
        }))
        selectedCols.value = [...cols]; // Create a copy of cols
        baseCols.value = [...cols]; // Create a copy of cols
    } else {
        selectedCols.value = [...props.cols]; // Create a copy of props.cols
        baseCols.value = [...props.cols];
    }

    filters.value = (await getfilters()).data.value
})

</script>
  
<style scoped>
#tablID {
    transition: all;
}

.table-wrapper {
    max-width: 99%;
    width: fit-content;
    overflow-x: auto;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    border: 2px solid oklch(var(--n));
    height: 90vh;
    overflow-y: auto;
    border-radius: 10px;
}

.DMTable {
    padding: 10px;
    flex: 1 1 auto;
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    color: black;
    background-color: #eee;
}

.DMTable thead {
    z-index: 1;
    /* Ensure the header is above other content */
    position: sticky;
    top: 0;
}

.DMTable td,
.DMTable th {
    text-align: center;
    padding: 8px;
    font-size: small;
}

.DMTable td {
    border-right: 1px solid oklch(var(--n));
    font-size: 12px;
}

.DMTable tr:hover {
    background-color: oklch(var(--a));
    color: oklch(var(--ac));
}

.DMTable thead th {
    color: oklch(var(--nc));
    background: oklch(var(--n));
}


.DMTable thead th:nth-child(odd) {
    background: oklch(var(--n)/0.8);
}

.DMTable tr:nth-child(even) {
    border: 1px solid oklch(var(--n)/.1);
}

#selectedRow {
    background: oklch(var(--p)/.9);
    color: oklch(var(--pc)/.9);
}
</style>