import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {SquerFullScreen} from '../../widgets/SquerContainer';
import {SquerDropdownPicker} from '../../widgets/SquerFormField';
import {View} from 'react-native';
import theme from '../../AppTheme';
import {SquerButton} from '../../widgets/SquerButton';
import {loadMastersForMkStartAction} from '../../redux/actions/callReportingAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  brandsForMarketingSelector,
  doctorsForMarketingSelector,
} from '../../selectors/marketingActivitySelector';
import SquerText from '../../widgets/SquerFormField/SquerText';
import {Switch} from "native-base";

const ReportMarketingActivity = props => {
  const [activity, setActivity] = useState('');
  const [inClinic, setInClinic] = useState(false);
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    props.initMasters({locationId: props.employee.locationId});
  }, []);
  return (
    <SquerFullScreen>
      <View style={{flex: 0.9}}>
        <SquerDropdownPicker
          zIndex={4000}
          zIndexInverse={1000}
          placeholder={'Select Activity'}
          value={activity}
          setValue={value => setActivity(value)}
          items={props.allActivities.map(chemist => {
            return {
              value: chemist.id,
              label: chemist.name,
            };
          })}
        />
        <SquerDropdownPicker
          zIndex={3000}
          zIndexInverse={2000}
          placeholder={'Select Brands'}
          value={activity}
          setValue={value => setActivity(value)}
          items={props.allBrands.map(chemist => {
            return {
              value: chemist.id,
              label: chemist.name,
            };
          })}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.3}}>
            <SquerText type={'sub-heading'}>Activity Type</SquerText>
          </View>
          <View
            style={{
              flex: 0.7,
              padding: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <SquerText type={'label'}>In-Clinic</SquerText>
            <Switch
              value={inClinic}
              color={theme.primaryColor}
              onValueChange={val => setInClinic(val)}
            />
            <SquerText label={'label'}>Out-Clinic</SquerText>
          </View>
        </View>
        <SquerDropdownPicker
          zIndex={2000}
          zIndexInverse={3000}
          placeholder={'Select Doctors'}
          value={activity}
          setValue={value => setActivity(value)}
          items={props.allDoctors.map(chemist => {
            return {
              value: chemist.id,
              label: chemist.name,
            };
          })}
        />
        <SquerDropdownPicker
          zIndex={1000}
          zIndexInverse={4000}
          placeholder={'Select Duration'}
          value={duration}
          setValue={value => setDuration(value)}
          items={[
            {
              value: '0.5',
              label: 'Half',
            },
            {
              value: '1.0',
              label: 'Full',
            },
          ]}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <SquerButton
          title={'Save'}
          style={{width: 100}}
          onPress={() =>
            props.navigation.navigate('CallReportingListComponent')
          }
        />
      </View>
    </SquerFullScreen>
  );
};

const mapState = state => {
  const allActivities = [
    {
      id: 'mract00000000000000000000000000000001',
      name: 'SugarSence Camp',
    },
    {
      id: 'mract00000000000000000000000000000002',
      name: 'Advisory',
    },
    {
      id: 'mract00000000000000000000000000000003',
      name: 'Apex Sympsia',
    },
    {
      id: 'mract00000000000000000000000000000004',
      name: 'Doc Mag - Sweet Heart',
    },
  ];
  const allDoctors = doctorsForMarketingSelector(state);
  const allBrands = brandsForMarketingSelector(state);
  const employee = employeeSelector(state);
  return {allActivities, allDoctors, allBrands, employee};
};

const actions = {
  initMasters: loadMastersForMkStartAction,
};

export default connect(mapState, actions)(ReportMarketingActivity);
