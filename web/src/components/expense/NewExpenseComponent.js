import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from "primereact/button";
import {displayDate, displayMonthYear} from "../../utils/dateUtil";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import RouteSelectionComponent from "./RouteSelectionComponent";
import {allowanceForDateStartAction, closeRouteExpenseDialogAction, closeTransitExpenseDialogAction, expenseLocationTypeSelectStartAction, initNewExpenseStartAction, loadTownStartAction, saveSundriesSuccessAction, submitExpenseStartAction} from "../../redux/actions/expense/expenseActions";
import {selectAuth, selectAuthCertificate} from "../../redux/selectors/authSelector";
import {selectExpenseActivities, selectExpenseLocation, selectExpenseProfile, selectExpensesMasters, selectExpenseSummary, selectRefreshExpense, selectShowRouteSelector, selectShowTransitSelector, selectTransientExpense} from "../../redux/selectors/newExpenseSelector";
import {initTownsForRouteStartAction} from "../../redux/actions/expense/routeSelectionAction";
import {Dropdown} from "primereact/dropdown";
import MiscSelectionComponent from "./MiscSelectionComponent";
import {Toast} from "primereact/toast";
import MeetingAllowanceComponent from "./MeetingAllowanceComponent";
import {OverlayPanel} from "primereact/overlaypanel";
import {documentById} from "../../api/apiConstants";
import {ScrollPanel} from "primereact/scrollpanel";
import {amountFormatStyle, formatNumber, RM_JOB_ROLE, TM_JOB_ROLE, ZSM_JOB_ROLE} from "../../utils/commonUtils";
import SundriesSelectionComponent from "./SundriesSelectionComponent";
import LodgingSelectionComponent from "./LodgingSelectionComponent";
import TransitSelectionComponent from "./TransitSelectionComponent";
import {Card} from "primereact/card";
import ExpenseSummaryComponent from "./mis/ExpenseSummaryComponent";
import {selectApprovalDetail, selectDetailsFetched} from "../../redux/selectors/expenseApprovalSelector";
import {approvalDetailSearchStartAction} from "../../redux/actions/expense/misExpenseActions";
import ApprovalTemplateComponent from "./mis/ApprovalTemplateComponent";
import {Divider} from "primereact/divider";

const NewExpenseComponent = props => {
    const mapOfActivities = {
        'syslv00000000000000000000000000000024': 'Dr. Calls',
        'syslv00000000000000000000000000000025': 'Non Call',
        'syslv00000000000000000000000000000026': 'Leaves'
    }
    const listOfMeetings = ['syslv00000000000000000000000000000038',
        'syslv00000000000000000000000000000152',
        'syslv00000000000000000000000000000039',
        'syslv00000000000000000000000000000143',
        'syslv00000000000000000000000000000144',
        'syslv00000000000000000000000000000146',
        'syslv00000000000000000000000000000149',
        'syslv00000000000000000000000000000157',
        'syslv00000000000000000000000000000159'];
    const toast = useRef(null);
    const townListOverLay = useRef(null);
    const docOverLay = useRef(null);

    const yearMonth = props.match.params['date'];
    const [documentsForDate, setDocumentsForDate] = useState([]);
    const [fromTown, setFromTown] = useState(null);
    const [summary, setSummary] = useState([{header: 'Claimed', allowance: 0.0, fare: 0.0, medical: 0.0, other: 0.0, sundries: 0.0}]);
    const [jobEmployee, setJobEmployee] = useState({});
    useEffect(()=> {
        console.log('In Use')
        props.handleInitPage({
            employeeId: props.auth.profile.employee.id,
            certificate: props.auth.certificate,
            joiningDate: props.auth.profile.dateOfJoining,
            startOfMonth: `${yearMonth}01`,
            locationId: props.auth.profile.location.id,
            yearMonth: yearMonth,
        });
    },[props.navigation]);

    useEffect(()=> {
        if (props.expenseSummary.status !== 'syslves000000000000000000000000000001'){
            props.initApprovals({
                employeeId: props.auth.profile.employee.id,
                yearMonth: yearMonth,
                certificate: props.auth.certificate
            });
        }
    },[props.expenseSummary.status]);

    useEffect(() => {
        console.log('DETA', props.detailsFetched);
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

    const [selectedRow, setSelectedRow] = useState(false);
    const [showRouteSelection, setShowRouteSelection] = useState(false);
    const [showTransitSelection, setShowTransitSelection] = useState(false);
    const [showMeetingSelection, setShowMeetingSelection] = useState(false);
    const [showMiscSelection, setShowMiscSelection] = useState(false);
    const [showSundriesSelection, setShowSundriesSelection] = useState(false);
    const [showLodging, setShowLodging] = useState(false);

    useEffect(() => {
        setShowRouteSelection(props.showRoutes);
    }, [props.showRoutes])

    useEffect(() => {
        setShowTransitSelection(props.showTransit)
    }, [props.showTransit])



    const routeEditor = (id, rowProps) => {
        if (rowProps.rowData.locationTypeId === 'syslv00000000000000000000000000000164' && rowProps.rowData.visitCount === 0) {
            return <Button label="Select" className="p-button-link" onClick={() => {
                setSelectedRow(rowProps.rowData);
                const prevDayStack = props.expenseActivities.filter(a => a.visitDate < rowProps.rowData.visitDate);
                let routes = [];
                prevDayStack.slice().reverse().forEach(prev => {
                    if (prev.routes !== undefined && prev.routes !== null) {
                        routes = prev.routes;
                        return;
                    }
                });
                if (routes.length === 0) {
                    setFromTown(props.location.town);
                } else {
                    setFromTown({id: routes[0].toTownId, name: routes[0].toTownName});
                }
                props.handleLoadTransit({
                    locationId: props.auth.profile.location.id,
                    certificate: props.auth.certificate,
                });
            }
            }
            />
        }
        if (rowProps.rowData.visitCount === 0 || rowProps.rowData.locationTypeId === 'syslv00000000000000000000000000000160' ) {
            return 'No Fare Selection allowed';
        } else {
            return <Button label="Select" className="p-button-link" onClick={() => {
                setSelectedRow(rowProps.rowData);
                const prevDayStack = props.expenseActivities.filter(a => a.visitDate < rowProps.rowData.visitDate);
                let routes = [];
                prevDayStack.slice().reverse().every((prev, i) => {
                    if (prev.routes !== undefined && prev.routes !== null) {
                        routes = prev.routes;
                        return false;
                    }
                });
                console.log(routes);
                if (routes.length === 0) {
                    setFromTown(props.location.town);
                } else {
                    setFromTown({id: routes[routes.length -1].toTown.id, name: routes[routes.length -1].toTownName});
                }
                console.log(fromTown,routes);
                props.handleLoadRoutes({
                            visitDate: rowProps.rowData.visitDate,
                            employeeId: props.auth.profile.employee.id,
                            certificate: props.auth.certificate,
                            showRouteSelector: true
                        })
                    }
                }
            />
        }
    }

    const meetingAllowance = (id, rowProps) => {
        if (rowProps.rowData.locationTypeId === '') {
            return  'Select Location Type';
        }
        if (rowProps.rowData.locationTypeId === 'syslv00000000000000000000000000000164' ||
            rowProps.rowData.locationTypeId === 'syslv00000000000000000000000000000165') {
            return  '0.00';
        }
        let isEditable = false;
        if (rowProps.rowData.nonCallList!== null) {
            rowProps.rowData.nonCallList.forEach(i => {
                if (listOfMeetings.includes(i.id.id)) {
                    isEditable = true;
                }
            })
        }
        if (isEditable) {
            return <Button label="Select" className="p-button-link" onClick={() => {
                setSelectedRow(rowProps.rowData);
                setShowMeetingSelection(true);
            }}/>
        } else {
            return  '0.00';
        }
    }

    const miscEditor = (id, rowProps) => {
        return <Button label="Select" className="p-button-link"
                       onClick={() => {
                        setSelectedRow(rowProps.rowData);
                        setShowMiscSelection(true);
                        }}
        />
    }

    const documentColumnEditor = (id, rowProps) => {
        return <Button label={`${rowProps.rowData.documentsCounts}`} className="p-button-link"
                       onClick={(e) => {
                           setDocumentsForDate(rowProps.rowData.documents);
                           docOverLay.current.toggle(e);
                       }}
        />
    }

    const visitCountsColumEditor = (id, rowProps) => {
        return <Button label={`${rowProps.rowData.visitCount}`} className="p-button-link"
                       onClick={(e) => {
                           props.handleLoadRoutes({
                               visitDate: rowProps.rowData.visitDate,
                               employeeId: props.auth.profile.employee.id,
                               certificate: props.auth.certificate,
                               showRouteSelector: false
                           });
                           townListOverLay.current.toggle(e);
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

    const locationTypeDropDown = (id, rowProps) => {
        let locationTypes = props.masters.locationTypes;
        if (rowProps.rowData.activities.filter(a => a.trim() !== '').length === 0) {
            locationTypes = props.masters.locationTypes.filter(row =>
                     row.id === 'syslv00000000000000000000000000000164' || row.id === 'syslv00000000000000000000000000000165'
            );
        }
        return <Dropdown optionLabel={'name'}
                         optionValue={'id'}
                         value={rowProps.rowData.locationTypeId}
                         options={locationTypes}
                         onChange={(e) => {
                             console.log(props.masters.locationTypes);
                             props.handleApplyLocationType({
                                 visitDate: rowProps.rowData.visitDate,
                                 employeeId: props.auth.profile.employee.id,
                                 locationTypeId: e.value,
                                 allowances: props.transient.allowances,
                                 certificate: props.certificate
                             })
                         }} placeholder="Select a Type"/>
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

    const initRowEdit = rowData => {
        props.handleFindAllowances({
            activities: props.expenseActivities,
            locationId: props.auth.profile.location.id,
            employeeId: props.auth.profile.employee.id,
            jobRole: props.expenseProfile[rowData.data.visitDate].jobRoleId,
            yearMonth: yearMonth,
            visitDate: rowData.data.visitDate,
            certificate: props.certificate,
            joiningDate: props.auth.profile.dateOfJoining
        });
    }

    const rowEditorTemplate = (rowData, props) => {
        const rowEditor = props.rowEditor;
        return (<Button onClick={rowEditor.onInitClick} className="p-button-link"  >
                Edit
            </Button>);
    }

    const lodgingTemplate = (rowData, props) => {
        return (<Button type="link" onClick={()=> setShowLodging(true)} className="p-button-link" >
            {formatNumber(rowData.totalLodging, 2)}
        </Button>);

    }

    const deleteTemplate = (rowData, props) => {
        return (<Button type="link" onClick={()=> setShowLodging(true)} className="p-button-link" >
            Reset
        </Button>);
    }

    useEffect(()=> {
        let fare = 0.0;
        let allowance = 0.0;
        let medical = 0.0;
        let other = 0.0;
        props.expenseActivities.forEach(a => {
            fare = fare + a.totalFare
            allowance = allowance + a.totalDa + a.totalMeetingAllowance
            medical = 0.0
            other = other + a.totalOther
        });
        console.log('summary', props.expenseSummary)
        setSummary([{header: 'Claimed', fare: fare, allowance: allowance, medical: medical, other: other, sundries: props.expenseSummary.sundries}]);
    },[props.refreshExpenses]);

    console.log('summary2', props.expenseSummary)
    return (
        <div className="p-grid" style={{height: '100%'}}>
            <Toast ref={toast} />
            <Dialog
                header={'Sundries'}
                onHide={()=> setShowSundriesSelection(false)}
                visible={showSundriesSelection}
                closeOnEscape={true}
                style={{width: '50vw', background: 'white'}}>
                <SundriesSelectionComponent visitDate={`${yearMonth}01`} yearMonth={yearMonth}/>
            </Dialog>

            <Dialog
                header={'Lodging'}
                onHide={()=> setShowLodging(false)}
                visible={showLodging}
                closeOnEscape={true}
                rowData={selectedRow}
                style={{width: '50vw', background: 'white'}}>
                <LodgingSelectionComponent row={selectedRow} yearMonth={yearMonth}/>
            </Dialog>

            <OverlayPanel ref={townListOverLay}
                          showCloseIcon id="overlay_panel"
                          style={{width: '550px'}} className="overlaypanel-demo">
                <DataTable value={props.transient.towns} >
                    <Column field={'name'} header={'Name'} />
                </DataTable>
            </OverlayPanel>
            <Dialog
                header={'Select Route'}
                onHide={()=> props.handleCloseRoutesDialog()}
                visible={showRouteSelection}
                rowData={selectedRow}
                style={{width: '50vw', background: 'white'}}>
                <RouteSelectionComponent row={selectedRow} yearMonth={yearMonth} closeDialog={()=> setShowRouteSelection(false)}
                                         fromTown={fromTown}
                />
            </Dialog>
            <Dialog
                header={'Select Route'}
                onHide={()=> props.handleCloseTransitDialog()}
                visible={showTransitSelection}
                rowData={selectedRow}
                style={{width: '50vw', background: 'white'}}>
                <TransitSelectionComponent row={selectedRow} yearMonth={yearMonth}
                                           fromTown={fromTown}
                                           closeDialog={()=> setShowTransitSelection(false)}/>
            </Dialog>
            <Dialog
                header={'Miscellaneous'}
                onHide={()=> setShowMiscSelection(false)}
                visible={showMiscSelection}
                closeOnEscape={true}
                style={{width: '50vw', background: 'white'}}>
                <MiscSelectionComponent row={selectedRow}/>
            </Dialog>
            <Dialog
                header={'Meeting Allowance'}
                onHide={()=> setShowMeetingSelection(false)}
                visible={showMeetingSelection}
                closeOnEscape={true}
                style={{width: '50vw', background: 'white'}}>
                <MeetingAllowanceComponent row={selectedRow}/>
            </Dialog>
            <OverlayPanel ref={docOverLay} showCloseIcon id="overlay_panel" style={{width: '550px'}} className="overlaypanel-demo">
                <DataTable value={documentsForDate} >
                    <Column field={'docmt_name'} header={'Name'} style={{width: '200px'}}/>
                    <Column field={'syslv_name'} header={'Type'} style={{width: '200px'}}/>
                    <Column header='' body={downloadTemplate} style={{width: '50px'}}></Column>
                </DataTable>
            </OverlayPanel>

            <div className="p-col-12">
            <div className="card">
                <h5>Claim Expense - {displayMonthYear(yearMonth)}</h5>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-2">
                        <strong>Date Of Joining: </strong>
                    </div>
                    <div className="p-field p-col-12 p-md-2">
                        {displayDate(props.auth.profile.dateOfJoining)}
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-2">
                        <strong>Total Claimed: </strong>
                    </div>
                    <div className="p-field p-col-12 p-md-2">
                        {props.expenseSummary.totalExpense.toFixed(2)}
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-2">
                        <strong>Sundries: </strong>
                    </div>
                    <div className="p-field p-col-12 p-md-2">
                        {props.expenseSummary.sundries.amount.toFixed(2)}
                        {(props.auth.profile.jobTitle.id === RM_JOB_ROLE || props.auth.profile.jobTitle.id === ZSM_JOB_ROLE) &&
                            <Button className="p-button-link" label={'Add Sundries'}  onClick={(e)=>
                                setShowSundriesSelection(true)
                            } />
                        }
                    </div>
                    <div className="p-field p-col-12  p-md-offset-7 p-md-1">
                    <Button label="Submit" disabled={props.expenseSummary.status !== 'syslves000000000000000000000000000001'} onClick={() =>
                        props.handleSubmitExpense({
                            employeeId: props.auth.profile.employee.id,
                            certificate: props.auth.certificate,
                            yearMonth: yearMonth
                        })
                    }/>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
            <DataTable value={props.expenseActivities}
                        scrollable
                        scrollHeight="600px"
                        editMode="row"
                        size="small"
                        onRowEditInit={initRowEdit}
                        selectOnEdit={false}
                        scrollDirection="both"
                        >
                { props.expenseSummary.status === 'syslves000000000000000000000000000001' &&
                    <Column rowEditor headerStyle={{width: '10rem'}}
                            body={rowEditorTemplate}
                            bodyStyle={{textAlign: 'center'}} header={'Click To claim'}></Column>
                }
                <Column field={'displayDate'} header={'Date'} style={{width: '100px'}} />
                <Column body={activityTemplate} header={'Activity'} style={{width: '120px'}}/>
                <Column field={'physicalCount'} header={'# Physical'} style={{width: '80px'}}/>
                <Column field={'digitalCount'} header={'# Digital'} style={{width: '80px'}}/>
                <Column field={'visitCount'} header={'# Visits'} style={{width: '80px'}}
                        editor={(props) => visitCountsColumEditor('days', props)}/>
                <Column field={'locationTypeName'} header={'Location Type'}
                        editor={(props) => locationTypeDropDown('days', props)} style={{width: '250px'}}/>
                <Column field={'route'} header={'Route'}
                        editor={(props) => routeEditor('days', props)} style={{width: '100px'}}/>
                <Column field={'oneWayDistance'}
                        header={'One Way(Km)'}
                        body={rowData => isNaN(rowData.oneWayDistance) ? '0.0' : rowData.oneWayDistance.toFixed(1)}
                        style={{width: '100px', textAlign: 'right'}}/>
                <Column field={'returnDistance'}
                        body={rowData => isNaN(rowData.returnDistance) ? '0.0' : rowData.returnDistance.toFixed(1)}
                        header={'Return (Km)'}
                        style={{width: '100px', textAlign: 'right'}}/>
                <Column field={'totalFare'}
                        header={'Fare'}
                        body={rowData => isNaN(rowData.totalFare) ? '0.0' : rowData.totalFare.toFixed(2)}
                        style={{width: '100px', textAlign: 'right'}}/>
                <Column field={'totalDa'}
                        header={'Allowance'}
                        style={amountFormatStyle('100')}
                        body={rowData => formatNumber(rowData.totalDa, 2)}/>
                <Column field={'meeting'} header={'Meeting'}
                        body={rowData => formatNumber(rowData.meeting, 2)}
                        editor={(props) => meetingAllowance('days', props)}
                        style={amountFormatStyle('100')}
                />
                <Column field={'totalOther'}
                        header={'Other'}
                        body={rowData => formatNumber(rowData.totalOther, 2)}
                        editor={(props) => miscEditor('days', props)}
                        style={amountFormatStyle('100')}/>
                {(props.auth.profile.jobTitle.id === ZSM_JOB_ROLE || props.auth.profile.jobTitle.id === RM_JOB_ROLE) &&
                    <Column rowEditor
                            style={amountFormatStyle('100')}
                            body={lodgingTemplate}
                            header={'Lodging'}></Column>
                }
                <Column field={'totalExpense'}
                        header={'Total'}
                        body={rowData => formatNumber(rowData.totalExpense, 2)}
                        style={amountFormatStyle('100')} />
                <Column field={'documentsCounts'} header={'# Documents'} style={{width: '100px'}}
                        editor={(props) => documentColumnEditor('days', props)}/>
            </DataTable>


            <div style={{marginTop: '20px'}}>
                <Card title="Summary">
                    <DataTable value={summary} showGridlines>
                        <Column field={'header'} header={''} style={{width: '100px'}}/>
                        <Column field={'allowance'} header={'DA + Allowance'} style={{width: '150px'}} />
                        <Column field={'fare'} header={'Fare + Transit'} style={{width: '150px'}} />
                        <Column field={'medical'} header={'Medical'} style={{width: '150px'}} />
                        <Column field={'other'} header={'Other'} style={{width: '150px'}} />
                        <Column field={'sundries.amount'} header={'Sundries'} style={{width: '150px'}} />
                    </DataTable>
                </Card>
            </div>
        </div>

            {props.detailsFetched === true &&
                <div style={{marginTop: '20px'}}>
                    <Card title="Approval Summary">
                        <div className='p-col-12 effort-table'>
                            <ExpenseSummaryComponent/>
                        </div>
                    </Card>
                </div>
            }
        </div>);
};

const mapState = state => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const expenseActivities = selectExpenseActivities(state);
    const expenseSummary = selectExpenseSummary(state);
    const masters = selectExpensesMasters(state);
    const expenseProfile = selectExpenseProfile(state);
    const transient = selectTransientExpense(state);
    const refreshExpenses = selectRefreshExpense(state);
    const showRoutes = selectShowRouteSelector(state);
    const showTransit = selectShowTransitSelector(state);
    const location = selectExpenseLocation(state);
    const detail = selectApprovalDetail(state);
    const detailsFetched = selectDetailsFetched(state);
    return {auth, expenseActivities, certificate, expenseSummary,
        masters, expenseProfile, transient, refreshExpenses, showRoutes, showTransit, location, detail, detailsFetched};
};

const actions = {
    handleInitPage: initNewExpenseStartAction,
    handleLoadRoutes: initTownsForRouteStartAction,
    handleLoadTransit: loadTownStartAction,
    handleFindAllowances : allowanceForDateStartAction,
    handleApplyLocationType: expenseLocationTypeSelectStartAction,
    handleCloseRoutesDialog: closeRouteExpenseDialogAction,
    handleSubmitExpense: submitExpenseStartAction,
    handleSaveSundries: saveSundriesSuccessAction,
    handleCloseTransitDialog: closeTransitExpenseDialogAction,
    initApprovals: approvalDetailSearchStartAction
};

export default connect(mapState, actions)(NewExpenseComponent);
