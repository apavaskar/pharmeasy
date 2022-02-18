import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import ApprovalListComponent from '../../components/ApprovalComponent/ApprovalListComponent';

const Stack = createStackNavigator();

const ApprovalsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="ApprovalListing"
        component={ApprovalListComponent}
        options={{
          title: 'Approvals',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default ApprovalsStackNavigator;
