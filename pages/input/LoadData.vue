<template>
    <div class="flex flex-col">
        <div class="top m-4">
            <div class="card card-compact w-auto bg-base-200 shadow-xl basis-1/3 m-2">
                <div class="card-body text-center">
                    <h1 class="text-5xl font-bold"></h1>
                    <p class="py-6">El porcentaje de carga aumenta conforme usted sube los datos</p>
                    33%
                    <progress class="progress-secondary w-full bg-neutral" value="33" max="100" />
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-1 p-2 ">
            <div class="card card-compact w-auto bg-base-200 shadow-xl basis-1/3 m-4">
                <div class="card-body">
                    <h2 class="card-title">1. Cargar Asignaciones</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card bg-base-100 m-4 flex flex-row">
                        <div class="badge badge-lg bg-success w-full h-10 text-success-content">
                            Estado: Datos Cargados
                            <Icon class="text-2xl ml-4" name="icon-park-solid:success" />
                        </div>
                    </div>
                    <input type="file" class="file-input file-input-bordered w-full" />
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary my-2">Cargar</button>
                    </div>
                </div>
            </div>
            <div class="card card-compact w-auto bg-base-200 shadow-xl basis-1/3 m-4">
                <div class="card-body">
                    <h2 class="card-title">2. Cargar DB Prevencion</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card bg-base-100 m-4 flex flex-row">
                        <div class="badge badge-lg bg-warning w-full h-10 text-warning-content">
                            Estado: Esperando Carga
                            <span class="ml-4 loading loading-dots loading-md" />
                        </div>
                    </div>
                    <input type="file" class="file-input file-input-bordered w-full " />
                    <div class="card-actions justify-end">
                        <button class="btn btn-error my-2">cancelar</button>
                        <button class="btn btn-primary my-2">Cargar</button>
                    </div>
                </div>
            </div>
            <div class="card card-compact w-auto bg-base-200 shadow-xl basis-1/3 m-4">
                <div class="card-body">
                    <h2 class="card-title">3. Carga Manual de Datos</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary my-2">Cargar</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>