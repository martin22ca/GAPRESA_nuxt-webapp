<template>
    <dialog id="my_modal_1" class="modal" :open="modalControl.state" style="background-color: oklch(var(--b3)/.8);">
        <div class="modal-box ">
            <form method="dialog">
                <button @click="toggleModal()"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="font-bold text-lg">{{ modalControl.title }}</h3>
            <div class="divider divider-start"></div>
            <p class="py-4">{{ modalControl.text }}</p>
            <span v-if="modalControl.loading" class="loading loading-dots loading-lg bg-primary"></span>
        </div>
    </dialog>
    <div class="toast toast-end" v-if="toastControl.state">
        <div class="alert alert-info">
            <span>{{ toastControl.text }}</span>
            <button @click="toggleToast()" class="btn btn-ghost btn-sm ">✕</button>
        </div>
    </div>
    <div class="card card-compact w-auto bg-base-100 shadow-md basis-1/2 m-2 ">
        <div class="card-body">
            <h2 class="card-title">{{ props.cardT }}</h2>
            <p>{{ props.description }}</p>
            <p class="py-2 text-lg">
                Ulitma carga: <span
                    :class="'badge p-4 px-10 text-lg ' + (state ? 'bg-success text-success-content' : 'bg-warning text-warning-content')">
                    {{ lastLoad }}
                </span>
            </p>
            <div class="card bg-base-100 m-2 flex flex-row">
                <div v-if="props.state" class="badge badge-lg bg-success w-full h-10 text-success-content">
                    Estado: Cargado
                    <Icon class="text-2xl ml-4" name="icon-park-solid:success" />
                </div>
                <div v-else class="badge badge-lg bg-warning w-full h-10 text-warning-content">
                    Estado: Esperando
                    <span class="ml-4 loading loading-dots loading-md" />
                </div>
            </div>
            <input ref="fileInputRef" @change="handleFileChange" type="file" class="w-full file-input file-input-bordered"
                placeholder="buscar"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                size="" />
            <div class="card-actions justify-end">
                <button v-if="selectedFile != null" class="btn btn-error my-2" @click="clearFileInput">Cancelar</button>
                <button :disabled="selectedFile == null" class="btn btn-primary my-2"
                    @click="sendFileToApi(selectedFile)">Cargar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { postAssignment, postDb } from '@/services/configService'
const props = defineProps({
    cardT: String,
    description: String,
    state: Boolean,
    isDb: Boolean,
    refresh: Function,
    lastLoad: String,
})

const modalControl = ref({
    state: false,
    title: 'Titulo',
    text: 'Desc',
    loading: false,
})
const toastControl = ref({
    state: false,
    text: 'Desc',
})
const fileInputRef = ref(null)
const selectedFile = ref(null);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ['csv', 'xlm', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    selectedFile.value = file
}

const sendFileToApi = async (file) => {
    try {
        // Check if the file is a spreadsheet (csv, xlm, xls)
        const allowedExtensions = ['csv', 'xlm', 'xls', 'xlsx'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        clearFileInput()

        if (allowedExtensions.includes(fileExtension)) {
            const formData = new FormData();
            formData.append('file', file);
            let data
            modalControl.value.loading = true
            toggleModal('Los datos estan siendo enviados',
                'El archivo esta siendo validado por el servidor, por favor aguarde. Este proceso no debe de durar mas de 1 minuto.')
            if (props.isDb) {
                data = await postDb(formData)
            } else {
                data = await postAssignment(formData)
            }
            if (data.data.value.success) {
                toggleModal()
                toggleToast('Enviados con exito')
                props.refresh()
                modalOpen.value = false
            } else {
                toggleModal()
                toggleToast('error: ' + data.data.value.error)
                props.refresh()
                modalOpen.value = false
            }
        } else {
            // Handle error if the file extension is not allowed
            console.error('Invalid file type. Please select a spreadsheet file.');
        }

    } catch (error) {
        // Handle any unexpected errors
        console.error('An error occurred:', error);
    }
};

const clearFileInput = () => {
    fileInputRef.value.value = null;
    selectedFile.value = null
};

const toggleModal = (titleVal=null, textVal=null) => {
    modalControl.value.title = titleVal
    modalControl.value.text = textVal
    modalControl.value.state = !modalControl.value.state
}
const toggleToast = (textVal) => {
    toastControl.value.text = textVal
    toastControl.value.state = !toastControl.value.state
}

</script>

<style scoped>
.loader {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
    box-sizing: border-box;
    animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
    33% {
        background: #FFF;
        box-shadow: -24px 0 #FF3D00, 24px 0 #FFF;
    }

    66% {
        background: #FF3D00;
        box-shadow: -24px 0 #FFF, 24px 0 #FFF;
    }

    100% {
        background: #FFF;
        box-shadow: -24px 0 #FFF, 24px 0 #FF3D00;
    }
}
</style>