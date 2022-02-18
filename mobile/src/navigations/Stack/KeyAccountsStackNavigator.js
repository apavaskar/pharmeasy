import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import KeyAccountListing from '../../components/KeyAccountComponent/KeyAccountListing';
import KeyAccountEntryComponent from '../../components/KeyAccountComponent/KeyAccountEntryComponent';
import KeyAccountDailyEntry from "../../components/KeyAccountComponent/KeyAccountDailyEntry";

const Stack = createStackNavigator();

const KeyAccountsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="KeyAccountListing"
        component={KeyAccountListing}
        options={{
          title: 'Key Accounts',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
        }}
      />
      <Stack.Screen
        name="KeyAccountEntry"
        component={KeyAccountEntryComponent}
        options={{
          title: 'Monthly Entry',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'KeyAccountListing'}),
        }}
      />
      <Stack.Screen
        name="KeyAccountDailyEntry"
        component={KeyAccountDailyEntry}
        options={{
          title: 'Daily Entry',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'KeyAccountListing'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default KeyAccountsStackNavigator;
