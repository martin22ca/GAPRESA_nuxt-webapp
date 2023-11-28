<template>
    <dialog class="modal" :open="modalControl" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box max-w-4xl">
            <form method="dialog">
                <button @click="modalControl = false"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h1 class="text-2xl">Selecionar Columnas </h1>
            <div class="divider mx-auto"></div>
            <div className="grid grid-cols-2 grid-rows-1 gap-3 py-4" @dragenter.prevent @dragover.prevent>
                <div @dragenter.prevent @dragover.prevent >
                    <h2 class="text-xl">Columnas disponibles</h2>
                    <div v-for="(col, index) in baseCols"
                        class="flex flex-row justify-between bg-neutral text-neutral-content w-full m-1 rounded p-2">
                        <div class="">
                            Id: {{ index }}
                        </div>
                        <div class="badge badge-primary my-1 badge-lg" draggable="true" @drag="startDrag(col.id)">
                            {{ col.text }}
                        </div>
                    </div>
                </div>
                <div @drop="onDrop()" >
                    <h2 class="text-xl text-end">Columnas Selecionadas</h2>
                    <div v-for="(col, index) in selectedCols"
                        class="flex flex-row justify-between bg-neutral text-neutral-content w-full m-1 rounded p-2"
                        draggable="true">
                        <div class="">
                            Id: {{ index }}
                        </div>
                        <div>
                            <div class="badge badge-secondary my-1 badge-lg">
                                {{ col.text }}
                            </div>
                            <button @click="removeCol(index)" class="mx-2 px-2 py-1 bg-base-200 rounded-xl">
                                <Icon name="material-symbols:close-rounded" size="20px"
                                    class="text-accent rounded-xl cursor-pointer" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
    <div class="table-wrapper w-full">
        <div class="flex flex-row p-4 bg-neutral sticky left-0">
            <button class="btn bt-primary" @click="modalControl = true">
                Columnas
                <Icon name="material-symbols:arrow-drop-down" size="20px" class="text-accent rounded-xl cursor-pointer" />
            </button>
            <input type="text" placeholder="Type here" class="mx-2 input input-bordered basis-2/4" />
            <button class="btn btn-circle bt-primary" @click="downloadExcel">
                <Icon name="mdi:file-export" size="30px" />
            </button>
        </div>
        <table v-if="!loading" class="DMTable" id="tablID">
            <thead>
                <tr>
                    <!-- Generate table header based on cols prop -->
                    <th v-for="(col, index) in selectedCols" :key="col.id">
                        {{ col.text }}
                        <DDMenu :location="isLastThree(index, selectedCols.length) ? 'left' : ''">
                            <h1>Filtro</h1>
                            <ul class="text-primary-content">
                                <li><a>Ordenar Asc</a></li>
                                <li><a>Ordenar Desc</a></li>
                                <div class="divider"></div>
                                <li><a>Hola</a></li>
                                <li><a>Hola</a></li>
                            </ul>
                        </DDMenu>
                    </th>
                </tr>
            </thead>
            <tbody v-if="slicedRows != null">
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
const indexCol = ref('')
const modalControl = ref(false);
const tableContainer = ref<HTMLElement | null>(null);
const baseCols = ref<TableColumn[]>([]);
const selectedCols = ref<TableColumn[]>([]);
const rowsPerPage = ref(500); // Number of rows per page
const currentPage = ref(1); // Current page number
const totalPages = computed(() => Math.ceil(props.rows.length / rowsPerPage.value));


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
        baseCols.value.map(col => col.text), // Headers
        ...props.rows.map(row => baseCols.value.map(col => row[col.id])) // Rows
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = `data_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
};


const startDrag = (idCol: string) => {
    console.log(idCol);
    indexCol.value = idCol
};


const removeCol = (itemIndex: number) => {
    console.log(itemIndex,selectedCols.value)
    console.log(selectedCols.value.splice(itemIndex,1))
    selectedCols.value.splice(itemIndex,1)
}

const onDrop = () => {
    const itemId = indexCol.value
    if (itemId !== undefined) {
        const exists = selectedCols.value.find((item) => item.id == itemId)
        if (exists) return
        else {
            const item = props.cols.find((item) => item.id === itemId);
            if (item) {
                // Handle the found 'item' here
                selectedCols.value.push(item)
            }
        }
    }
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

const isLastThree = (index: number, lent: number) => {
    return index >= lent - 3;
}

onMounted(() => {
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

    console.log(selectedCols)
})

</script>
  
<style scoped>
#tablID {
    transition: all;
}

.table-wrapper {
    max-width: 99%;
    width: fit-content;
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