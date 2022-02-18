import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import SquerDatePicker from '../../widgets/SquerFormField/SquerDatePicker';
import {SquerDivider} from '../../widgets/SquerDivider';
import {SquerDropdownPicker, SquerInput} from '../../widgets/SquerFormField';
import {SquerButton} from '../../widgets/SquerButton';
import {
  applyLeaveStartAction,
  initLeaveStartAction,
} from '../../redux/actions/leaveAction';
import {leaveTypesSelector} from '../../selectors/leaveSelector';
import {toYyyyMmDd} from '../../utils/dateUtil';
import {employeeSelector} from '../../selectors/commonSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {SquerFullScreen} from '../../widgets/SquerContainer';
import SquerText from '../../widgets/SquerFormField/SquerText';

const LeaveComponent = props => {
  useEffect(() => {
    props.handleInitLeave();
  }, [props.fromDate]);
  const [fromDate, setFromDate] = useState(props.fromDate);
  const [reason, setReason] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState('');
  const [validation, setValidation] = useState({
    fromDate: '',
    toDate: '',
    leaveType: '',
    reason: '',
  });

  const submitForm = () => {
    if (fromDate > toDate) {
      setValidation({
        ...validation,
        fromDate: 'From date cannot be greater than ToDate',
      });
    } else {
      setValidation({
        ...validation,
        fromDate: '',
      });
    }
    if (leaveType === '') {
      setValidation({
        ...validation,
        leaveType: 'Select a Leave type',
      });
    } else {
      setValidation({
        ...validation,
        leaveType: '',
      });
    }
    props.handleApplyLeave({
      leave: {
        actualLeaveDays: 0,
        employeeId: {
          id: props.employee.id,
        },
        fromDate: toYyyyMmDd(fromDate),
        toDate: toYyyyMmDd(toDate),
        leaveType: {
          id: leaveType,
        },
        reason: reason,
      },
      certificate: props.certificate,
    });
  };

  return (
    <SquerFullScreen>
      <SquerDivider />
      <SquerText type={'sub-heading'}>Apply Leave</SquerText>
      <SquerDivider />
      <View style={{flex: 0.8}}>
        <SquerDatePicker
          defaultDate={new Date()}
          onConfirm={date => setFromDate(date)}
          placeholder={'From'}
          validation={validation.fromDate}
        />
        <SquerDatePicker
          defaultDate={new Date()}
          onConfirm={date => setToDate(date)}
          placeholder={'To'}
          validation={validation.toDate}
        />
        <SquerDropdownPicker
          zIndex={3000}
          zIndexInverse={1000}
          multiple={false}
          placeholder={'Leave Type'}
          value={leaveType}
          setValue={value => setLeaveType(value)}
          items={props.leaveTypes.map(type => {
            return {
              value: type.id,
              label: type.name,
            };
          })}
          validation={validation.leaveType}
        />
        <SquerInput
          placeholder={'Reason'}
          valueChanged={setReason}
          value={reason}
          errorStyle={{color: 'red'}}
          errorMessage={validation.reason}
        />
      </View>
      <View style={{alignItems: 'flex-end', flex: 0.2}}>
        <SquerButton
          title={'Submit'}
          style={{width: 100}}
          onPress={() => submitForm()}
        />
      </View>
    </SquerFullScreen>
  );
};

const mapState = state => {
  const leaveTypes = leaveTypesSelector(state);
  const employee = employeeSelector(state);
  const certificate = certificateSelector(state);
  return {leaveTypes, employee, certificate};
};

const actions = {
  handleInitLeave: initLeaveStartAction,
  handleApplyLeave: applyLeaveStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, actions)(LeaveComponent);
