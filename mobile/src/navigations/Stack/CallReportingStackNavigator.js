import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import {CallReportingListComponent} from '../../components/CallReporting';
import DoctorCallReport from '../../components/CallReporting/DoctorCallReport';
import VideoCallComponent from '../../components/CallReporting/digital/VideoCallComponent';
import ReportMarketingActivity from '../../components/MarketingActivity/ReportMarketingActivity';
import {PRE_CALL_RCPA} from '../../configs/AppConstants';
import PreplanningComponent from '../../components/EDetailingComponent/PreplanningComponent';

const Stack = createStackNavigator();

const CallReportingStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="CallReportingListComponent"
        component={CallReportingListComponent}
        options={{
          title: 'Daily Reporting',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
        }}
      />
      <Stack.Screen
        name="DoctorCallReport"
        component={DoctorCallReport}
        options={{
          title: 'Doctor Call',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'CallReportingListComponent'}),
        }}
      />
      <Stack.Screen
        name="VideoCallComponent"
        component={VideoCallComponent}
        options={{
          title: 'Video Call',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'DoctorCallReport'}),
        }}
      />
      <Stack.Screen
        name="ReportMarketingActivity"
        component={ReportMarketingActivity}
        options={{
          title: 'Marketing Activity',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'CallReportingListComponent'}),
        }}
      />
      <Stack.Screen
        name="PrecallPlanning"
        component={PreplanningComponent}
        options={{
          title: 'Precall Planning',
          headerLeft: () => LeftNavigation({navigation, back: 'CallReportingListComponent'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default CallReportingStackNavigator;
