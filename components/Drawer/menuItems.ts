export interface MenuItem {
    title: string;
    icon: string;
    route: string;
    children: MenuItem[] | undefined;
}

export const Items: Array<MenuItem> = [
    {
        title: 'Home',
        icon: 'bx:home',
        route: '/',
        children: undefined
    },
    {
        title: 'Expedientes',
        icon: 'bx:file',
        route: '/records',
        children: undefined
    },
    {
        title: 'Entradas',
        icon: 'ic:round-log-in',
        route: '/input',
        children: [
            {
                title: 'Carga',
                icon: 'mingcute:upload-line',
                route: '/input/loadData',
                children: undefined
            },
            {
                title: 'Registros',
                icon: 'ic:round-log-in',
                route: '/input/recordsInfo',
                children: undefined
            }
        ],
    },
    {
        title: 'Egreso',
        icon: 'ic:round-log-out',
        route: '/records',
        children: [
            {
                title: 'Egreso',
                icon: 'ic:round-log-out',
                children: undefined,
                route: '/records',
            },
            {
                title: 'Egreso',
                icon: 'ic:round-log-out',
                route: '/records',
                children: undefined
            }
        ],
    },
    {
        title: 'Coordinador',
        icon: 'material-symbols:groups',
        route: '/records',
        children: undefined
    },
    {
        title: 'Prestadores',
        icon: 'icon-park-outline:delivery',
        route: '/providers',
        children: undefined
    }
]