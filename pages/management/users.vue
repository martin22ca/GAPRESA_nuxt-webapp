<template>
    <dialog class="modal" :open="modalVisible" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box max-w-7xl bg-base-200">
            <form method="dialog">
                <button @click="modalVisible = false; fetchResources()"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <ModalUser v-if="modalVisible" :user="selectedUser" />
        </div>
    </dialog>
    <div class="bg-base-300 h-auto">
        <div class="text-sm breadcrumbs p-2">
            <ul>
                <li><a>Home</a></li>
                <li><a>Usuarios</a></li>
            </ul>
        </div>
        <div>
            <h1 class="text-2xl p-2">Usuarios</h1>
        </div>
        <DTM :rows="users" :cols="headers" :loading="loading" @updateFilters="updateFilters">
            <template #table_options>
                <button class="btn btn mx-2" @click="manageUser(null)">
                    <Icon name="material-symbols:add" size="20px" class="text-accent" /> Usuario
                </button>
                <button class="btn btn mx-2">
                    <Icon name="material-symbols:add" size="20px" class="text-accent" /> Roles
                </button>
            </template>
            <template #info="{ row }">
                <button @click="manageUser(row)">
                    <Icon name="material-symbols:info" size="30px"></Icon>
                </button>
            </template>
        </DTM>
    </div>
</template>


<script setup>
import { getUsers } from '@/services/users'

definePageMeta({ middleware: ['auth'] })

const headers = [
    { id: 'id', 'text': 'ID' },
    { id: 'user_name', 'text': "Username" },
    { id: 'first_name', 'text': "Nombre" },
    { id: 'last_name', 'text': "Apellido" },
    { id: 'address', 'text': 'Direccion' },
    { id: 'cuil', 'text': 'Cuil' },
    { id: 'email_corp', 'text': 'Email Coorp' },
    { id: 'email_personal', 'text': 'Email Personal' },
    { id: 'phone', 'text': 'Telefono', },
    { id: 'phone_alt', 'text': 'Telefono Alt' },
    { id: 'start_date', 'text': "Fecha Comienzo" },
    { id: 'end_date', 'text': 'Fecha Fin' },
    { id: 'info', 'text': 'Acciones' },
]
const loading = ref(true)
const users = ref([])
const modalVisible = ref(false)
const selectedUser = ref(null)
let filters = []

const fetchResources = async () => {
    const { data, refresh } = await getUsers(filters)
    console.log(data)
    users.value = data.value
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

const manageUser = (userRow) => {
    if (!userRow) {
        selectedUser.value = null
    } else {
        
        selectedUser.value = userRow
    }
    console.log(selectedUser.value)
    modalVisible.value = true
}

</script>
