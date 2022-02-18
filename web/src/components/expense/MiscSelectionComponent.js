import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';
import './routes.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {FileUpload} from 'primereact/fileupload';
import {selectRefreshMisc, selectTransientExpense} from '../../redux/selectors/newExpenseSelector';
import {selectAuth, selectAuthCertificate} from '../../redux/selectors/authSelector';
import {addMiscLineAction, distanceBetweenTownsStartAction, initMiscLineAction, saveMiscLineStartAction} from '../../redux/actions/expense/expenseActions';
import {InputNumber} from 'primereact/inputnumber';
import {InputTextarea} from 'primereact/inputtextarea';
import {amountFormatStyle, formatNumber, getBase64} from '../../utils/commonUtils';
import {ProgressSpinner} from "primereact/progressspinner";

const MiscSelectionComponent = props => {
    const [allowanceTypeId, setAllowanceTypeId] = useState();
    const [allowance, setAllowance] = useState();
    const [amount, setAmount] = useState();
    const [remarks, setRemarks] = useState();
    const [documentContent, setDocumentContent] = useState([]);
    const [loader, setLoader] = useState(false)

    useEffect(()=> {
        props.handleInitMisc();
    }, [props.row.visitDate])

    useEffect(() => {
        if (props.refreshMisc === true)
            setLoader(false)
    }, [props.refreshMisc])
    const expenseTypeTemplate = (data) => {
        return props.transient.allowances.filter(allowance =>
            allowance.type === 'Miscellaneous' && allowance.allowanceId === data.expenseTypeId)[0].name
    }

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

    return (
        <div className='p-formgroup-inline'>
            <div className={'p-field p-col-12 p-md-3'} >
                <Dropdown optionLabel={'name'}
                                 optionValue={'allowanceId'}
                                 value={allowanceTypeId}
                                 options={props.transient.allowances.filter(allowance => allowance.type === 'Miscellaneous')}
                                 onChange={(e) => {
                                     setAllowanceTypeId(e.value)}} placeholder='Select a Type'/>

            </div>
            <div className='p-field p-col-12 p-md-3'>
                <InputNumber inputId='locale-indian' value={amount} onValueChange={(e) => setAmount(e.value)}
                             mode='decimal'
                             locale='en-IN'
                             max={ allowanceTypeId !== undefined ? props.transient.allowances.filter(a => a.allowanceId === allowanceTypeId)[0].maxReqValue || 999999 : 0}
                             placeholder={'Amount'}
                             minFractionDigits={2} />
            </div>
            <div className='p-field p-col-12 p-md-3'>
                <InputTextarea value={remarks}
                               placeholder={'Remarks'}
                               onChange={(e) => setRemarks(e.target.value)}
                               rows={1} cols={30} autoResize />
            </div>
            <div className='p-field p-col-12 p-md-9'>
                <FileUpload name={'doc'}
                            onSelect={onFileSelect}
                            onRemove={onRemoveFile}
                            customUpload={true} multiple={false}
                            emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />

            </div>
            <div className='p-field p-col-12 p-md-offset-9 p-md-3'>
                <Button label={'Add'}
                        onClick={() => {
                            if (documentContent.length === 0 || allowanceTypeId === '') {
                                return;
                            }
                            props.handleAddLine({
                                line: {
                                    amount: amount,
                                    expenseTypeId: allowanceTypeId,
                                    allowanceTypeName: props.transient.allowances.filter(all => all.allowanceId === allowanceTypeId)[0].name,
                                    employeeId: props.auth.profile.employee.id,
                                    remarks: remarks,
                                    yyyyMmDd: props.row.visitDate,
                                    documents: documentContent,
                                    routes: [],
                                },
                                visitDate:  props.row.visitDate,
                            });
                        }}/>
            </div>
            <div className='p-col-12'>
                <DataTable value={props.transient.miscellaneous || []}>
                    <Column body={expenseTypeTemplate} header={'Expense Type'} style={{width: '220px'}}/>
                    <Column field={'amount'}
                            header={'Amount'}
                            style={amountFormatStyle(100)}
                            body={rowData => formatNumber(rowData.amount, 2)}
                    />
                    <Column field={'remarks'} header={'Remarks'} />
                </DataTable>
            </div>
            <div className='p-col-12 p-md-offset-6 p-md-3'>

            </div>
            <div className='p-field p-col-12 p-md-offset-9 p-md-3'>
                {!loader &&
                <Button label={'Save'}
                        onClick={() => {
                            setLoader(true)
                            props.handleSaveMisc({
                                data: props.transient.miscellaneous,
                                visitDate: props.row.visitDate,
                                certificate: props.certificate
                            })
                        }}/>
                }
                {loader &&
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8"  animationDuration=".5s"/>
                }
            </div>
        </div>
    );
};

const mapState = state => {
    const auth = selectAuth(state);
    const certificate = selectAuthCertificate(state);
    const transient = selectTransientExpense(state);
    const refreshMisc = selectRefreshMisc(state);
    return {auth, certificate, transient, refreshMisc};
};

const actions = {
    handleSaveMisc: saveMiscLineStartAction,
    handleInitMisc: initMiscLineAction,
    handleAddLine: addMiscLineAction
};

export default connect(mapState, actions)(MiscSelectionComponent);
