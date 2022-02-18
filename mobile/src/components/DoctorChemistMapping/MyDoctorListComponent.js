import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {initDoctorListStartAction} from '../../redux/actions/doctorChemist/doctorListAction';
import {doctorChemistListSelector} from '../../redux/selectors/doctorChemistListSelectors';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import SquerCard from '../../widgets/SquerCard';

const MyDoctorListComponent = props => {
  useEffect(() => {
    props.handleInitDoctorList({locationId: props.employee.locationId});
  }, []);
  return (
    <FlatList
      data={props.doctors}
      renderItem={item => (
        <DoctorRow doctor={item.item} navigation={props.navigation} />
      )}
    />
  );
};

const DoctorRow = props => {
  console.log(props);
  const doctor = props.doctor;
  return (
    <Center py={1}>
      <SquerCard width={'100%'}>
        <VStack>
          <HStack style={{justifyContent: 'flex-start', padding: 10}}>
            <Heading fontSize={'md'}>{doctor.name}</Heading>
          </HStack>
          <HStack
            style={{
              justifyContent: 'flex-end',
              paddingRight: 10,
              paddingBottom: 5,
            }}>
            <Button
              variant={'link'}
              onPress={() =>
                props.navigation.navigate('MappedChemistsForDoctor', {
                  doctorId: doctor.id,
                  doctorName: doctor.name,
                })
              }>
              {props.doctor.beatName}
            </Button>
          </HStack>
        </VStack>
      </SquerCard>
    </Center>
  );
};

const mapState = state => {
  const doctors = doctorChemistListSelector(state);
  const employee = employeeSelector(state);
  return {doctors, employee};
};

const actions = {
  handleInitDoctorList: initDoctorListStartAction,
};

export default connect(mapState, actions)(MyDoctorListComponent);
