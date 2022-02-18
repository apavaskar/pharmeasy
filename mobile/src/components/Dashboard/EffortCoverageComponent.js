import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {coverageReportStartAction} from '../../redux/actions/dashboard/effortReportAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {toYyyyMm} from '../../utils/dateUtil';
import {HStack, Spinner, Text, VStack} from 'native-base';
import {effortReportSelector} from '../../redux/selectors/effortReportSelector';
import SquerCard from '../../widgets/SquerCard';

const EffortCoverageComponent = props => {
  useEffect(() => {
    props.handleLoadSummary({
      locationId: props.employee.locationId,
      yearMonth: toYyyyMm(new Date()),
      designation: props.employee.empDesignation,
      certificate: props.certificate,
    });
  }, [props.reload]);

  if (props.effortReport.loadingEffort === true) {
    return (
      <SquerCard title={'Coverage %'}>
        <HStack space={2} style={{justifyContent: 'center', padding: 10}}>
          <Spinner accessibilityLabel="Loading posts" />
        </HStack>
      </SquerCard>
    );
  }

  return (
    <VStack>
      <HStack style={{justifyContent: 'space-between', padding: 5}}>
        <Text fontSize={'md'}>Super Core</Text>
        <Text fontSize={'md'}>
          {props.effortReport.coverageData.superCoreCoverage}
        </Text>
      </HStack>
      <HStack style={{justifyContent: 'space-between', padding: 5}}>
        <Text fontSize={'md'}>Core</Text>
        <Text fontSize={'md'}>
          {props.effortReport.coverageData.coreCoverage}
        </Text>
      </HStack>
      <HStack style={{justifyContent: 'space-between', padding: 5}}>
        <Text fontSize={'md'}>Overall</Text>
        <Text fontSize={'md'}>
          {props.effortReport.coverageData.totalCoverage}
        </Text>
      </HStack>
    </VStack>
  );
};

const mapState = state => {
  const certificate = certificateSelector(state);
  const employee = employeeSelector(state);
  const effortReport = effortReportSelector(state);
  return {employee, certificate, effortReport};
};

const actions = {
  handleLoadSummary: coverageReportStartAction,
};

export default connect(mapState, actions)(EffortCoverageComponent);
