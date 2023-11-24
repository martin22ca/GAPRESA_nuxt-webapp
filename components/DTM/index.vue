<template>
    <div class="table-wrapper">
        <div class="flex flex-row p-4 bg-neutral sticky left-0">
            <select class="mx-2 select select-bordered basis-1/4 ">
                <option disabled selected>Selecionar Columnas</option>
                <option v-for="col in cols">
                    {{ col.text }}
                </option>
            </select>
            <input type="text" placeholder="Type here" class="mx-2 input input-bordered basis-2/3" />
            <button class="btn btn-circle bt-primary" @click="downloadExcel">
                <Icon name="mdi:file-export" size="30px" />
            </button>
        </div>
        <table v-if="!loading" class="DMTable" id="tablID">
            <thead>
                <tr>
                    <!-- Generate table header based on cols prop -->
                    <th v-for="col in tableColumns" :key="col.id">{{ col.text }}</th>
                </tr>
            </thead>
            <tbody v-if="slicedRows != null">
                <tr v-for="(item, index) in slicedRows" :key="index" :id="(index == selectedRow) ? 'selectedRow' : ''">
                    <td v-for="col in tableColumns" :key="col.id">
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
  
<script setup lang="ts">
import * as XLSX from 'xlsx';

interface TableColumn {
    id: string;
    text: string;
    selected: Boolean;
}

interface TableRow {
    [key: string]: string; // Each key will be a string, and the value too
}
const props = defineProps({
    selectedRow: {
        type: Number,
        default: null,
    },
    loading: {
        type: Boolean,
        default: false
    },
    cols: {
        type: Array as () => TableColumn[],
        default: null
    },
    rows: {
        type: Array as () => TableRow[],
        default: null
    }
});

const tableContainer = ref<HTMLElement | null>(null);
const rowsPerPage = ref(500); // Number of rows per page
const currentPage = ref(1); // Current page number
const totalPages = computed(() => Math.ceil(props.rows.length / rowsPerPage.value));

const tableColumns = computed(() => {
    // If columns are not provided, generate columns from the keys of the first row
    if (!props.cols && props.rows.length > 0) {
        const firstRow = props.rows[0];
        return Object.keys(firstRow).map((key, index) => ({
            id: key,
            text: key,
            order: index + 1
        }))
    }
    // Use provided columns if available
    return props.cols || [];
});

// Function to slice rows based on current page and rows per page
const slicedRows = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return props.rows.slice(start, end);
});

const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    // Convert table data to worksheet
    const wsData = [
        tableColumns.value.map(col => col.text), // Headers
        ...props.rows.map(row => tableColumns.value.map(col => row[col.id])) // Rows
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = `data_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
};

watch(
    () => props.selectedRow,
    (newValue: number) => {
        if (newValue !== null && tableContainer.value) {
            const selectedRowElement = tableContainer.value.querySelector(
                `tr:nth-child(${newValue + 1})`
            ) as HTMLElement | null;

            if (selectedRowElement) {
                selectedRowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        tableContainer.value = document.getElementById('tablID')
        console.log('no', newValue, tableContainer.value)
    }
);

onMounted(() => {
    tableContainer.value = document.getElementById('tablID')
})

</script>
  
<style scoped>
#tablID {
    transition: all;
}

.table-wrapper {
    max-width: 100%;
    flex-direction: column;
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
    flex: 1 0 auto;
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
    color: oklch(var(--nc)/.9);
    background: oklch(var(--n)/.9);
}

.DMTable tr:nth-child(even) {
    border: 1px solid oklch(var(--n)/.1);
}

#selectedRow {
    background: oklch(var(--p)/.9);
    color: oklch(var(--pc)/.9);
}
</style>