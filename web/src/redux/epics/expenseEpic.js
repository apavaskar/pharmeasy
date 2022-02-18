import {ofType} from "redux-observable";
import {catchError, debounceTime, filter, forkJoin, map, of, retry, switchMap} from "rxjs";
import {hideSpinner, showSpinner} from "../actions/widgets/widgetActions";
import {
    FIND_ALLOWANCES_FOR_DATE_FAIL,
    FIND_ALLOWANCES_FOR_DATE_START,
    FIND_ALLOWANCES_FOR_DATE_SUCCESS,
    FIND_DISTANCE_TOWNS_START, GET_ALL_TOWN_START,
    INIT_NEW_EXPENSE_FAIL,
    INIT_NEW_EXPENSE_START,
    INIT_NEW_EXPENSE_SUCCESS, LOAD_SUNDRIES_START, RESET_EXPENSE_DETAIL_FAIL, RESET_EXPENSE_DETAIL_START, RESET_EXPENSE_DETAIL_SUCCESS, SAVE_LODGING_START, SAVE_MEETING_ALLOWANCE_START, SAVE_MISC_LINE_START, SAVE_MULTI_SUNDRIES_START, SAVE_ROUTE_EXPENSE_FAIL,
    SAVE_ROUTE_EXPENSE_START, SAVE_ROUTE_EXPENSE_SUCCESS, SAVE_SUNDRIES_START, SEARCH_EXPENSE_START,
    SELECT_EXPENSE_LOCATION_TYPE_START, SUBMIT_EXPENSE_FAIL, SUBMIT_EXPENSE_START, SUBMIT_EXPENSE_SUCCESS
} from "../actions/expense/expenseActionConstants";
import {allowancesForJobRole, distanceByTownList, expenseActivitiesForMonthYear, expenseDocumentCountForMonthYear, saveExpense, searchExpenseRequest, submitExpenseRequest, townsForDate} from "../../api/expenseAPI";
import {
    allowanceForDateSuccessAction,
    distanceBetweenTownsFailAction,
    distanceBetweenTownsSuccessAction,
    expenseLocationTypeSelectFailAction,
    expenseLocationTypeSelectSuccessAction,
    initNewExpenseFailAction,
    initNewExpenseSuccessAction, loadSundriesFailAction, loadSundriesSuccessAction, loadTownFailAction, loadTownSuccessAction,
    meetingAllowanceSaveFailAction,
    meetingAllowanceSaveSuccessAction, saveLodgingFailAction, saveLodgingSuccessAction,
    saveMiscLineFailAction,
    saveMiscLineSuccessAction, saveMultiSundriesFailAction, saveMultiSundriesSuccessAction,
    saveRouteExpenseFailAction,
    saveRouteExpenseSuccessAction, saveSundriesFailAction, saveSundriesSuccessAction,
    searchExpenseFailAction,
    searchExpenseSuccessAction,
    submitExpenseFailAction,
    submitExpenseSuccessAction
} from "../actions/expense/expenseActions";
import {userProfilesForYearMonthRequest} from "../../api/userProfileApi";
import {INIT_TOWN_LIST_FAIL, INIT_TOWN_LIST_START, INIT_TOWN_LIST_SUCCESS} from "../actions/expense/routeSelectionConstants";
import {initTownsForRouteFailAction, initTownsForRouteSuccessAction} from "../actions/expense/routeSelectionAction";
import {locationRequest, systemLovByType, townsListRequest} from "../../api/commonApi";
import {yyyyMM, yyyyMMDd} from "../../utils/dateUtil";

export const showExpenseLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === INIT_NEW_EXPENSE_START ||
                action.type === INIT_TOWN_LIST_START ||
                action.type === FIND_ALLOWANCES_FOR_DATE_START ||
                action.type === SAVE_ROUTE_EXPENSE_START ||
                action.type === SUBMIT_EXPENSE_START ||
                action.type === RESET_EXPENSE_DETAIL_START
        ),
        map(showSpinner),
    )

export const hideExpenseLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === INIT_NEW_EXPENSE_SUCCESS ||
                action.type === INIT_NEW_EXPENSE_FAIL ||
                action.type === INIT_TOWN_LIST_SUCCESS ||
                action.type === INIT_TOWN_LIST_FAIL ||
                action.type === FIND_ALLOWANCES_FOR_DATE_SUCCESS ||
                action.type === FIND_ALLOWANCES_FOR_DATE_FAIL ||
                action.type === SAVE_ROUTE_EXPENSE_SUCCESS ||
                action.type === SAVE_ROUTE_EXPENSE_FAIL ||
                action.type === SUBMIT_EXPENSE_SUCCESS ||
                action.type === SUBMIT_EXPENSE_FAIL ||
                action.type === RESET_EXPENSE_DETAIL_SUCCESS ||
                action.type === RESET_EXPENSE_DETAIL_FAIL
        ),
        map(hideSpinner),
    );

export const initNewExpenseEpic = (action$) =>
    action$.pipe(
        ofType(INIT_NEW_EXPENSE_START),
        debounceTime(4000),
        switchMap(action =>
            forkJoin(expenseActivitiesForMonthYear(action.payload),
                userProfilesForYearMonthRequest(action.payload),
                systemLovByType({...action.payload, type: 'EXPENSE_LOCATION_TYPE'}),
                expenseDocumentCountForMonthYear({...action.payload}),
                locationRequest(action.payload.locationId, action.payload.certificate)
                ).pipe(
                switchMap(responses => {
                    const profile = responses[1].response[0];
                    return allowancesForJobRole({
                        locationId: profile.locationId,
                        jobRole: profile.jobRoleId,
                        yearMonth: action.payload.yearMonth,
                        certificate: action.payload.certificate,
                    }).pipe(
                        map(allowances =>
                            initNewExpenseSuccessAction({
                                expense: responses[0].response,
                                profiles: responses[1].response,
                                locationTypes: responses[2].response,
                                documentCounts: responses[3].response,
                                sundries: calcSundries(responses[0].response.details, action.payload.joiningDate,
                                    action.payload.startOfMonth, allowances.response, responses[0].response),
                                startOfMonth: action.payload.startOfMonth,
                                employeeId: action.payload.employeeId,
                                certificate: action.payload.certificate,
                                location: responses[4].response
                            })),
                        catchError((error) =>
                            of(initNewExpenseFailAction({title: 'Expense', message: 'Failed to load the page. Please try again.', error: error}))))
                }
        ))));

export const initRouteEpic = action$ =>
    action$.pipe(
        ofType(INIT_TOWN_LIST_START),
        debounceTime(4000),
        switchMap(action =>
            forkJoin(townsForDate(action.payload)).pipe(
                retry(1),
                map(responses =>
                    initTownsForRouteSuccessAction({
                        towns: responses[0].response,
                        showRouteSelector: action.payload.showRouteSelector})),
                catchError((error) => of(initTownsForRouteFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const distanceFinderEpic = action$ =>
    action$.pipe(
        ofType(FIND_DISTANCE_TOWNS_START),
        debounceTime(4000),
        switchMap(action =>
                forkJoin(distanceByTownList(action.payload),
                    townsListRequest(action.payload)).pipe(
                retry(1),
                map(responses =>
                    distanceBetweenTownsSuccessAction({
                        distances: responses[0].response,
                        allTowns:  responses[1].response,
                        hqTown: action.payload.hqTown,
                        isReturn: action.payload.isReturn})),
                catchError((error) => of(distanceBetweenTownsFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const allowanceForDateEpic = action$ =>
    action$.pipe(
        ofType(FIND_ALLOWANCES_FOR_DATE_START),
        debounceTime(4000),
        switchMap(action =>
            allowancesForJobRole(action.payload).pipe(
                retry(1),
                map(responses =>
                    allowanceForDateSuccessAction({
                        visitDate: action.payload.visitDate,
                        joiningDate: action.payload.joiningDate,
                        allowances: responses.response})),
                    catchError((error) => of(allowanceForDateSuccessAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
                ));

export const saveMeetingAllowanceEpic = action$ =>
    action$.pipe(
        ofType(SAVE_MEETING_ALLOWANCE_START),
        debounceTime(4000),
        switchMap(action => {
            let details = [];
            let removeDa = false;
            details.push({
                amount: action.payload.amount,
                expenseTypeId: 'syslv00000000000000000000000000000177',
                employeeId: action.payload.employeeId,
                locationTypeId: action.payload.locationTypeId,
                remarks: `${action.payload.mealsProvided ? 1 : 0}-${action.payload.stayProvided ? 1 : 0}`,
                yyyyMmDd: action.payload.visitDate,
                documents: action.payload.documents,
                conveyanceDetails: action.payload.conveyanceDetails,
                routes: []
            });
            //THIS IS BAD.....NEED TO MAKE IT VIA CONFIG
            if (action.payload.locationTypeId === 'syslv00000000000000000000000000000162'
                && action.payload.stayProvided === false && action.payload.mealsProvided === false) {
                let amount = 0;
                switch (action.payload.jobRoleId) {
                    case 'jobrl00000000000000000000000000000001':
                        amount = 125.0;
                        break;
                    case 'jobrl00000000000000000000000000000002':
                        amount = 150.0;
                        break;
                    case 'jobrl00000000000000000000000000000002':
                        amount = 50.0;
                        break;
                }
                details.push({
                    amount: amount,
                    expenseTypeId: 'syslv00000000000000000000000000000178',
                    employeeId: action.payload.employeeId,
                    locationTypeId: action.payload.locationTypeId,
                    remarks: '',
                    yyyyMmDd: action.payload.visitDate,
                    routes: [],
                });
            }
            if (action.payload.locationTypeId === 'syslv00000000000000000000000000000162' &&
                action.payload.stayProvided === true && action.payload.mealsProvided === true) {
                removeDa = true;
                details.push({
                    amount: 0,
                    expenseTypeId: 'syslv00000000000000000000000000000172',
                    employeeId: action.payload.employeeId,
                    locationTypeId: action.payload.locationTypeId,
                    remarks: '',
                    yyyyMmDd: action.payload.visitDate,
                    routes: [],
                });
            }
            return (saveExpense({
                data: details,
                certificate: action.payload.certificate,
            })).pipe(
                map(data =>
                    meetingAllowanceSaveSuccessAction({
                       allowance: action.payload.amount,
                       removeDa: removeDa,
                       visitDate: action.payload.visitDate
                    })
                ),
                catchError((error) => of(meetingAllowanceSaveFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        }));

export const expenseLocationTypeSelectEpic = action$ => {
  return action$.pipe(
    ofType(SELECT_EXPENSE_LOCATION_TYPE_START),
    switchMap(action => {
            let allowance = 0;
            let allowances = action.payload.allowances;
            let locationType = action.payload.locationTypeId;
            allowances.forEach(all => {
                if (all.locationTypeId === locationType && all.allowanceId === 'syslv00000000000000000000000000000172') {
                    allowance = all.value;
                }
            });
            return saveExpense({
                data: [{
                    amount: allowance,
                    expenseTypeId: 'syslv00000000000000000000000000000172',
                    employeeId: action.payload.employeeId,
                    locationTypeId: action.payload.locationTypeId,
                    remarks: '',
                    yyyyMmDd: action.payload.visitDate,
                    routes: [],
                }],
                certificate: action.payload.certificate
            }).pipe(map(response =>
                expenseLocationTypeSelectSuccessAction({
                    visitDate: action.payload.visitDate,
                    locationTypeId: locationType,
                    dailyAllowance: allowance
                }),
            ),
            catchError(error => of(expenseLocationTypeSelectFailAction({title: 'Expense', message:'Failed to load the page. Please try again.', error: error})))
            )
        },
    ),
  );
};

export const saveExpenseEpic = action$ =>
    action$.pipe(
        ofType(SAVE_ROUTE_EXPENSE_START),
        debounceTime(4000),
        switchMap(action =>
            saveExpense(action.payload).pipe(
                retry(1),
                map(responses =>
                    saveRouteExpenseSuccessAction({
                        visitDate:  action.payload.visitDate,
                        routes: action.payload.routes,
                        total: action.payload.total
                        })),
                catchError((error) => of(saveRouteExpenseFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const saveMiscLineEpic = action$ =>
    action$.pipe(
        ofType(SAVE_MISC_LINE_START),
        debounceTime(4000),
        switchMap(action =>
            saveExpense(action.payload).pipe(
                retry(1),
                map(responses =>
                    saveMiscLineSuccessAction(action.payload)),
                catchError((error) => of(saveMiscLineFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const saveLodgingEpic = action$ =>
    action$.pipe(
        ofType(SAVE_LODGING_START),
        debounceTime(4000),
        switchMap(action =>
            saveExpense(action.payload).pipe(
                retry(1),
                map(responses =>
                    saveLodgingSuccessAction(action.payload)),
                catchError((error) => of(saveLodgingFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));


const calcSundries = (activities, joiningDate, startOfMonth, allowances, expenses) => {
    let mobile = 0
    if (activities.length !== 0) {
          mobile = activities[0].totalMobile
    }
    if (expenses.sundries!== 0) {
        return {amount: expenses.sundries + mobile, saved: true};
    }
    if (allowances.filter(all => all.allowanceId === 'syslv00000000000000000000000000000174').length === 0) {
        return {amount: 0, saved: false};
    }
    let sundries = allowances.filter(all => all.allowanceId === 'syslv00000000000000000000000000000174')[0].value
    let numFD = 0;
    activities.forEach(a => {
        if (a.physicalCount !== 0) {
            numFD = numFD + 1;
        }
    });
    const yyyyMmJoining = yyyyMM(joiningDate);
    const monthReporting =  parseInt(startOfMonth / 100);
    console.log("yyyyMmJoining",yyyyMmJoining);
    if (yyyyMmJoining < monthReporting) {
        return  {amount: numFD > 10 ? sundries : 0, saved: false};
    } else {
        return  {amount: sundries * (activities.length - parseInt(yyyyMMDd(joiningDate) % 100) + 1)/ activities.length, saved: false}
    }
}

export const submitExpenseEpic = action$ =>
    action$.pipe(
    ofType(SUBMIT_EXPENSE_START),
    debounceTime(4000),
    switchMap(action =>
        submitExpenseRequest(action.payload).pipe(
            retry(1),
            map(responses =>
                submitExpenseSuccessAction(action.payload)),
            catchError((error) => of(submitExpenseFailAction(
                {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
    ));

export const searchExpenseEpic = action$ =>
    action$.pipe(
        ofType(SEARCH_EXPENSE_START),
        debounceTime(4000),
        switchMap(action =>
            searchExpenseRequest(action.payload).pipe(
                retry(1),
                map(responses =>
                    searchExpenseSuccessAction(responses.response)),
                catchError((error) => of(searchExpenseFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const saveSundriesEpic = action$ =>
    action$.pipe(
        ofType(SAVE_SUNDRIES_START),
        debounceTime(4000),
        switchMap(action => saveExpense({
            data: [{
                amount: action.payload.amount,
                expenseTypeId: 'syslv00000000000000000000000000000174',
                employeeId: action.payload.employeeId,
                locationTypeId: '',
                remarks: '',
                yyyyMmDd: parseInt(action.payload.visitDate / 100) * 100 + 1,
                documents: action.payload.documents,
                routes: []
            }],
            certificate: action.payload.certificate,
        }).pipe(
            map(data =>  saveSundriesSuccessAction({
                visitDate: action.payload.visitDate,
                sundries: action.payload.amount})),
            catchError((error) => of(saveSundriesFailAction(
                {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const loadSundriesEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_SUNDRIES_START),
    switchMap(action =>
        allowancesForJobRole(action.payload)
            .pipe(map(response =>
                loadSundriesSuccessAction({
                    allowances: response.response
                })
            ),
    catchError(error => of(loadSundriesFailAction({title: 'Expense', message:'Failed to load the page. Please try again.'})))
    )));
};

export const saveSundriesToDBEpic = action$ => {
    return action$.pipe(
        ofType(INIT_NEW_EXPENSE_SUCCESS),
        switchMap(action => {
            if (action.payload.sundries.saved === false && action.payload.sundries.amount !== 0) {
               return  saveExpense({
                    data: [{
                        amount: action.payload.sundries.amount,
                        expenseTypeId: 'syslv00000000000000000000000000000174',
                        employeeId: action.payload.employeeId,
                        locationTypeId: '',
                        remarks: '',
                        yyyyMmDd: action.payload.startOfMonth,
                        documents: [],
                        routes: []
                    }],
                    certificate: action.payload.certificate,
                }).pipe(
                    map(data => saveSundriesSuccessAction({
                        visitDate: action.payload.startOfMonth,
                        sundries: action.payload.sundries.amount,
                        recalcTotal: true
                    })),
                    catchError((error) => of(saveSundriesFailAction(
                        {title: 'Expense', message: 'Failed to load the page. Please try again.'}))));
            } else {
                return of(saveSundriesSuccessAction({
                    visitDate: action.payload.startOfMonth,
                    sundries: action.payload.sundries.amount,
                    recalcTotal: false
                }));
            }
        })
    )
}

export const saveMultiSundriesEpic = action$ =>
    action$.pipe(
        ofType(SAVE_MULTI_SUNDRIES_START),
        debounceTime(4000),
        switchMap(action => saveExpense({
                data: action.payload.data,
                certificate: action.payload.certificate,
            }).pipe(
                map(data =>  saveMultiSundriesSuccessAction({
                    visitDate: action.payload.visitDate,
                    claimedSundries: action.payload.data})),
                catchError((error) => of(saveMultiSundriesFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const getAllTownsEpic = action$ =>
    action$.pipe(
        ofType(GET_ALL_TOWN_START),
        debounceTime(4000),
        switchMap(action => townsListRequest(action.payload).pipe(
                map(data => loadTownSuccessAction({
                    allTowns: data.response
                })),
                catchError((error) => of(loadTownFailAction(
                    {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));

export const deleteDetail = action$ =>
    action$.pipe(
        ofType(RESET_EXPENSE_DETAIL_START),
        debounceTime(4000),
        switchMap(action => townsListRequest(action.payload).pipe(
            map(data => loadTownSuccessAction({
                allTowns: data.response
            })),
            catchError((error) => of(loadTownFailAction(
                {title: 'Expense', message:'Failed to load the page. Please try again.'}))))
        ));
