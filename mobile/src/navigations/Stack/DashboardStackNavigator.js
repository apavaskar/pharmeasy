import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {ScreenOptions} from './ScreenOptions';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../../components/Dashboard/Dashboard';

const Stack = createStackNavigator();

const DashboardStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={ScreenOptions({})}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerLeft: () => (
            <Pressable
              onPress={props => navigation.toggleDrawer()}
              style={{height: 40}}>
              <Icon name={'menu-outline'} color={'black'} size={32} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const mapState = state => {
  return {};
};

const actions = {};

export default connect(mapState, actions)(DashboardStackNavigator);
