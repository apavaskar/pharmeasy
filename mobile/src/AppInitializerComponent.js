import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {dbInstallStartAction} from './redux/actions/dbInstallAction';
import {authDoneSelector, loggedInSelector} from './selectors/authSelector';
import {LoadingSpinner} from './widgets/LoadingSpinner';
import {LoginComponent} from './components/LoginComponent';
import {RootNavigator} from './navigations';

const AppInitializerComponent = props => {
  useEffect(() => props.handleDbInit(), []);
  if (props.authDone === true && props.loggedIn === true) {
    return <RootNavigator />;
  }
  if (props.loggedIn === false) {
    return (
      <View style={styles.container}>
        <LoginComponent />
      </View>
    );
  }
  if (!props.authDone) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }
};

const mapState = state => {
  const loggedIn = loggedInSelector(state);
  const authDone = authDoneSelector(state);
  return {loggedIn, authDone};
};

const actions = {
  handleDbInit: dbInstallStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapState, actions)(AppInitializerComponent);
