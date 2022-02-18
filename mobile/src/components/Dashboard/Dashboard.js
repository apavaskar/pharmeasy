import React, {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import {Center, FlatList, VStack} from 'native-base';
import NotificationsComponent from './NotificationsComponent';
import EffortCoverageComponent from './EffortCoverageComponent';
import EffortCallAverageComponent from './EffortCallAverageComponent';
import MissedCallComponent from './MissedCallComponent';
import {employeeSelector} from '../../selectors/commonSelector';
import {dashboardYearMonthSelector} from '../../selectors/dashboardSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {transactionDataSyncStartAction} from '../../redux/actions/transactionSyncAction';
import {loadConfigStartAction} from '../../redux/actions/configs/ConfigActions';
import connect from 'react-redux/lib/connect/connect';
import {cardListSelector} from '../../selectors/configSelector';
import SquerCard from '../../widgets/SquerCard';
import CRMComponent from './CRMComponent';
import DailyCallsComponent from './DailyCallsComponent';

const Dashboard = props => {
  console.log('DASH', props.navigation);
  const init = async () => {
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      async taskId => {
        // <-- Event callback
        if (props.certificate !== undefined && props.certificate !== '') {
          props.handleSyncNow({
            locationId: props.employee.locationId,
            employeeId: props.employee.id,
            certificate: props.certificate,
          });
        }
        console.log('INSIDFER THE TASK ID', taskId);
        BackgroundFetch.finish(taskId);
      },
      async taskId => {
        console.log('Timeout', taskId);
        BackgroundFetch.finish(taskId);
      },
    );
  };

  useEffect(() => {
    init();
    BackgroundFetch.scheduleTask({
      taskId: 'com.squer.backgroundSyncing',
      forceAlarmManager: true,
      delay: 5000, // <-- milliseconds
    });
  }, []);

  useEffect(() => {
    props.handleInitDashboard();
  }, [props.navigation]);

  useEffect(() => {}, [props.navigation, props.employee]);

  return (
    <FlatList
      data={[
        'notifications',
        'dailyCalls',
        'CRM',
        'effortCoverage',
        'effortCallAverage',
        'missedCallReport',
      ]}
      renderItem={item => (
        <Center my={3} key={item.item}>
          <DashboardCard
            item={item.item}
            employee={props.employee}
            navigation={props.navigation}
          />
        </Center>
      )}
    />
  );
};

const DashboardCard = props => {
  const item = props.item;
  switch (item) {
    case 'notifications':
      return (
        <SquerCard title={'Notifications'} width={'100%'}>
          <NotificationsComponent
            reload={true}
            navigation={props.navigation}
            drilldown={false}
          />
        </SquerCard>
      );
    case 'effortCoverage':
      return (
        <SquerCard title={'Coverage %'} width={'100%'}>
          <EffortCoverageComponent
            reload={new Date()}
            navigation={props.navigation}
          />
        </SquerCard>
      );
    case 'effortCallAverage':
      return (
        <SquerCard title={'Call Average'} width={'100%'}>
          <EffortCallAverageComponent
            reload={new Date()}
            navigation={props.navigation}
          />
        </SquerCard>
      );
    case 'missedCallReport':
      return (
        <SquerCard title={'Missed Call'} width={'100%'}>
          <MissedCallComponent
            reload={new Date()}
            navigation={props.navigation}
          />
        </SquerCard>
      );
    case 'CRM':
      return (
        <SquerCard title={'CRM'} width={'100%'}>
          <CRMComponent reload={new Date()} navigation={props.navigation} />
        </SquerCard>
      );
    case 'dailyCalls':
      return (
        <SquerCard title={'Daily Calls'} width={'100%'}>
          <DailyCallsComponent
            reload={new Date()}
            navigation={props.navigation}
          />
        </SquerCard>
      );
  }
};

const mapState = state => {
  const employee = employeeSelector(state);
  const yearMonth = dashboardYearMonthSelector(state);
  const certificate = certificateSelector(state);
  const cardList = cardListSelector(state);

  return {employee, yearMonth, certificate, cardList};
};

const actions = {
  handleSyncNow: transactionDataSyncStartAction,
  handleInitDashboard: loadConfigStartAction,
};

export default connect(mapState, actions)(Dashboard);
