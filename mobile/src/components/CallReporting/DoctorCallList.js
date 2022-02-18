import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  callListReportingDateSelector,
  doctorsToReportListSelector,
  refreshListSelector,
} from '../../redux/selectors/callReportingListSelectors';
import {
  callInitDoctorListStartAction,
  zsmCallConfirmStartAction,
} from '../../redux/actions/callReporting/callReportingListAction';
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Spacer,
  Text,
  VStack,
  CheckIcon,
  Heading,
} from 'native-base';
import {
  ROW_LABEL_TITLE,
  ROW_SUB_HEADING,
} from '../../widgets/SquerWidgetConstants';
import SquerCheckbox from '../../widgets/SquerCheckbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DoctorCallList = props => {
  useEffect(
    () =>
      props.handleInitDoctorList({
        reportingDate: props.reportingDate,
        locationId: props.employee.locationId,
      }),
    [props.reportingDate],
  );

  return (
    <FlatList
      extraData={props.refreshList}
      data={props.doctorsToReportList.filter(d => d.customerId !== null)}
      renderItem={item => (
        <DoctorRow
          activity={item.item}
          employee={props.employee}
          onConfirmCall={action =>
            props.handleConfirmCall({
              id: item.item.id,
              confirm: action,
              reportingDate: props.reportingDate,
              locationId: props.employee.locationId,
            })
          }
          onPreCallPressed={doctorId =>
            props.navigation.navigate('PrecallPlanning', {
              visitId: item.item.id,
            })
          }
          onCallPressed={doctorId =>
            props.navigation.navigate('DoctorCallReport', {
              visitId: item.item.id,
              visit: item.item,
              doctor: item.item.doctor,
            })
          }
        />
      )}
    />
  );
};

const DoctorRow = props => {
  console.log(props.activity);
  return (
    <HStack
      space={3}
      justifyContent="space-between"
      bgColor={'white'}
      p={3}
      my={1}>
      <VStack justifyContent="space-between" mx={2}>
        {props.activity.coordinates === 1 && (
          <HStack>
            <Icon name={'location-arrow'} size={25} color={'blue'} />
          </HStack>
        )}
        {props.activity.coordinates === 2 && (
          <HStack>
            <Icon name={'location-arrow'} size={15} color={'blue'} />
            <Icon name={'location-arrow'} size={15} color={'blue'} />
          </HStack>
        )}
        {props.activity.coordinates === 0 && (
          <Icon name={'location-arrow'} size={20} color={'white'} />
        )}
        <Ionicons
          size={30}
          name={'checkmark-done'}
          color={props.activity.visited ? '#0f0' : '#808080'}
          style={{alignSelf: 'center'}}
        />
      </VStack>
      <VStack>
        <Heading fontSize={'md'} py={2}>
          {props.activity.doctor.name}
        </Heading>
        <HStack space={2}>
          <Box p={2} bg={'primary.100'} borderRadius={'md'}>
            <Text fontSize={'sm'}>
              {props.activity.planned === 1 ? 'Planned' : 'Unplanned'}
            </Text>
          </Box>
          <Box p={2} bg={'primary.100'} borderRadius={'md'}>
            <Text fontSize={'sm'}>
              {props.activity.synced === 1 ? 'Synced' : 'UnSynced'}
            </Text>
          </Box>
        </HStack>
      </VStack>
      <Spacer />
      {props.employee.jobTitleId !==
        'jobrl00000000000000000000000000000003' && (
        <VStack space={2} alignItems={'flex-end'}>
          <Button
            width={100}
            variant={'solid'}
            onPress={() => props.onCallPressed(props.activity.doctor.id)}>
            Call
          </Button>
          <Text>{props.activity.beat.name}</Text>
        </VStack>
      )}
      {props.employee.jobTitleId ===
        'jobrl00000000000000000000000000000003' && (
        <SquerCheckbox
          onPress={() =>
            props.onConfirmCall(props.activity.visited === 1 ? 0 : 1)
          }
          selected={props.activity.visited === 1}
        />
      )}
    </HStack>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  const reportingDate = callListReportingDateSelector(state);
  const doctorsToReportList = doctorsToReportListSelector(state);
  const refreshList = refreshListSelector(state);
  return {employee, reportingDate, doctorsToReportList, refreshList};
};

const actions = {
  handleInitDoctorList: callInitDoctorListStartAction,
  handleConfirmCall: zsmCallConfirmStartAction,
};

export default connect(mapState, actions)(DoctorCallList);
