import React, { useState } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {selectAuth} from './../../redux/selectors/authSelector';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import {yyyyMM} from "../../utils/dateUtil";
import {searchExpenseStartAction} from "../../redux/actions/expense/expenseActions";
const MyExpenseSearchComponent = props => {
    const [date, setDate] = useState(new Date());
    const handleSubmit = (event) => {
        props.handleSubmitReport({
            conditions: {
              employeeId: props.auth.profile.employee.id
            },
            certificate: props.auth.certificate
        });
    }
    return(
        <div className="p-grid" style={{height: '100%'}}>
        <div className="p-col-12">
            <div className="card">
                <h5>Search</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange="2020:2021"/>
                    </div>
                    <Button label="Add" className="p-button-raised p-mr-2 p-mb-2"
                            onClick={() => props.history.push(`/home/reporting/expense/new/${yyyyMM(date)}`) } />
                    <Button label="Search" className="p-button-raised" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="p-col-12 effort-table">

        </div>
        </div>
    );

}

MyExpenseSearchComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    return {auth};
};

const actions = {
    handleSubmitReport: searchExpenseStartAction,
};

export default connect(mapState, actions)(MyExpenseSearchComponent);
