import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import {TourPlanningComponent} from '../../components/Tourplan';

const Stack = createStackNavigator();

const TourPlanningStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="NewPlan"
        component={TourPlanningComponent}
        options={{
          title: 'Tour Plan',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default TourPlanningStackNavigator;
