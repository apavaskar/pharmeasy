import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenOptions, LeftNavigation} from './ScreenOptions';
import MyDoctorListComponent from '../../components/DoctorChemistMapping/MyDoctorListComponent';
import ChemistMappingComponent from '../../components/DoctorChemistMapping/ChemistMappingComponent';
import {Button} from 'native-base';
import NewDoctorComponent from '../../components/DoctorChemistMapping/NewDoctorComponent';

const Stack = createStackNavigator();

const MyDoctorsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={new ScreenOptions()}>
      <Stack.Screen
        name="DoctorChemistDoctorList"
        component={MyDoctorListComponent}
        options={{
          title: 'Daily Reporting',
          headerLeft: () => LeftNavigation({navigation, back: 'Dashboard'}),
          headerRight: () => (
            <Button
              size={'lg'}
              variant={'link'}
              onPress={() => navigation.navigate('NewDoctorComponent')}>
              Add
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="NewDoctorComponent"
        component={NewDoctorComponent}
        options={{
          title: 'New Doctor',
          headerLeft: () =>
            LeftNavigation({navigation, back: 'DoctorChemistDoctorList'}),
        }}
      />
    </Stack.Navigator>
  );
};

export default MyDoctorsStackNavigator;
