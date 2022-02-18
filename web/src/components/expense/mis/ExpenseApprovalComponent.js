import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {selectAuth, selectAuthCertificate} from "../../../redux/selectors/authSelector";
import {approvalDetailSearchStartAction, misApprovalSearchStartAction, resetExpenseApprovalAction, routeForEmployeeAndDateStartAction} from "../../../redux/actions/expense/misExpenseActions";
import {selectApprovalDetail, selectDetailsFetched, selectRoutes} from "../../../redux/selectors/expenseApprovalSelector";
import { displayDateFromYyyyMmDd, displayMonthYear} from "../../../utils/dateUtil";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {documentById} from "../../../api/apiConstants";
import ApprovalTemplateComponent from "./ApprovalTemplateComponent";
import {OverlayPanel} from "primereact/overlaypanel";
import {initTownsForRouteStartAction} from "../../../redux/actions/expense/routeSelectionAction";
import {selectTransientExpense} from "../../../redux/selectors/newExpenseSelector";
import LoaderComponent from "../../widgets/LoaderComponent";
import ExpenseSummaryComponent from './ExpenseSummaryComponent';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const ExpenseApprovalComponent = props => {
    const mapOfActivities = {
        'syslv00000000000000000000000000000024': 'Dr. Calls',
        'syslv00000000000000000000000000000025': 'Non Call',
        'syslv00000000000000000000000000000026': 'Leaves'
    }
    const [jobEmployee, setJobEmployee] = useState({});

    useEffect(() => {
        const yearMonth = props.match.params.yearMonth;
        props.handleInitExpense({
            employeeId: props.match.params.employeeId,
            yearMonth: yearMonth,
            certificate: props.certificate
        });
        return () => {props.handleReset({})};
    },[props.match.params.id]);
    useEffect(() => {
        if (props.detailsFetched === true) {
            let jE = JSON.parse(JSON.stringify(jobEmployee));
            props.detail.summaries.forEach(summary => {
                const jobRole = summary.jobRole.id;
                const employeeId = summary.manager.id;
                if (jE[jobRole] !== undefined) {
                    let employees =jE[jobRole]
                    if (!employees.includes(employeeId)) {
                        employees.push(employeeId);
                        jE[jobRole] = employees;
                    }
                } else {
                    let employees = [];
                    employees.push(employeeId);
                    jE[jobRole] = employees;
                }
            });
            setJobEmployee(jE);
        }
    },[props.detailsFetched])

    const toast = useRef(null);
    const townListOverLay = useRef(null);
    const routeListOverLay = useRef(null);
    const docOverLay = useRef(null);
    const [documentsForDate, setDocumentsForDate] = useState([]);

    const visitDate= (rowData, rowProps) => {
        return displayDateFromYyyyMmDd(rowData.visitDate)
    }
    const activityTemplate = rowData => {
        let act = rowData.activities.filter(a => a !== 'syslv00000000000000000000000000000025').map(d => mapOfActivities[d]).join(',');
        let nonCall = '';
        if (rowData.nonCallList!== null) {
            nonCall = rowData.nonCallList.map(l => l.name).join(',');
            return act + ', ' + nonCall;
        }
        return act;
    }

    const totalDa = rowData => {
        return rowData.totalDa.toFixed(2)
    }

    const totalMeeting = rowData => {
        return rowData.meeting.toFixed(2)
    }

    const oneWay = rowData => {
        return rowData.oneWayDistance.toFixed(2)
    }

    const returnWay = rowData => {
        return rowData.returnDistance.toFixed(2)
    }

    const totalOther = rowData => {
        return rowData.totalOther.toFixed(2)
    }

    const totalExpense = rowData => {
        return rowData.totalExpense.toFixed(2)
    }

    const totalLodging = rowData => {
        return rowData.totalLodging.toFixed(2)
    }

    const visitedDoctorsEditor = (rowData, rowProps) => {
        return <Button label={`${rowData.visitCount}`} className="p-button-link"
                       onClick={(e) => {
                           props.handleLoadRoutes({
                               visitDate: rowProps.rowData.visitDate,
                               employeeId: props.detail.employee.employee.id,
                               certificate: props.auth.certificate,
                               showRouteSelector: false
                           });
                           townListOverLay.current.toggle(e);
                       }}
        />
    }

    const totalFare = (rowData, rowProps) => {
        return <Button label={`${rowData.totalFare.toFixed(2)}`} className="p-button-link"
                       onClick={(e) => {
                           props.handleFareRoutes({
                               visitDate: rowProps.rowData.visitDate,
                               employeeId: props.detail.employee.employee.id,
                               certificate: props.auth.certificate,
                               showRouteSelector: false
                           });
                           routeListOverLay.current.toggle(e);
                       }}
        />
    }

    const documentColumnEditor = (rowData, rowProps) => {
        return <Button label={`${rowData.documentsCounts}`} className="p-button-link"
                       onClick={(e) => {
                           setDocumentsForDate(rowProps.rowData.documents);
                           docOverLay.current.toggle(e);
                       }}
        />
    }
    const downloadTemplate = (rowData) => {
        return  <Button icon="pi pi-download" onClick={()=> {
            const url = `${documentById.url}/${rowData.docmt_id}`;
            fetch(url ,{
                method: 'GET',
                headers: new Headers({
                    'AUTH_CERTIFICATE': props.certificate,
                }),
            })
                .then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = rowData.docmt_name;
                        a.click();
                    });
                    //window.location.href = response.url;
                });
        }
        }/>
    }


    const fareAmounts = rowData => {
        return rowData.amount.toFixed(2)
    }

    if (props.detailsFetched === false) {
        return <LoaderComponent />
    }
    return(
            <div className='p-grid' style={{height: '100%'}}>
                <OverlayPanel ref={docOverLay} showCloseIcon id="overlay_panel" style={{width: '550px'}} className="overlaypanel-demo">
                    <DataTable value={documentsForDate} >
                        <Column field={'docmt_name'} header={'Name'} style={{width: '200px'}}/>
                        <Column field={'syslv_name'} header={'Type'} style={{width: '200px'}}/>
                        <Column header='' body={downloadTemplate} style={{width: '50px'}}></Column>
                    </DataTable>
                </OverlayPanel>
                <OverlayPanel ref={townListOverLay}
                              showCloseIcon id="overlay_panel"
                              style={{width: '550px'}} className="overlaypanel-demo">
                    <DataTable value={props.transient.towns} >
                        <Column field={'name'} header={'Name'} />
                    </DataTable>
                </OverlayPanel>
                <OverlayPanel ref={routeListOverLay}
                              showCloseIcon id="overlay_panel"
                              style={{width: '550px'}} className="overlaypanel-demo">
                    <DataTable value={props.routes} >
                        <Column field={'fromTownName'} header={'From'} />
                        <Column field={'toTownName'} header={'To'} />
                        <Column field={'distance'} header={'Distance'} />
                        <Column body={fareAmounts} header={'Amount'} />
                    </DataTable>
                </OverlayPanel>


                {props.detail.employee &&
                <div className='p-col-12'>
                    <div className='card'>
                        <p>Employee Name: {props.detail.employee.employee.name} - {props.detail.profile.empCode}</p>
                        <p>Designation: {props.detail.profile.empDesignation}</p>
                        <p>Location: {props.detail.profile.location.name}</p>
                    </div>
                </div>
                }
                <div className='p-col-12 effort-table'>
                    <DataTable value={props.detail.details}
                               scrollable
                               className="editable-cells-table p-datatable-sm"
                               scrollHeight="600px">
                        <Column body={visitDate} header={'Date'} style={{width: '100px'}}/>
                        <Column body={activityTemplate} header={'Activity'} style={{width: '120px'}}/>
                        <Column field={'physicalCount'} header={'# Physical'} style={{width: '80px'}}/>
                        <Column field={'digitalCount'} header={'# Digital'} style={{width: '80px'}}/>
                        <Column body={visitedDoctorsEditor} header={'# Visits'} style={{width: '80px'}}/>
                        <Column field={'locationTypeName'} header={'Location Type'} style={{width: '200px'}}/>
                        <Column body={oneWay} header={'One Way(Km)'} style={{width: '150px'}}/>
                        <Column body={returnWay} header={'Return (Km)'} style={{width: '150px'}}/>
                        <Column body={totalFare} header={'Fare'} style={{width: '100px'}}/>
                        <Column body={totalDa} header={'Allowance'} style={{width: '100px'}} />
                        <Column body={totalMeeting} header={'Meeting'}  style={{width: '100px'}} />
                        <Column body={totalOther} header={'Other'} style={{width: '100px'}}/>
                        {props.detail.profile.jobTitle.id !== 'jobrl00000000000000000000000000000001' &&
                            <Column body={totalLodging} header={'Lodging'} style={{width: '100px'}}/>
                        }
                        <Column body={totalExpense} header={'Total'} style={{width: '100px'}} />
                        <Column body={documentColumnEditor} header={'# Documents'} style={{width: '100px'}}/>
                    </DataTable>
                </div>

                <div style={{marginTop: '20px'}}>
                    <Card title="Summary">
                        <div className='p-col-12 effort-table'>
                                <ExpenseSummaryComponent/>
                            </div>
                    </Card>
                </div>

                <div style={{marginTop: '20px'}}>
                    <Card title="Approvals">
                        {jobEmployee['jobrl00000000000000000000000000000002'] !== undefined &&
                            jobEmployee['jobrl00000000000000000000000000000002'].map(row => {
                                return <div className='p-col-12 effort-table' key={row}>
                                    <ApprovalTemplateComponent
                                        approverId = {row}
                                        jobRole={'jobrl00000000000000000000000000000002'} />
                                        <Divider />
                                </div>
                            })
                        }
                        {jobEmployee['jobrl00000000000000000000000000000003'] !== undefined &&
                            jobEmployee['jobrl00000000000000000000000000000003'].map(row => {
                                return <div className='p-col-12 effort-table' key={row} style={{marginTop: '20px'}}>
                                    <ApprovalTemplateComponent
                                        approverId={row}
                                        jobRole={'jobrl00000000000000000000000000000003'} />
                                        <Divider />
                                </div>
                            })
                        }
                        {jobEmployee['jobrl00000000000000000000000000000004'] !== undefined &&
                        jobEmployee['jobrl00000000000000000000000000000004'].map(row => {
                        return <div className='p-col-12 effort-table' key={row} style={{marginTop: '20px'}}>
                                <ApprovalTemplateComponent
                                    approverId={row}
                                    jobRole={'jobrl00000000000000000000000000000004'}/>
                                <Divider />
                            </div>
                        })
                        }

                        {jobEmployee['jobrl00000000000000000000000000000005'] !== undefined &&
                        jobEmployee['jobrl00000000000000000000000000000005'].map(row => {
                        return <div className='p-col-12 effort-table' key={row} style={{marginTop: '20px'}}>
                                <ApprovalTemplateComponent
                                    approverId={row}
                                    jobRole={'jobrl00000000000000000000000000000005'} />
                            </div>
                        })
                        }
                        <Divider />
                        {jobEmployee['jobrl10000000000000000000000000000001'] !== undefined &&
                        jobEmployee['jobrl10000000000000000000000000000001'].map(row => {
                        return <div className='p-col-12 effort-table' key={row} style={{marginTop: '20px'}}>
                                <ApprovalTemplateComponent
                                    approverId = {row}
                                    jobRole={'jobrl10000000000000000000000000000001'} />
                                    <Divider />
                            </div>

                        })
                        }

                    </Card>
                </div>
            </div>
    );
}

const mapState = (state) => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const detail = selectApprovalDetail(state);
    const detailsFetched = selectDetailsFetched(state);
    const transient = selectTransientExpense(state);
    const routes = selectRoutes(state);
    return {auth, certificate, detail, detailsFetched, transient, routes};
};

const actions = {
    handleSearchExpenses: misApprovalSearchStartAction,
    handleLoadRoutes: initTownsForRouteStartAction,
    handleFareRoutes: routeForEmployeeAndDateStartAction,
    handleInitExpense: approvalDetailSearchStartAction,
    handleReset: resetExpenseApprovalAction
};

export default connect(mapState, actions)(ExpenseApprovalComponent);
