import { createReducer } from './reducerUtils';
import {
    ADD_MISC_LINE, ADD_SUNDRIES_LINE,
    CLOSE_ROUTE_EXPENSE_DIALOG, CLOSE_TRANSIT_EXPENSE_DIALOG,
    FIND_ALLOWANCES_FOR_DATE_FAIL,
    FIND_ALLOWANCES_FOR_DATE_SUCCESS,
    FIND_DISTANCE_TOWNS_FAIL,
    FIND_DISTANCE_TOWNS_SUCCESS, GET_ALL_TOWN_FAIL, GET_ALL_TOWN_SUCCESS, INIT_MISC_LINES,
    INIT_NEW_EXPENSE_FAIL,
    INIT_NEW_EXPENSE_SUCCESS, LOAD_SUNDRIES_FAIL, LOAD_SUNDRIES_SUCCESS, SAVE_LODGING_FAIL, SAVE_LODGING_SUCCESS, SAVE_MEETING_ALLOWANCE_FAIL,
    SAVE_MEETING_ALLOWANCE_SUCCESS, SAVE_MISC_LINE_SUCCESS, SAVE_MULTI_SUNDRIES_FAIL, SAVE_MULTI_SUNDRIES_SUCCESS,
    SAVE_ROUTE_EXPENSE_FAIL, SAVE_ROUTE_EXPENSE_SUCCESS, SAVE_SUNDRIES_FAIL, SAVE_SUNDRIES_SUCCESS, SEARCH_EXPENSE_SUCCESS,
    SELECT_EXPENSE_LOCATION_TYPE_FAIL,
    SELECT_EXPENSE_LOCATION_TYPE_SUCCESS, SUBMIT_EXPENSE_FAIL, SUBMIT_EXPENSE_SUCCESS
} from "../actions/expense/expenseActionConstants";
import {INIT_TOWN_LIST_FAIL, INIT_TOWN_LIST_SUCCESS} from "../actions/expense/routeSelectionConstants";
import {displayDateFromYyyyMmDd} from "../../utils/dateUtil";

const initialState = {
  location: {},
  activities: [] ,
  profilesByDate: {},
  masters: {
      locationTypes: []
  },
  summary: {
      totalExpense: 0,
      sundries: {amount: 0, saved: false},
      sundriesFetched: false,
      status: 'syslves000000000000000000000000000001'
  },
  transient: {
      allowances: [],
      towns: [],
      distances: [],
      visitDate: 0,
      miscellaneous: [],
      sundries: [],
      claimedSundries: [],
  },
  refreshExpenses: new Date(),
  refreshMisc: false,
  refreshTransient: new Date(),
  showRouteSelector: false,
  showTransitSelector: false,
  error: {}
};

const initNewExpenseSuccessReducer = (state = initialState, payload) => {
    let mapOfTypes = {};
    payload.locationTypes.forEach(l =>
        mapOfTypes[l.id] = l.name
    )
    const documentCounts = {};
    payload.documentCounts.forEach(d => {
        let docs = [];
        if (documentCounts[d.expdt_yyyy_mm_dd] !== undefined) {
            docs = documentCounts[d.expdt_yyyy_mm_dd];
        }
        docs.push(d);
       documentCounts[d.expdt_yyyy_mm_dd] = docs;
    });
    const mobile = payload.expense.details[0].totalMobile || 0;

    const mappedActivities = payload.expense.details.map(a => {
        return {...a,
            displayDate: displayDateFromYyyyMmDd(a.visitDate),
            locationTypeId: a.locationTypeId || '',
            locationTypeName: mapOfTypes[a.locationTypeId] !== undefined ? mapOfTypes[a.locationTypeId] : '',
            route: 'Select Route',
            meeting: a.totalMeetingAllowance,
            documentsCounts: documentCounts[a.visitDate] === undefined ? 0 : documentCounts[a.visitDate].length,
            documents: documentCounts[a.visitDate] === undefined ? [] : documentCounts[a.visitDate],
            totalExpense: a.totalExpense || 0}
    });

    return {
        ...initialState,
        activities: mappedActivities,
        location: payload.location,
        summary: {
            totalExpense: payload.expense.totalClaimed,
            sundries: payload.sundries,
            sundriesFetched: true,
            status: payload.expense.status
        },
        profilesByDate: mapProfilesToProfilesByDate(payload),
        masters: {
            locationTypes: payload.locationTypes
        },
        refreshExpenses: new Date()
    }
};

const initNewExpenseFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const findAllowancesForDateSuccessReducer = (state = initialState, payload) => {
    let totalExpense = state.summary.totalExpense;
    if (state.summary.sundriesFetched === false) {
        totalExpense = totalExpense + payload.sundries;
    }
    return {
        ...state,
        transient: {...state.transient,
                    distances: [],
                    miscellaneous: [],
                    allowances: payload.allowances,
                    visitDate: payload.visitDate},
        summary: {
            ...state.summary,
            totalExpense: totalExpense,
        },
        refreshExpenses: new Date()
    };
}

const findAllowancesForDateFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}


const initTownListSuccessReducer = (state = initialState, payload) => {
    let trans = JSON.parse(JSON.stringify(state.transient));
    trans.towns = payload.towns;
    trans.distances = [];
    return {
        ...state,
        transient: trans,
        showRouteSelector: payload.showRouteSelector
    };
};

const initTownListFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
};

const findDistanceByTownsSuccessReducer = (state = initialState, payload) => {
    let townsMap =  payload.allTowns.reduce((map, obj) => {
        map[obj.id.id] = obj;
        return map;
    }, {});
    if(townsMap[payload.hqTown.id] === undefined){
        townsMap[payload.hqTown.id] = payload.hqTown
    }
    const isReturn = payload.isReturn;
    console.log(townsMap);
    console.log(payload.distances);
    return {
        ...state,
        transient: {...state.transient,
                distances: payload.distances.map((distance, i) => {return {
                        ...distance, fromTownName: townsMap[distance.fromTown].name, toTownName: townsMap[distance.toTown].name,
                        isReturn: isReturn && i === payload.distances.length-1
        };}) },
    };
};

const findDistanceByTownsFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}


const saveRouteExpenseSuccessReducer = (state = initialState, payload) => {
    let expenseForDate = {};
    let index = -1;
    state.activities.forEach((activity, i) => {
       if (activity.visitDate === payload.visitDate) {
           index = i;
           if (activity.claimedExpenses !== undefined) expenseForDate = activity.claimedExpenses;
       }
    });
    expenseForDate = {...expenseForDate, route: {routes: payload.routes, total: payload.total}}; //TODO add other info also }
    let toDistance = 0;
    let returnDistance = 0;
    payload.routes.forEach(r => {
        if (r.isReturn === false) {
            toDistance = toDistance + r.distance;
        } else {
            returnDistance = returnDistance + r.distance;
        }
    });
    let activities= JSON.parse(JSON.stringify(state.activities));
    let activity = activities[index];
    activities[index].totalFare =  payload.total;
    activities[index].oneWayDistance = toDistance;
    activities[index].returnDistance = returnDistance;
    activities[index].claimedExpense = expenseForDate;
    activities[index].totalExpense = payload.total + activity.totalDa + activity.totalOther + activity.totalLodging
    let totalExpense = (activities)=> {
        return activities.reduce( function(a, b){
            return a + b.totalExpense;
        }, 0);
    };
    return {
        ...state,
        activities: activities,
        refreshPage: new Date(),
        summary: {
            ...state.summary,
            totalExpense: totalExpense(activities) + state.summary.sundries.amount,
        },
        routeSaved: true
    };
}

const selectExpenseLocationTypeSuccessReducer = (state = initialState, payload) => {
    let index = -1;
    state.activities.forEach((activity, i) => {
        if (activity.visitDate === payload.visitDate) {
            index = i;
        }
    });
    const name = state.masters.locationTypes.filter(type => type.id===payload.locationTypeId)[0].name
    let activities = JSON.parse(JSON.stringify(state.activities));
    let activity = { ...activities[index],
                        totalDa: payload.dailyAllowance,
                        locationTypeId: payload.locationTypeId,
                        locationTypeName: name,
                        totalExpense: activities[index].totalFare + payload.dailyAllowance + activities[index].totalOther + activities[index].totalLodging};
    activities[index] = activity;
    return {
        ...state,
        activities: activities,
        summary: {
            ...state.summary,
            totalExpense: totalExpense(activities) + state.summary.sundries.amount,
        },
        refreshExpenses: new Date()
    };
}

const selectExpenseLocationTypeFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

const saveRouteExpenseFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

const saveMeetingAllowanceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

const closeRouteExpenseDialogReducer = (state = initialState, payload) => {
    return {
        ...state,
        routeSaved: false,
        showRouteSelector: false
    };
}

const closeTransitExpenseDialogReducer = (state = initialState, payload) => {
    return {
        ...state,
        showTransitSelector: false
    };
}

const addMiscLineSuccessReducer = (state = initialState, payload) => {
    let lines = [];
    if (state.transient.miscellaneous !== undefined) {
        lines = JSON.parse(JSON.stringify(state.transient.miscellaneous));
    }
    lines.push(payload.line);
    let total = 0;
    lines.forEach(l => total = total + l.amount);
    return {
        ...state,
        transient: {
            ...state.transient,
            miscellaneous: lines
        },
    }
}

const addSundriesLineSuccessReducer = (state = initialState, payload) => {
    let lines = [];
    if (state.transient.claimedSundries !== undefined) {
        lines = JSON.parse(JSON.stringify(state.transient.claimedSundries));
    }
    lines.push(payload.line);
    let total = 0;
    lines.forEach(l => total = total + l.amount);
    return {
        ...state,
        summary: {
          ...state.summary,
          sundries: {amount: total, saved: false}
        },
        transient: {
            ...state.transient,
            claimedSundries: lines
        },
    }
}

const initMiscLinesReducer = (state = initialState, payload) => {
    return {
        ...state,
        transient: {
            ...state.transient,
            miscellaneous: []
        },
        refreshMisc: false
    }
}

const saveMeetingAllowanceSuccessReducer = (state = initialState, payload)=> {
    let activities = JSON.parse(JSON.stringify(state.activities));
    const index = activities.findIndex(a => a.visitDate === payload.visitDate);
    if (payload.removeDa) {
        let activity = {
            ...activities[index],
            totalDa: 0,
        };
        activities[index] = activity;
    }
    let activity = {...activities[index],
                    totalMeetingAllowance: payload.allowance,
                    totalExpense: activities[index].totalFare
                                + activities[index].totalOther
                                + activities[index].totalDa
                                + activities[index].totalLodging
                                + payload.allowance
    };
    activities[index] = activity;
    return {
        ...state,
        activities: activities,
        summary: {
            ...state.summary,
            totalExpense: totalExpense(activities) + state.summary.sundries.amount,
        },
        refreshExpenses: new Date()
    };
}

const saveMiscExpenseSuccessReducer = (state = initialState, payload) => {
    console.log(payload);
    let totalMisc = 0;
    payload.data.forEach(d =>
        totalMisc = totalMisc + d.amount
    );
    const activities = JSON.parse(JSON.stringify(state.activities));
    let activityForDate = {};
    let idx = -1;
    activities.forEach((activity,i) => {
      if (activity.visitDate === payload.visitDate) {
          activityForDate = activity;
          idx = i;
      }
    });
    activityForDate.totalOther = totalMisc;
    activityForDate.totalExpense = activities[idx].totalFare
                                 + activities[idx].totalDa
                                 + activities[idx].totalMeetingAllowance
                                 + activities[idx].totalLodging
                                 + activityForDate.totalOther;
    let count = 0;
    let docs = [];
    payload.data.forEach(dline => {
        dline.documents.forEach(d => {
            activityForDate.documents.push(d)
            count++;
        });
    });

    activities.documentCounts = activities[idx].documentCounts + count;
    activities[idx] = activityForDate;
    console.log(activityForDate);
    return {
        ...state,
        activities: activities,
        summary: {
            ...state.summary,
            totalExpense: totalExpense(activities) + state.summary.sundries.amount,
        },
        refreshMisc: true,
        refreshPage: new Date(),
    };
}

const mapProfilesToProfilesByDate = (payload) => {
    let mapOfProfilesByActiveToDate = {};
    let activeToDatesOfProfiles = payload.profiles.map(profile => {
        const activeToDate = profile.activeToDate === null ? 99999999 : profile.activeToDate;
        mapOfProfilesByActiveToDate[activeToDate] = profile;
        return activeToDate;
    });
    activeToDatesOfProfiles.sort();
    let indexOfActiveToDates = 0;
    let mapOfProfilesForDate = {};
    payload.expense.details.forEach(activity => {
        const visitDate = activity.visitDate;
        if (visitDate <=activeToDatesOfProfiles[indexOfActiveToDates]) {
            mapOfProfilesForDate[visitDate] = mapOfProfilesByActiveToDate[activeToDatesOfProfiles[indexOfActiveToDates]];
            if (visitDate === activeToDatesOfProfiles[indexOfActiveToDates]) {
                indexOfActiveToDates ++;
            }
        }
    });
    return mapOfProfilesForDate;
}

const totalExpense = (activities)=> {
    return activities.reduce( function(a, b){
        return a + b.totalExpense;
    }, 0);
};

const submitExpenseSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        summary: {
            ...state.summary,
            status: 'syslves000000000000000000000000000002'
        },
        refreshExpenses: new Date()
    }
}

const submitExpenseFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const searchExpenseSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
    }
}

const saveSundriesSuccessReducer = (state = initialState, payload) => {
    if (payload.recalcTotal === true) {
        return {
            ...state,
            summary: {...state.summary, totalExpense: payload.sundries }
        }
    } else return {...state};
}

const saveSundriesFailReducer = (state = initialState, payload) => {
    return {
        ...state,
    }
}

const saveMultiSundriesSuccessReducer = (state = initialState, payload) => {
    let amount = 0;
    payload.claimedSundries.forEach(s => amount = amount + s.amount)

    return {
        ...state,
        summary: {...state.summary, totalExpense: sumExpenses(amount, state.activities), sundries: {amount: amount, saved: true} }
    }
}

const saveMultiSundriesFailReducer = (state = initialState, payload) => {
    return {
        ...state,
    }
}

const loadSundriesSuccessReducer = (state = initialState, payload) => {
    const transient = state.transient;
    transient.sundries = payload.allowances
    return {
        ...state,
        transient: transient,
        refreshTransient: new Date()
    }
}

const loadSundriesFailReducer = (state = initialState, payload) => {
    return {
        ...state,
    }
}

const sumExpenses = (sundries, activities) => {
    const sumOfDays =  activities.reduce( function(a, b){
        return a + b.totalExpense;
    }, 0);
    return sundries + sumOfDays;
}

const saveLodgingSuccessReducer = (state = initialState, payload) => {
    let activityForDate = {};
    let idx = -1;
    let activities = state.activities;
    state.activities.forEach((activity,i) => {
        if (activity.visitDate === payload.visitDate) {
            activityForDate = activity;
            idx = i;
        }
    });
    activityForDate.totalLodging = payload.data[0].amount;
    activities[idx].totalExpense = activities[idx].totalFare
        + activities[idx].totalDa
        + activities[idx].totalMeetingAllowance
        + activities[idx].totalOther
        + activityForDate.totalLodging;
    activities[idx] = activityForDate;
    return {
        ...state,
        activities: activities,
        summary: {
            ...state.summary,
            totalExpense: totalExpense(activities) + state.summary.sundries.amount,
        },
        refreshPage: new Date(),
    };
}

const saveLodgingFailReducer = (state = initialState, payload) => {
    return {
        ...state,
    }
}

const getALLTownSuccessReducer = (state = initialState, payload) => {
    const transient = state.transient;
    transient.allTowns = payload.allTowns
    return {
        ...state,
        transient: transient,
        showTransitSelector: true,
    }
}

const getALLTownFailReducer = (state, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

export default createReducer(initialState, {
    [INIT_NEW_EXPENSE_SUCCESS]: initNewExpenseSuccessReducer,
    [INIT_NEW_EXPENSE_FAIL]: initNewExpenseFailReducer,
    [INIT_TOWN_LIST_SUCCESS]: initTownListSuccessReducer,
    [INIT_TOWN_LIST_FAIL]: initTownListFailReducer,
    [FIND_DISTANCE_TOWNS_SUCCESS]: findDistanceByTownsSuccessReducer,
    [FIND_DISTANCE_TOWNS_FAIL]: findDistanceByTownsFailReducer,
    [FIND_ALLOWANCES_FOR_DATE_SUCCESS]: findAllowancesForDateSuccessReducer,
    [FIND_ALLOWANCES_FOR_DATE_FAIL]: findAllowancesForDateFailReducer,
    [SAVE_ROUTE_EXPENSE_SUCCESS]: saveRouteExpenseSuccessReducer,
    [SAVE_ROUTE_EXPENSE_FAIL]: saveRouteExpenseFailReducer,
    [SELECT_EXPENSE_LOCATION_TYPE_FAIL]: selectExpenseLocationTypeFailReducer,
    [SELECT_EXPENSE_LOCATION_TYPE_SUCCESS]: selectExpenseLocationTypeSuccessReducer,
    [CLOSE_ROUTE_EXPENSE_DIALOG]: closeRouteExpenseDialogReducer,
    [CLOSE_TRANSIT_EXPENSE_DIALOG]: closeTransitExpenseDialogReducer,
    [SAVE_MISC_LINE_SUCCESS]: saveMiscExpenseSuccessReducer,
    [ADD_MISC_LINE]: addMiscLineSuccessReducer,
    [ADD_SUNDRIES_LINE]: addSundriesLineSuccessReducer,
    [INIT_MISC_LINES]: initMiscLinesReducer,
    [SAVE_MEETING_ALLOWANCE_SUCCESS]: saveMeetingAllowanceSuccessReducer,
    [SAVE_MEETING_ALLOWANCE_FAIL]: saveMeetingAllowanceFailReducer,

    [SUBMIT_EXPENSE_SUCCESS]: submitExpenseSuccessReducer,
    [SUBMIT_EXPENSE_FAIL]: submitExpenseFailReducer,

    [SEARCH_EXPENSE_SUCCESS]: searchExpenseSuccessReducer,
    [SAVE_SUNDRIES_SUCCESS]: saveSundriesSuccessReducer,
    [SAVE_SUNDRIES_FAIL]: saveSundriesFailReducer,

    [SAVE_MULTI_SUNDRIES_SUCCESS]: saveMultiSundriesSuccessReducer,
    [SAVE_MULTI_SUNDRIES_FAIL]: saveMultiSundriesFailReducer,

    [LOAD_SUNDRIES_SUCCESS]: loadSundriesSuccessReducer,
    [LOAD_SUNDRIES_FAIL]: loadSundriesFailReducer,

    [SAVE_LODGING_SUCCESS]: saveLodgingSuccessReducer,
    [SAVE_LODGING_FAIL]: saveLodgingFailReducer,

    [GET_ALL_TOWN_SUCCESS]: getALLTownSuccessReducer,
    [GET_ALL_TOWN_FAIL]: getALLTownFailReducer,
});
