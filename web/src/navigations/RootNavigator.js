import React, {createContext} from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import {selectAuth} from "../redux/selectors/authSelector";
import ToastComponent from "../components/widgets/ToastComponent";
import LoaderComponent from "../components/widgets/LoaderComponent";

const authContext = createContext();

const RootNavigator = ({auth}) => {
  const history = useHistory();

  return (
    <authContext.Provider value={{auth}}>
        <LoaderComponent />
        <ToastComponent />
      <Router history={history} basename="/">
        <PrivateRoute auth={auth}/>
        <PublicRoute/>
      </Router>
    </authContext.Provider>
  );
}

RootNavigator.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapState = (state) => {
  const auth = selectAuth(state);
  return {auth};
};

export default connect(mapState)(RootNavigator);

