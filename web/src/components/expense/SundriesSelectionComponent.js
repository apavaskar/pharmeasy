import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from "primereact/button";
import './routes.css';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {selectExpenseProfile, selectRefreshMisc, selectRefreshTransient, selectTransientExpense} from "../../redux/selectors/newExpenseSelector";
import {selectAuth, selectAuthCertificate} from "../../redux/selectors/authSelector";
import {addSundriesLineAction, loadSundriesStartAction, saveMultiSundriesStartAction} from "../../redux/actions/expense/expenseActions";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {getBase64} from "../../utils/commonUtils";

const SundriesSelectionComponent = props => {
    const [allowanceId, setAllowanceId] = useState();
    const [amount, setAmount] = useState();
    const [remarks, setRemarks] = useState();
    const [tempDocument, setTempDocument] = useState([]);
    const [documentContent, setDocumentContent] = useState([]);
    const [maxAmount, setMaxAmount] = useState(0);

    useEffect(()=> {
        props.handleInitSundries({
            locationId: props.auth.profile.location.id,
            employeeId: props.auth.profile.employee.id,
            jobRole: props.expenseProfile[props.visitDate].jobRoleId,
            yearMonth: props.yearMonth,
            visitDate: props.visitDate,
            certificate: props.certificate,
        });
    }, [props.visitDate])

    const onFileSelect = async (e) => {
        for (let i = 0; i < e.files.length; i++) {
            let file = e.files[i];
            getBase64(file, (t) => {
                let contents = documentContent;
                contents.push({documentByteCode: t, fileName: file.name});
                setTempDocument(contents);
            });
        }
    }

    const onRemoveFile = async (e) => {
        const docs = tempDocument.filter( file => file.fileName !== e.file.name);
        setTempDocument(docs);
    }

    const selectAllowanceType = allowanceId => {
        const allowances = props.transient.sundries.filter(el => el.allowanceId === allowanceId);
        setMaxAmount(allowances[0].maxReqValue)
        setAllowanceId(allowanceId);
    }

    return (
        <div className="p-formgroup-inline">
            <div className={"p-field p-col-12 p-md-3"} >
                <Dropdown optionLabel={'name'}
                                 optionValue={'allowanceId'}
                                 value={allowanceId}
                                 options={props.transient.sundries.filter(el => el.type === 'Sundries')}
                                 onChange={(e) => selectAllowanceType(e.value)} placeholder="Select a Type"/>

            </div>
            <div className="p-field p-col-12 p-md-3">
                <InputNumber inputId="locale-indian" value={amount} onValueChange={(e) => setAmount(e.value)}
                             mode="decimal"
                             locale="en-IN"
                             max={maxAmount}
                             placeholder={'Amount'}
                             minFractionDigits={2} />
            </div>
            <div className="p-field p-col-12 p-md-3">
                <InputTextarea value={remarks}
                               placeholder={'Remarks'}
                               onChange={(e) => setRemarks(e.target.value)}
                               rows={1} cols={30} autoResize />
            </div>
            <div className="p-field p-col-12 p-md-9">
                <FileUpload name={'doc'}
                            onSelect={onFileSelect}
                            onRemove={onRemoveFile}
                            customUpload={true} multiple={false}
                            emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />
            </div>
            <div className="p-field p-col-12 p-md-offset-9 p-md-3">
                <Button label={'Add'}
                    disabled={tempDocument.length === 0 || allowanceId === '' || allowanceId === null}
                    onClick={() => {
                        props.handleAddSundriesLine({
                                line: {
                                amount: amount,
                                expenseTypeId: allowanceId,
                                allowanceTypeName: props.transient.sundries.filter(all => all.allowanceId === allowanceId)[0].name,
                                employeeId: props.auth.profile.employee.id,
                                remarks: remarks,
                                yyyyMmDd: props.visitDate,
                                routes: [],
                                documents: tempDocument
                            },
                            visitDate: props.visitDate,
                        });
                        setAmount(0);
                        setTempDocument([]);
                        setAllowanceId(null);
                        }
                    }/>
            </div>
            <div className='p-col-12'>
                <DataTable value={props.transient.claimedSundries || []}>
                    <Column field={'allowanceTypeName'} header={'Expense Type'} style={{width: '120px'}}/>
                    <Column field={'amount'} header={'Amount'} />
                    <Column field={'remarks'} header={'Remarks'} />
                </DataTable>
            </div>
            <div className="p-field p-col-12 p-md-offset-9 p-md-3">
                <Button label={'Save'} onClick={() => {
                    props.handleSaveSundries({
                        data:  props.transient.claimedSundries,
                        certificate: props.certificate
                    })
                }}/>
            </div>
        </div>
    );
};

const mapState = state => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const transient = selectTransientExpense(state);
    const refreshMisc = selectRefreshMisc(state);
    const expenseProfile = selectExpenseProfile(state);
    const refreshTransient = selectRefreshTransient(state);
    return {auth, certificate, transient, refreshMisc, expenseProfile, refreshTransient};
};

const actions = {
    handleInitSundries: loadSundriesStartAction,
    handleAddSundriesLine: addSundriesLineAction,
    handleSaveSundries: saveMultiSundriesStartAction,
};

export default connect(mapState, actions)(SundriesSelectionComponent);
