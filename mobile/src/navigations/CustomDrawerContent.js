import React, {useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View} from 'react-native';
import theme from '../AppTheme';
import {connect} from 'react-redux';
import {loadEmployeeStartAction} from '../redux/actions/comonAction';
import {employeeSelector} from '../selectors/commonSelector';
import {Text} from 'native-base';

const CustomDrawerContent = props => {
  useEffect(() => {
    props.handleLoadEmployee();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.2,
          backgroundColor: theme.borderColor,
        }}>
        <Text type={'label'}>{props.employee.name}</Text>
        <Text type={'label'}>{props.employee.empDesignation}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};
const mapState = state => {
  const employee = employeeSelector(state);
  return {employee};
};

const actions = {
  handleLoadEmployee: loadEmployeeStartAction,
};

export default connect(mapState, actions)(CustomDrawerContent);
