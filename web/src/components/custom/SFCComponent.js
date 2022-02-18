import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from '../../redux/selectors/authSelector';

import {sfcCreateDistanceStartAction, sfcStartAction, sfcUpdateDistanceStartAction} from "../../redux/actions/custom/sfcAction";
import {selectRefresh, selectSFCs, selectTowns} from "../../redux/selectors/customSelector";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {Panel} from "primereact/panel";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";

const SFCComponent = props => {
    const [data, setData] = useState([]);
    const [displayAddScreen, setDisplayAddScreen] = useState(false);
    const [townList, setTownList] = useState([]);
    const [fromTown, setFromTown] = useState({});
    const [toTown, setToTown] = useState({});
    const [distance, setDistance] = useState(0);
    useEffect(()=> {
        setData(props.data);
        let towns = [];
        props.data.forEach(d => {
           const from = d.fromTown;
           const to = d.toTown;
           let fromExists = false;
           let toExists = false;
           towns.forEach(t => {
               if (t.id === from.id) {
                   fromExists = true;
               }
               if (t.id === to.id) {
                   toExists = true;
               }
           });
           if (toExists === false) {
               towns.push(to);
           }
           if (fromExists === false) {
               towns.push(from);
           }
        });
        setTownList(props.towns.map(town => { return {id: town.id.id, name: town.name};}));
        console.log(townList);

    },[props.data])
    useEffect(() => {
        props.handleSearchSFC({
            location: props.auth.profile.location.id,
            certificate: props.auth.certificate
        });
    },[props.navigation, props.refresh])

    const onEditorValueChange = (id, rows, value) => {
        let fs = JSON.parse(JSON.stringify(data));
        fs.forEach(f => {
            if (f.id.id === rows.rowData.id.id) {
                f.correctedDistance = value
            }
        });
        setData(fs);
    }

    const onRowEditComplete = event => {
        props.handleCorrectDistance({
            id: event.data.id.id,
            distance: event.data.correctedDistance,
            certificate: props.auth.certificate
        });
    }

    const textEditor = (id,options) => {
        return <InputText type="text"
                          value={options.rowData['correctedDistance']}
                          onChange={(e) => onEditorValueChange(id, options, e.target.value)} />;
    }

    const closeDistanceDialog = () => {
        setFromTown({});
        setDistance(0);
        setToTown({})
        setDisplayAddScreen(false);
    }

    const saveDistance = () => {
        props.handleCreateSFC({
            sfc: {
                location: {id: props.auth.profile.location.id, name: ''},
                fromTown: {id: fromTown, name: ''},
                toTown: {id: toTown, name: ''},
                distance: distance,
                correctedDistance: distance
            },
            certificate: props.auth.certificate
        }, );
        closeDistanceDialog();
    }

    return(
        <div className="p-grid" style={{height: '100%'}}>
            <Dialog header="Add Distance" visible={displayAddScreen} style={{ width: '50vw', backgroundColor: 'white' }}
                    onHide={() => closeDistanceDialog()}>
                <div className="p-formgroup-inline" style={{height: '200px'}}>
                    <div className={"p-field p-col-12 p-md-3"} >
                        <Dropdown
                            optionLabel="name" optionValue="id" value={fromTown}
                            options={townList}
                            onChange={(e) => setFromTown(e.value)} placeholder="Select a City"/>
                    </div>
                    <div className={"p-field p-col-12 p-md-3"} >
                        <Dropdown
                            optionLabel="name" optionValue="id" value={toTown}
                            options={townList}
                            onChange={(e) => setToTown(e.value)} placeholder="Select a City"/>
                    </div>
                    <div className={"p-field p-col-12 p-md-3"} >
                        <InputNumber inputId="distance" value={distance} onValueChange={(e) => setDistance(e.value)} />
                    </div>
                </div>
                <Button label="Save" onClick={() => saveDistance()} />
            </Dialog>

            <Panel header={'Verify Distance'}>

                <Button label="Add Distance" onClick={() => setDisplayAddScreen(true)} />

                <div className="p-col-12 effort-table">
                    <DataTable value={data} editMode="row" dataKey="id" onRowEditSave={onRowEditComplete} responsiveLayout="scroll">
                        <Column field="fromTown.name" header="From"  style={{ width: '20%' }}></Column>
                        <Column field="toTown.name" header="To"  style={{ width: '20%' }}></Column>
                        <Column field="distance" header="Distance"  style={{ width: '20%' }}></Column>
                        <Column field="correctedDistance" header="Corrected"  editor={(options) => textEditor('cd', options)}  style={{ width: '20%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
            </Panel>
        </div>
    );

}

SFCComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const data = selectSFCs(state);
    const refresh = selectRefresh(state);
    const towns = selectTowns(state);
    return {auth, data, refresh, towns};
};

const actions = {
    handleSearchSFC: sfcStartAction,
    handleCorrectDistance: sfcUpdateDistanceStartAction,
    handleCreateSFC: sfcCreateDistanceStartAction
};

export default connect(mapState, actions)(SFCComponent);
