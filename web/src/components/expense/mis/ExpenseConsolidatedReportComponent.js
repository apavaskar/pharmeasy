import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { cosolidatedReportStart } from '../../../redux/actions/reports/expense/expenseReportAction';
import { selectAuth } from '../../../redux/selectors/authSelector';
import { yyyyMM } from '../../../utils/dateUtil';
import DivisionListDropDown from '../../widgets/DivisionListDropDown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { selectConsolidatedReport, selectConsolidatedReportRefresh } from '../../../redux/selectors/expenseApprovalSelector';
import { raceWith } from 'rxjs';
import DataDumpTable from '../../widgets/DataDumpTable';
import { formatNumber } from '../../../utils/commonUtils';
const ExpenseConsolidatedReportComponent = props => {
    const [date, setDate] = useState(new Date());
        const [division, setDivision] = useState('');
        const displayColumns = ['Division','Zone','Region','HQ','Location Type','Employee Code','Employee Name','Date Of Joining','Month','Year','Status','HQ days worked','Ex HQ  days worked','OS days worked']
        const fields = ['division','zone','region','hq','locationType','employeeCode','employeeName','dateOfJoining','expenseMonth','expenseYear','status','hqDays','exHqDays','outstationDays'];
        if(props.data.length > 0){
            const categories = props.data[0].categoryList
            categories.forEach(c => {
                displayColumns.push(c.categoryName+' (Claimed)')
                fields.push("flattened." + c.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_claimed")
                displayColumns.push(c.categoryName+' (Added)')
                fields.push("flattened." + c.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_added")
                displayColumns.push(c.categoryName+' (Deducted)')
                fields.push("flattened." + c.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_deducted")
                displayColumns.push(c.categoryName+' (Total)')
                fields.push("flattened." + c.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_total")
                displayColumns.push(c.categoryName+' (Remarks)')
                fields.push("flattened." + c.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_remarks")
            });
        }
        displayColumns.push('Total Claimed')
        displayColumns.push('Total Expense Passed by MIS');
        displayColumns.push('Expense Submitted date')
        displayColumns.push('Manager approved date')
        displayColumns.push('MIS Approval date')

        fields.push('totalClaimed')
        fields.push('grandTotal')
        fields.push('submissionDate')
        fields.push('managerApprovalDates')
        fields.push('misApprovalDate')

        const rows = props.data.map(row => {
            const flattened = {};
            row.categoryList.forEach( r => {
                 flattened[r.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_claimed"] = formatNumber(r.claimed,2);
                 flattened[r.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_added"] = formatNumber(r.added, 2);
                 flattened[r.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_deducted"] = formatNumber(r.deducted, 2);
                 flattened[r.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_total"] = formatNumber(r.total, 2);
                 flattened[r.categoryName.replaceAll(' ', '_').replaceAll('+','_') + "_remarks"] = r.remarks;
            });
            row.totalClaimed = formatNumber(row.totalClaimed*1,2)
            row.grandTotal = formatNumber(row.grandTotal*1,2)
            row.managerApprovalDates = row.managerApprovalDates.replace(/,/g, '--')
            return {...row, flattened}
        });

        const cols = fields.map((field, i) => {
             return {
               field: field,
               header: displayColumns[i],
               width: 150
             }
        });

        const handleSubmit = (event) => {
            let divisionId = division.id;
            if (props.auth.profile.location.id !== 'locat00000000000000000000000000000000') {
                divisionId = division.location.id
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
                                <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange="2020:2021"/>
                            </div>

                            <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 effort-table">
                    <DataDumpTable cols={cols} data={rows} title={'Expense Consolidated Report'}/>
                </div>
            </div>
        );
    }

    ExpenseConsolidatedReportComponent.propTypes = {
        auth: PropTypes.object.isRequired
    }

    const mapState = (state) => {
        const auth = selectAuth(state);
        const data = selectConsolidatedReport(state)
        const refresh = selectConsolidatedReportRefresh(state)
        return {auth, data, refresh}
    }


    const actions = {
        handleSubmitReport: cosolidatedReportStart
    }

    export default connect(mapState, actions)(ExpenseConsolidatedReportComponent)
