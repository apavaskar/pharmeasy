import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashboardStackNavigator} from '../Stack';
import SettingsStackNavigator from '../Stack/SettingsStackNavigator';
import CustomDrawerContent from '../CustomDrawerContent';
import TourPlanningStackNavigator from '../Stack/TourPlanningStackNavigator';
import CallReportingStackNavigator from '../Stack/CallReportingStackNavigator';
import ApprovalsStackNavigator from '../Stack/ApprovalsStackNavigator';
import {employeeSelector} from '../../selectors/commonSelector';
import {StyleSheet} from 'react-native';
import theme from '../../AppTheme';
import {connect} from 'react-redux';
import MyDoctorsStackNavigator from '../Stack/MyDoctorsStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName={'DashboardScreen'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false, title: 'Dashboard'}}
        name="DashboardScreen"
        component={DashboardStackNavigator}
      />
      <Drawer.Screen
        options={{headerShown: false, title: 'Tour Plan'}}
        name="TourPlanStack"
        component={TourPlanningStackNavigator}
      />
      <Drawer.Screen
        options={{headerShown: false, title: 'Call Report'}}
        name="CallReportStack"
        component={CallReportingStackNavigator}
      />
      <Drawer.Screen
        options={{headerShown: false, title: 'My Doctor'}}
        name="MyDoctors"
        component={MyDoctorsStackNavigator}
      />
      {props.employee.jobTitleId ===
        'jobrl00000000000000000000000000000002' && (
        <Drawer.Screen
          options={{headerShown: false, title: 'Approvals'}}
          name="approvalsStack"
          component={ApprovalsStackNavigator}
        />
      )}
      <Drawer.Screen
        options={{headerShown: false, title: 'Settings'}}
        name="SettingsComponent"
        component={SettingsStackNavigator}
      />
    </Drawer.Navigator>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  return {employee};
};

const actions = {};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: theme.primaryColor},
  text: {margin: 6},
  row: {flexDirection: 'row'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
export default connect(mapState, actions)(DrawerNavigator);
