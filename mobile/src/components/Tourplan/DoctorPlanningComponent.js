import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Pressable} from 'react-native';
import {
  doctorsForDateSelector,
  refreshDoctorListSelector,
} from '../../selectors/planSelector';
import {
  addDoctorsToPlanStartAction,
  removeDoctorFromPlanStartAction,
  saveDoctorsToPlanStartAction,
} from '../../redux/actions/planAction';
import DoctorSelectionModal from '../DoctorSelectionModal/DoctorSelectionModal';
import {employeeSelector} from '../../selectors/commonSelector';
import {CALL_TYPE_FIELD} from '../../configs/AppConstants';
import {Box, Button, FlatList, HStack, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import BeatSelectionModal from '../BeatSelectionModal/BeatSelectionModal';
import {ROW_LABEL_TITLE} from '../../widgets/SquerWidgetConstants';

const DoctorPlanningComponent = props => {
  const [showBeats, setShowBeats] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  return (
    <VStack style={{flex: 1, width: '100%'}}>
      <FlatList
        w={'100%'}
        extraData={props.refreshDoctorList}
        contentContainerStyle={{flexGrow: 1}}
        data={props.doctorsPlanned.filter(
          activity =>
            activity.status !== 'D' &&
            activity.planned === 1 &&
            activity.activityType === CALL_TYPE_FIELD,
        )}
        renderItem={item =>
          DoctorRow(item, id =>
            props.handleRemoveDoctorAction({
              activity: item.item.id,
              activities: props.doctorsPlanned,
            }),
          )
        }
      />
      <HStack
        px={5}
        style={{
          justifyContent: 'space-between',
        }}>
        <HStack>
          <Button variant={'link'} onPress={() => setShowBeats(true)}>
            Add Patch
          </Button>
          <Button variant={'link'} onPress={() => setShowDoctors(true)}>
            Add Doctor
          </Button>
        </HStack>
        <Button
          variant={'solid'}
          onPress={() => {
            return props.handleSaveDoctorsToPlan({
              activities: props.doctorsPlanned.map(doctor => {
                return {...doctor, ...{employeeId: props.employee.id}};
              }),
            });
          }}>
          Save
        </Button>
      </HStack>
      {showBeats && (
        <BeatSelectionModal
          title={'Select Patch'}
          isVisible={showBeats}
          locationId={props.locationId}
          setVisible={val => setShowBeats(val)}
        />
      )}
      {showDoctors && (
        <DoctorSelectionModal
          isVisible={showDoctors}
          locationId={props.locationId}
          setVisible={val => setShowDoctors(val)}
          isPlanned={1}
          handleAddAction={doctors => props.handleAddDoctorsAction(doctors)}
        />
      )}
    </VStack>
  );
};

const DoctorRow = (item, onRemove) => {
  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" bg={'#fff'} p={2}>
      <HStack style={{justifyContent: 'space-between'}}>
        <Text fontSize={ROW_LABEL_TITLE}>{item.item.doctor.name}</Text>
        <Pressable onPress={() => onRemove(item.id)}>
          <Icon name={'md-trash-outline'} size={30} />
        </Pressable>
      </HStack>
    </Box>
  );
};

const mapState = state => {
  const doctorsPlanned = doctorsForDateSelector(state);
  const employee = employeeSelector(state);
  const refreshDoctorList = refreshDoctorListSelector(state);
  return {doctorsPlanned, employee, refreshDoctorList};
};

const actions = {
  handleRemoveDoctorAction: removeDoctorFromPlanStartAction,
  handleSaveDoctorsToPlan: saveDoctorsToPlanStartAction,
  handleAddDoctorsAction: addDoctorsToPlanStartAction,
};

export default connect(mapState, actions)(DoctorPlanningComponent);
