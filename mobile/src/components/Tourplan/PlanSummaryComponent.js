import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchPlanSummaryStartAction} from '../../redux/actions/planAction';
import {
  doctorsForDateSelector,
  planDateSelector,
  planSummarySelector,
  refreshSummarySelector,
} from '../../selectors/planSelector';
import {employeeSelector} from '../../selectors/commonSelector';
import SquerText from '../../widgets/SquerFormField/SquerText';
import SquerCard from '../../widgets/SquerCard';

const PlanSummaryComponent = props => {
  useEffect(() => {
    props.handleLoadSummary({
      planDate: props.planDate,
      locationId: props.employee.locationId,
    });
  }, [props.refreshSummary]);
  return (
    <SquerCard title={'Summary'}>
      <View style={styles.summaryRow}>
        <View style={styles.item}>
          <SquerText type={'label'}>Doctors:</SquerText>
          <SquerText type={'data'}>{props.summary.doctors}</SquerText>
        </View>
        <View style={styles.item} />
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.item}>
          <SquerText type={'label'}>NCA:</SquerText>
          <SquerText type={'data'}>{props.summary.nca}</SquerText>
        </View>
        <View style={styles.item}>
          <SquerText type={'label'}>Leaves:</SquerText>
          <SquerText type={'data'}>{props.summary.leaves}</SquerText>
        </View>
      </View>
    </SquerCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 120,
  },
  summaryRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  item: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapState = state => {
  const summary = planSummarySelector(state);
  const activities = doctorsForDateSelector(state);
  const planDate = planDateSelector(state);
  const employee = employeeSelector(state);
  const refreshSummary = refreshSummarySelector(state);
  return {summary, activities, planDate, employee, refreshSummary};
};

const actions = {handleLoadSummary: fetchPlanSummaryStartAction};

export default connect(mapState, actions)(PlanSummaryComponent);
