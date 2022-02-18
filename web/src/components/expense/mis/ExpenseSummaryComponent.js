import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import { selectAuth, selectAuthCertificate } from "../../../redux/selectors/authSelector";
import { selectApprovalDetail, selectDetailsFetched, selectExpenseApprovalStatus } from "../../../redux/selectors/expenseApprovalSelector";
import { displayDate} from "../../../utils/dateUtil";

const ExpenseSummaryComponent = props =>{
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

     const jobRoleSequence = [
         'jobrl00000000000000000000000000000002',
         'jobrl00000000000000000000000000000003',
         'jobrl00000000000000000000000000000004',
         'jobrl00000000000000000000000000000005',
         'jobrl10000000000000000000000000000001'
     ] 
    const[data, setData] = useState([]);
    const[disabled, setDisabled] = useState(true);
    
    useEffect(() => {
    const summary = props.detail.summaries;
    let samData = [];

    summary.forEach(sam =>{
        let claimed = 0.0;
        let added = 0.0;
        let deducted = 0.0;
        let total = 0.0;
                    
        claimed = claimed + sam.amountClaimed;
        added = added + sam.amountAdded;
        deducted = deducted + sam.amountDeducted;
        total = total + claimed + added - deducted;            
    
        if(samData[sam.manager.id]!=null){
            let tempRow = samData[sam.manager.id]
            tempRow.amounts [sam.allowanceCategory.id] = total
        }else{
            let row = {'managerId':'','managerName':'','status':'', 'jobRole':'', 'jobRoleId':'','amounts':[], 'updatedOn':''}
            row.managerId = sam.manager.id; 
            row.managerName = sam.manager.name;
            row.status = sam.status;
            row.jobRole = sam.jobRole.name;
            row.jobRoleId = sam.jobRole.id;
            row.updatedOn = displayDate(sam.updatedOn)
            row.amounts [sam.allowanceCategory.id] = total;
            samData[sam.manager.id] = row;
        }
    });
    let tData = []
    jobRoleSequence.forEach(jr =>{
        Object.values(samData).forEach(val => { 
            if(val.jobRoleId === jr)
            tData.push(val)
        })
    })
    setData(tData);
    },[props.detailsFetched]);

    const paintInput = (val) => {
        if (val === null || val === undefined) return  '0';
        if (isNaN(val)) return val;
        return val.toFixed(2);
    }

    const paintAllowanceInput = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000001'];
        return paintInput(val)
    }

    const paintFareInput = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000002'];
        return paintInput(val)
    }

    const paintMedicalInput = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000003'];
        return paintInput(val)
    }

    const paintGroup1Input = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000004'] ;
        return paintInput(val)
    }

    const paintGroup2Input = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000005'];
        return paintInput(val)
    }

    const paintGroup3Input = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000006'];
        return paintInput(val)
    }

    const paintGroup4Input = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000008'];
        return paintInput(val)
    }

    const paintGroup5Input = rowData => {
        const val = rowData.amounts['alctg00000000000000000000000000000009'];
        return paintInput(val)
    }

    const paintTotal = rowData => {
        let val = 0
        Object.values(rowData.amounts).forEach(amt => {
            val = val + amt;

        })
        return paintInput(val)
    }

    const paintStauts = rowData => {
        if(rowData.status === 'APPROVED') return <i className="pi pi-check" style={{'fontWeight': 'bold'}}></i>
        return <i className="pi pi-times"></i>

    }

    const paintManager = rowData => {
        return rowData.managerName+' ('+rowData.jobRole+')';
    }

    const paintApprovedOn = rowData => {
        if(rowData.status === 'APPROVED') return rowData.updatedOn
        return '-'
    }
    return (
    <div>
        <DataTable value={data}
        scrollable
        className="editable-cells-table p-datatable-sm"
        scrollHeight="600px">
            <Column field={paintManager} header={''} style={{'width':'150px'}}/>
            <Column body={paintStauts} header={''} style={{'width':'50px'}}/>
            <Column header={'Approved On'} body={paintApprovedOn}/>
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
                <Column header={'Total'} body={paintTotal} />
        </DataTable>
    </div>
    )
}
const mapState = (state) => {
    const certificate = selectAuthCertificate(state);
    const employee = selectAuth(state);
    const detail = selectApprovalDetail(state);
    const approval = selectApprovalDetail(state);
    return {certificate, approval,employee,detail};
}

export default connect(mapState)(ExpenseSummaryComponent);
