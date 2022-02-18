import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {SquerFullScreen} from '../../widgets/SquerContainer';
import {SquerCalendarStrip} from '../../widgets/SquerFormField';
import {Platform, StyleSheet} from 'react-native';
import PlanSummaryComponent from './PlanSummaryComponent';
import {SquerButtonGroup} from '../../widgets/SquerButton';
import DoctorPlanningComponent from './DoctorPlanningComponent';
import {
  changePlanTypeStartAction,
  initPlanStartAction,
  resetPlanStartAction,
} from '../../redux/actions/planAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  currentActionSelector,
  planDateSelector,
} from '../../selectors/planSelector';
import LeaveComponent from '../LeaveComponent/LeaveComponent';
import NonCallPlanComponent from './NonCallPlanComponent';
import ManagerDoctorPlanningComponent from './ManagerDoctorPlanningComponent';
import moment from 'moment';
import {toDisplayDate} from '../../utils/dateUtil';
import {HStack, VStack, Heading, Text, Center, Box, Divider} from 'native-base';

const TourPlanningComponent = props => {
  const endDate = moment().add(1, 'month').endOf('month').toDate();
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitPlan({
        planDate: new Date(),
        locationId: props.employee.locationId,
      });
    });

    props.navigation.addListener('blur', () => {
      props.handleResetPlan({});
    });
  }, [props.navigation]);

  if (Platform.isPad) {
    return (
      <VStack bg={'white'} space={1} height={'100%'}>
        <Center py={2}>
          <Heading fontSize={'lg'}>{toDisplayDate(props.planDate)}</Heading>
        </Center>
        <HStack
          space={0}
          height={'93%'}
          borderTopWidth={1}
          borderTopColor={'coolGray.200'}>
          <VStack
            style={{flex: 1}}
            space={2}
            maxW={450}
            paddingX={5}
            borderRightColor={'coolGray.200'}
            borderRightWidth={1}>
            <SquerCalendarStrip
              full={true}
              selectedDate={props.planDate}
              onDayPress={date => {
                props.handleInitPlan({
                  planDate: date.toDate(),
                  locationId: props.employee.locationId,
                });
              }}
            />
            <PlanSummaryComponent />
          </VStack>
          <VStack style={{flex: 1}} pb={1} pt={5}>
            <Center>
              <SquerButtonGroup
                selectedIndex={props.currentPlanType}
                buttons={['Doctors', 'Non Call']}
                setSelectedIndex={i =>
                  props.handleChangePlanType({actionType: i})
                }
              />
            </Center>
            {props.currentPlanType === 0 &&
              props.employee.jobTitleId ===
                'jobrl00000000000000000000000000000001' && (
                <DoctorPlanningComponent
                  locationId={props.employee.locationId}
                />
              )}
            {props.currentPlanType === 0 &&
              props.employee.jobTitleId !==
                'jobrl00000000000000000000000000000001' && (
                <ManagerDoctorPlanningComponent
                  refreshSummary={props.planDate}
                  locationId={props.employee.locationId}
                />
              )}
            {props.currentPlanType === 1 && (
              <NonCallPlanComponent fromDate={props.planDate} />
            )}
          </VStack>
        </HStack>
      </VStack>
    );
  } else {
    return (
      <SquerFullScreen>
        <SquerCalendarStrip
          selectedDate={props.planDate}
          onDayPress={date => {
            props.handleInitPlan({
              planDate: date.toDate(),
              locationId: props.employee.locationId,
            });
          }}
        />
        <PlanSummaryComponent />
        <SquerButtonGroup
          selectedIndex={props.currentPlanType}
          buttons={['Doctors', 'Non Call', 'Leave']}
          setSelectedIndex={i => props.handleChangePlanType({actionType: i})}
        />
        {props.currentPlanType === 0 &&
          props.employee.jobTitleId ===
            'jobrl00000000000000000000000000000001' && (
            <DoctorPlanningComponent locationId={props.employee.locationId} />
          )}
        {props.currentPlanType === 0 &&
          props.employee.jobTitleId !==
            'jobrl00000000000000000000000000000001' && (
            <ManagerDoctorPlanningComponent
              refreshSummary={props.planDate}
              locationId={props.employee.locationId}
            />
          )}
        {props.currentPlanType === 1 && (
          <NonCallPlanComponent fromDate={props.planDate} />
        )}
        {props.currentPlanType === 2 && (
          <LeaveComponent fromDate={props.planDate} />
        )}
      </SquerFullScreen>
    );
  }
};

const mapState = state => {
  const employee = employeeSelector(state);
  const currentPlanType = currentActionSelector(state);
  const planDate = planDateSelector(state);
  return {employee, currentPlanType, planDate};
};

const actions = {
  handleInitPlan: initPlanStartAction,
  handleResetPlan: resetPlanStartAction,
  handleChangePlanType: changePlanTypeStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {
    height: 50,
    justifyContent: 'center',
  },
});

export default connect(mapState, actions)(TourPlanningComponent);
