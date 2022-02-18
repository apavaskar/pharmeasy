import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {employeeSelector} from '../../selectors/commonSelector';
import {refreshDoctorListSelector} from '../../redux/selectors/callReportingSelector';
import DoctorCallList from './DoctorCallList';
import {changeCallTypeListStartAction} from '../../redux/actions/callReportingAction';
import DoctorSelectionModal from '../DoctorSelectionModal/DoctorSelectionModal';
import NonCallList from './NonCallList';
import NonCallActivitySelectionModal from '../NonCallActivitySelectionModal/NonCallActivitySelectionModal';
import ReportMarketingActivity from '../MarketingActivity/ReportMarketingActivity';
import {
  addUnplannedDoctorStartAction,
  addUnplannedNCAStartAction,
  callTypeListToReportStartAction,
} from '../../redux/actions/callReporting/callReportingListAction';
import {
  callListReportingDateSelector,
  currentReportingListActionSelector,
} from '../../redux/selectors/callReportingListSelectors';
import SquerDatePicker from '../../widgets/SquerFormField/SquerDatePicker';
import {Button, HStack, VStack} from 'native-base';
import ButtonGroup from 'native-base/src/components/primitives/Button/ButtonGroup';

const CallReportingListComponent = props => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const setFromDate = date => {
    props.handleCallTypeToReport({
      currentAction: 0,
      reportingDate: date,
    });
    setDate(date);
  };

  useEffect(
    () =>
      props.navigation.addListener('focus', () => {
        setFromDate(new Date());
      }),
    [props.navigation],
  );

  return (
    <VStack>
      <HStack w={'100%'} style={{justifyContent: 'space-between'}} p={2}>
        <SquerDatePicker
          min={new Date('2021-10-01')}
          max={new Date()}
          defaultDate={date}
          onConfirm={date => setFromDate(date)}
          placeholder={'From'}
        />
        <ButtonGroup
          selectedIndex={props.activityIndex}
          buttons={['Doctors', 'Non Call']}
          setSelectedIndex={i =>
            props.handleCallTypeToReport({
              currentAction: i,
              reportingDate: props.reportingDate,
            })
          }
        />

        <Button
          variant={'link'}
          onPress={() => {
            if (props.activityIndex === 2) {
              props.navigation.navigate('ReportMarketingActivity');
            } else {
              setShowModal(true);
            }
          }}>
          Add Unplanned
        </Button>
      </HStack>
      {props.activityIndex === 0 && (
        <DoctorCallList
          navigation={props.navigation}
          refreshList={props.refreshDoctorList}
        />
      )}
      {props.activityIndex === 1 && (
        <NonCallList
          navigation={props.navigation}
          refreshList={props.refreshDoctorList}
        />
      )}
      {showModal && props.activityIndex === 0 && (
        <DoctorSelectionModal
          isVisible={showModal}
          locationId={props.employee.locationId}
          setVisible={val => setShowModal(val)}
          handleAddAction={data => {
            props.handleAddDoctors({
              doctors: data.doctors,
              date: props.reportingDate,
              locationId: props.employee.locationId,
              employeeId: props.employee.id,
            });
          }}
          isPlanned={0}
        />
      )}
      {showModal && props.activityIndex === 1 && (
        <NonCallActivitySelectionModal
          isVisible={showModal}
          locationId={props.employee.locationId}
          setVisible={val => setShowModal(val)}
          handleAddAction={data => {
            props.handleAddNonCallActivities({
              reportingDate: props.reportingDate,
              locationId: props.employee.locationId,
              activities: data.activities.map(activity => {
                activity.planEmployeeId = props.employee.id;
                activity.planDate = props.reportingDate;
                activity.planLocationId = props.employee.locationId;
                activity.activityId = activity.id;
                activity.visited = 0;
                activity.planned = 0;
                activity.status = 'A';
                return activity;
              }),
            });
          }}
          isPlanned={0}
        />
      )}
    </VStack>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  const reportingDate = callListReportingDateSelector(state);
  const refreshDoctorList = refreshDoctorListSelector(state);
  const activityIndex = currentReportingListActionSelector(state);
  return {
    employee,
    reportingDate,
    refreshDoctorList,
    activityIndex,
  };
};

const actions = {
  handleCallTypeToReport: callTypeListToReportStartAction,
  handleAddDoctors: addUnplannedDoctorStartAction,
  handleChangeListTypeIndex: changeCallTypeListStartAction,
  handleAddNonCallActivities: addUnplannedNCAStartAction,
};

export default connect(mapState, actions)(CallReportingListComponent);
