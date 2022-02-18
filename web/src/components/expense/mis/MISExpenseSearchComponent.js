import React, { useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import {selectAuth} from "../../../redux/selectors/authSelector";
import DivisionListDropDown from "../../widgets/DivisionListDropDown";
import {displayDateFromServer, toDate, yyyyMM} from "../../../utils/dateUtil";
import {misApprovalSearchStartAction} from "../../../redux/actions/expense/misExpenseActions";
import {selectExpenseApprovals} from "../../../redux/selectors/expenseApprovalSelector";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {MIS_JOB_ROLE} from "../../../utils/commonUtils";
import {InputText} from "primereact/inputtext";
const MyExpenseSearchComponent = props => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const editButton = (id, rowProps) => {
        return <Button label={'Edit'} className="p-button-link"
                       onClick={(e) =>
                           props.history.push(`/home/reporting/expense/approvaldetails/${rowProps.rowData.employeeId}/${rowProps.rowData.yearMonth}`)
                       }
        />
    }
    const [selectedDivision, setSelectedDivision] = useState({});
    const [date, setDate] = useState(new Date());
    const handleSubmit = (event) => {
        let conditions = {
                yearMonth: yyyyMM(date)
        };
        if (props.auth.profile.jobTitle.id !== MIS_JOB_ROLE) {
            conditions['locationId'] = props.auth.profile.location.id
        }
        if (selectedDivision.id !== undefined) {
            conditions['divisionId']  = selectedDivision.id
        }
        props.handleSearchExpenses({
           conditions: conditions,
           certificate: props.auth.certificate
        });
    }

    const amount = rowData => {
        return rowData.claimedAmount.toFixed(2)
    }

    const approvedAmount = rowData => {
        return rowData.approvedAmount.toFixed(2)
    }

    const approvedOn = rowData => {
        if (rowData.approvedOn !== null && rowData.displayStatus === 'Approved by MIS') {
            return displayDateFromServer(rowData.approvedOn)
        }
        return "";
    }

    const submittedOn = rowData => {
        if (rowData.submittedOn !== null && rowData.displayStatus !== 'Draft') {
            return displayDateFromServer(rowData.submittedOn)
        }
        return "";
    }

    const exportExcel = () => {
        if (props.approvals.length === 0) return;
        let transfomedData = JSON.parse(JSON.stringify(props.approvals)).map((row) =>{
            return {
                division: row.division,
                employeeCode: row.employeeCode,
                employeeName: row.name,
                locationName: row.location,
                locationType: row.locationType.name,
                claimedAmount: amount(row),
                approvedAmount: approvedAmount(row),
                submittedOn: submittedOn(row),
                approvedOn: approvedOn(row),
                status: row.displayStatus
            }
        });
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.book_new();
            xlsx.utils.sheet_add_json(worksheet, transfomedData, {origin: 'A1', skipHeader: false});
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'Approvals');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    let header = (
        <div style={{'textAlign':'right'}}>
            <Button type="button" icon="pi pi-file-excel"
                    onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
            <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
            <InputText type="search" onInput={(e) => setGlobalFilterValue(e.target.value)} placeholder="Global Search" size="50"/>
        </div>
    );
    return(
        <div className='p-grid' style={{height: '100%'}}>
            <div className='p-col-12'>
                <div className='card'>
                    <h5>Search</h5>
                    <div className='p-formgroup-inline'>
                        {props.auth.profile.jobTitle.id === MIS_JOB_ROLE &&
                        <div className="p-field">
                            <DivisionListDropDown
                                onSelect={(e) => setSelectedDivision(e.value)}
                                value={selectedDivision}/>
                        </div>
                        }
                        <div className='p-field'>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} view='month' dateFormat='mm/yy' yearNavigator yearRange='2020:2021'/>
                        </div>
                        <Button label='Search' className='p-button-raised' onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
            <div className='p-col-12 effort-table'>
                <DataTable value={props.approvals}
                           header={header}
                           globalFilter={globalFilterValue}
                           scrollable
                           scrollHeight="600px"
                           className="editable-cells-table p-datatable-sm">
                    <Column field={'employeeCode'} header={'Employee Code'} />
                    <Column field={'name'} header={'Name'} />
                    <Column field={'location'} header={'Location'} />
                    <Column field={'locationType.name'} header={'Location Type'} />
                    <Column body={amount} header={'Claimed Amount'} />
                    <Column body={approvedAmount} header={'Approved Amount(MIS)'} />
                    <Column body={submittedOn} header={'Submitted On'} />
                    <Column body={approvedOn} header={'Approved(MIS)'} />
                    <Column field={'displayStatus'} header={'Status'} />
                    <Column body={editButton} header={''} />
                </DataTable>
            </div>
        </div>
    );

}

MyExpenseSearchComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const approvals = selectExpenseApprovals(state);
    return {auth, approvals};
};

const actions = {
    handleSearchExpenses: misApprovalSearchStartAction,
};

export default connect(mapState, actions)(MyExpenseSearchComponent);
