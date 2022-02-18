import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import './routes.css';
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import {selectAuth, selectAuthCertificate} from "../../redux/selectors/authSelector";
import {selectTransientExpense} from "../../redux/selectors/newExpenseSelector";
import {closeRouteExpenseDialogAction, meetingAllowanceSaveStartAction} from "../../redux/actions/expense/expenseActions";
import {FileUpload} from "primereact/fileupload";
import {getBase64} from "../../utils/commonUtils";

const MeetingAllowanceComponent = props => {
    const [stayProvided, setStayProvided] = useState(false);
    const [mealsProvided, setMealsProvided] = useState(false);
    const [allowance, setAllowance] = useState(0);
    const [isFareEditable, setIsFareEditable] = useState(false);
    const [documentContent, setDocumentContent] = useState([]);
    const [transportMode, setTransportMode] = useState();
    const [fromTown, setFromTown] = useState();
    const [toTown, setToTown] = useState();
    const [fare, setFare] = useState();

    useEffect(()=> {
        if (props.row.locationTypeId === 'syslv00000000000000000000000000000162')
            setIsFareEditable(stayProvided && mealsProvided)
    },[stayProvided, mealsProvided])

    /*const onFileSelect = async (e) => {
        for(const f of e.files) {
            let blob = await fetch(f.objectURL).then(r => r.blob());
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var base64data = reader.result;
                let contents = documentContent;
                contents.push({content: base64data, fileName: f.name});
                setDocumentContent(contents);
            }

        }
    }*/
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


    const calcAllowance = () => {
        props.handleSaveMeetingAllowance({
            amount: allowance,
            employeeId: props.auth.profile.employee.id,
            locationTypeId: props.row.locationTypeId,
            documents: documentContent.map(d => {
                return {documentByteCode: d.content, fileName: d.fileName}
            }),
            conveyanceDetails: transportMode !== undefined ? {
              transportMode: transportMode,
              fromTown: fromTown,
              toTown: toTown,
              fare: fare
            } : null,
            mealsProvided: mealsProvided,
            stayProvided: stayProvided,
            visitDate: props.row.visitDate,
            jobRoleId: props.auth.profile.jobTitle.id,
            certificate: props.certificate
        });
    }
    return (
        <div className="p-fluid p-formgrid p-grid">
            <div className={"p-field p-col-12 p-md-12"} >
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <Checkbox inputId="stayProvided" checked={stayProvided}
                      onChange={e => setStayProvided(e.checked)} />
                   <label>Stay Provided</label>
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <Checkbox inputId="mealsProvided" checked={mealsProvided}
                              onChange={e => setMealsProvided(e.checked)} />
                    <label>Meals Provided</label>
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <InputNumber value={0}
                                 max={200}
                                 disabled={isFareEditable===false}
                                 onValueChange={(e) => setAllowance(e.value)} showButtons mode="decimal"></InputNumber>
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    Upload Bill
                </div>
                <div className="p-field p-col-12 p-md-9">
                    <FileUpload name="bill"
                                onSelect={onFileSelect}
                                accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    Self Declaration
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-4">
                        <InputText name='transportMode'
                                   placeholder={'Transport Mode'}
                                   value={transportMode} onChange={(e) => setTransportMode(e.target.value)}/>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <InputText name='fromTown'
                                   placeholder={'From'}
                                   value={fromTown} onChange={(e) => setFromTown(e.target.value)}/>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <InputText name='toTown'
                                   placeholder={'To'}
                                   value={toTown} onChange={(e) => setToTown(e.target.value)}/>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <InputNumber value={fare}
                                     max={200}
                                     placeholder={'Fare'}
                                     onValueChange={(e) => setFare(e.value)} showButtons mode="decimal"></InputNumber>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <Button label={'Save'}
                            className="p-button-secondary p-mr-2 p-mb-2"
                            onClick={calcAllowance}
                    />
                </div>
            </div>
        </div>
    );
};

const mapState = state => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const transient = selectTransientExpense(state);
    return {auth, certificate, transient};
};

const actions = {
    handleSaveMeetingAllowance: meetingAllowanceSaveStartAction,
    handleCloseRoutesDialog: closeRouteExpenseDialogAction
};

export default connect(mapState, actions)(MeetingAllowanceComponent);
