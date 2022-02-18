import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from './../../redux/selectors/authSelector';
import { Button } from 'primereact/button';
import './report.css';
import DivisionListDropDown from "../widgets/DivisionListDropDown";
import {selectFieldStructure} from "../../redux/selectors/fieldStructureSelector";
import {fetchFieldStructureReportStartAction} from "../../redux/actions/reports/fieldStructure/fieldStructureAction";
import DataDumpTable from "../widgets/DataDumpTable";

const FieldStructureReportComponent = props => {
    const [selectedDivision, setSelectedDivision] = useState({});
    const fieldStructureCols = [
        { field: 'division', header: 'Division', width: '250px' },
        { field: 'empCode', header: 'Emp. Code', width: '100px'  },
        { field: 'empDOJ', header: 'Emp. DOJ' , width: '100px'  },
        { field: 'empJobRole', header: 'Job Role', width: '100px'  },
        { field: 'empLocation', header: 'Location', width: '250px'  },
        { field: 'empLocationType', header: 'Location Type', width: '200px'  },
        { field: 'empName', header: 'Emp. Name', width: '350px'  },
        { field: 'manager1Code', header: 'Manager1 Code', width: '100px'  },
        { field: 'manager1Name', header: 'Manager1 Name', width: '350px'  },
        { field: 'manager1Location', header: 'Manager1 Location', width: '250px'  },
        { field: 'manager1LocationType', header: 'Manager1 Location Type', width: '200px'  },
        { field: 'manager2Code', header: 'Manager2 Code', width: '100px'  },
        { field: 'manager2Name', header: 'Manager2 Name', width: '350px'  },
        { field: 'manager2Location', header: 'Manager2 Location', width: '250px'  },
        { field: 'manager2LocationType', header: 'Manager2 Location Type', width: '200px'  },

    ];

    const handleSubmit = (event) => {
        props.handleSubmit({
            certificate: props.auth.certificate,
            division: selectedDivision
        });
    };
    return(
        <div className="p-grid" style={{height: '100%'}}>
        <div className="p-col-12">
            <div className="card">
                <h5>Search</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field">
                        <DivisionListDropDown
                            onSelect={(e) => setSelectedDivision(e.value)}
                            value={selectedDivision}/>
                    </div>
                        <Button label="Submit" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">
            <DataDumpTable cols={fieldStructureCols} data={props.fieldStructure}
                           frozenWidth={'200px'}
                           title={'Field Structure'}/>
        </div>
        </div>
    );

}

FieldStructureReportComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const fieldStructure = selectFieldStructure(state);
    console.log(fieldStructure);
    return {auth, fieldStructure};
};

const actions = {
    handleSubmit: fetchFieldStructureReportStartAction
};


export default connect(mapState, actions)(FieldStructureReportComponent);
