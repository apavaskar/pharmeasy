import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from '../../redux/selectors/authSelector';
import { Button } from 'primereact/button';
import './report.css';
import {yyyyMM, yyyy} from "../../utils/dateUtil";
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import DataDumpTable from "../widgets/DataDumpTable";
import LocationDropDown from '../widgets/LocationDropDown';
import { Calendar } from 'primereact/calendar';
import { fetchDailyEffortReportStartAction } from '../../redux/actions/reports/effort/effortReportAction';
import {selectDailyEffortData,selectRefreshDailyEffortReport} from './../../redux/selectors/effortsReportSelector';

const DailyEffortReportComponent = props => {

    const [date, setDate] = useState(new Date());
    const [division, setDivision] = useState('');
    const [location, setLocation] = useState('');
    const cols = [
        {field: 'divsn', header: 'Division', width: 150},
        {field: 'znnm', header: 'Zone', width: 150},
        {field: 'rgn', header: 'Region', width: 150},
        {field: 'locat', header: 'Location', width: 150},
        {field: 'empcd', header: 'Employee Code', width: 150},
        {field: 'emply', header: 'Employee Name', width: 150},
        {field: 'jobrl', header: 'Job Role', width: 150},
        {field: 'actdt', header: 'Activity Date', width: 150},
        {field: 'actyp', header: 'Call Type', width: 150},
        {field: 'actnm', header: 'Doctor Visited / Activity', width: 150}
    ]
    const handleSubmit = (event) => {

        props.handleSubmitReport({
            location: location.locationId,
            yearMonth:  yyyyMM(date),
            certificate: props.auth.certificate
        });
    }
    return(
        <div className="p-grid" style={{height: '100%'}}>
        <div className="p-col-12">
            <div className="card">
                <h5>Search</h5>
                <div className="p-formgroup-inline">
                    {props.auth.profile.location.id === 'locat00000000000000000000000000000000' &&
                    <div className="p-field">
                        <DivisionListDropDown onSelect={(e) => setDivision(e.value)} value={division}/>
                    </div>
                    }
                    <div className="p-field">
                        <LocationDropDown
                            locationId={division.id || props.auth.profile.location.id || ''}
                            onSelect={(e) => setLocation(e.value)} value={location}/>
                    </div>

                    <div className="p-field">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange={`2022: ${yyyy(Date())}`}/>
                    </div>
                    <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
                <DataDumpTable cols={cols} data={props.data} title={'Daily Effort'}/>
        </div>
        </div>
    );

}

DailyEffortReportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const data = selectDailyEffortData(state);
    const refresh = selectRefreshDailyEffortReport(state);
    return {auth, data, refresh};
};

const actions = {
    handleSubmitReport: fetchDailyEffortReportStartAction,
};

export default connect(mapState, actions)(DailyEffortReportComponent);
