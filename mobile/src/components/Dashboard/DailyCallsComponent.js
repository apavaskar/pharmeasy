import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {HStack, Text, VStack} from 'native-base';
import {loadCallDashboardStartAction} from '../../redux/actions/dashboard/dashboardAction';
import {dailyCallsSelector} from '../../selectors/dashboardSelector';

const DailyCallsComponent = props => {
  useEffect(() => {
    props.handleLoadDailyCalls();
  }, [props.reload]);
  if (props.dailyCalls === undefined || props.dailyCalls.length === 0) {
    return <Text>No Calls reported or planned</Text>;
  }
  return (
    <VStack>
      <HStack style={{justifyContent: 'space-between'}}>
        <Text>Today's Calls</Text>
        <VStack style={{alignItems: 'center'}}>
          <Text fontSize={'xl'}>
            {props.dailyCalls.filter(call => call.visited === 1).length} /{' '}
            {props.dailyCalls.filter(call => call.planned === 1).length}
          </Text>
          <Text>Visited/Planned</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

const mapState = state => {
  const dailyCalls = dailyCallsSelector(state);
  return {dailyCalls};
};

const actions = {
  handleLoadDailyCalls: loadCallDashboardStartAction,
};

export default connect(mapState, actions)(DailyCallsComponent);
