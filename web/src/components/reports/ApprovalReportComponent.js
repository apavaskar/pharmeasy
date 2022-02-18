import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from './../../redux/selectors/authSelector';
import { Button } from 'primereact/button';
import './report.css';
import {displayDateFromYyyyMmDd, yyyyMM} from "../../utils/dateUtil";
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import DataDumpTable from "../widgets/DataDumpTable";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {fetchDmlReportStartAction} from "../../redux/actions/reports/customer/customerReportAction";
import {Column} from "primereact/column";
import {selectDMLData, selectRefreshDMLReport} from "../../redux/selectors/customerReportSelector";
import LocationHeirarchyDropDown from "../widgets/LocationHeirarchyDropDown";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {initApprovalStartAction} from "../../redux/actions/common/approvalAction";
import {selectApprovals} from "../../redux/selectors/approvalSelector";
import {DataTable} from "primereact/datatable";
import {Panel} from "primereact/panel";

const ApprovalReportComponent = props => {

    const [date, setDate] = useState(new Date());
    const [employeeCode, setEmployeeCode] = useState('');
    const cols = [
        {field: 'chainType', header: 'Type', width: 150},
        {field: 'approver.name', header: 'Approver', width: 150},
        {field: 'receivedOn', header: 'ReceivedOn', width: 150},
    ]
    const handleSubmit = value => {
        props.handleSubmitReport({
            employeeId: employeeCode,
            yearMonth: yyyyMM(date),
            certificate: props.auth.certificate
        })
    }

    const fromDateTemplate = (rowData) => {
        return displayDateFromYyyyMmDd(rowData.leave_from_date);
    }

    const toDateTemplate = (rowData) => {
        return displayDateFromYyyyMmDd(rowData.leave_to_date);
    }

    return(
        <div className="p-grid" style={{height: '100%'}}>
        <div className="p-col-12">
            <div className="card">
                <h5>Search</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field">
                        <InputText onChange={(event) =>  setEmployeeCode(event.target.value)}></InputText>
                    </div>
                    <div className="p-field">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange="2020:2021"/>
                    </div>
                    <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
            <Panel header={'Leave Approvals'}>
            <DataTable value={props.approvals}>
                <Column field={'aprci_chain_type'} header={'Type'} />
                <Column field={'leave_from_date'}  body={fromDateTemplate} header={'From'} />
                <Column field={'leave_to_date'}  body={toDateTemplate} header={'To'} />
                <Column field={'syslv_name'} header={'Leave Type'} />
                <Column field={'emply_name'} header={'Approved By'}/>
                <Column field={'aprci_approval_status'} header={'Status'}/>
            </DataTable>
            </Panel>
        </div>
        </div>
    );

}

ApprovalReportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const approvals = selectApprovals(state);
    return {auth, approvals};
};

const actions = {
    handleSubmitReport: initApprovalStartAction,
};

export default connect(mapState, actions)(ApprovalReportComponent);
