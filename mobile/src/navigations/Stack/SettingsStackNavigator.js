import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import SettingsComponent from '../../components/SettingsComponent/SettingsComponent';
import VABrandListingComponent from '../../components/EDetailingComponent/VABrandListingComponent';

const Stack = createStackNavigator();

const SettingsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="SettingsComponentView"
        component={SettingsComponent}
        options={{
          title: 'Settings',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
        }}
      />
      <Stack.Screen
        name="VABrandListing"
        component={VABrandListingComponent}
        options={{
          title: 'eDetailing Brands',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'SettingsComponentView'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
