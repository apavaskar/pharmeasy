import React from 'react';
import AppCodeHighlight from '../AppCodeHighlight';

export const Documentation = () => {

    return (
        <div className="ui-g">
            <div className="ui-g-12">
                <div className="card docs">
                    <h4>Current Version</h4>
                    <p>React 17.x and PrimeReact 6.x</p>

                    <h4>Getting Started</h4>
                    <p>Sapphire is an application template for React, based on the popular <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> that allows
                            creating React apps with no configuration. To get started extract the contents of the zip bundle and install the dependencies
                            with npm or yarn.</p>
<AppCodeHighlight>
{`
"npm install" or "yarn"
`}
</AppCodeHighlight>

                    <p>Next step is running the application using the start script and navigate to <b>http://localhost:3000/</b> to view the application.</p>

<AppCodeHighlight>
{`
"npm start" or "yarn start"
`}
</AppCodeHighlight>
                    <p>That is it, you may now start with the development of your application using the Sapphire template.</p>

                    <h4>React Scripts</h4>
                    <p>Following commands are derived from create-app-app.</p>
<AppCodeHighlight>
{`
"npm start" or "yarn start": Starts the development server
"npm test" or "yarn test": Runs the tests.
"npm run build" or "yarn run build": Creates a production build.
`}
</AppCodeHighlight>

                    <h4>Structure</h4>
                    <p>Sapphire consists of 3 main parts; the application layout, layout resources and theme resources for PrimeReact components. <b>App.js</b> inside src folder is the main component containing the template for the base layout
                            whereas required resources for the layout are placed inside the <b>public/assets/layout</b> folder and similarly theme resources are inside <b>public/assets/theme</b> folder.
                        </p>

                    <h4>Template</h4>
                    <p>Main layout is the template of the <i>App.js</i>, it is divided into a couple of child components such as topbar, content, menu, right menu, app search and footer. Here is template of the
                        <i>App.js</i> component that implements the logic such as menu state, layout modes and other configurable options.
                    </p>

<AppCodeHighlight>
{`
<div className={layoutContainerClassName} onClick={onWrapperClick}>
    <div className="layout-top">
        <AppTopbar topbarUserMenuActive={topbarUserMenuActive} menuActive={menuActive} menuHoverActive={menuHoverActive}
            onMenuButtonClick={onMenuButtonClick} onTopbarUserMenuButtonClick={onTopbarUserMenuButtonClick}
            onTopbarUserMenuClick={onTopbarUserMenuClick} model={menu} horizontal={horizontal} onSidebarClick={onSidebarClick}
            onRootMenuItemClick={onRootMenuItemClick} onMenuItemClick={onMenuItemClick} isMobile={isMobile} />

        <div className="layout-topbar-separator" />

        <AppBreadcrumb />
    </div>

    <div className="layout-content">
        // routers
    </div>

    <AppConfig topbarSize={topbarSize} onTopbarSizeChange={onTopbarSizeChange}
        topbarColor={topbarColor} onTopbarThemeChange={onTopbarThemeChange}
        horizontal={horizontal} onMenuToHorizontalChange={onMenuToHorizontalChange}
        menuColor={menuColor} onMenuThemeChange={onMenuThemeChange}
        themeColor={themeColor} onThemeColorChange={onThemeColorChange}
        layoutColor={layoutColor} onLayoutColorChange={onLayoutColorChange}
        compactMode={compactMode} onCompactModeChange={onCompactModeChange}
        rippleActive={ripple} onRippleChange={onRippleChange}
        inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} />

    <AppFooter />

    {menuActive && <div className="layout-mask" />}
    </div>
`}
</AppCodeHighlight>

                    <h4>Menu</h4>
                    <p>Menu is a separate component defined in <i>AppMenu.js</i> file based on PrimeReact MenuModel API. In order to define the menuitems,
                        navigate to data section of <i>App.js</i> file and define your own model as a nested structure using the menu property.
                        Here is the menu component from the demo application. Notice that menu object is bound to the model property of AppMenu component as shown above.</p>

<div style={{ overflow: 'auto', height: '400px' }}>
<AppCodeHighlight lang="js">
{`
const menu = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
    {
        label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
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
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
                    { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                    { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menus' },
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
    { label: 'Documentation', icon: 'pi pi-fw pi-question', to: '/documentation' },
    { label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', command: () => { window.location = "https://www.primefaces.org/store" } },
];
`}
</AppCodeHighlight>
</div>

                    <p>Dependencies of Layout are listed below and needs to be added to package.json. Only required
                            dependency is PrimeReact where optional dependencies exist to enable certain components in PrimeReact.</p>

<AppCodeHighlight lang="js">
{`
"primereact": "...",                //required: PrimeReact components
"primeicons": "...",                //required: Icons
"primeflex": "..."                  //required: Grid system
`}
</AppCodeHighlight>

                    <h4>Theme</h4>
                    <p>Sapphire provides 18 PrimeReact themes out of the box, setup of a theme simple including the css of theme to your page that are located inside assets/theme folder.</p>

                    <ul>
                        <li>theme-amber</li>
                        <li>theme-blue</li>
                        <li>theme-bluegrey</li>
                        <li>theme-brown</li>
                        <li>theme-cyan</li>
                        <li>theme-deeporange</li>
                        <li>theme-deeppurple</li>
                        <li>theme-gray</li>
                        <li>theme-green</li>
                        <li>theme-indigo</li>
                        <li>theme-lightblue</li>
                        <li>theme-lightgreen</li>
                        <li>theme-lime</li>
                        <li>theme-orange</li>
                        <li>theme-pink</li>
                        <li>theme-purple</li>
                        <li>theme-teal</li>
                        <li>theme-yellow</li>
                    </ul>

                    <p>A custom theme can be developed by the following steps.</p>
                    <ul>
                        <li>Choose a custom theme name such as "mytheme".</li>
                        <li>Create a folder named "mytheme" under <i>assets/theme</i> folder.</li>
                        <li>Create a file such as theme.scss under <i>assets/theme/mytheme</i> folder.</li>
                        <li>Define the variables listed below in your file and import the <i>../../sass/theme/_theme.scss</i> file.</li>
                        <li>Build the scss to generate css</li>
                        <li>Include the generated theme.css to your page.</li>
                    </ul>

                    <p>Here are the variables required to create a sample theme.</p>

<AppCodeHighlight lang="css">
{`
$primaryColor:#1E88E5;
$primaryTextColor:#ffffff;
$accentColor:#FFB300;
$accentTextColor: #212121;

@import '../sass/theme/_theme';
`}
</AppCodeHighlight>

                    <p>An example sass command to compile the css would be;</p>

<AppCodeHighlight>
{`
sass public/assets/theme/mytheme/theme.scss:public/assets/theme/mytheme/theme.css
`}
</AppCodeHighlight>

                    <p>Watch mode is handy to avoid compiling everytime when a change is made, instead use the following command
                        so that sass generates the file whenever you make a customization. This builds all css files whenever a change is made to any scss file.</p>
<AppCodeHighlight>
{`
sass --watch public/assets:public/assets
`}
</AppCodeHighlight>

                    <p>Same can also be applied to layout itself;</p>
                    <ul>
                        <li>Choose a layout name such as layout-myown.</li>
                        <li>Create an empty file named layout-myown.scss inside <i>assets/layout/css</i> folder.</li>
                        <li>Define the variables listed below and import the <i>/sass/layout/_layout.scss</i> file.</li>
                        <li>Build the scss to generate css</li>
                        <li>Serve the css by importing it using a link tag or a bundler.</li>
                    </ul>

                    <p>Here are the variables required to create a layout.</p>

<AppCodeHighlight>
{`
$primaryColor:#457fca;
$primaryTextColor:#ffffff;
$accentColor:#ffc107;
$accentTextColor:#212121;

@import '../../sass/layout/_layout';
`}
</AppCodeHighlight>


                    <h4>TopBar</h4>
                    <p>TopBar comes in 3 sizes; large, medium and small. A specific style class with the layout-top-* prefix is defined at the main container element in order to apply a size. Below are the all 3 options;</p>
<AppCodeHighlight>
{`
<div className="layout-container layout-top-small">
<div className="layout-container layout-top-medium">
<div className="layout-container layout-top-large">
`}
</AppCodeHighlight>

                    <p>Similarly TopBar style theme is also defined at the main container element, template below uses the default blue topbar.</p>
<AppCodeHighlight>
{`
<div className="layout-container layout-topbar-blue">
`}
</AppCodeHighlight>

                    <p>Full list of topbar options are the following, note that <i>layout-topbar-</i> prefix needs to be added to apply the style such as <b>layout-topbar-midnight</b>.</p>

                    <ul>
                        <li>aerial</li>
                        <li>apricot</li>
                        <li>aquarelle</li>
                        <li>architecture</li>
                        <li>ash</li>
                        <li>balloon</li>
                        <li>beach</li>
                        <li>beyoglu</li>
                        <li>bloom</li>
                        <li>blue</li>
                        <li>canvas</li>
                        <li>circuit</li>
                        <li>city</li>
                        <li>classic</li>
                        <li>coffee</li>
                        <li>condo</li>
                        <li>connectionsone</li>
                        <li>connectionstwo</li>
                        <li>crystal</li>
                        <li>dark</li>
                        <li>dawn</li>
                        <li>desert</li>
                        <li>destination</li>
                        <li>disco</li>
                        <li>dock</li>
                        <li>downtown</li>
                        <li>emptiness</li>
                        <li>exposure</li>
                        <li>faraway</li>
                        <li>flamingo</li>
                        <li>flight</li>
                        <li>fluid</li>
                        <li>forest</li>
                        <li>fruity</li>
                        <li>grape</li>
                        <li>hallway</li>
                        <li>harvey</li>
                        <li>hazy</li>
                        <li>highline</li>
                        <li>island</li>
                        <li>jet</li>
                        <li>kashmir</li>
                        <li>light</li>
                        <li>lights</li>
                        <li>lille</li>
                        <li>louisville</li>
                        <li>marley</li>
                        <li>materialone</li>
                        <li>materialtwo</li>
                        <li>midnight</li>
                        <li>mountain</li>
                        <li>mural</li>
                        <li>night</li>
                        <li>norge</li>
                        <li>northern</li>
                        <li>olympic</li>
                        <li>orange</li>
                        <li>palm</li>
                        <li>perfection</li>
                        <li>pine</li>
                        <li>polygons</li>
                        <li>reflection</li>
                        <li>revolt</li>
                        <li>river</li>
                        <li>road</li>
                        <li>rose</li>
                        <li>royal</li>
                        <li>sandiego</li>
                        <li>seagull</li>
                        <li>sky</li>
                        <li>skyline</li>
                        <li>skyscaper</li>
                        <li>snow</li>
                        <li>splash</li>
                        <li>spray</li>
                        <li>station</li>
                        <li>sunset</li>
                        <li>symmetry</li>
                        <li>timelapse</li>
                        <li>tinfoil</li>
                        <li>tractor</li>
                        <li>tropical</li>
                        <li>urban</li>
                        <li>vanusa</li>
                        <li>volcano</li>
                        <li>wall</li>
                        <li>waterfall</li>
                        <li>waves</li>
                        <li>wing</li>
                    </ul>

                    <p>Creating your own topbar requires a couple of steps.</p>
                    <ul>
                        <li>Choose a topbar name such as mytopbar.</li>
                        <li>Create an empty file named _topbar_mytopbar.scss inside <i>public/assets/sass/layout/topbar/themes</i> folder.</li>
                        <li>Add your file to the import section of the _topbar.scss in the same folder.</li>
                        <li>Define the variables listed below and import the <i>../_topbar_theme</i> file.</li>
                        <li>Build the scss to generate css</li>
                        <li>Apply layout-topbar-mytopbar class to the main container element in the App template.</li>
                    </ul>

<AppCodeHighlight>
{`
<div className="layout-container layout-topbar-mytopbar">
`}
</AppCodeHighlight>

                    <p>Here are the variables required to create a gradient based topbar.</p>

<AppCodeHighlight>
{`
.layout-topbar-mytopbar {
    $topbarLeftBgColor:#F1719A;
    $topbarRightBgColor:#FE9473;
    $topbarSearchInputColor:#FDD5CF;
    $topbarSearchFocusedInputColor:#ffffff;
    $topbarUserIconHoverBorderColor:#ffffff;
    $topbarSeparatorColor:#ffffff;

    //vertical menubutton
    $menuButtonBgColor:#fafafa;
    $menuButtonIconColor:#F1719A;
    $menuButtonHoverBgColor:#e0e0e0;
    $menuButtonHoverIconColor:#F1719A;
    $menuButtonActiveBgColor:rgba(169,53,89,.6);
    $menuButtonActiveIconColor:#ffffff;

    //horizontal menu
    $horizontalMenuitemTextColor:#ffffff;
    $horizontalMenuitemIconColor:#ffffff;
    $horizontalMenuitemActiveBorderColor:#ffffff;
    $horizontalMenuitemHoverBorderColor:#FDD5CF;

    //breadcrumb
    $breadcrumbIconColor:#ffffff;
    $breadcrumbTextColor:#ffffff;
    $breadcrumbLinkColor:#80CBC4;

    @import '../_topbar_theme';
}
`}
</AppCodeHighlight>

                    <p>If you prefer an image for the background, use the template below.</p>

<AppCodeHighlight lang="scss">
{`
.layout-topbar-mytopbar {
    $topbarBgImage:'reflection-topbar.jpg';
    $topbarSearchInputColor:#BFDEE2;
    $topbarSearchFocusedInputColor:#ffffff;
    $topbarUserIconHoverBorderColor:#ffffff;
    $topbarSeparatorColor:#ffffff;

    //vertical menubutton
    $menuButtonBgColor:#fafafa;
    $menuButtonIconColor:#1C1F20;
    $menuButtonHoverBgColor:#e0e0e0;
    $menuButtonHoverIconColor:#1C1F20;
    $menuButtonActiveBgColor:rgba(0,172,193,.6);
    $menuButtonActiveIconColor:#ffffff;

    //horizontal menu
    $horizontalMenuitemTextColor:#ffffff;
    $horizontalMenuitemIconColor:#ffffff;
    $horizontalMenuitemActiveBorderColor:#ffffff;
    $horizontalMenuitemHoverBorderColor:#BFDEE2;

    //breadcrumb
    $breadcrumbIconColor:#ffffff;
    $breadcrumbTextColor:#ffffff;
    $breadcrumbLinkColor:#4DD0E1;

    @import '../_topbar_theme';
}
`}
</AppCodeHighlight>

                    <h4>Menu Themes</h4>
                    <p>Menu themes apply to the vertical menu, submenus of horizontal menu and the profile menu. Menu style used across the template is defined at the main container element, template below uses the default light menus.</p>
<AppCodeHighlight>
{`
<div className="layout-container layout-menu-light">
`}
</AppCodeHighlight>

                    <p>Full list of menu themes are the following, note that <i>layout-menu-</i> prefix needs to be added to apply the style such as <b>layout-menu-dark</b>.</p>

                    <ul>
                        <li>aerial</li>
                        <li>apricot</li>
                        <li>aquarelle</li>
                        <li>architecture</li>
                        <li>ash</li>
                        <li>balloon</li>
                        <li>beach</li>
                        <li>beyoglu</li>
                        <li>bloom</li>
                        <li>blue</li>
                        <li>canvas</li>
                        <li>circuit</li>
                        <li>city</li>
                        <li>classic</li>
                        <li>coffee</li>
                        <li>condo</li>
                        <li>connectionsone</li>
                        <li>connectionstwo</li>
                        <li>crystal</li>
                        <li>dark</li>
                        <li>dawn</li>
                        <li>desert</li>
                        <li>destination</li>
                        <li>disco</li>
                        <li>dock</li>
                        <li>downtown</li>
                        <li>emptiness</li>
                        <li>exposure</li>
                        <li>faraway</li>
                        <li>flamingo</li>
                        <li>flight</li>
                        <li>fluid</li>
                        <li>forest</li>
                        <li>fruity</li>
                        <li>grape</li>
                        <li>hallway</li>
                        <li>harvey</li>
                        <li>hazy</li>
                        <li>highline</li>
                        <li>island</li>
                        <li>jet</li>
                        <li>kashmir</li>
                        <li>light</li>
                        <li>lights</li>
                        <li>lille</li>
                        <li>louisville</li>
                        <li>marley</li>
                        <li>materialone</li>
                        <li>materialtwo</li>
                        <li>midnight</li>
                        <li>mountain</li>
                        <li>mural</li>
                        <li>night</li>
                        <li>norge</li>
                        <li>northern</li>
                        <li>olympic</li>
                        <li>orange</li>
                        <li>palm</li>
                        <li>perfection</li>
                        <li>pine</li>
                        <li>polygons</li>
                        <li>reflection</li>
                        <li>revolt</li>
                        <li>river</li>
                        <li>road</li>
                        <li>rose</li>
                        <li>royal</li>
                        <li>sandiego</li>
                        <li>seagull</li>
                        <li>sky</li>
                        <li>skyline</li>
                        <li>skyscaper</li>
                        <li>snow</li>
                        <li>splash</li>
                        <li>spray</li>
                        <li>station</li>
                        <li>sunset</li>
                        <li>symmetry</li>
                        <li>timelapse</li>
                        <li>tinfoil</li>
                        <li>tractor</li>
                        <li>tropical</li>
                        <li>urban</li>
                        <li>vanusa</li>
                        <li>volcano</li>
                        <li>wall</li>
                        <li>waterfall</li>
                        <li>waves</li>
                        <li>wing</li>
                    </ul>

                    <p>Creating your own menu theme requires a couple of steps.</p>
                    <ul>
                        <li>Choose a menu name such as mymenu.</li>
                        <li>Create an empty file named _menu_mymenu.scss inside <i>public/assets/sass/layout/menu/themes</i> folder.</li>
                        <li>Add your file to the import section of the _menu.scss in the same folder.</li>
                        <li>Define the variables listed below and import the <i>../_menu_theme</i> file.</li>
                        <li>Build the scss to generate css</li>
                        <li>Add layout-menu-mymenu to the main wrapper element of in the main App template.</li>
                    </ul>

<AppCodeHighlight>
{`
<div className="layout-container layout-menu-mymenu">
`}
</AppCodeHighlight>

                    <p>Here are the variables required to create a gradient based menu.</p>

<AppCodeHighlight lang="scss">
{`
.layout-menu-mymenu {
    $menuTopBgColor:#457fca;
    $menuBottomBgColor:#5691c8;
    $menuitemTextColor:#ffffff;
    $menuitemIconColor:#ffffff;
    $menuitemHoverBgColor:#578bcf;
    $menuitemHoverTextColor:#ffffff;
    $menuitemHoverIconColor:#ffffff;
    $menuitemActiveTextColor:#ffc107;
    $menuitemActiveIconColor:#ffc107;
    $verticalActiveRootMenuitemBgColor:#ffffff;
    $verticalActiveRootMenuitemTextColor:#457fca;
    $verticalActiveRootMenuitemIconColor:#457fca;
    $verticalSubmenuBgColor:#6a98d4;

    @import '../_menu_theme';
}
`}
</AppCodeHighlight>

                <p>If you prefer an image for the background, use the template below.</p>

<AppCodeHighlight lang="scss">
{`
.layout-menu-mymenu {
    $menuBgImage:'architecture-menu.jpg';
    $menuitemTextColor:#ffffff;
    $menuitemIconColor:#ffffff;
    $menuitemHoverBgColor:rgba(255,255,255,0.32);
    $menuitemHoverTextColor:#ffffff;
    $menuitemHoverIconColor:#ffffff;
    $menuitemActiveTextColor:#B39DDB;
    $menuitemActiveIconColor:#B39DDB;
    $verticalActiveRootMenuitemBgColor:#673AB7;
    $verticalActiveRootMenuitemTextColor:#ffffff;
    $verticalActiveRootMenuitemIconColor:#ffffff;
    $verticalSubmenuBgColor:rgba(0,0,0,0.2);

    @import '../_menu_theme';
}
`}
</AppCodeHighlight>

                    <h4>Menu Highlight Color</h4>
                    <p>When light and dark menus are used, a highlight color needs to be defined to show the selected menuitem whereas in other menu themes, the highlight color is defined by the menu theme itself.
                        This color scheme is specified by the layout file such as layout-blue.scss which is still a mandatory file to be included regardless of the menu type as it defines the structure for the layout itself.</p>

                    <p>Full list of menu highlight themes are the following.</p>
                    <ul>
                        <li>amber</li>
                        <li>blue</li>
                        <li>bluegray</li>
                        <li>brown</li>
                        <li>cyan</li>
                        <li>deeporange</li>
                        <li>deeppurple</li>
                        <li>gray</li>
                        <li>green</li>
                        <li>indigo</li>
                        <li>lightblue</li>
                        <li>lightgreen</li>
                        <li>lime</li>
                        <li>orange</li>
                        <li>pink</li>
                        <li>purple</li>
                        <li>teal</li>
                        <li>yellow</li>
                    </ul>

                    <p>Creating your own menu highlight theme requires a couple of steps.</p>
                    <ul>
                        <li>Choose a layout name such as myown.</li>
                        <li>Create an empty file named layout-myown.scss inside <i>public/assets/sass/layout/css</i> folder.</li>
                        <li>Define the variables listed below and import the <i>../../sass/layout/_layout</i> file.</li>
                        <li>Build the scss to generate css</li>
                        <li>Import the layout css file in your application.</li>
                    </ul>

<AppCodeHighlight lang="scss">
{`
$primaryColor:#607D8B;
$primaryTextColor:#ffffff;
$accentColor:#FFC107;
$accentTextColor:#212121;

@import '../../sass/layout/_layout';
`}
</AppCodeHighlight>

                    <h4>Common SASS Variables</h4>
                    <p>In case you'd like to customize the shared variables, use the variables files under sass/theme and sass/layout folders.</p>

                <h5>sass/variables/_layout.scss</h5>
<AppCodeHighlight lang="scss">
{`
//general
$fontSize:14px;
$fontFamily:Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
$textColor:rgba(0,0,0.87);
$textSecondaryColor:rgba(0,0,0,.60);
$borderRadius:4px;
$letterSpacing:.25px;
$transitionDuration:.2s;

//icons
$iconWidth:20px;
$iconHeight:20px;
$iconFontSize:20px;

//list item hover
$hoverBgColor:#e8e8e8;
$hoverTextColor:#000000;

$dividerColor:#dbdbdb;
$dividerLightColor:#f8f8f8;

$bodyBgColor:#f4f4f7;
$bodySidePadding:100px;
$mobileBreakpoint:1024px;
$footerBgColor:#212121;
$footerTextColor:#9f9f9f;
$menuitemBorderRadius:6px;
$maskBgColor:#252529;

//horizontal menu
$horizontalOverlaySubmenuShadow:0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 17px 0 rgba(0, 0, 0, 0.2);
`}
</AppCodeHighlight>

                    <h5>sass/variables/_theme.scss</h5>
<div style={{ overflow: 'auto', height: '400px', marginBottom: '10px' }}>
<AppCodeHighlight lang="scss">
{`
$emphasis-high:rgba(0,0,0.87);
$emphasis-medium:rgba(0,0,0,.60);
$emphasis-low:rgba(0,0,0,.38);
$emphasis-lower:rgba(0,0,0,.12);
$overlayColor:#000000;

//global
$fontFamily:Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
$fontSize:1rem;
$fontWeight:normal;
$textColor:$emphasis-high;
$textSecondaryColor:$emphasis-medium;
$borderRadius:4px;
$transitionDuration:.2s;
$formElementTransition:background-color $transitionDuration, border-color $transitionDuration, color $transitionDuration, box-shadow $transitionDuration, background-size 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
$actionIconTransition:background-color $transitionDuration, color $transitionDuration, box-shadow $transitionDuration;
$listItemTransition:none;
$primeIconFontSize:1rem;
$divider:1px solid rgba(0,0,0,.12);
$inlineSpacing:.5rem;
$disabledOpacity:.38;
$maskBg:rgba(0, 0, 0, 0.32);
$loadingIconFontSize:2rem;
$errorColor:#B00020;

//selected state
$highlightBg:rgba($primaryColor, .12);
$highlightTextColor:$primaryColor;

//scale
$scaleSM:0.875;
$scaleLG:1.25;

//focus
$focusOutlineColor:transparent;
$focusOutline:0 none;
$focusOutlineOffset:0;
$focusShadow:none;

//action icons
$actionIconWidth:2.5rem;
$actionIconHeight:2.5rem;
$actionIconBg:transparent;
$actionIconBorder:0 none;
$actionIconColor:$textSecondaryColor;
$actionIconHoverBg:rgba(0,0,0,.04);
$actionIconHoverBorderColor:transparent;
$actionIconHoverColor:$textSecondaryColor;
$actionIconBorderRadius:50%;

//input field (e.g. inputtext, spinner, inputmask)
$inputPadding:1rem 1rem;
$inputTextFontSize:1rem;
$inputBg:#ffffff;
$inputTextColor:$emphasis-high;
$inputIconColor:$emphasis-medium;
$inputBorder:1px solid $emphasis-low;
$inputHoverBorderColor:$emphasis-high;
$inputFocusBorderColor:$primaryColor;
$inputErrorBorderColor:$errorColor;
$inputPlaceholderTextColor:$emphasis-medium;
$inputFilledBg:#f5f5f5;
$inputFilledHoverBg:#ececec;
$inputFilledFocusBg:#dcdcdc;

//input groups
$inputGroupBg:$inputBg;
$inputGroupTextColor:$emphasis-medium;
$inputGroupAddOnMinWidth:2.357rem;

//input lists (e.g. dropdown, autocomplete, multiselect, orderlist)
$inputListBg:#ffffff;
$inputListTextColor:$textColor;
$inputListBorder:1px solid #e5e5e5;
$inputListPadding:0;
$inputListItemPadding:1rem 1rem;
$inputListItemBg:transparent;
$inputListItemTextColor:$textColor;
$inputListItemHoverBg:rgba(0,0,0,.04);
$inputListItemTextHoverColor:$textColor;
$inputListItemBorder:0 none;
$inputListItemBorderRadius:0;
$inputListItemMargin:0;
$inputListItemFocusShadow:none;
$inputListHeaderPadding:1rem;
$inputListHeaderMargin:0;
$inputListHeaderBg:#ffffff;
$inputListHeaderTextColor:$textColor;
$inputListHeaderBorder:1px solid rgba(0,0,0,.12);

//inputs with overlays (e.g. autocomplete, dropdown, multiselect)
$inputOverlayBg:$inputListBg;
$inputOverlayHeaderBg:$inputListHeaderBg;
$inputOverlayBorder:0 none;
$inputOverlayShadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);

//button
$buttonPadding:0.714rem 1rem;
$buttonIconOnlyWidth:3rem;
$buttonIconOnlyPadding:0.714rem;
$buttonBg:$primaryColor;
$buttonTextColor:$primaryTextColor;
$buttonBorder:0 none;
$buttonHoverBg:rgba($primaryColor, .92);
$buttonTextHoverColor:$primaryTextColor;
$buttonHoverBorderColor:transparent;
$buttonActiveBg:rgba($primaryColor, .68);
$buttonTextActiveColor:$primaryTextColor;
$buttonActiveBorderColor:transparent;
$raisedButtonShadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
$roundedButtonBorderRadius:2rem;

$textButtonHoverBgOpacity:.04;
$textButtonActiveBgOpacity:.16;
$outlinedButtonBorder:1px solid;
$plainButtonTextColor:$textSecondaryColor;
$plainButtonHoverBgColor:rgba(0,0,0,.04);
$plainButtonActiveBgColor:rgba(0,0,0,.16);

$secondaryButtonBg:$accentColor;
$secondaryButtonTextColor:$accentTextColor;
$secondaryButtonBorder:0 none;
$secondaryButtonHoverBg:rgba($accentColor, .92);
$secondaryButtonTextHoverColor:$accentTextColor;
$secondaryButtonHoverBorderColor:transparent;
$secondaryButtonActiveBg:rgba($accentColor, .68);
$secondaryButtonTextActiveColor:$accentTextColor;
$secondaryButtonActiveBorderColor:transparent;
$secondaryButtonFocusShadow:none;

$infoButtonBg:#2196F3;
$infoButtonTextColor:#ffffff;
$infoButtonBorder:0 none;
$infoButtonHoverBg:rgba(#2196F3, .92);
$infoButtonTextHoverColor:#ffffff;
$infoButtonHoverBorderColor:transparent;
$infoButtonActiveBg:rgba(#2196F3, .68);
$infoButtonTextActiveColor:#ffffff;
$infoButtonActiveBorderColor:transparent;
$infoButtonFocusShadow:none;

$successButtonBg:#689F38;
$successButtonTextColor:#ffffff;
$successButtonBorder:0 none;
$successButtonHoverBg:rgba(#689F38, .92);
$successButtonTextHoverColor:#ffffff;
$successButtonHoverBorderColor:transparent;
$successButtonActiveBg:rgba(#689F38, .68);
$successButtonTextActiveColor:#ffffff;
$successButtonActiveBorderColor:transparent;
$successButtonFocusShadow:none;

$warningButtonBg:#FBC02D;
$warningButtonTextColor:#212529;
$warningButtonBorder:0 none;
$warningButtonHoverBg:rgba(#FBC02D, .92);
$warningButtonTextHoverColor:#212529;
$warningButtonHoverBorderColor:transparent;
$warningButtonActiveBg:rgba(#FBC02D, .68);
$warningButtonTextActiveColor:#212529;
$warningButtonActiveBorderColor:transparent;
$warningButtonFocusShadow:none;

$helpButtonBg:#9C27B0;
$helpButtonTextColor:#ffffff;
$helpButtonBorder:0 none;
$helpButtonHoverBg:rgba(#9C27B0, .92);
$helpButtonTextHoverColor:#ffffff;
$helpButtonHoverBorderColor:transparent;
$helpButtonActiveBg:rgba(#9C27B0, .68);
$helpButtonTextActiveColor:#ffffff;
$helpButtonActiveBorderColor:transparent;
$helpButtonFocusShadow:none;

$dangerButtonBg:#D32F2F;
$dangerButtonTextColor:#ffffff;
$dangerButtonBorder:0 none;
$dangerButtonHoverBg:rgba(#D32F2F, .92);
$dangerButtonTextHoverColor:#ffffff;
$dangerButtonHoverBorderColor:transparent;
$dangerButtonActiveBg:rgba(#D32F2F, .68);
$dangerButtonTextActiveColor:#ffffff;
$dangerButtonActiveBorderColor:transparent;
$dangerButtonFocusShadow:none;

$linkButtonColor:transparent;
$linkButtonHoverColor:transparent;
$linkButtonTextHoverDecoration:underline;
$linkButtonFocusShadow:none;

//checkbox
$checkboxWidth:18px;
$checkboxHeight:18px;
$checkboxBorder:2px solid #757575;
$checkboxIconFontSize:14px;
$checkboxActiveBorderColor:$primaryColor;
$checkboxActiveBg:$primaryColor;
$checkboxIconActiveColor:$primaryTextColor;
$checkboxActiveHoverBg:$primaryColor;
$checkboxIconActiveHoverColor:$primaryTextColor;
$checkboxActiveHoverBorderColor:$primaryColor;

//radiobutton
$radiobuttonWidth:20px;
$radiobuttonHeight:20px;
$radiobuttonBorder:2px solid #757575;
$radiobuttonIconSize:10px;
$radiobuttonActiveBorderColor:$primaryColor;
$radiobuttonActiveBg:$primaryTextColor;
$radiobuttonIconActiveColor:$primaryColor;
$radiobuttonActiveHoverBg:$primaryTextColor;
$radiobuttonIconActiveHoverColor:$primaryColor;
$radiobuttonActiveHoverBorderColor:$primaryColor;

//colorpicker
$colorPickerPreviewWidth:2rem;
$colorPickerPreviewHeight:2rem;
$colorPickerBg:#323232;
$colorPickerBorderColor:#191919;
$colorPickerHandleColor:#ffffff;

//togglebutton
$toggleButtonBg:#ffffff;
$toggleButtonBorder:1px solid rgba(0,0,0,.12);
$toggleButtonTextColor:$textColor;
$toggleButtonIconColor:$textSecondaryColor;
$toggleButtonHoverBg:#f6f6f6;
$toggleButtonHoverBorderColor:rgba(0,0,0,.12);
$toggleButtonTextHoverColor:$textColor;
$toggleButtonIconHoverColor:$textSecondaryColor;
$toggleButtonActiveBg:#e0e0e1;
$toggleButtonActiveBorderColor:#e0e0e1;
$toggleButtonTextActiveColor:$textColor;
$toggleButtonIconActiveColor:$textSecondaryColor;
$toggleButtonActiveHoverBg:#d9d8d9;
$toggleButtonActiveHoverBorderColor:#d9d8d9;
$toggleButtonTextActiveHoverColor:$textColor;
$toggleButtonIconActiveHoverColor:$textSecondaryColor;;

//inplace
$inplacePadding:$inputPadding;
$inplaceHoverBg:rgba(0,0,0,.04);
$inplaceTextHoverColor:$textColor;

//rating
$ratingIconFontSize:1.143rem;
$ratingCancelIconColor:#B00020;
$ratingCancelIconHoverColor:#B00020;
$ratingStarIconOffColor:$primaryColor;
$ratingStarIconOnColor:$primaryColor;
$ratingStarIconHoverColor:$primaryColor;

//slider
$sliderBg:#c1c1c1;
$sliderBorder:0 none;
$sliderHorizontalHeight:2px;
$sliderVerticalWidth:2px;
$sliderHandleWidth:20px;
$sliderHandleHeight:20px;
$sliderHandleBg:$primaryColor;
$sliderHandleBorder:0 none;
$sliderHandleBorderRadius:50%;
$sliderHandleHoverBorderColor:0 none;
$sliderHandleHoverBg:$primaryColor;
$sliderRangeBg:$primaryColor;

//calendar
$calendarTableMargin:.5rem 0;
$calendarPadding:.5rem;
$calendarBg:#ffffff;
$calendarInlineBg:$calendarBg;
$calendarTextColor:$textColor;
$calendarBorder:$inputListBorder;
$calendarOverlayBorder:$inputOverlayBorder;

$calendarHeaderPadding:.5rem;
$calendarHeaderBg:#ffffff;
$calendarInlineHeaderBg:$calendarBg;
$calendarHeaderBorder:$divider;
$calendarHeaderTextColor:$textColor;
$calendarHeaderFontWeight:500;
$calendarHeaderCellPadding:.5rem;

$calendarCellDatePadding:.5rem;
$calendarCellDateWidth:2.5rem;
$calendarCellDateHeight:2.5rem;
$calendarCellDateBorderRadius:50%;
$calendarCellDateBorder:1px solid transparent;
$calendarCellDateHoverBg:rgba(0,0,0,.04);
$calendarCellDateTodayBg:#ffffff;
$calendarCellDateTodayBorderColor: rgba(0,0,0,12);
$calendarCellDateTodayTextColor:$textColor;

$calendarButtonBarPadding:1rem 0;
$calendarTimePickerPadding:.5rem;
$calendarTimePickerElementPadding:0 .5rem;
$calendarTimePickerTimeFontSize:1.25rem;

$calendarBreakpoint:769px;
$calendarCellDatePaddingSM:0;

//input switch
$inputSwitchWidth:2.75rem;
$inputSwitchHeight:1rem;
$inputSwitchBorderRadius:.5rem;
$inputSwitchHandleWidth:1.50rem;
$inputSwitchHandleHeight:1.50rem;
$inputSwitchHandleBorderRadius:50%;
$inputSwitchSliderPadding:-1px;
$inputSwitchSliderOffBg:rgba(0,0,0,.38);
$inputSwitchHandleOffBg:#ffffff;
$inputSwitchSliderOffHoverBg:rgba(0,0,0,.38);
$inputSwitchSliderOnBg:rgba($primaryColor, .5);
$inputSwitchSliderOnHoverBg:rgba($primaryColor, .5);
$inputSwitchHandleOnBg:$primaryColor;

//panel
$panelHeaderBorder:1px solid #e0e0e0;
$panelHeaderBg:#ffffff;
$panelHeaderTextColor:$textColor;
$panelHeaderFontWeight:500;
$panelHeaderPadding:1rem;
$panelToggleableHeaderPadding:.5rem 1rem;

$panelHeaderHoverBg:rgba(0,0,0,.04);
$panelHeaderHoverBorderColor:#e0e0e0;
$panelHeaderTextHoverColor:$textColor;

$panelContentBorder:1px solid #e0e0e0;
$panelContentBg:#ffffff;
$panelContentTextColor:$textColor;
$panelContentPadding:1rem;

$panelFooterBorder:1px solid #e0e0e0;
$panelFooterBg:#ffffff;
$panelFooterTextColor:$textColor;
$panelFooterPadding:1rem 1rem;

//accordion
$accordionSpacing:0;
$accordionHeaderBorder:0 none;
$accordionHeaderBg:#ffffff;
$accordionHeaderTextColor:$textColor;
$accordionHeaderFontWeight:400;
$accordionHeaderPadding:1.5rem;

$accordionHeaderHoverBg:#f6f6f6;
$accordionHeaderHoverBorderColor:transparent;
$accordionHeaderTextHoverColor:$textColor;

$accordionHeaderActiveBg:#ffffff;
$accordionHeaderActiveBorderColor:transparent;
$accordionHeaderTextActiveColor:$textColor;

$accordionHeaderActiveHoverBg:#ffffff;
$accordionHeaderActiveHoverBorderColor:transparent;
$accordionHeaderTextActiveHoverColor:$textColor;

$accordionContentBorder:0 none;
$accordionContentBg:#ffffff;
$accordionContentTextColor:$textColor;
$accordionContentPadding:1rem 1.5rem;

//tabview
$tabviewNavBorder:solid rgba(0,0,0,.12);
$tabviewNavBorderWidth:0 0 1px 0;
$tabviewNavBg:#ffffff;

$tabviewHeaderSpacing:0;
$tabviewHeaderBorder:none;
$tabviewHeaderBorderWidth:0 0 0 0;
$tabviewHeaderBorderColor:transparent transparent transparent transparent;
$tabviewHeaderBg:#ffffff;
$tabviewHeaderTextColor:$textSecondaryColor;
$tabviewHeaderFontWeight:500;
$tabviewHeaderPadding:1rem 1.5rem;
$tabviewHeaderMargin:0 0 0 0;

$tabviewHeaderHoverBg:rgba($primaryColor,.04);
$tabviewHeaderHoverBorderColor:transparent;
$tabviewHeaderTextHoverColor:$textSecondaryColor;

$tabviewHeaderActiveBg:#ffffff;
$tabviewHeaderActiveBorderColor:transparent;
$tabviewHeaderTextActiveColor:$primaryColor;

$tabviewContentBorder:0 none;
$tabviewContentBg:#ffffff;
$tabviewContentTextColor:$textColor;
$tabviewContentPadding:$panelContentPadding;

//upload
$fileUploadProgressBarHeight:4px;
$fileUploadContentPadding:2rem 1rem;

//scrollpanel
$scrollPanelTrackBorder:0 none;
$scrollPanelTrackBg:rgba(0,0,0,.12);

//card
$cardBodyPadding:1rem;
$cardTitleFontSize:1.5rem;
$cardTitleFontWeight:700;
$cardSubTitleFontWeight:400;
$cardSubTitleColor:$textSecondaryColor;
$cardContentPadding:1rem 0;
$cardFooterPadding:1rem 0 0 0;
$cardShadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

//editor
$editorToolbarBg:$panelHeaderBg;
$editorToolbarBorder:$panelHeaderBorder;
$editorToolbarPadding:$panelHeaderPadding;
$editorToolbarIconColor:$textSecondaryColor;
$editorToolbarIconHoverColor:$textColor;
$editorIconActiveColor:$primaryColor;
$editorContentBorder:$panelContentBorder;
$editorContentBg:$panelContentBg;

//paginator
$paginatorBg:#ffffff;
$paginatorTextColor:$textColor;
$paginatorBorder:solid #e4e4e4;
$paginatorBorderWidth:0;
$paginatorPadding:.5rem 1rem;
$paginatorElementWidth:$buttonIconOnlyWidth;
$paginatorElementHeight:$buttonIconOnlyWidth;
$paginatorElementBg:transparent;
$paginatorElementBorder:0 none;
$paginatorElementIconColor:$textSecondaryColor;
$paginatorElementHoverBg:rgba(0,0,0,.04);
$paginatorElementHoverBorderColor:transparent;
$paginatorElementIconHoverColor:$textSecondaryColor;
$paginatorElementBorderRadius:50%;
$paginatorElementMargin:.143rem;
$paginatorElementPadding:0;

//table
$tableHeaderBorder:1px solid #e4e4e4;
$tableHeaderBorderWidth:0 0 1px 0;
$tableHeaderBg:#ffffff;
$tableHeaderTextColor:$textColor;
$tableHeaderFontWeight:500;
$tableHeaderPadding:1rem 1rem;

$tableHeaderCellPadding:1rem 1rem;
$tableHeaderCellBg:#ffffff;
$tableHeaderCellTextColor:$textColor;
$tableHeaderCellFontWeight:500;
$tableHeaderCellBorder:1px solid #e4e4e4;
$tableHeaderCellBorderWidth:0 0 1px 0;
$tableHeaderCellHoverBg:rgba(0,0,0,.04);
$tableHeaderCellTextHoverColor:$textColor;
$tableHeaderCellIconColor:$textSecondaryColor;
$tableHeaderCellIconHoverColor:$textSecondaryColor;
$tableHeaderCellHighlightBg:#ffffff;
$tableHeaderCellHighlightTextColor:$textColor;
$tableHeaderCellHighlightHoverBg:rgba(0,0,0,.04);
$tableHeaderCellHighlightTextHoverColor:$textColor;
$tableSortableColumnBadgeSize:1.143rem;

$tableBodyRowBg:#ffffff;
$tableBodyRowTextColor:$textColor;
$tableBodyRowEvenBg:rgba(0,0,0,.02);
$tableBodyRowHoverBg:rgba(0,0,0,.04);
$tableBodyRowTextHoverColor:$textColor;
$tableBodyCellBorder:1px solid #e4e4e4;
$tableBodyCellBorderWidth:0 0 1px 0;
$tableBodyCellPadding:1rem 1rem;

$tableFooterCellPadding:1rem 1rem;
$tableFooterCellBg:#ffffff;
$tableFooterCellTextColor:$textColor;
$tableFooterCellFontWeight:500;
$tableFooterCellBorder:1px solid #e4e4e4;
$tableFooterCellBorderWidth:0 0 1px 0;
$tableResizerHelperBg:$primaryColor;

$tableFooterBorder:1px solid #e4e4e4;
$tableFooterBorderWidth:0 0 1px 0;
$tableFooterBg:#ffffff;
$tableFooterTextColor:$textColor;
$tableFooterFontWeight:500;
$tableFooterPadding:1rem 1rem;

$tableCellContentAlignment:left;
$tableTopPaginatorBorderWidth:0 0 1px 0;
$tableBottomPaginatorBorderWidth:0 0 1px 0;

$tableScaleSM:0.5;
$tableScaleLG:1.25;

//dataview
$dataViewContentPadding:1rem 0;
$dataViewContentBorder:0 none;
$dataViewListItemBorder:solid rgba(0,0,0,.12);
$dataViewListItemBorderWidth:0 0 1px 0;

//orderlist, picklist
$orderListBreakpoint:769px;
$pickListBreakpoint:769px;

//schedule
$fullCalendarEventBg:$highlightBg;
$fullCalendarEventBorder:1px solid $highlightBg;
$fullCalendarEventTextColor:$highlightTextColor;

//tree
$treeNodePadding:.25rem;
$treeNodeContentPadding:.75rem;
$treeNodeChildrenPadding:0 0 0 1rem;
$treeNodeIconColor:$textSecondaryColor;

//timeline
$timelineVerticalEventContentPadding:0 1rem !default;
$timelineHorizontalEventContentPadding:1rem 0 !default;
$timelineEventMarkerWidth:1rem !default;
$timelineEventMarkerHeight:1rem !default;
$timelineEventMarkerBorderRadius:50% !default;
$timelineEventMarkerBorder:0 none !default;
$timelineEventMarkerBackground:#bdbdbd !default;
$timelineEventConnectorSize:2px !default;
$timelineEventColor:#bdbdbd !default;

//org chart
$organizationChartConnectorColor:rgba(0,0,0,.12);

//message
$messageMargin:1rem 0;
$messagePadding: 1.25rem 1.5rem;
$messageBorderWidth:0 0 0 0;
$messageIconFontSize:1.5rem;
$messageTextFontSize:1rem;
$messageTextFontWeight:500;

//inline message
$inlineMessagePadding:$inputPadding;
$inlineMessageMargin:0;
$inlineMessageIconFontSize:1rem;
$inlineMessageTextFontSize:1rem;
$inlineMessageBorderWidth:1px;

//toast
$toastIconFontSize:2rem;
$toastMessageTextMargin:0 0 0 1rem;
$toastMargin:0 0 1rem 0;
$toastPadding:1.5rem;
$toastBorderWidth:0 0 0 0;
$toastShadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
$toastOpacity:.9;
$toastTitleFontWeight:700;
$toastDetailMargin:$inlineSpacing 0 0 0;

//severities
$infoMessageBg:#B3E5FC;
$infoMessageBorder:solid transparent;
$infoMessageTextColor:#01579B;
$infoMessageIconColor:#01579B;
$successMessageBg:#C8E6C9;
$successMessageBorder:solid transparent;
$successMessageTextColor:#1B5E20;
$successMessageIconColor:#1B5E20;
$warningMessageBg:#FFECB3;
$warningMessageBorder:solid transparent;
$warningMessageTextColor:#7f6003;
$warningMessageIconColor:#7f6003;
$errorMessageBg:#FFCDD2;
$errorMessageBorder:solid transparent;
$errorMessageTextColor:#B71C1C;
$errorMessageIconColor:#B71C1C;

//overlays
$overlayContentBorder:0 none;
$overlayContentBg:$panelContentBg;
$overlayContainerShadow:0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);

//dialog
$dialogHeaderBg:#ffffff;
$dialogHeaderBorder:0 none;
$dialogHeaderTextColor:$textColor;
$dialogHeaderFontWeight:500;
$dialogHeaderFontSize:1.25rem;
$dialogHeaderPadding:1.5rem;
$dialogContentPadding: 0 1.5rem 1.5rem 1.5rem;
$dialogFooterBorder:0 none;
$dialogFooterPadding:1rem 1.5rem;

//confirmpopup
$confirmPopupContentPadding:1.5rem;
$confirmPopupFooterPadding:0 1.5rem 1rem 1.5rem;

//tooltip
$tooltipBg:rgba(97,97,97,.9);
$tooltipTextColor:#ffffff;
$tooltipPadding:.5rem;

//steps
$stepsItemBg:transparent;
$stepsItemBorder:1px solid transparent;
$stepsItemTextColor:$textColor;
$stepsItemNumberWidth:2rem;
$stepsItemNumberHeight:2rem;
$stepsItemNumberFontSize:1.143rem;
$stepsItemNumberColor:$textColor;
$stepsItemNumberBorderRadius:50%;
$stepsItemActiveFontWeight:500;

//progressbar
$progressBarHeight:4px;
$progressBarBorder:0 none;
$progressBarBg:rgba($primaryColor, .32);
$progressBarValueBg:$primaryColor;

//menu (e.g. menu, menubar, tieredmenu)
$menuWidth:12.5rem;
$menuBg:#ffffff;
$menuBorder:1px solid #e5e5e5;
$menuTextColor:$textColor;
$menuitemPadding:1rem 1rem;
$menuitemBorderRadius:0;
$menuitemTextColor:$textColor;
$menuitemIconColor:$textSecondaryColor;
$menuitemTextHoverColor:$textColor;
$menuitemIconHoverColor:$textSecondaryColor;
$menuitemHoverBg:rgba(0,0,0,.04);
$menuitemTextActiveColor:$textColor;
$menuitemIconActiveColor:$textSecondaryColor;
$menuitemActiveBg:rgba(0,0,0,.04);
$menuitemSubmenuIconFontSize:.875rem;
$submenuHeaderMargin:0;
$submenuHeaderPadding:1rem;
$submenuHeaderBg:#ffffff;
$submenuHeaderTextColor:$textSecondaryColor;
$submenuHeaderBorderRadius:0;
$submenuHeaderFontWeight:400;
$overlayMenuBg:$menuBg;
$overlayMenuBorder:0 none;
$overlayMenuShadow:0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
$verticalMenuPadding:.5rem 0;
$menuSeparatorMargin:.5rem 0;

$breadcrumbPadding:1rem;
$breadcrumbBg:#ffffff;
$breadcrumbBorder:1px solid #e5e5e5;
$breadcrumbItemTextColor:$textColor;
$breadcrumbItemIconColor:$textSecondaryColor;
$breadcrumbLastItemTextColor:$textColor;
$breadcrumbLastItemIconColor:$textSecondaryColor;
$breadcrumbSeparatorColor:$textSecondaryColor;

$horizontalMenuPadding:1rem;
$horizontalMenuBg:transparent;
$horizontalMenuBorder:1px solid #e5e5e5;
$horizontalMenuTextColor:$textColor;
$horizontalMenuRootMenuitemPadding:1rem;
$horizontalMenuRootMenuitemBorderRadius:$borderRadius;
$horizontalMenuRootMenuitemTextColor:$textColor;
$horizontalMenuRootMenuitemIconColor:$textSecondaryColor;
$horizontalMenuRootMenuitemTextHoverColor:$textColor;
$horizontalMenuRootMenuitemIconHoverColor:$textSecondaryColor;
$horizontalMenuRootMenuitemHoverBg:rgba(0,0,0,.04);
$horizontalMenuRootMenuitemTextActiveColor:$textColor;
$horizontalMenuRootMenuitemIconActiveColor:$textSecondaryColor;
$horizontalMenuRootMenuitemActiveBg:rgba(0,0,0,.04);

//badge and tag
$badgeBg:$primaryColor;
$badgeTextColor:$primaryTextColor;
$badgeMinWidth:1.5rem;
$badgeHeight:1.5rem;
$badgeFontWeight:700;
$badgeFontSize:.75rem;

$tagPadding:.25rem .4rem;

//carousel
$carouselIndicatorsPadding:1rem;
$carouselIndicatorBg:#dcdcdc;
$carouselIndicatorHoverBg:#ececec;
$carouselIndicatorBorderRadius:0;
$carouselIndicatorWidth:2rem;
$carouselIndicatorHeight:.5rem;

//galleria
$galleriaMaskBg:rgba(0,0,0,0.9);
$galleriaCloseIconMargin:.5rem;
$galleriaCloseIconFontSize:2rem;
$galleriaCloseIconBg:transparent;
$galleriaCloseIconColor:rgba(255,255,255,.87);
$galleriaCloseIconHoverBg:rgba(255,255,255,0.1);
$galleriaCloseIconHoverColor:rgba(255,255,255,.87);
$galleriaCloseIconWidth:4rem;
$galleriaCloseIconHeight:4rem;
$galleriaCloseIconBorderRadius:50%;

$galleriaItemNavigatorBg:transparent;
$galleriaItemNavigatorColor:#f6f6f6;
$galleriaItemNavigatorMargin:0 .5rem;
$galleriaItemNavigatorFontSize:2rem;
$galleriaItemNavigatorHoverBg:rgba(255,255,255,0.1);
$galleriaItemNavigatorHoverColor:rgba(255,255,255,.87);
$galleriaItemNavigatorWidth:4rem;
$galleriaItemNavigatorHeight:4rem;
$galleriaItemNavigatorBorderRadius:50%;

$galleriaCaptionBg:rgba(0,0,0,.5);
$galleriaCaptionTextColor:rgba(255,255,255,.87);
$galleriaCaptionPadding:1rem;

$galleriaIndicatorsPadding:1rem;
$galleriaIndicatorBg:#dcdcdc;
$galleriaIndicatorHoverBg:#ececec;
$galleriaIndicatorBorderRadius:50%;
$galleriaIndicatorWidth:1.25rem;
$galleriaIndicatorHeight:1.25rem;
$galleriaIndicatorsBgOnItem:rgba(0,0,0,.5);
$galleriaIndicatorBgOnItem:rgba(255,255,255,.4);
$galleriaIndicatorHoverBgOnItem:rgba(255,255,255,.6);

$galleriaThumbnailContainerBg:rgba(0,0,0,.9);
$galleriaThumbnailContainerPadding:1rem .25rem;
$galleriaThumbnailNavigatorBg:transparent;
$galleriaThumbnailNavigatorColor:rgba(255,255,255,.87);
$galleriaThumbnailNavigatorHoverBg:rgba(255,255,255,0.1);
$galleriaThumbnailNavigatorHoverColor:rgba(255,255,255,.87);
$galleriaThumbnailNavigatorBorderRadius:50%;
$galleriaThumbnailNavigatorWidth:2rem;
$galleriaThumbnailNavigatorHeight:2rem;

//divider
$dividerHorizontalMargin:1.25rem 0;
$dividerHorizontalPadding:0 1.25rem;
$dividerVerticalMargin:0 1.25rem;
$dividerVerticalPadding:1.25rem 0;
$dividerSize:1px;
$dividerColor:rgba(0,0,0,.12);

//avatar
$avatarBg:rgba(0,0,0,.12);
$avatarColor:$textColor;

//scrollTop
$scrollTopBg:$accentColor;
$scrollTopHoverBg:rgba($accentColor, .92);
$scrollTopWidth:3rem;
$scrollTopHeight:3rem;
$scrollTopBorderRadius:50%;
$scrollTopFontSize:1.5rem;
$scrollTopTextColor:$accentTextColor;

//skeleton
$skeletonBg:rgba(0,0,0,.08);
$skeletonAnimationBg:rgba(255,255,255,0.4);

:root {
--surface-a:#ffffff;
--surface-b:#fafafa;
--surface-c:rgba(0,0,0,.04);
--surface-d:rgba(0,0,0,.12);
--surface-e:#ffffff;
--surface-f:#ffffff;
--text-color:#{$textColor};
--text-color-secondary:#{textSecondaryColor};
--primary-color:#{$primaryColor};
--primary-color-text:#{$primaryTextColor};
--font-family:#{$fontFamily};
}
`}
</AppCodeHighlight>
</div>

                    <h4>Menu Modes</h4>
                    <p>Menu has 2 modes; horizontal and overlay. Layout container element in App.js is used to define which mode to use by adding specific classes. List
                    below indicates the style classes for each mode.</p>

                    <ul>
                        <li>Horizontal: "layout-container layout-menu-horizontal"</li>
                        <li>Overlay: "layout-container"</li>
                    </ul>

                    <p>It is also possible to leave the choice to the user by keeping the preference at a component and using an expression to bind it so that user can switch between modes. Sample
                    application has an example implementation of such use case. Refer to App.js for an example.</p>

                    <h4>Customizing Styles</h4>
                    <p>It is suggested to add your customizations in the following sass files under the overrides folder instead of adding them to the
                        scss files under sass folder to avoid maintenance issues after an update.</p>

                    <ul>
                        <li><b>_layout_variables</b>: Variables of the layout.</li>
                        <li><b>_layout_styles</b>: Styles for the layout.</li>
                        <li><b>_theme_variables</b>: Variables of the theme.</li>
                        <li><b>_theme_styles</b>: Styles for the theme.</li>
                    </ul>

                    <h4>Migration Guide</h4>
                    <p>Every change is included in <b>CHANGELOG.md</b> file at the root folder of the distribution along with the instructions to update.</p>
                </div>
            </div>
        </div>
    )

}
