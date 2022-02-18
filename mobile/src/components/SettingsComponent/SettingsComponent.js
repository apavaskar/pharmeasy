import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {initSettingViewStartAction} from '../../redux/actions/settingAction';
import {lastSyncLogSelector} from '../../selectors/settingSelector';
import {masterSyncStartAction} from '../../redux/actions/masterSyncAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  certificateSelector,
  loggedInSelector,
} from '../../selectors/authSelector';
import {transactionDataSyncStartAction} from '../../redux/actions/transactionSyncAction';
import {logoutStartAction} from '../../redux/actions/authAction';
import {SquerButton} from '../../widgets/SquerButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {Box, HStack, ScrollView, Text} from 'native-base';

const SettingsComponent = props => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitview();
    });
  }, [props.navigation]);

  useEffect(() => {
    if (props.isLoggedIn === false) {
      props.navigation.navigate('LoginComponent');
    }
  }, [props.isLoggedIn]);

  return (
    <ScrollView>
      <ListItem key={'syncNow'} bottomDivider>
        <HStack space={3}>
          <Icon name={'md-sync-sharp'} type={'ionicon'} size={32} />
          <SquerButton
            title={'Sync Now'}
            type={'clear'}
            style={{width: '100%'}}
            onPress={() =>
              props.handleSyncNow({
                locationId: props.employee.locationId,
                employeeId: props.employee.id,
                certificate: props.certificate,
              })
            }
          />
        </HStack>
      </ListItem>
      <ListItem key={'edetailing'} bottomDivider>
        <HStack space={3}>
          <Icon name={'albums-outline'} type={'ionicon'} size={32} />
          <SquerButton
            title={'eDetailing Brands'}
            type={'clear'}
            style={{width: '100%'}}
            onPress={() => props.navigation.navigate('VABrandListing')}
          />
        </HStack>
      </ListItem>
      <ListItem key={'logout'} bottomDivider>
        <HStack space={3}>
          <Icon name={'ios-exit-outline'} type={'ionicon'} size={32} />
          <SquerButton
            title={'Logout'}
            type={'clear'}
            style={{width: '100%'}}
            onPress={() => props.handleLogout()}
          />
        </HStack>
      </ListItem>
    </ScrollView>
  );
};

const ListItem = props => {
  return (
    <Box
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'white',
      }}
      py={3}
      px={2}>
      {props.children}
    </Box>
  );
};

const mapState = state => {
  const lastSyncLog = lastSyncLogSelector(state);
  const employee = employeeSelector(state);
  const certificate = certificateSelector(state);
  const isLoggedIn = loggedInSelector(state);
  return {lastSyncLog, employee, certificate, isLoggedIn};
};

const actions = {
  handleInitview: initSettingViewStartAction,
  handleSyncNow: transactionDataSyncStartAction,
  handleMasterSync: masterSyncStartAction,
  handleLogout: logoutStartAction,
};

export default connect(mapState, actions)(SettingsComponent);
