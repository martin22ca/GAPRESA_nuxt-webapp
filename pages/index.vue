<template>
    <div class="flex flex-col flex-grow">
        <div class="grid grid-cols-7 grid-rows-6 gap-4 m-4">
            <div class="col-span-2 row-span-2">
                <div class="stat bg-base-100 rounded-lg h-full">
                    <div class="stat-figure text-primary">
                        Wow!
                    </div>
                    <div class="stat-title">Total Likes</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>
            </div>
            <div class="col-span-2 row-span-2 col-start-3">
                <div class="stat bg-base-100 rounded-lg h-full">
                    <div class="stat-figure text-secondary">
                        Hola
                    </div>
                    <div class="stat-title">Page Views</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>
            </div>
            <div class="col-span-2 row-span-2 col-start-1 row-start-3">
                <div class="stat bg-primary rounded-lg h-full">
                    <div class="stat-figure text-primary-content">
                        Nice!
                    </div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-value">86%</div>
                    <div class="stat-desc text-primary-content">31 tasks remaining</div>
                </div>
            </div>
            <div class="col-span-2 row-span-2 col-start-3 row-start-3">
                <div class="stat bg-primary rounded-lg h-full">
                    <div class="stat-figure text-primary-content">
                        Nice!
                    </div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-value">86%</div>
                    <div class="stat-desc text-primary-content">31 tasks remaining</div>
                </div>

            </div>
            <div class="col-span-3 row-span-2 col-start-5 row-start-1">
                <div class="hero bg-base-100">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <h1 class="text-5xl font-bold">Bienvenido!</h1>
                            <p class="p-2">Nombre: Juan Perez</p>
                            <p class="p-2">Usuario: JuanPepe</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-3 row-span-4 col-start-5 row-start-3">
                <div class="card bg-secondary shadow-xl h-full">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4 row-span-2 row-start-5">
                <div class="card bg-base-200 shadow-xl h-full">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <DDMenu size="40px">
                            <p >
                                Hola Munsoi
                            </p>
                        </DDMenu>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>