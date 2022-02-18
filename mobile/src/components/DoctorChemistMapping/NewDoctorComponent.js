import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, VStack} from 'native-base';
import {SquerDropdownPicker} from '../../widgets/SquerFormField';
import {
  initDoctorAddStartAction,
  saveDoctorStartAction,
} from '../../redux/actions/doctorChemist/doctorListAction';
import {
  beatsSelector,
  mappedSpecialitiesSelector,
  savedSelector,
} from '../../redux/selectors/doctorChemistListSelectors';
import {employeeSelector} from '../../selectors/commonSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const NewDoctorComponent = props => {
  useEffect(() => {
    props.handleInitNewDoctor({locationId: props.employee.locationId});
  }, []);
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState({});
  const [speciality, setSpeciality] = useState(null);
  const [beat, setBeat] = useState(null);

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({...errors, name: 'Name is required'});
      return false;
    } else {
      setErrors({...errors, name: null});
    }
    if (beat === undefined || beat === null) {
      setErrors({...errors, beat: 'Patch is required'});
      return false;
    } else {
      setErrors({...errors, beat: null});
    }
    return true;
  };
  return (
    <VStack width="100%" mx="3" bg={'white'} p={5} flex={1}>
      <KeyboardAwareScrollView>
        <FormControl isRequired my={3} isInvalid={'name' in errors}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            variant={'underlined'}
            placeholder="Full Name"
            onChangeText={value => setData({...formData, name: value})}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: 'xs',
            }}>
            {errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired my={3}>
          <FormControl.Label>Speciality</FormControl.Label>
          <SquerDropdownPicker
            zIndex={3000}
            zIndexInverse={1000}
            multiple={false}
            placeholder={'Select Speciality'}
            value={speciality}
            setValue={value => setSpeciality(value)}
            items={props.specialities.map(speciality => {
              return {
                value: speciality.id,
                label: speciality.name,
              };
            })}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: 'xs',
            }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired my={3} isInvalid={'mobileNo' in errors}>
          <FormControl.Label>Mobile No</FormControl.Label>
          <Input
            variant={'underlined'}
            placeholder="Mobile No."
            onChangeText={value => setData({...formData, mobileNo: value})}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: 'xs',
            }}>
            {errors.mobileNo}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired my={3} isInvalid={'beat' in errors}>
          <FormControl.Label>Patch</FormControl.Label>
          <SquerDropdownPicker
            zIndex={3000}
            zIndexInverse={1000}
            multiple={false}
            placeholder={'Select Patch'}
            value={beat}
            setValue={value => setBeat(value)}
            items={props.beats.map(beat => {
              return {
                value: beat.id,
                label: beat.name,
              };
            })}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: 'xs',
            }}>
            {errors.beat}
          </FormControl.ErrorMessage>
        </FormControl>
      </KeyboardAwareScrollView>
      <Button
        onPress={() => {
          if (validate() === false) {
            return;
          }
          props.handleSaveDoctor({
            doctor: {
              addressList: [],
              beat: {
                id: beat,
              },
              contactDetails: [
                {
                  contactDetail: formData.mobileNo,
                  type: {
                    id: 'syslv00000000000000000000000000000003',
                  },
                },
              ],
              isActive: true,
              location: {
                id: props.employee.locationId,
              },
              name: formData.name,
              personCode: '',
              speciality: {
                id: formData.speciality,
              },
              status: {
                id: 'syslv00000000000000000000000000000131',
              },
            },
            certificate: props.certificate,
          });
        }}>
        Save
      </Button>
    </VStack>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  const specialities = mappedSpecialitiesSelector(state);
  const beats = beatsSelector(state);
  const certificate = certificateSelector(state);
  const saved = savedSelector(state);
  return {specialities, beats, employee, certificate, saved};
};

const actions = {
  handleInitNewDoctor: initDoctorAddStartAction,
  handleSaveDoctor: saveDoctorStartAction,
};

export default connect(mapState, actions)(NewDoctorComponent);
