import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectAuth } from '../../redux/selectors/authSelector';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { locationDropdownStartAction } from '../../redux/actions/widgets/widgetActions';
import { selectLocationDropdown, selectLocationDropDownRefresh } from '../../redux/selectors/widgetSelector';

const LocationDropDown = props => {
    useEffect(() => {
        if(props.locationId !==''){
            props.handleInitValues({
                locationId: props.locationId,
                certificate: props.auth.certificate
            })
        }
    },[props.locationId])

    const selectedLocationTemplate = (option, props) => {
        console.log(option, props.value);
        if (option) {
            return (
                <div className="country-item">
                    <div>{option.locationName} - {option.locationType}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const locationTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.locationName} - {option.locationType}</div>
            </div>
        );
    }

    return <Dropdown id="location"
        value={props.value}
        onChange={(e) => props.onSelect(e)}
        options={props.dropdowns[props.locationId]}
        itemTemplate ={locationTemplate}
        valueTemplate = {selectedLocationTemplate}
        optionLabel = "locationName"
        placeholder="Select One"
        filter 
        filterBy="locationName,locationType"
        />
}   
        
LocationDropDown.propTypes = {
    auth: PropTypes.object.isRequired
};
 
const mapState = state => {
    const dropdowns = selectLocationDropdown(state);
    const auth = selectAuth(state);
    const locationDropDownRefresh = selectLocationDropDownRefresh(state)
    return {dropdowns,auth, locationDropDownRefresh};
};

const actions = {
    handleInitValues: locationDropdownStartAction
};

export default connect(mapState, actions)(LocationDropDown);
