import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {employeeSelector} from '../../selectors/commonSelector';
import {SquerListItem, SquerListSeparator} from '../../widgets/SquerContainer';
import {SquerDropdownPicker} from '../../widgets/SquerFormField';
import {SquerButton} from '../../widgets/SquerButton';
import {saveNonCallStartAction} from '../../redux/actions/callReportingAction';
import {
  callListReportingDateSelector,
  currentReportingNCAListSelector,
} from '../../redux/selectors/callReportingListSelectors';
import {Box, FlatList, Spacer} from 'native-base';
import {callInitNCAListStartAction} from '../../redux/actions/callReporting/callReportingListAction';
import SquerHStack from '../../widgets/SquerContainer/SquerHStack';
import SquerVStack from '../../widgets/SquerContainer/SquerVStack';
import SquerText from '../../widgets/SquerFormField/SquerText';

const NonCallList = props => {
  useEffect(
    () =>
      props.handleInitNonCall({
        reportingDate: props.reportingDate,
        locationId: props.employee.locationId,
      }),
    [props.reportingDate],
  );
  return (
    <FlatList
      extraData={props.nonCallList.length}
      ItemSeparatorComponent={SquerListSeparator}
      keyExtractor={item => item.id}
      data={props.nonCallList}
      renderItem={item => (
        <NonCallRow
          key={item.item.id}
          activity={item.item}
          savePressed={duration =>
            props.handleSaveNonCall({
              activity: {
                ...item.item,
                duration: duration,
              },
            })
          }
        />
      )}
    />
  );
};

const NonCallRow = props => {
  const durations = [
    {value: 0, label: 'Zero'},
    {value: 0.5, label: 'Half'},
    {value: 1, label: 'Full'},
  ];
  const [duration, setDuration] = useState(
    parseFloat(props.activity.ncaDuration),
  );
  return (
    <SquerListItem>
      <SquerHStack>
        <SquerVStack style={styles.nonCallRow}>
          <SquerText style={styles.doctorName}>
            {props.activity.activity.name}
          </SquerText>
          <SquerDropdownPicker
            style={{width: 100}}
            zIndex={3000}
            zIndexInverse={1000}
            multiple={false}
            placeholder={' '}
            value={duration}
            setValue={value => setDuration(value)}
            items={durations}
          />
        </SquerVStack>
        <Spacer />
        <SquerButton
          title={'Save'}
          type={'outline'}
          style={{width: 80, height: 40}}
          onPress={() => props.savePressed(duration)}
        />
      </SquerHStack>
    </SquerListItem>
  );
};

const mapState = state => {
  const employee = employeeSelector(state);
  const reportingDate = callListReportingDateSelector(state);
  const nonCallList = currentReportingNCAListSelector(state);
  return {employee, reportingDate, nonCallList};
};

const actions = {
  handleInitNonCall: callInitNCAListStartAction,
  handleSaveNonCall: saveNonCallStartAction,
};

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
  },
  nonCallRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  doctorName: {
    fontSize: 17,
  },
});

export default connect(mapState, actions)(NonCallList);
