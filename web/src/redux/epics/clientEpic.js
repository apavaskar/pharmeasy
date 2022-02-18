import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {INIT_MENU_LOAD_START} from "../actions/client/clientActionConstant";
import {menuRequest} from "../../api/clientApi";
import {initMenusFailAction, initMenusSuccessAction} from "../actions/client/clientAction";

export const loadMenusEpic = action$ =>
    action$.pipe(
        ofType(INIT_MENU_LOAD_START),
        debounceTime(500),
        switchMap(action =>
            menuRequest(action.payload).pipe(
                map(menus =>
                    initMenusSuccessAction({
                        menus: transformToMenuItem(menus.response)})),
                catchError((error) => of(initMenusFailAction({error: error}))),
            )),
            catchError((error) => of(initMenusFailAction({error: error})))
    );

const transformToMenuItem = (menus) => menus.map(menu => {
        console.log(menu);
        const parent = {
            label: menu.name,
            icon: menu.iconName,
            to: menu.actionUrl,
            items: menu.children.map(child => {return{
              label: child.name,
              icon: child.iconName,
              to: child.actionUrl
            }})
        }
        return parent;
        /*
        {label: 'Home', icon: 'pi pi-fw pi-home', to: '/home'},
        {label: 'Reports',icon: 'pi pi-fw pi-chart-bar', to: '/home/reports',
            items: [
            {label: 'Field Structure',  to: '/home/reports/fieldStructure'},
            {label: 'Effort Report',  to: '/home/reports/effort'}
        ],
        } */
    });
