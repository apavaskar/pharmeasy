import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './Drawer';
import {connect} from 'react-redux';

const RootNavigator = ({token}) => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const mapState = state => {
  return {};
};

const actions = {};

export default connect(mapState, actions)(RootNavigator);
