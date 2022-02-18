import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SquerButton} from '../../widgets/SquerButton';
import {
  beatsPlannedSelector,
  planDateSelector,
  plannedLocationsSelector,
} from '../../selectors/planSelector';
import {SquerListSeparator} from '../../widgets/SquerContainer';
import {
  initManagerPlanStartAction,
  removeDoctorFromPlanStartAction,
  saveManagerDoctorToLocalStartAction,
} from '../../redux/actions/planAction';
import {employeeSelector} from '../../selectors/commonSelector';
import theme from '../../AppTheme';
import {SquerCheckbox} from '../../widgets/SquerFormField';
import {FlatList} from 'native-base';
import SquerText from '../../widgets/SquerFormField/SquerText';

const ManagerDoctorPlanningComponent = props => {
  const [tms, setTms] = useState([]);
  const [removedTms, setRemovedTms] = useState([]);
  const [oriTms, setOriTms] = useState([]);
  useEffect(() => {
    props.handleInitPlan({
      date: props.date,
    });
  }, [props.refreshSummary]);
  useEffect(() => {
    setTms(props.plannedLocations);
    setOriTms(props.plannedLocations);
  }, [props.plannedLocations.length]);
  const handleTMSelected = item => {
    if (tms.includes(item.item.team.locationId)) {
      const newTms = tms.filter(tm => tm !== item.item.team.locationId);
      setTms(newTms);
      setRemovedTms([...removedTms, item.item.team.locationId]);
    } else {
      if (removedTms.includes(item.item.team.locationId)) {
        const newTms = removedTms.filter(
          tm => tm !== item.item.team.locationId,
        );
        setRemovedTms(newTms);
      }
      setTms([...tms, item.item.team.locationId]);
    }
  };
  return (
    <View style={styles.listView}>
      <FlatList
        ItemSeparatorComponent={SquerListSeparator}
        data={props.beatsPlanned}
        renderItem={item => {
          return doctorRow(
            item,
            item => handleTMSelected(item),
            tms.includes(item.item.team.locationId),
          );
        }}
      />
      <View style={styles.buttonBar}>
        <View style={{flex: 0.7}} />
        <View style={{flex: 0.3}}>
          <SquerButton
            type={'solid'}
            title={'Save'}
            style={styles.actionButtonStyle}
            onPress={() => {
              return props.handleSaveDoctorsToPlan({
                tms: tms.filter(t => !oriTms.includes(t)),
                removedTms: removedTms,
                date: props.date,
                locationId: props.employee.locationId,
                employeeId: props.employee.id,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const doctorRow = (item, onPressed, selected) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.doctorRow}>
        <View style={{flex: 1}}>
          <SquerCheckbox
            enabled={true}
            onPress={() => onPressed(item)}
            selected={selected}
          />
        </View>
        <View style={{flex: 8}}>
          <SquerText type={'label'}>{item.item.team.name}</SquerText>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <SquerText type={'data'}>({item.item.doctorCount})</SquerText>
        </View>
      </View>
      <ScrollView horizontal={true} style={{marginTop: 4, marginBottom: 8}}>
        {item.item.beats.map(b => (
          <View
            style={{
              borderColor: theme.primaryColor,
              borderWidth: 1,
              marginRight: 8,
              padding: 4,
              borderRadius: 8,
            }}>
            <SquerText type={'label'}>{b.name}</SquerText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapState = state => {
  const beatsPlanned = beatsPlannedSelector(state);
  const employee = employeeSelector(state);
  const date = planDateSelector(state);
  const plannedLocations = plannedLocationsSelector(state);
  return {employee, beatsPlanned, date, plannedLocations};
};

const actions = {
  handleInitPlan: initManagerPlanStartAction,
  handleRemoveDoctorAction: removeDoctorFromPlanStartAction,
  handleSaveDoctorsToPlan: saveManagerDoctorToLocalStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarStrip: {
    height: 100,
  },
  summaryComponent: {
    height: 180,
  },
  buttonGroup: {
    height: 50,
    justifyContent: 'center',
  },
  buttonBar: {
    width: '99%',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
  },
  listView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  actionButtonStyle: {
    width: 100,
  },
  doctorRow: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default connect(mapState, actions)(ManagerDoctorPlanningComponent);
