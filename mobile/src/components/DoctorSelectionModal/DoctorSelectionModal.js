import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadDoctorsStartAction} from '../../redux/actions/comonAction';
import {doctorsSelector} from '../../selectors/commonSelector';
import {Box, Button, FlatList, HStack, Input, Text, VStack} from 'native-base';
import SquerBottomSheet from '../../widgets/SquerBottomSheet';
import SquerCheckbox from '../../widgets/SquerCheckbox';
import {ROW_LABEL_TITLE} from '../../widgets/SquerWidgetConstants';

const DoctorSelectionModal = props => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    if (props.isVisible === true) {
      props.handleDoctorLoadAction({locationId: props.locationId});
    }
  }, [props.isVisible]);
  useEffect(() => {
    if (props.isVisible === false) {
      setSelectedDoctors([]);
    }
  }, [props.isVisible]);

  useEffect(() => {
    setDoctorList(props.doctors);
  }, [props.doctors]);

  const searchDoctors = val => {
    console.log(val);
    const filteredList = props.doctors.filter(doctor => {
      return doctor.name.toLowerCase().indexOf(val.toLowerCase()) >= 0;
    });
    setDoctorList(filteredList);
  };

  return (
    <SquerBottomSheet
      isVisible={props.isVisible}
      title="Select Doctors"
      footer={
        <Button
          onPress={() => {
            const profiles = [];
            props.doctors.forEach(doctor => {
              if (selectedDoctors.includes(doctor.id)) {
                profiles.push(doctor);
              }
            });
            props.handleAddAction({
              doctors: profiles,
              isPlanned: props.isPlanned,
            });
            props.setVisible(false);
          }}>
          Add
        </Button>
      }
      setVisible={() => props.setVisible()}>
      <VStack>
        <DoctorSearchBar search={searchDoctors} />
        <FlatList
          extraData={doctorList ? doctorList.length : 0}
          keyExtractor={item => item.id}
          data={doctorList}
          renderItem={doctor => {
            return (
              <DoctorSelectionRow
                key={doctor.item.id}
                doctor={doctor.item}
                onPress={item => {
                  const doctor = item;
                  if (selectedDoctors.includes(doctor.id)) {
                    const filtered = selectedDoctors.filter(row => {
                      return doctor.id !== row;
                    });
                    setSelectedDoctors(filtered);
                  } else {
                    const doctors = selectedDoctors.concat(doctor.id);
                    setSelectedDoctors(doctors);
                  }
                }}
                selected={selectedDoctors.includes(doctor.item.id)}
              />
            );
          }}
        />
      </VStack>
    </SquerBottomSheet>
  );
};

const DoctorSearchBar = props => {
  return (
    <HStack px={2}>
      <Input
        size={'xl'}
        style={{width: '90%'}}
        placeholder={'Search By name'}
        onChangeText={val => props.search(val)}
      />
    </HStack>
  );
};

const mapState = state => {
  const doctors = doctorsSelector(state);
  return {doctors};
};

const actions = {
  handleDoctorLoadAction: loadDoctorsStartAction,
};

const DoctorSelectionRow = props => {
  console.log(props);
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      py="2">
      <HStack style={{justifyContent: 'space-between'}}>
        <Text fontSize={'lg'}>{props.doctor.name}</Text>
        <SquerCheckbox
          onPress={() => props.onPress(props.doctor)}
          selected={props.selected}
        />
      </HStack>
      <HStack justifyContent={'flex-end'}>
        <Text fontSize={'sm'}>{props.doctor.beatName}</Text>
      </HStack>
    </Box>
  );
};

export default connect(mapState, actions)(DoctorSelectionModal);
