<template>
    <div class="table-wrapper">
        <div class="flex flex-row flex-grow p-2 bg-neutral">
            <select class="mx-2 select select-bordered basis-1/4">
                <option disabled selected>Selecionar Columnas</option>
                <option v-for="col in cols"> {{ col.text }}</option>
            </select>
            <input type="text" placeholder="Type here" class="mx-2 input input-bordered basis-3/4" />
        </div>
        <table class="DMTable">
            <thead>
                <tr>
                    <!-- Generate table header based on cols prop -->
                    <th v-for="col in tableColumns" :key="col.id" class="p-2">{{ col.text }}</th>
                </tr>
            </thead>
            <tbody v-if="rows != null">
                <!-- Generate table rows based on rows prop -->
                <tr v-for="(item, index) in rows" :key="index">
                    <td v-for="col in tableColumns" :key="col.id">{{ item[col.id] }}</td>
                </tr>
            </tbody>
            <span v-else class="loading loading-ring loading-lg"></span>
        </table>
    </div>
</template>
  
<script setup lang="ts">
interface TableColumn {
    id: string;
    text: string;
    order: number;
}

interface TableRow {
    [key: string]: string; // Each key will be a string, and the value too
}

const props = defineProps({
    cols: {
        type: Array<TableColumn>,
        default: null
    },
    rows: {
        type: Array<TableRow>,
        default: null
    },
    rowCustomizations: {
        type: Array<any>, // Array of objects specifying slotName and render function
        default: null
    }
})

const selectedColumns = ref(props.cols);

const tableColumns = computed(() => {
    // If columns are not provided, generate columns from the keys of the first row
    if (!props.cols && props.rows.length > 0) {
        const firstRow = props.rows[0];
        const algo = Object.keys(firstRow).map((key, index) => ({
            id: key,
            text: key,
            order: index + 1
        }))
        return algo;
    }
    // Use provided columns if available
    return props.cols || [];
});

</script>
  
<style scoped>
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

.DMTable thead th {
    color: oklch(var(--nc));
    background: oklch(var(--n));
}


.DMTable thead th:nth-child(odd) {
    color: oklch(var(--nc)/.9);
    background: oklch(var(--n)/.9);
}

.DMTable tr:nth-child(even) {
    background: #F8F8F8;
}
</style>