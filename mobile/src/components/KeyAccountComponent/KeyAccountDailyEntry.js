import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Platform, KeyboardAvoidingView, View, StyleSheet} from 'react-native';
import {SquerDivider} from '../../widgets/SquerDivider';
import {SquerFullScreen} from '../../widgets/SquerContainer';
import SquerDatePicker from '../../widgets/SquerFormField/SquerDatePicker';
import {SquerButton} from '../../widgets/SquerButton';
import {toYyyyMmDd} from '../../utils/dateUtil';
import {
  initHospitalDailyEntryStartAction,
  saveHospitalDailyEntryStartAction,
} from '../../redux/actions/hospitalAction';
import {
  hospitalDailyEntrySelector,
  hospitalDoctorsSelector,
} from '../../selectors/hospitalSelector';
import {SquerDropdownPicker, SquerInput} from '../../widgets/SquerFormField';
import SquerText from '../../widgets/SquerFormField/SquerText';

const KeyAccountDailyEntry = props => {
  const hospital = props.route.params.hospital;
  const [visitDate, setVisitDate] = useState(new Date());
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitEntry({
        hospitalId: hospital.id,
        yyyyMmDd: toYyyyMmDd(visitDate),
      });
    });
  }, [props.navigation, visitDate]);
  useEffect(() => {
    setEmrokIV(props.dailyEntry.iv || '0');
    setEmrokO(props.dailyEntry.oral || '0');
    setBoth(props.dailyEntry.both || '0');
    setDoctor(props.dailyEntry.doctorId);
    setAdhocDoctor(
      props.dailyEntry.doctorName === null ||
        props.dailyEntry.doctorName === undefined
        ? ''
        : props.dailyEntry.doctorName,
    );
  }, [props.dailyEntry]);
  const [emrokIV, setEmrokIV] = useState('0');
  const [emrokO, setEmrokO] = useState('0');
  const [both, setBoth] = useState('0');
  const [adhocDoctor, setAdhocDoctor] = useState('');
  console.log(doctor);
  return (
    <SquerFullScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View>
          <SquerText
            type={'heading'}
            style={{alignSelf: 'center', marginBottom: 8}}>
            {hospital.name}
          </SquerText>
          <SquerDropdownPicker
            zIndex={3000}
            zIndexInverse={1000}
            multiple={false}
            placeholder={'Select Doctor '}
            value={doctor}
            setValue={value => setDoctor(value)}
            items={props.doctors.map(doctor => {
              return {
                value: doctor.doctorId,
                label: doctor.name,
              };
            })}
          />
          <SquerInput
            placeholder={'Unlisted doctor'}
            value={adhocDoctor}
            valueChanged={val => setAdhocDoctor(val)}
          />
          <SquerDivider />
          <SquerDatePicker
            defaultDate={visitDate}
            onConfirm={date => setVisitDate(date)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.8, marginTop: 15}}>
              <SquerText>Emrok IV New Patients</SquerText>
            </View>
            <View style={{flex: 0.2}}>
              <SquerInput
                keyboardType={'numeric'}
                textAlign={'right'}
                value={`${emrokIV}`}
                valueChanged={val => setEmrokIV(val)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.8, marginTop: 15}}>
              <SquerText>Emrok O New Patients</SquerText>
            </View>
            <View style={{flex: 0.2}}>
              <SquerInput
                keyboardType={'numeric'}
                textAlign={'right'}
                value={`${emrokO}`}
                valueChanged={val => setEmrokO(val)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.8, marginTop: 15}}>
              <SquerText>Both New Patients</SquerText>
            </View>
            <View style={{flex: 0.2}}>
              <SquerInput
                keyboardType={'numeric'}
                textAlign={'right'}
                value={`${both}`}
                valueChanged={val => setBoth(val)}
              />
            </View>
          </View>
          <SquerDivider />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <SquerButton
              title={'Save'}
              style={{width: 100}}
              onPress={() => {
                props.handleSaveEntry({
                  entry: {
                    id: props.dailyEntry.id,
                    entryId: props.dailyEntry.entryId,
                    date: visitDate,
                    hospitalId: hospital.id,
                    iv: emrokIV,
                    oral: emrokO,
                    both: both,
                    doctorId: doctor,
                    adhocDoctor: adhocDoctor,
                  },
                });
                props.navigation.navigate('KeyAccountListing');
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SquerFullScreen>
  );
};

const mapState = state => {
  const dailyEntry = hospitalDailyEntrySelector(state);
  const doctors = hospitalDoctorsSelector(state);
  return {dailyEntry, doctors};
};

const actions = {
  handleInitEntry: initHospitalDailyEntryStartAction,
  handleSaveEntry: saveHospitalDailyEntryStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, actions)(KeyAccountDailyEntry);
