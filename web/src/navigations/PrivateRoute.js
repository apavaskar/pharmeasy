import React from 'react';
import {Switch} from 'react-router-dom';
import Home from '../components/home/Home';
import EffortReportComponent from '../components/reports/EffortReportComponent';
import PrivateRouteHandler from './PrivateRouteHandler';
import FieldStructureReportComponent from '../components/reports/FieldStructureReportComponent';
import MyExpenseSearchComponent from '../components/expense/MyExpenseSearchComponent';
import NewExpenseComponent from '../components/expense/NewExpenseComponent';
import MISExpenseSearchComponent from "../components/expense/mis/MISExpenseSearchComponent";
import DeviationEffortReportComponent from "../components/reports/DeviationEffortReportComponent";


const PrivateRoute = ({auth}) => {
  return (
    <Switch>
        <PrivateRouteHandler path='/home' auth={auth}>
            <Home/>
        </PrivateRouteHandler>
        <PrivateRouteHandler path='/home/reports/effort' auth={auth}>
            <EffortReportComponent/>
        </PrivateRouteHandler>
        <PrivateRouteHandler path='/home/reports/deviation' auth={auth}>
            <DeviationEffortReportComponent/>
        </PrivateRouteHandler>
        <PrivateRouteHandler path='/home/reports/fieldstructure' auth={auth}>
            <FieldStructureReportComponent/>
        </PrivateRouteHandler>
        <PrivateRouteHandler path='/home/reporting/expense/search' auth={auth}>
            <MyExpenseSearchComponent/>
        </PrivateRouteHandler>
        <PrivateRouteHandler path='/home/reporting/expense/new/yearMonth' auth={auth}>
            <NewExpenseComponent />
        </PrivateRouteHandler>
    </Switch>
  )
}

export default PrivateRoute;
