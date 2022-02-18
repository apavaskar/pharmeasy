import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import SquerText from '../../widgets/SquerFormField/SquerText';

const ManagerDoctorPlanComponent = props => {
  return (
    <View>
      <SquerText>Test</SquerText>
    </View>
  );
};

const mapState = state => {
  return {};
};

const actions = {};

export default connect(mapState, actions)(ManagerDoctorPlanComponent);
