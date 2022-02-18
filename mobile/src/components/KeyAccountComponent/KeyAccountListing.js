import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SquerFullScreen,
  SquerListSeparator,
} from '../../widgets/SquerContainer';
import {FlatList, TouchableHighlight} from 'react-native';
import {initHospitalListStartAction} from '../../redux/actions/hospitalAction';
import {hospitalsSelector} from '../../selectors/hospitalSelector';
import {employeeSelector} from '../../selectors/commonSelector';
import {SquerButton} from '../../widgets/SquerButton';
import SquerHStack from '../../widgets/SquerContainer/SquerHStack';
import {toDd} from '../../utils/dateUtil';

const KeyAccountListing = props => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitiHospitalList({
        locationId: props.employee.locationId,
      });
    });
  }, [props.navigation]);

  return (
    <SquerFullScreen>
      <FlatList
        ItemSeparatorComponent={SquerListSeparator}
        data={props.hospitals}
        renderItem={item => (
          <HospitalRow hospital={item.item} navigation={props.navigation} />
        )}
      />
    </SquerFullScreen>
  );
};

const HospitalRow = ({hospital, navigation}) => {
  return <View />;
};

const mapState = state => {
  const hospitals = hospitalsSelector(state);
  const employee = employeeSelector(state);
  return {hospitals, employee};
};

const actions = {
  handleInitiHospitalList: initHospitalListStartAction,
};

export default connect(mapState, actions)(KeyAccountListing);
