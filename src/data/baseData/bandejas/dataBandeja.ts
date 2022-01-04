
// import { Bandejas } from '../../Models/bases/bandejas';
// import { BandejasOpciones } from '../../Models/bases/BandejasOpciones';

export const dataBandejas = [

    //bandeja portal clientes - facturacion 
    {
        Idbandeja: '20',
        Controller: 'PortalClientesFacturacion',
        PlaceHolder: 'Buscar por numero de factura',
        IconsAction: [
            { title: 'Ver Factura', icon: 'folder_open' },
            { title: 'Descargar', icon: 'get_app' },
        ],
        Opciones: [
            { description: "Nuevo", icon: "far fa-plus-square" },
        ],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja fidelizacion - participantes 
    {
        Idbandeja: '130',
        Controller: 'FindParticipantes',
        PlaceHolder: 'Buscar por participante o cliente',
        IconsAction: [
            { title: 'Ver Participante', icon: 'folder_open' },

        ],
        Opciones: [],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja fidelizacion - movimientos 
    {
        Idbandeja: '132',
        Controller: 'FindMovimientos',
        PlaceHolder: 'Buscar por identificación o participante',
        IconsAction: [
            { title: 'Ver Movimmiento', icon: 'folder_open' },

        ],
        Opciones: [],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja fidelizacion - Campañas 
    {
        Idbandeja: '133',
        Controller: 'FindCampanas',
        PlaceHolder: 'Buscar por nombre de campaña',
        IconsAction: [
            { title: 'Ver Campaña', icon: 'folder_open' },

        ],
        Opciones: [{ description: 'Nuevo', icon: 'fas fa-folder-plus' }],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja fidelizacion - Beneficios 
    {
        Idbandeja: '134',
        Controller: 'FindBeneficios',
        PlaceHolder: 'Buscar por nombre de beneficio',
        IconsAction: [
            { title: 'Ver Beneficio', icon: 'folder_open' },

        ],
        Opciones: [{ description: 'Nuevo', icon: 'fas fa-folder-plus' }],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja notificaciones
    {
        Idbandeja: '140',
        Controller: 'bandNotificaciones',
        PlaceHolder: 'Buscar por asunto o por destinatario ',
        IconsAction: [
            { title: 'Ver Notificación', icon: 'folder_open' },

        ],
        Opciones: [{ description: 'Nuevo', icon: 'fas fa-folder-plus' }, { description: 'Configuración', icon: 'fas fa-tools' }],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja Articulos
    {
        Idbandeja: '3',
        Controller: 'BandArticulos',
        PlaceHolder: 'Buscar por nombre, código, marca, línea o categoria',
        IconsAction: [
            { title: 'Abrir Artículo', icon: 'folder_open' },

        ],
        Opciones: [{ description: 'Nuevo', icon: 'fas fa-folder-plus' }, { description: 'Imagenes', icon: 'fas fa-portrait' }],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja Conteo
    {
        Idbandeja: '147',
        Controller: 'FindConteoInventario',
        PlaceHolder: 'Buscar por numero de conteo o agencia',
        IconsAction: [
            { title: 'Abrir Conteo', icon: 'folder_open' },

        ],
        Opciones: [{ description: 'Nuevo', icon: 'fas fa-folder-plus' }],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    },

    //bandeja Conteo
    {
        Idbandeja: '148',
        Controller: 'FacturacionElectronica',
        PlaceHolder: 'Buscar por tipo de documento, documento o estado.',
        IconsAction: [
            { title: 'Abrir Documento', icon: 'folder_open' },

        ],
        Opciones: [],
        Detalle: {
            displayedColumns: [],
            data: [],
            search: ''
        },
    }

];

// export const bandejasOpcionesDefault: BandejasOpciones[] = [
//     { description: "Filtrar", icon: "fa fa-filter" },
//     { description: "Refrescar", icon: "fa fa-retweet" },
//     { description: "Descargar", icon: "fa fa-download" },

// ];
