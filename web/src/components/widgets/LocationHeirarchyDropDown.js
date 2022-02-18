import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectAuth } from '../../redux/selectors/authSelector';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { selectHeirarchyLocations } from '../../redux/selectors/widgetSelector';
import { locationHeirarchyDropdownStartAction } from '../../redux/actions/widgets/widgetActions';

const LocationHeirarchyDropDown = props => {
    useEffect(()=> {
        props.handleInitValues({
            locationId: props.locationId,
            certificate: props.auth.certificate
        })
    },[props.locationId])

    const locationTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.location.name} - {option.jobRole.name}</div>
            </div>
        );
    }

    return <Dropdown id="location"
        value={props.value}
        onChange={(e) => props.onSelect(e)}
        options={props.locations}
        optionLabel="location.name"
        itemTemplate = {locationTemplate}
        placeholder="Select One" />
}
LocationHeirarchyDropDown.propTypes = {

    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    const locations = selectHeirarchyLocations(state);
    return {auth, locations};
};

const actions = {
    handleInitValues: locationHeirarchyDropdownStartAction
};

export default connect(mapState, actions)(LocationHeirarchyDropDown);
