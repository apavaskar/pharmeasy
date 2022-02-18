import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {selectGlobal, selectShowMessage} from "../../redux/selectors/globalSelector";
import {Toast} from "primereact/toast";

const ToastComponent = ({showMessage, global}) => {
    const toast = useRef(null);
    useEffect(() => {
        if (showMessage === true) {
            if (global.messageType === 'error') {
                toast.current.show({severity: 'error',
                            summary: global.error.title,
                            detail: global.error.message,
                            life: 3000});
            } else if (global.messageType === 'success') {
                toast.current.show({severity: 'success',
                    summary: global.error.title,
                    detail: global.error.message,
                    life: 3000});
            }
        }
    },[showMessage]);

    return (
        <Toast ref={toast} position="top-right"/>
    );
};

const mapState = state => {
    const showMessage = selectShowMessage(state);
    const global = selectGlobal(state);
    return {showMessage, global};
};

const actions = {
};

export default connect(mapState, actions)(ToastComponent);
