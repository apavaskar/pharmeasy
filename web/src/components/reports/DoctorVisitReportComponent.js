import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from '../../redux/selectors/authSelector';
import { Button } from 'primereact/button';
import './report.css';
import {yyyyMM} from "../../utils/dateUtil";
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import DataDumpTable from "../widgets/DataDumpTable";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {Column} from "primereact/column";
import LocationDropDown from '../widgets/LocationDropDown';
import { Calendar } from 'primereact/calendar';
import { fetchDailyEffortReportStartAction, fetchDoctorVisitReportStartAction } from '../../redux/actions/reports/effort/effortReportAction';
import {selectDailyEffortData,selectDoctorVisitData,selectRefreshDailyEffortReport, selectRefreshDoctorVisitReport} from '../../redux/selectors/effortsReportSelector';

const DoctorVisitreportComponent = props => {

    const [date, setDate] = useState(new Date());
    const [division, setDivision] = useState('');
    const [location, setLocation] = useState('');
    const cols = [
        {field: 'divsn_name', header: 'Division', width: 150},
        {field: 'znnm', header: 'Zone', width: 150},
        {field: 'rgnm', header: 'Region', width: 150},
        {field: 'locnm', header: 'Location', width: 150},
        {field: 'empcode', header: 'Employee Code', width: 150},
        {field: 'empnm', header: 'Employee Name', width: 150},
        {field: 'jobrole', header: 'Job Role', width: 150},
        {field: 'actdt', header: 'Activity Date', width: 150},
        {field: 'calltype', header: 'Call Type', width: 150},
        {field: 'doctr_person_code', header: 'Doctor Code', width: 150},
        {field: 'docuid', header: 'Doctor UID', width: 150},
        {field: 'doctr_name', header: 'Doctor Name', width: 150},
        {field: 'clnm', header: 'Classification', width: 150},
        {field: 'spnm', header: 'Specilaity', width: 150}
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
                        <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange="2020:2021"/>
                    </div>
                    <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
                <DataDumpTable cols={cols} data={props.data} title={'Doctor Visit Report'}/>
        </div>
        </div>
    );

}

DoctorVisitreportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const data = selectDoctorVisitData(state);
    const refresh = selectRefreshDoctorVisitReport(state);
    return {auth, data, refresh};
};

const actions = {
    handleSubmitReport: fetchDoctorVisitReportStartAction,
};

export default connect(mapState, actions)(DoctorVisitreportComponent);
