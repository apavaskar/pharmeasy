import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from './../../redux/selectors/authSelector';
import { Button } from 'primereact/button';
import './report.css';
import {yyyyMM} from "../../utils/dateUtil";
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import DataDumpTable from "../widgets/DataDumpTable";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {fetchDmlReportStartAction} from "../../redux/actions/reports/customer/customerReportAction";
import {Column} from "primereact/column";
import {selectDMLData, selectRefreshDMLReport} from "../../redux/selectors/customerReportSelector";
import LocationHeirarchyDropDown from "../widgets/LocationHeirarchyDropDown";

const DMLReportComponent = props => {

    const [date, setDate] = useState(new Date());
    const [division, setDivision] = useState('');
    let headerGroup = <ColumnGroup>
        <Row>
            <Column header="Zone"   field={"zone"} />
            <Column header="Region"   field={"region"} />
            <Column header="Location"   field={"location"} />
            <Column header="Employee code"   field={"employeeCode"} />
            <Column header="Employee Name"   field={"employeeName"} />
            <Column header="UID"   field={"doctorUid"} />
            <Column header="Doctor code"   field={"doctorCode"} />
            <Column header="Doctor name"   field={"doctorName"} />
            <Column header="Doctor Speciality"   field={"doctorSpeciality"} />
            <Column header="Classification"   field={"doctorClassification"} />
        </Row>
    </ColumnGroup>;
    const cols = [
        {field: 'zone', header: 'Zone', width: 150},
        {field: 'region', header: 'Region', width: 150},
        {field: 'location', header: 'Location', width: 150},
        {field: 'employeeCode', header: 'Employee Code', width: 100},
        {field: 'employeeName', header: 'Employee Name', width: 250},
        {field: 'doctorUid', header: 'UID', width: 150},
        {field: 'doctorCode', header: 'Doctor Code', width: 150},
        {field: 'doctorName', header: 'Doctor Name', width: 250},
        {field: 'doctorSpeciality', header: 'Speciality', width: 150},
        {field: 'doctorClassification', header: 'Classification', width: 150},
    ]
    const handleSubmit = (event) => {
        let divisionId = division.id;
        if (props.auth.profile.location.id !== 'locat00000000000000000000000000000000') {
            divisionId = division.location.id
        }
        props.handleSubmitReport({
            divisionId: divisionId,
            yearMonth:  yyyyMM(date),
            certificate: props.auth.certificate
        });
    }
    return(
        <div className="p-grid" style={{height: '100%'}}>
        <div className="p-col-12">
            <div className="card">
                <h5>Search</h5>
                <div className="p-formgroup-inline">
                    {props.auth.profile.location.id === 'locat00000000000000000000000000000000' &&
                    <div className="p-field">
                        <DivisionListDropDown onSelect={(e) => setDivision(e.value)} value={division}/>
                    </div>
                    }
                    {props.auth.profile.location.id !== 'locat00000000000000000000000000000000' &&
                    <div className="p-field">
                        <LocationHeirarchyDropDown
                            locationId={props.auth.profile.location.id}
                            onSelect={(e) => setDivision(e.value)} value={division}/>
                    </div>
                    }
                    <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
                <DataDumpTable cols={cols} data={props.dml.dml} headerGroup={headerGroup} frozenWidth={'200px'} title={'Doctor List'}/>
        </div>
        </div>
    );

}

DMLReportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const dml = selectDMLData(state);
    const refresh = selectRefreshDMLReport(state);
    return {auth, dml, refresh};
};

const actions = {
    handleSubmitReport: fetchDmlReportStartAction,
};

export default connect(mapState, actions)(DMLReportComponent);
