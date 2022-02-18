import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SquerButton} from '../../widgets/SquerButton';
import {FlatList, View} from 'react-native';
import {SquerDropdownPicker, SquerInput} from '../../widgets/SquerFormField';
import theme from '../../AppTheme';
import SquerFlatListSeparator from '../../widgets/SquerContainer/SquerListSeparator';
import {SquerDivider} from '../../widgets/SquerDivider';
import {rcpaValueChangeStartAction} from '../../redux/actions/callReportingAction';
import {rcpaConfigSelector} from '../../selectors/configSelector';
import {
  allBrandsSelector,
  allChemistSelector,
  doctorToReportSelector,
  rcpaHistorySelector,
  reportingDateSelector,
  visitIdSelector,
} from '../../redux/selectors/callReportingSelector';
import SquerText from '../../widgets/SquerFormField/SquerText';

const RCPAEntryComponent = props => {
  const [chemist, setChemist] = useState('');
  const prevHistory = {};
  const currentHistory = {};
  props.rcpaHistory.prevRCPA.forEach(
    entry => (prevHistory[`${entry.chemistId}${entry.brandId}`] = entry),
  );
  props.rcpaHistory.currentRCPA.forEach(
    entry => (currentHistory[`${entry.chemistId}${entry.brandId}`] = entry),
  );
  return (
    <View style={{flexGrow: 1}}>
      <SquerDivider />
      <SquerText type={'sub-heading'}>RCPA Entry</SquerText>
      <SquerDivider />
      <View style={{flex: 0.15}}>
        <SquerDropdownPicker
          zIndex={3000}
          zIndexInverse={1000}
          placeholder={'Select Chemist'}
          value={chemist}
          setValue={value => setChemist(value)}
          items={props.allChemists.map(chemist => {
            return {
              value: chemist.id,
              label: chemist.name,
            };
          })}
        />
      </View>
      <View style={{flex: 0.7}}>
        <FlatList
          ItemSeparatorComponent={SquerFlatListSeparator}
          data={props.allBrands}
          renderItem={({item}) => {
            const color =
              item.ownBrandId === undefined ? theme.borderColor : 'white';
            const key = chemist + item.id;
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: color,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 0.5}}>
                  <SquerText type={'label'}>{item.name}</SquerText>
                </View>
                <View style={{flex: 0.25}}>
                  <SquerText
                    type={'data'}
                    style={{textAlign: 'right', fontSize: 17}}>
                    {prevHistory[key] === undefined
                      ? '0'
                      : prevHistory[key].rxnValue}
                  </SquerText>
                </View>
                <View style={{flex: 0.25, flexDirection: 'column'}}>
                  <SquerInput
                    keyboardType="numeric"
                    disabled={chemist === ''}
                    style={{textAlign: 'right'}}
                    value={
                      currentHistory[key] === undefined
                        ? ''
                        : `${currentHistory[key].rxns}`
                    }
                    valueChanged={value =>
                      props.handleRCPAValueChanged({
                        history: props.rcpaHistory,
                        visitId: props.visitId,
                        doctor: props.doctor,
                        visitDate: props.visitDate,
                        chemist: chemist,
                        brand: item,
                        qty: value,
                        isCompetition: item.ownBrandId !== undefined,
                        rcpaConfig: props.rcpaConfig,
                      })
                    }
                  />
                  <SquerText
                    style={{
                      textAlign: 'center',
                      paddingBottom: 8,
                      fontSize: 17,
                    }}>
                    {currentHistory[key] === undefined
                      ? ''
                      : currentHistory[key].rxnValue}
                  </SquerText>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 0.15,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <SquerButton
          title={'Next'}
          style={{width: 100}}
          onPress={() => props.handleNavigation()}
        />
      </View>
    </View>
  );
};

const mapState = state => {
  const allChemists = allChemistSelector(state);
  const allBrands = allBrandsSelector(state);
  const visitDate = reportingDateSelector(state);
  const rcpaHistory = rcpaHistorySelector(state);
  const doctor = doctorToReportSelector(state);
  const visitId = visitIdSelector(state);
  const rcpaConfig = rcpaConfigSelector(state);
  return {
    allChemists,
    allBrands,
    visitDate,
    rcpaHistory,
    doctor,
    visitId,
    rcpaConfig,
  };
};

const actions = {
  handleRCPAValueChanged: rcpaValueChangeStartAction,
};

export default connect(mapState, actions)(RCPAEntryComponent);
