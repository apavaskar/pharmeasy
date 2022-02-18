import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {SquerFullScreen} from '../../widgets/SquerContainer';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {SquerCard, SquerCardDivider} from '../../widgets/SquerCard';
import {SquerDivider} from '../../widgets/SquerDivider';
import {SquerButton} from '../../widgets/SquerButton';
import {
  deleteHospitalEntryStartAction,
  initHospitalEntryStartAction,
  saveHospitalEntryStartAction,
} from '../../redux/actions/hospitalAction';
import {
  toDisplayDateFromYyyyMmDd,
  toYyyyMm,
  toYyyyMmDd,
} from '../../utils/dateUtil';
import SquerDatePicker from '../../widgets/SquerFormField/SquerDatePicker';
import {hospitalEntriesSelector} from '../../selectors/hospitalSelector';
import SquerText from '../../widgets/SquerFormField/SquerText';
import {SquerInput} from '../../widgets/SquerFormField';

const KeyAccountEntryComponent = props => {
  const hospital = props.route.params.hospital;

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitEntry({
        hospitalId: hospital.id,
        yyyyMm: toYyyyMm(Date()),
      });
    });
  }, [props.navigation]);

  const [visitActualICU, setVisitActualICU] = useState(0);
  const [visitActual, setVisitActual] = useState(0);
  const [patientOnInj, setPatientOnInj] = useState(0);
  const [visitDate, setVisitDate] = useState(new Date());

  return (
    <SquerFullScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View>
          <SquerText type={'sub-heading'}>{hospital.name}</SquerText>
          <SquerDivider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <View
              style={{
                width: '45%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SquerText type={'label'}># of ICU beds</SquerText>
              <SquerText type={'data'}>{hospital.icuBedCount}</SquerText>
            </View>
            <View
              style={{
                width: '45%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SquerText type={'label'}>
                Max. Capacity of ICU patients
              </SquerText>
              <SquerText type={'data'}>{hospital.maxCapacity}</SquerText>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <SquerText type={'label'}>
              Emrok Tgt patients for the month
            </SquerText>
            <SquerText type={'data'}>{hospital.targetPatients}</SquerText>
          </View>
          <SquerDivider />
        </View>
        <FlatList
          data={props.entries}
          renderItem={item => (
            <SquerCard style={{marginBottom: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SquerText type={'data'}>
                  Date: {toDisplayDateFromYyyyMmDd(item.item.visitDate)}
                </SquerText>
                <SquerButton
                  type={'clear'}
                  title={'Delete'}
                  style={{width: 100}}
                  onPress={() => {
                    props.handleRemoveEntry({
                      id: item.item.id,
                      hospitalId: item.item.hospitalId,
                      yyyyMm: (item.item.visitDate + '').substring(0, 6),
                    });
                  }}
                />
              </View>
              <SquerDivider />
              <View
                style={{
                  paddingBottom: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SquerText type={'label'}>
                  Act. No. Of Patients admitted in ICU:
                </SquerText>
                <SquerText type={'label'}>{item.item.patientsICU}</SquerText>
              </View>
              <View
                style={{
                  paddingBottom: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SquerText type={'label'}>
                  Act. No. Of Patients on Emrok:
                </SquerText>
                <SquerText type={'data'}>{item.item.patients}</SquerText>
              </View>
              <View
                style={{
                  paddingBottom: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SquerText type={'label'}>
                  Act. No. Of Patients on Teicoplanin 400:
                </SquerText>
                <SquerText type={'data'}>{item.item.patientOnInj}</SquerText>
              </View>
            </SquerCard>
          )}
        />
        {props.entries.length < 2 && (
          <View>
            <SquerCard style={{marginBottom: 20}}>
              <SquerDatePicker
                defaultDate={visitDate}
                onConfirm={date => setVisitDate(date)}
              />
              <SquerCardDivider />
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%', justifyContent: 'center'}}>
                  <SquerText type={'label'}>
                    Act. No. of Patients in ICU
                  </SquerText>
                </View>
                <View style={{width: '30%', justifyContent: 'center'}}>
                  <SquerInput
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    value={`${visitActualICU}`}
                    onChangeText={val => setVisitActualICU(val)}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%', justifyContent: 'center'}}>
                  <SquerText type={'label'}>
                    Act. No. of Patients Admitted on Emrok
                  </SquerText>
                </View>
                <View style={{width: '30%', justifyContent: 'center'}}>
                  <SquerInput
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    value={`${visitActual}`}
                    onChangeText={val => setVisitActual(val)}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%', justifyContent: 'center'}}>
                  <SquerText type={'label'}>
                    Act. No. of Patients on Teicoplanin 400:
                  </SquerText>
                </View>
                <View style={{width: '30%', justifyContent: 'center'}}>
                  <SquerInput
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    value={`${patientOnInj}`}
                    onChangeText={val => setPatientOnInj(val)}
                  />
                </View>
              </View>
            </SquerCard>
            <SquerDivider />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <SquerButton
                title={'Save'}
                style={{width: 100}}
                onPress={() => {
                  props.handleSaveEntry({
                    entry: {
                      hospitalId: hospital.id,
                      entryId: null,
                      YYYYMM: toYyyyMm(visitDate),
                      visitDateEntered: toYyyyMmDd(visitDate),
                      patientsICU: visitActualICU,
                      patients: visitActual,
                      patientOnInj: patientOnInj,
                    },
                  });
                  props.navigation.navigate('KeyAccountListing');
                }}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SquerFullScreen>
  );
};

const mapState = state => {
  const entries = hospitalEntriesSelector(state);
  return {entries};
};

const actions = {
  handleInitEntry: initHospitalEntryStartAction,
  handleSaveEntry: saveHospitalEntryStartAction,
  handleRemoveEntry: deleteHospitalEntryStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default connect(mapState, actions)(KeyAccountEntryComponent);
