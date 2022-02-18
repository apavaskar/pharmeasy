import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import './routes.css';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FileUpload} from "primereact/fileupload";
import {selectAuth, selectAuthCertificate} from "../../redux/selectors/authSelector";
import {closeRouteExpenseDialogAction, distanceBetweenTownsStartAction, saveRouteExpenseStartAction} from "../../redux/actions/expense/expenseActions";
import {selectExpenseLocation, selectTransientExpense} from "../../redux/selectors/newExpenseSelector";
import {OrderList} from "primereact/orderlist";
import {InputText} from "primereact/inputtext";
import {amountFormatStyle, formatNumber, getBase64} from "../../utils/commonUtils";

const RouteSelectionComponent = props => {
    const [returnJourney, setReturnJourney] = useState(false);
    const [expenseTypeId, setExpenseTypeId] = useState('');
    const [towns, setTowns] = useState([]);
    const [fares, setFares] = useState([]);
    const [documentRequired, setDocumentRequired] = useState(false);
    const [editableFares, setEditableFares] = useState({});
    const [documentContent, setDocumentContent] = useState([]);

    useEffect(() => {
        if (props.routeSaved === true) {
            props.closeDialog()
            props.handleCloseRoutesDialog();
        }
    },[props.routeSaved])

    useEffect(() => {
        if (props.transient.distances.length !== 0 && props.transient.allowances !== undefined) {
            let editables = {};
            const applicableAllowances = props.transient.allowances.filter(allowance => allowance.name==='Fare/Km');

            let index = 0
            const fares = props.transient.distances.map(distance => {
                  const d = distance.distance;
                  let rate = 0;
                  let allowanceId = null;
                  let allowanceApplied = {};
                  applicableAllowances.forEach(allowance => {
                      if (d >= allowance.minReqValue && d <= allowance.maxReqValue) {
                          rate = allowance.value;
                          allowanceId = allowance.allowanceId;
                          allowanceApplied = allowance;
                      }
                      setExpenseTypeId(allowance.allowanceId);
                  })
                const rowId = index;
                if(allowanceApplied.isEditable) {
                    editables =  { ...editableFares, ...{ [`${index}`]: true } };
                    console.log('Editables', editables);
                }
                index++;
                return {
                    ...distance, rate: rate, fare: d * rate, allowanceId: allowanceId, allowance: allowanceApplied, rowId: rowId
                  };
            });
            setFares(fares);
            setEditableFares(editables);

        }
    }, [props.transient.distances])

    const sumFare = () => {
        let fare =  0;
        fares.forEach(d => fare = fare + d.fare);
        return fare;
    }

    useEffect(()=> {
        const ids = props.transient.towns.map(t => t.id);
        const hqTown = props.location.town.id;
        let towns = JSON.parse(JSON.stringify(props.transient.towns));
        if (props.fromTown !== undefined) {
            towns.unshift(props.fromTown)
        } else {
            if (!ids.includes(hqTown)) {
                towns.unshift(props.location.town)
            }
        }
        if (props.row.locationTypeId === 'syslv00000000000000000000000000000165') {
            if (!ids.includes(hqTown)) {
                towns.push(props.location.town);
            }
        }
        setTowns(towns)
    }, [props.transient.towns.length])

    const footer=`Total fare: ${sumFare().toFixed(2)}`
    const townTemplate = item => {
        return item.name
    }

    const setAdhocFare = (row, fare) => {
        let fs = JSON.parse(JSON.stringify(fares));
        fs.forEach(f => {
           if (f.fromTown === row.fromTown && f.toTown === row.toTown) {
              f.fare = parseFloat(fare);
           }
        });
        setFares(fs);
    }

    const routeFareEditor = (id, rowProps) => {
        if (rowProps.rowData.allowance.isEditable) {
            setDocumentRequired(true);
            return <div style={{border:1, borderColor: 'red'}}>
            <InputText id="fare" type="text" style={{width: '100%'}}
                              onChange={e => setAdhocFare(rowProps.rowData, e.target.value) }/>
            </div>
        } else {
            return rowProps.fare;
        }
    }
    const onFileSelect = async (e) => {
        for (let i = 0; i < e.files.length; i++) {
            let file = e.files[i];
            getBase64(file, (t) => {
                let contents = documentContent;
                contents.push({content: t, fileName: file.name});
                setDocumentContent(contents);
            });
        }
    }

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
            </div>
        );
    }

    const fareBody = (rowData) => {
        if (rowData.allowance.isEditable === true) {
            return <div style={{color: 'blue', textDecoration: 'underline'}}>{rowData.fare}</div>;
        } else {
            return <div>{rowData.fare}</div>;
        }
    }

    return (
        <div className="p-fluid p-formgrid p-grid">
            {props.transient.towns.length === 0 &&
                <span>Loading towns...</span>
            }
            <OrderList value={towns} header="Towns Visited" dragdrop listStyle={{height:'auto'}} dataKey="id"
                       itemTemplate={townTemplate} onChange={(e) => setTowns(e.value)}></OrderList>
            <div className={"p-field p-col-12 p-md-12"} >
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <Checkbox inputId="binary" checked={returnJourney}
                              disabled={props.row.locationTypeId === 'syslv00000000000000000000000000000162'}
                          onChange={e => setReturnJourney(e.checked)} />
                   <label>Return Fare</label>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <Button label={'Calculate'}
                            className="p-button-secondary p-mr-2 p-mb-2"
                            onClick={() => {
                                props.handleLoadDistances({
                                    townList: towns.map(town => town.id),
                                    locationId: props.auth.profile.location.id,
                                    hqTown: props.location.town,
                                    certificate: props.certificate,
                                    isReturn: returnJourney
                                });
                                setDocumentRequired(false);
                            }
                            }
                    />
                </div>
            </div>
            <div className={"p-field p-col-12 p-md-12"} >
                <DataTable value={fares} footer={footer} scrollHeight='50px' editMode='cell'  editingRows={editableFares} dataKey='rowId'>
                    <Column field={'fromTownName'}
                            header={'From'}/>
                    <Column field={'toTownName'} header={'To'}/>
                    <Column field={'distance'}
                            header={'Distance'}
                            style={amountFormatStyle(100)}
                            body={rowData => formatNumber(rowData.distance, 1)}/>
                    <Column field={'rate'} header={'Rate'}/>
                    <Column field={'fare'} header={'Fare'}
                            body={fareBody}
                            editor={(props) => routeFareEditor('days', props)} style={{width: '100px'}}/>
                </DataTable>
            </div>
            {documentRequired &&
                <div className={"p-field p-col-12 p-md-12"}>
                    <div>
                        <p><strong>Drop Files to upload</strong></p>
                    </div>
                    <div>
                        <FileUpload name="files"
                                    onSelect={onFileSelect}
                                    headerTemplate={headerTemplate}
                                    multiple maxFileSize={1000000}/>
                    </div>
                </div>
            }
            <div className={"p-field p-col-12 p-md-3"} >
                <div className="p-field-checkbox">
                    <Button label={'Save'} onClick={() => props.handleSaveRoute({
                      data: [{
                          amount: sumFare(),
                          expenseTypeId: expenseTypeId,
                          employeeId: props.auth.profile.employee.id,
                          locationTypeId: props.row.locationTypeId,
                          remarks: '',
                          yyyyMmDd: props.row.visitDate,
                          documents: documentContent.map(d => {
                              return {documentByteCode: d.content, fileName: d.fileName}
                          }),
                          routes: fares.map(fare => {
                              return {
                                  allownace: fare.rate,
                                  amount: fare.fare,
                                  distance: fare.distance || 0,
                                  fromTownId: fare.fromTown,
                                  fromTownName: fare.fromTownName,
                                  isReturn: fare.isReturn,
                                  toTownId: fare.toTown,
                                  toTownName: fare.toTownName,
                                  transportModeId: null
                              };
                          }),
                      }],
                    certificate: props.certificate,
                    visitDate:  props.row.visitDate,
                    routes: fares,
                    total: sumFare()
                    })}/>
                </div>
            </div>
        </div>
    );
};

const mapState = state => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const transient = selectTransientExpense(state);
    const location = selectExpenseLocation(state);
    return {auth, certificate, transient, location};
};

const actions = {
    handleLoadDistances: distanceBetweenTownsStartAction,
    handleSaveRoute: saveRouteExpenseStartAction,
    handleCloseRoutesDialog: closeRouteExpenseDialogAction
};

export default connect(mapState, actions)(RouteSelectionComponent);
