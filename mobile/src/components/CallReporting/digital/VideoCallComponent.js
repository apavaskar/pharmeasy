import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {employeeSelector} from '../../../selectors/commonSelector';
import {SquerButton} from '../../../widgets/SquerButton';
import {saveVideoCallStartAction} from '../../../redux/actions/digitalCallReportingAction';

const VideoCallComponent = props => {
  let date = new Date().getTime();
  let endDate = new Date().getTime();

  const conferenceTerminated = nativeEvent => {
    props.handleSaveVideoCall();
    props.navigation.navigate('CallReportingListComponent');
  };

  const conferenceJoined = nativeEvent => {
    date = new Date().getTime();
  };

  const conferenceWillJoin = nativeEvent => {
    /* Conference will join event */
    console.log('conferenceWillJoin callback');
  };

  return (
    <View style={styles.container}>

    </View>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  return {
    employee,
  };
};

const actions = {
  handleSaveVideoCall: saveVideoCallStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 0.94,
    width: '100%',
  },
  button: {
    flex: 0.06,
  },
});

export default connect(mapState, actions)(VideoCallComponent);
