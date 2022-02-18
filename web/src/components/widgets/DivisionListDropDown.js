import React, {useEffect} from 'react';
import PropTypes from "prop-types";

import {divisionListDropdownStartAction} from "../../redux/actions/widgets/widgetActions";
import {Dropdown} from "primereact/dropdown";
import {selectDivisionList} from "../../redux/selectors/widgetSelector";
import {selectAuth} from "../../redux/selectors/authSelector";
import {connect} from "react-redux";
const DivisionListDropDown = props => {
    useEffect(()=> {
        props.handleInitValues({
            certificate: props.auth.certificate
        })
    },[props.locationId])
    return <Dropdown id="division"
                     value={props.value}
                     onChange={(e) => props.onSelect(e)}
                     options={props.divisions}
                     optionLabel="name"
                     placeholder="Select One" />
}

DivisionListDropDown.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const divisions = selectDivisionList(state);
    return {auth, divisions};
};

const actions = {
    handleInitValues: divisionListDropdownStartAction
};

export default connect(mapState, actions)(DivisionListDropDown);
