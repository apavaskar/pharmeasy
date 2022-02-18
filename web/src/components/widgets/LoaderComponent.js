import React from 'react';
import {connect} from 'react-redux';
import {ProgressSpinner} from 'primereact/progressspinner';
import {selectShowLoader} from "../../redux/selectors/globalSelector";
import {Dialog} from "primereact/dialog";
import './Loader.css';

const LoaderComponent = ({showLoader}) => {
    if(showLoader === true) {
        return <Dialog visible={true} position={'center'} modal showHeader={false} onHide={()=> {}}
                       style={{ width: '100px', height: '100px' }} closeOnEscape={false} closable={false}>
            <ProgressSpinner style={{width: '50px', height: '50px' }} strokeWidth='4'  animationDuration='1s'/>
        </Dialog>;
    } else {
        return '';
    }
};

const mapState = state => {
    const showLoader = selectShowLoader(state);
    return {showLoader};
};

const actions = {};

export default connect(mapState, actions)(LoaderComponent);
