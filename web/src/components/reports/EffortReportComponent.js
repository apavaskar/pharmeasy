import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from './../../redux/selectors/authSelector';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import './report.css';
import {yyyyMM, yyyy} from "../../utils/dateUtil";
import { fetchEffortReportStartAction} from "../../redux/actions/reports/effort/effortReportAction";
import {selectEffortData, selectRefreshEffortReport} from "../../redux/selectors/effortsReportSelector";
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import DataDumpTable from "../widgets/DataDumpTable";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {Column} from "primereact/column";
import {toPercent} from "../../utils/commonUtils";

const EffortReportComponent = props => {

    const [date, setDate] = useState(new Date());
    const [division, setDivision] = useState('');
    let headerGroup = <ColumnGroup>
        <Row>
            <Column header={''} colSpan={2}/>
            <Column header="Employee Details" colSpan={2}  className={'nonCoreVisits'}/>
            <Column header={''} colSpan={2}/>
            <Column header="Attendance" colSpan={5} className={'nonCoreVisits'}/>
            <Column header="Doctor Visits" colSpan={2} />
            <Column header="Call Visits" colSpan={2} className={'nonCoreVisits'}/>
            <Column header="" colSpan={1}  />
            <Column header="" />
        </Row>
        <Row>
            <Column header="Division" />
            <Column header="Location" />
            <Column header={'Name'} field={'employeeName'}  className={'nonCoreVisits'}/>
            <Column header={'Code'} field={'employeeCode'}  className={'nonCoreVisits'}/>
            <Column header="Location Type"/>
            <Column header="Month Year" />
            <Column header="Field Days"   field={"fieldDays"} className={'nonCoreVisits'}/>
            <Column header="Non Call Days"  field={"nonCallDays"} className={'nonCoreVisits'}/>
            <Column header="Leave Days"  field={"leaveDays"} className={'nonCoreVisits'}/>
            <Column header="Holidays"  field={"holidays"} className={'nonCoreVisits'}/>
            <Column header="Days"  field={"both"} className={'nonCoreVisits'}/>
            <Column header="Total"  field={"countTotalDr"}/>
            <Column header="Met"  field={"countTotalDrMet"} />
            <Column header="Calls"  field={"overallCallAverage"} className={'nonCoreVisits'}/>
            <Column header="Call Average"  field={"overallCallAverage"} className={'nonCoreVisits'}/>
            <Column header="Coverage (%)"  field={"overallCoverage"}/>
            <Column header="Joint Days"  field={"joint_count_days"}/>
        </Row>
    </ColumnGroup>;
    const cols = [
        {field: 'field_structure.division', header: 'Division', width: 150},
        {field: 'locat_name', header: 'Location', width: 150 },
        {field: 'field_structure.empName', header:'Name', width:150, exportHeader: 'Emp. Name', className:'nonCoreVisits'},
        {field: 'field_structure.empCode', header:'Code', width:150, exportHeader: 'Emp. Code',className:'nonCoreVisits'},
        {field: 'location_type.name', header: 'Type', width: 100, exportHeader: 'Location Type'},
        {field: 'month_year', header: 'Month Year', width: 100, exportHeader: 'Month Year'},
        {field: 'field_days', header: 'Field Days', width: 90, className:'nonCoreVisits'},
        {field: 'non_call_days', header: 'Non Call Days', width: 90, className:'nonCoreVisits'},
        {field: 'leave_days', header: 'Leave Days', width: 90, className:'nonCoreVisits'},
        {field: 'holiday_count', header: 'Holidays', width: 90,  className:'nonCoreVisits'},
        {field: 'physical_digital_days', header: 'Both Days', width: 90,  className:'nonCoreVisits'},
        {field: 'total_count', header: 'Total Count', width: 90, exportHeader: 'Total Dr. Count'},
        {field: 'total_dr_count_visited', header: 'Total Met', width: 90,  exportHeader: 'Total Dr. Met'},
        {field: 'total_dr_call_count', header: 'Total Calls', width: 90, className:'nonCoreVisits'},
        {field: 'overall_call_average', header: 'Overall Call Avg', width: 90, className: 'nonCoreVisits'},
        {field: 'total_dr_coverage', header: 'Overall Coverage', width: 90},
        {field: "joint_count_days", header: 'Joint Days', width: 90}
    ]
    const handleSubmit = (event) => {
        let divisionId = division.id;
        if (props.auth.profile.location.id !== 'locat00000000000000000000000000000000') {
            divisionId = props.auth.profile.location.id
        }
        props.handleSubmitReport({
            divisionId: divisionId,
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
                        <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange={`2022: ${yyyy(Date())}`}/>
                    </div>
                        <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
                <DataDumpTable cols={cols} data={props.efforts} headerGroup={headerGroup} frozenWidth={'200px'} title={'Effort Data'}/>
        </div>
        </div>
    );

}

EffortReportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const efforts = selectEffortData(state).map(row => {
        row.superCoreCoverage = toPercent(row.superCoreCoverage)
        row.coreCoverage = toPercent(row.coreCoverage)
        row.overallCoverage = toPercent(row.overallCoverage)

        row.physicalCallAverage = toPercent(row.physicalCallAverage)
        row.digitalCallAverage = toPercent(row.digitalCallAverage)
        row.overallCallAverage = toPercent(row.overallCallAverage)

        return row
    });
    const refresh = selectRefreshEffortReport(state);
    return {auth, efforts, refresh};
};

const actions = {
    handleSubmitReport: fetchEffortReportStartAction,
};

export default connect(mapState, actions)(EffortReportComponent);
