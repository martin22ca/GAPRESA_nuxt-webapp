<template>
    <div class="grid grid-cols-5 grid-rows-5 gap-2 m-4">
        <div class="col-span-3 row-span-2">
            <div class="flex flex-row flex-grow stats shadow">
                <div class="stat basis-1/2 shrink">
                    <div class="stat-figure text-primary">
                        Wow!
                    </div>
                    <div class="stat-title">Total Likes</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat basis-1/2 shrink">
                    <div class="stat-figure text-secondary">
                        Hola
                    </div>
                    <div class="stat-title">Page Views</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat basis-1/2 shrink">
                    <div class="stat-figure text-secondary">
                        Nice!
                    </div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-value">86%</div>
                    <div class="stat-desc text-secondary">31 tasks remaining</div>
                </div>

            </div>
        </div>
        <div class="col-span-2 col-start-4">
            <div class="hero bg-base-200">
                <div class="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 class="text-5xl font-bold">Bienvenido!</h1>
                        <p class="p-2">Nombre: Juan Perez</p>
                        <p class="p-2">Usuario: JuanPepe</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-3 row-span-3 col-start-1 row-start-3">
            <div class="collapse collapse-arrow bg-base-200 ">
                <input type="radio" name="my-accordion-2" checked="true" />
                <div class="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div class="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div class="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div class="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div class="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div class="collapse-content">
                    <p>hello</p>
                </div>
            </div>
        </div>
        <div class="col-span-2 row-span-4 col-start-4 row-start-2">5</div>
    </div>
</template>