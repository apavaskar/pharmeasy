import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {approveExpensesStartAction} from "../../../redux/actions/expense/misExpenseActions";
import {selectAuth, selectAuthCertificate} from "../../../redux/selectors/authSelector";
import {selectApprovalDetail, selectDetailsFetched, selectExpenseApprovalStatus} from "../../../redux/selectors/expenseApprovalSelector";

const ApprovalTemplateComponent = props => {
    const mapOfCategories = {
      'alctg00000000000000000000000000000001': 'DA + Allowance',
      'alctg00000000000000000000000000000002': 'Fare + Transit',
      'alctg00000000000000000000000000000003': 'Meeting',
      'alctg00000000000000000000000000000004': 'Others',
      'alctg00000000000000000000000000000005': 'Sundries',
      'alctg00000000000000000000000000000006': 'Lodging',
      'alctg00000000000000000000000000000007': 'Conveyance',
      'alctg00000000000000000000000000000008': 'Telephone',
      'alctg00000000000000000000000000000009': 'Medical',
    };
    const[data, setData] = useState([]);
    const[managerName, setManagerName] = useState('');
    const[manager, setManager] = useState();
    const[jobRole, setJobRole] = useState('');
    const[jobRoleId, setJobRoleId] = useState('');
    const[status, setStatus] = useState('');
    const[disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (props.detailsFetched === true) {
            const summary = props.detail.summaries.filter(s => s.manager.id === props.approverId);
            let rows = [{title: 'Claimed', type: 'claimed'},
                {title: 'Added', type: 'added'},
                {title: 'Deducted', type: 'deducted'},
                {title: 'Total', type: 'total'},
                {title: 'Remarks', type: 'remarks'}]
            let allowanceId = '';
            setStatus(summary[0].status);

            Object.keys(mapOfCategories).forEach(key => {
                const amounts = summary.filter(s => s.allowanceCategory.id === key)
                let claimed = 0.0;
                let added = 0.0;
                let deducted = 0.0;
                let total = 0.0;
                //let remarks = amounts.remarks;
                amounts.forEach(amount => {
                    claimed = claimed + amount.amountClaimed;
                    added = added + amount.amountAdded;
                    deducted = deducted + amount.amountDeducted;
                    total = total + claimed + added - deducted;
                });
                rows[0][key] = (claimed * 1.0)
                rows[1][key] = (added * 1.0)
                rows[2][key] = (deducted * 1.0)
                rows[3][key] = (total * 1.0)
                rows[4][key] = amounts.length > 0 ? amounts[0].remarks : 0;
                rows[0]['expenseId'] = summary[0].expense.id
                rows[1]['expenseId'] = summary[0].expense.id
                rows[2]['expenseId'] = summary[0].expense.id
                rows[3]['expenseId'] = summary[0].expense.id
                rows[4]['expenseId'] = summary[0].expense.id

                rows[0]['managerId'] = summary[0].manager.id
                rows[1]['managerId'] = summary[0].manager.id
                rows[2]['managerId'] = summary[0].manager.id
                rows[3]['managerId'] = summary[0].manager.id
                rows[4]['managerId'] = summary[0].manager.id

            });
            if (summary !== undefined && summary.length > 0) {
                setManagerName(summary[0].manager.name)
                setManager(summary[0].manager)
                setDisabled(props.employee.profile.employee.id !== summary[0].manager.id || status === 'APPROVED')
                setJobRole(summary[0].jobRole.name)
                setJobRoleId(summary[0].jobRole.id)
            }
            setData(rows);
        }
    }, [props.detailsFetched]);

    const paintInput = (val, type, onChange) => {
        if (disabled) {
            if (val === null || val === undefined) return  '0';
            if (isNaN(val)) return val;
            return (val*1).toFixed(2);
        }
        if (type === 'claimed') {
            return <InputNumber inputId='locale-indian' value={val.toFixed(2)}
                                onValueChange={(e) => onChange(e.value, 'claimed')}
                                mode='decimal'
                                locale='en-IN'
                                readOnly={true}
                                placeholder={'Amount'}
                                minFractionDigits={2}/>
        } else if (type === 'added') {
            return <InputNumber inputId='locale-indian' value={val.toFixed(2)}
                                onValueChange={(e) => onChange(e.value, 'added')}
                                mode='decimal'
                                locale='en-IN'
                                readOnly={disabled}
                                placeholder={'Amount'}
                                minFractionDigits={2}/>
        } else if (type === 'deducted') {
            return <InputNumber inputId='locale-indian' value={val.toFixed(2)}
                                onValueChange={(e) => onChange(e.value, 'deducted')}
                                mode='decimal'
                                locale='en-IN'
                                readOnly={disabled}
                                placeholder={'Amount'}
                                minFractionDigits={2}/>
        } else  if (type === 'total') {
            return <InputNumber inputId='locale-indian' value={val.toFixed(2)}
                                onValueChange={(e) => console.log('')}
                                mode='decimal'
                                locale='en-IN'
                                readOnly={true}
                                placeholder={'Amount'}
                                minFractionDigits={2}/>
        } else if (type === 'remarks') {
            return <InputTextarea rows={2}
                                  readOnly={disabled}
                                  value={val || ''} onChange={(e) => onChange(e.target.value, 'remarks')}/>
        }
    }

    const updateValue = (category, value, type) => {
        let rows = JSON.parse(JSON.stringify(data));
        if (type === 'remarks') {
            rows.forEach(row => {
                if (row.type === 'remarks') {
                  row[category] = value;
                }
            })
            setData(rows)
            return
        }

        let claimed = 0
        let added = 0
        let deducted = 0
        let total = 0

        rows.forEach(row => {
            if (row.type === 'claimed') claimed = row[category]
            if (row.type === 'added') {
                if (type === 'added') {
                    row[category] = value
                    added = value
                } else {
                    added = row[category]
                }
            }
            if (row.type === 'deducted') {
                if (type === 'deducted') {
                    row[category] = value
                    deducted = value
                } else {
                    deducted = row[category]
                }
            }
        })
        if (type === 'added') {
            total = claimed + value - deducted
        } else if (type === 'deducted') {
            total = claimed + added - value
        }
        rows.forEach(row => {
            if (row.type === 'total') {
                row[category] = total
            }
        })
        setData(rows)
    }

    const paintAllowanceInput = rowData => {
        const val = rowData['alctg00000000000000000000000000000001'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000001', value, type))
    }

    const paintFareInput = rowData => {
        const val = rowData['alctg00000000000000000000000000000002'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000002', value, type))
    }

    const paintMedicalInput = rowData => {
        const val = rowData['alctg00000000000000000000000000000003'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000003', value, type))
    }

    const paintGroup1Input = rowData => {
        const val = rowData['alctg00000000000000000000000000000004'] ;
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000004', value, type))
    }

    const paintGroup2Input = rowData => {
        const val = rowData['alctg00000000000000000000000000000005'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000005', value, type))
    }

    const paintGroup3Input = rowData => {
        const val = rowData['alctg00000000000000000000000000000006'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000006', value, type))
    }

    const paintGroup4Input = rowData => {
        const val = rowData['alctg00000000000000000000000000000008'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000008', value, type))
    }

    const paintGroup5Input = rowData => {
        const val = rowData['alctg00000000000000000000000000000009'];
        return paintInput(val, rowData['type'], (value, type)=> updateValue('alctg00000000000000000000000000000009', value, type))
    }

    return (
        <div>
            <h5>{managerName} ({jobRole})</h5>
            <DataTable value={data}
                    scrollable
                    className="editable-cells-table p-datatable-sm"
                    scrollHeight="600px">
                <Column field={'title'} header={''} />
                <Column body={paintAllowanceInput}
                        header={mapOfCategories['alctg00000000000000000000000000000001']} />
                <Column body={paintFareInput}
                        header={mapOfCategories['alctg00000000000000000000000000000002']} />
                <Column body={paintMedicalInput}
                        header={mapOfCategories['alctg00000000000000000000000000000003']} />
                <Column body={paintGroup1Input}
                        header={mapOfCategories['alctg00000000000000000000000000000004']} />
                <Column body={paintGroup2Input}
                        header={mapOfCategories['alctg00000000000000000000000000000005']} />
                {props.approval.profile.jobTitle.id !== 'jobrl00000000000000000000000000000001' &&
                    <Column body={paintGroup3Input}
                            header={mapOfCategories['alctg00000000000000000000000000000006']} />
                }
                {props.approval.profile.jobTitle.id === 'jobrl00000000000000000000000000000003' &&
                    <Column body={paintGroup4Input}
                            header={mapOfCategories['alctg00000000000000000000000000000008']}/>
                }
                <Column body={paintGroup5Input}
                        header={mapOfCategories['alctg00000000000000000000000000000009']} />
            </DataTable>
            <div>&nbsp;</div>
            {manager && jobRoleId !== 'jobrl10000000000000000000000000000001' &&
            <Button
                disabled={props.employee.profile.employee.id !== manager.id || status === 'APPROVED' || props.approvalStatus === 'APPROVED'}
                onClick={() => props.handleSubmit({data: data, certificate: props.certificate})} label={'Approve'}></Button>
            }

            {manager && jobRoleId === 'jobrl10000000000000000000000000000001' &&
            <Button
                onClick={() => props.handleSubmit({data: data, certificate: props.certificate})} label={'Approve'}></Button>
            }
        </div>
    );
}

const mapState = (state) => {
    const certificate = selectAuthCertificate(state);
    const employee = selectAuth(state);
    const approval = selectApprovalDetail(state);
    const approvalStatus = selectExpenseApprovalStatus(state);
    const detail = selectApprovalDetail(state);
    const detailsFetched = selectDetailsFetched(state);
    return {certificate, employee, approvalStatus, approval, detail, detailsFetched};
}

const actions = {
    handleSubmit: approveExpensesStartAction
};

export default connect(mapState, actions)(ApprovalTemplateComponent);
