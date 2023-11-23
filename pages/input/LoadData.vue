<template>
    <div class="flex flex-col">
        <div class="top">
            <div class="card w-auto bg-base-100 shadow-md m-2">
                <div class="card-title flex flex-row text-center p-4">
                    <ul class="steps w-full">
                        <li :class="'step ' + (state1 ? 'step-accent' : '')">Carga Prevencion</li>
                        <li :class="'step ' + (state2 ? 'step-accent' : '')">Carga Asignacion</li>
                        <li :class="'step ' + ((state1 && state2) ? 'step-accent' : '')">Carga Manual</li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-row flex-1">
                <GenericFileLoaderCard :state="state1" :isDb="true" cardT="1. Cargar DB Prevencion" :refresh="getInfo"
                    :lastLoad="lastLoad1"
                    description="Primero se deben actualizar la informacion recibida de Prevencion. Esta debe estar en formato CSV" />
                <GenericFileLoaderCard :state="state2" :isDb="false" cardT="2. Cargar Asignaciones" :refresh="getInfo"
                    :lastLoad="lastLoad2"
                    description="Segundo se deben cargar las asignaciones recibidas por correo de Prevencion. Esta debe estar en formato CSV" />
            </div>
        </div>
        <div class="card bg-base-100 m-2 p-4 shadow-md">
            <h2 class="card-title">3. Carga Manual de Datos</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary my-2">ver Expedientes</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { getConfig } from '~/services/configService.js'
const state1 = ref(false);
const state2 = ref(false);
const lastLoad1 = ref(null)
const lastLoad2 = ref(null)
const refreshFunc = ref(null)


const Now = new Date()
Now.setHours(0, 0, 0, 0);

const getInfo = async () => {
    const { data } = await getConfig()
    for (const status of data.value) {
        const statusD = new Date(status.value)
        statusD.setHours(0, 0, 0, 0);
        const stateVal = statusD >= Now;
        console.log('stateVal', stateVal, statusD, Now)
        if (status.id === 1) {
            state1.value = stateVal;
            lastLoad1.value = status.value
        } else {
            state2.value = stateVal;
            lastLoad2.value = status.value
        }
    }
    refreshFunc.value = refresh
}

const getPercentage = () => {
    let val = 0
    if (state2.value) val = val + 50
    if (state1.value) val = val + 50
    return val
}

onMounted(async () => {
    await getInfo()
})

</script>