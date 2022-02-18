import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Alert, FlatList, StyleSheet, TextInput, View} from 'react-native';
import {SquerDivider} from '../../widgets/SquerDivider';
import {SquerDropdownPicker, SquerInput} from '../../widgets/SquerFormField';
import {
  callReportingDateSelector,
  doctorToReportSelector,
  visitDetailsSelector,
  visitIdSelector,
} from '../../redux/selectors/callReportingSelector';
import {SquerButton} from '../../widgets/SquerButton';
import theme from '../../AppTheme';
import {deleteRCPAStartAction} from '../../redux/actions/callReportingAction';
import {SquerCard} from '../../widgets/SquerCard';
import SquerHStack from '../../widgets/SquerContainer/SquerHStack';
import {Modal, Text} from 'native-base';
import SquerText from '../../widgets/SquerFormField/SquerText';
import {
  singleRCPAChangeStartAction,
  singleRCPAInitStartAction,
} from '../../redux/actions/rcpa/rcpaActions';
import {
  rcpaAllBrandsSelector,
  rcpaAllChemistsSelector,
  rcpaHistorySelector,
} from '../../redux/selectors/rcpaSelectors';
import {Icon} from 'react-native-vector-icons/dist';

const SingleRCPAEntryComponent = props => {
  useEffect(
    () =>
      props.handleInitRCPA({
        doctor: props.doctor,
        visitId: props.visitId,
        visitDate: props.visitDate,
      }),
    [props.visitId],
  );

  const [chemist, setChemist] = useState('');
  const [brand, setBrand] = useState('');

  const prevHistory = {};
  const currentHistory = {};
  props.rcpaHistory.prevRCPA.forEach(
    entry => (prevHistory[`${entry.chemistId}${entry.brandId}`] = entry),
  );
  props.rcpaHistory.currentRCPA.forEach(
    entry => (currentHistory[`${entry.chemistId}${entry.brandId}`] = entry),
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 0.85}}>
        <SquerDivider />
        <SquerHStack
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <SquerText type={'sub-heading-light'}>RCPA Entry</SquerText>
          <SquerText type={'label'}>(Rx per month)</SquerText>
        </SquerHStack>
        <SquerDivider />
        {props.visitDetails.visited === 0 && (
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
        )}
        {props.visitDetails.visited === 0 && (
          <View style={{flex: 0.15}}>
            <SquerDropdownPicker
              zIndex={1000}
              zIndexInverse={3000}
              placeholder={'Select Brand'}
              value={brand}
              setValue={value => setBrand(value)}
              disabled={chemist === ''}
              items={props.allBrands
                .filter(brand => brand.ownBrandId === undefined)
                .map(brand => {
                  return {
                    value: brand.id,
                    label: brand.name,
                  };
                })}
            />
          </View>
        )}
        <View style={{flex: 0.7}}>
          <FlatList
            data={props.rcpaHistory.currentRCPA.filter(e => e.action !== 'D')}
            renderItem={item => (
              <RCPACard
                allChemists={props.allChemists}
                item={item}
                brands={props.allBrands}
                prevHistory={prevHistory}
                chemist={{chemist}}
                handleRemoveRCPAEntry={props.handleRemoveRCPAEntry}
              />
            )}
          />
          <SquerDivider />
        </View>
      </View>
      <SquerHStack style={{justifyContent: 'flex-end'}}>
        <SquerButton
          title={'Next'}
          style={{width: 100}}
          onPress={() => {
            if (
              props.rcpaHistory.currentRCPA.filter(e => e.action !== 'D')
                .length === 0
            ) {
              Alert.alert('RCPA Entry', 'You need to enter atleast 1 RCPA');
            } else {
              props.handleNavigation(props.rcpaHistory);
            }
          }}
        />
      </SquerHStack>
      {brand !== '' && (
        <Modal isCentered isOpen={brand !== ''}>
          <RCPARow
            brand={props.allBrands.filter(b => b.id === brand)[0]}
            prevHistory={prevHistory}
            chemist={chemist}
            handleSaveEntry={data => {
              props.handleRCPAValueChanged({
                visitId: props.visitId,
                doctorId: props.doctor.id,
                chemistId: chemist,
                rcpaDate: props.visitDate,
                brandId: brand,
                rxn: data.rxn,
                rxnValue: data.rxnValue,
                compRxn: data.compRxn,
                compRxnValue: data.compRxnValue,
                compBrandQty: data.compBrandQty,
                brandQty: data.brandQty,
              });
              setBrand('');
            }}
          />
        </Modal>
      )}
    </View>
  );
};

const RCPACard = props => {
  const item = props.item.item;
  const brands = props.brands;
  const prev = props.prevHistory[props.chemist + props.item.brandId] || {
    rxnValue: 0,
    compBrandValue: 0,
  };
  return (
    <SquerCard style={{width: '98%', marginBottom: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 25, flex: 0.7, flexWrap: 'wrap'}}>
          <Text style={{fontSize: 17, fontWeight: '500'}}>
            Chemist:
            {props.allChemists.filter(c => c.id === item.chemistId)[0].name}
          </Text>
        </View>
        <View style={{height: 25, flex: 0.3, alignItems: 'flex-end'}}>
          <Icon
            name={'trash-outline'}
            type={'ionicon'}
            onPress={() => props.handleRemoveRCPAEntry({rcpa: item})}
          />
        </View>
      </View>
      <SquerDivider />
      <View
        style={{
          flexDirection: 'row',
          height: 30,
          marginBottom: 8,
        }}>
        <View style={{height: 25, flex: 0.7}}>
          <Text style={{fontSize: 17, fontWeight: '500'}}>
            {brands.filter(b => b.id === item.brandId)[0].name}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 17}}>{`Curr Rxn. ${item.rxns}`}</Text>
        </View>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Prev. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {prev.rxnValue}
          </Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Curr. ${'\u20B9'}:`}</Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
            }}>{`${item.rxnValue}`}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 30,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: '300'}}>{'Competition'}</Text>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Prev. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {prev.compBrandValue}
          </Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Curr. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {item.compBrandValue}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} />
    </SquerCard>
  );
};

const RCPARow = props => {
  const brand = props.brand;
  const [currentRxn, setCurrentRxn] = useState('');
  const [compRxn, setCompRxn] = useState('');
  const [compCurrentValue, setCompCurrentValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const [prevValue, setPrevValue] = useState(
    props.prevHistory[props.chemist + props.brand.id],
  );

  const handleCurrentRxn = val => {
    const value = val * brand.rxUnits * brand.rcpaValue;
    setCurrentValue(value.toFixed(2));
    setCurrentRxn(val);
  };
  const handleCompRxn = val => {
    const value = val * brand.rxUnits * brand.rcpaValue;
    setCompCurrentValue(value.toFixed(2));
    setCompRxn(val);
  };

  return (
    <SquerCard style={{width: '98%'}}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          marginBottom: 4,
        }}>
        <View style={{height: 25, flex: 0.7}}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>{brand.name}</Text>
        </View>
        <View style={{height: 40, flex: 0.3}}>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'Cur. Rxns'}
            style={styles.inputText}
            onChangeText={val => handleCurrentRxn(val)}
          />
        </View>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Prev. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {prevValue === undefined ? '00' : prevValue.rxnValue}
          </Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Curr. ${'\u20B9'}:`}</Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
            }}>{`${currentValue}`}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          marginTop: 20,
        }}>
        <View style={{height: 25, flex: 0.7, paddingLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: '300'}}>{'Competition'}</Text>
        </View>
        <View style={{height: 40, flex: 0.3}}>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'Cur. Rxns'}
            style={styles.inputText}
            onChangeText={val => handleCompRxn(val)}
          />
        </View>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Prev. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {prevValue === undefined ? '00' : prevValue.compBrandValue}
          </Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={{fontSize: 17}}>{`Curr. ${'\u20B9'}:`}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {compCurrentValue}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <SquerButton
          title={'Done'}
          type={'outline'}
          style={{width: 100}}
          onPress={() =>
            props.handleSaveEntry({
              brand: props.brand,
              rxn: currentRxn,
              rxnValue: currentValue,
              compRxn: compRxn,
              compRxnValue: compCurrentValue,
              compBrandQty: brand.rxUnits,
              brandQty: brand.rxUnits,
            })
          }
        />
      </View>
    </SquerCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    fontSize: 17,
    textAlign: 'right',
    color: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputCell: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapState = state => {
  const visitDate = callReportingDateSelector(state);
  const doctor = doctorToReportSelector(state);
  const visitId = visitIdSelector(state);
  const rcpaHistory = rcpaHistorySelector(state);
  const allChemists = rcpaAllChemistsSelector(state);
  const allBrands = rcpaAllBrandsSelector(state);
  const visitDetails = visitDetailsSelector(state);
  return {
    allChemists,
    allBrands,
    visitDate,
    rcpaHistory,
    doctor,
    visitId,
    visitDetails,
  };
};

const actions = {
  handleInitRCPA: singleRCPAInitStartAction,
  handleRCPAValueChanged: singleRCPAChangeStartAction,
  handleRemoveRCPAEntry: deleteRCPAStartAction,
};

export default connect(mapState, actions)(SingleRCPAEntryComponent);
