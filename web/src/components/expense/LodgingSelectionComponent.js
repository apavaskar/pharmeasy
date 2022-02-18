import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from "primereact/button";
import './routes.css';
import {FileUpload} from "primereact/fileupload";
import {selectExpenseProfile, selectRefreshMisc, selectTransientExpense} from "../../redux/selectors/newExpenseSelector";
import {selectAuth, selectAuthCertificate} from "../../redux/selectors/authSelector";
import {saveLodgingStartAction} from "../../redux/actions/expense/expenseActions";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {getBase64} from "../../utils/commonUtils";

const LodgingSelectionComponent = props => {
    const [amount, setAmount] = useState();
    const [remarks, setRemarks] = useState();
    const [documentContent, setDocumentContent] = useState([]);
    const [allowance, setAllowance] = useState();
    console.log(props);
    useEffect(()=> {
        if (props.transient.towns !== undefined) {
            let classification = '';
            for(const town of props.transient.towns) {
                if (town.classification === 'syslvtownsclassification0000000000001') {
                    classification = 'A'
                } else if (town.classification === 'syslvtownsclassification0000000000002') {
                    if (classification === 'A')
                        classification = 'A';
                    else
                        classification = 'B';
                } else {
                    if (classification === 'B')
                        classification = 'B';
                    else if (classification === 'A')
                        classification = 'A';
                    else
                        classification = 'C';
                }
                let all = props.transient.allowances.filter(all =>
                    all.type === 'Lodging and Boarding' && all.townType === classification
                )[0]
                setAllowance(all)
            }

        }
    }, [props.visitDate])

    const onFileSelect = async (e) => {
        for (let i = 0; i < e.files.length; i++) {
            let file = e.files[i];
            getBase64(file, (t) => {
                let contents = documentContent;
                contents.push({documentByteCode: t, fileName: file.name});
                setDocumentContent(contents);
            });
        }
    }

    const onRemoveFile = async (e) => {
        const docs = documentContent.filter( file => file.fileName !== e.file.name);
        setDocumentContent(docs);
    }

    console.log(allowance);
    return (
        <div className="p-formgroup-inline">
            <div className="p-field p-col-12 p-md-3">
                <InputNumber inputId="locale-indian" value={amount} onValueChange={(e) => setAmount(e.value)}
                             mode="decimal"
                             locale="en-IN"
                             max={allowance !== undefined ? allowance.maxReqValue : 0}
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
                            customUpload={true} multiple={true}
                            emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />
            </div>
            <div className="p-field p-col-12 p-md-offset-9 p-md-3">
                <Button label={'Save'} onClick={() => {
                    props.handleSubmit({data: [{
                            amount: amount,
                            expenseTypeId: allowance.allowanceId,
                            employeeId: props.auth.profile.employee.id,
                            locationTypeId: '',
                            remarks: remarks,
                            yyyyMmDd: props.row.visitDate,
                            documents: documentContent,
                            routes: [],
                        }],
                        certificate: props.certificate,
                        visitDate:  props.row.visitDate,
                    })
                }}
                />
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
    return {auth, certificate, transient, refreshMisc, expenseProfile};
};

const actions = {
    handleSubmit: saveLodgingStartAction
};

export default connect(mapState, actions)(LodgingSelectionComponent);
