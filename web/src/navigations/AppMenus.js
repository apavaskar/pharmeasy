const menu = [
    {label: 'Home', icon: 'pi pi-fw pi-home', to: '/home'},
    {label: 'Reports',icon: 'pi pi-fw pi-chart-bar', to: '/home/reports',
        items: [
            {label: 'Field Structure',  to: '/home/reports/fieldStructure'},
            {label: 'Effort Report',  to: '/home/reports/effort'}
        ],
    }
];
/*const menu = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
    {
        label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
        ]
    },
    {
        label: 'Mega', icon: 'pi pi-fw pi-list', badge: 2, mega: true,
        items: [
            {
                label: 'UI Kit', icon: 'pi pi-fw pi-sitemap', badge: 6,
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                    { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
                    { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                    { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                    { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                    { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
                ]
            },
            {
                label: 'Templates',
                items: [
                    { label: 'Diamond', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/diamond-react' },
                    { label: 'Sapphire', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/sapphire-react' },
                    { label: 'Serenity', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/serenity-react' },
                    { label: 'Ultima', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/ultima-react' },
                    { label: 'Avalon', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/avalon-react' },
                    { label: 'Babylon', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/babylon-react' },
                    { label: 'Apollo', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/apollo-react' },
                    { label: 'Roma', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/layouts/roma-react' },
                ]
            },
            {
                label: 'Demo',
                items: [
                    { label: 'PrimeFaces', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/showcase' },
                    { label: 'PrimeNG', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/primeng' },
                    { label: 'PrimeReact', icon: 'pi pi-desktop', url: 'https://www.primefaces.org/primereact' }
                ]
            }
        ]
    },
    {
        label: "Utilities", icon: 'pi pi-fw pi-globe',
        items: [
            { label: 'Display', icon: 'pi pi-fw pi-desktop', to: '/display' },
            { label: 'Elevation', icon: 'pi pi-fw pi-external-link', to: '/elevation' },
            { label: 'Flexbox', icon: 'pi pi-fw pi-directions', to: '/flexbox' },
            { label: 'Icons', icon: 'pi pi-fw pi-search', to: '/icons' },
            { label: 'Widgets', icon: 'pi pi-fw pi-star-o', to: '/widgets' },
            { label: 'Grid System', icon: 'pi pi-fw pi-th-large', to: '/grid' },
            { label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', to: '/spacing' },
            { label: 'Typography', icon: 'pi pi-fw pi-align-center', to: '/typography' },
            { label: 'Text', icon: 'pi pi-fw pi-pencil', to: '/text' },
        ]
    },
    {
        label: 'Pages', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/crud' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
            { label: 'Landing', icon: 'pi pi-fw pi-user-plus', url: 'assets/pages/landing.html', target: '_blank' },
            { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
            { label: 'Invoice', icon: 'pi pi-fw pi-dollar', to: '/invoice' },
            { label: 'Help', icon: 'pi pi-fw pi-question-circle', to: '/help' },
            { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error' },
            { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound' },
            { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access' },
            { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }
        ]
    },
    {
        label: 'Menu Hierarchy', icon: 'pi pi-fw pi-align-left',
        items: [
            {
                label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                        ]
                    },
                    {
                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                        items: [
                            { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-align-left' }
                        ]
                    },
                ]
            },
            {
                label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-align-left' },
                        ]
                    },
                    {
                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                        items: [
                            { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                            { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-align-left' }
                        ]
                    },
                ]
            }
        ]
    },
    { label: 'Documentation', icon: 'pi pi-fw pi-book', to: '/documentation' },
    { label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', command: () => { window.location = "https://www.primefaces.org/store" } },
];
*/
export default menu;
