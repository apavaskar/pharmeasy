import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {SquerDivider} from '../../widgets/SquerDivider';
import SquerListSeparator from '../../widgets/SquerContainer/SquerListSeparator';
import {SquerButton} from '../../widgets/SquerButton';
import {SquerBottomSheet} from '../../widgets/SquerContainer';
import {toDisplayDateFromYyyyMmDd} from '../../utils/dateUtil';
import {SquerCard} from '../../widgets/SquerCard';
import SquerText from '../../widgets/SquerFormField/SquerText';
import SquerHStack from '../../widgets/SquerContainer/SquerHStack';
import {
  distributeInputStartAction,
  inputInventoryStartAction,
} from '../../redux/actions/inputDetailing/inputDetailingAction';
import {
  inputDistributedSelector,
  inputInventorySelector,
} from '../../redux/selectors/inputDetailingSelectors';
import {FlatList, HStack} from 'native-base';
import {
  visitDetailsSelector,
  visitIdSelector,
} from '../../redux/selectors/callReportingSelector';
import {Icon} from 'react-native-vector-icons/dist';
import {SquerInput} from '../../widgets/SquerFormField';

const InputEntryComponent = props => {
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [showInputsModal, setShowInputModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (showInputsModal) {
      props.handleInitInputInventoryList({
        visitId: props.visitId,
        inputDistributed: props.inputDistributed,
      });
    }
  }, [showInputsModal]);

  return (
    <View style={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <SquerDivider />
        <SquerText type={'sub-heading-title'}>Add Inputs Given</SquerText>
        <SquerDivider />
        <FlatList
          extraData={refresh}
          keyExtractor={(key, index) => key.id}
          ItemSeparatorComponent={SquerListSeparator}
          data={props.inputDistributed}
          renderItem={({item, index, separators}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: '98%',
                  height: 40,
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.7}}>
                  <SquerText type={'label'}>{item.name}</SquerText>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                  <SquerText type={'label'}>Dist. {item.distributed}</SquerText>
                </View>
              </View>
            );
          }}
        />
        <SquerDivider />
      </View>
      <HStack
        style={{justifyContent: 'space-between'}}
        height={60}
        paddingBottom={5}>
        {props.visitDetails.visited === 0 && (
          <SquerButton
            title={'Add Inputs'}
            type={'outline'}
            style={{width: 150}}
            onPress={() => setShowInputModal(true)}
          />
        )}
        {props.visitDetails.visited === 1 && <View />}
        <SquerButton
          title={'Next'}
          onPress={() => props.handleNavigation({stepNumber: 3})}
          style={{width: 100}}
        />
      </HStack>
      {showInputsModal && (
        <InputSelectionModal
          inputs={props.inventoryList}
          isVisible={showInputsModal}
          setVisible={() => setShowInputModal(false)}
          distributeItem={input => props.handleInputDistribution(input)}
        />
      )}
    </View>
  );
};

const InputSelectionModal = props => {
  return (
    <SquerBottomSheet
      isVisible={props.isVisible}
      title={'Select Inputs'}
      setVisible={() => props.setVisible()}>
      <FlatList
        data={props.inputs}
        renderItem={item => (
          <InputItemRow item={item} distributeItem={props.distributeItem} />
        )}
      />
    </SquerBottomSheet>
  );
};

const InputItemRow = props => {
  const item = props.item;
  const [qty, setQty] = useState(`${item.item.distributed}`);
  return (
    <SquerCard style={{width: '98%', marginBottom: 12}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '70%', flexDirection: 'column', padding: 10}}>
          <View style={{flexDirection: 'row', padding: 8}}>
            <Icon
              type={'ionicon'}
              name={
                item.item.originalDistributed !== item.item.distributed
                  ? 'ios-checkmark-done-sharp'
                  : 'square-outline'
              }
              size={24}
              color={'green'}
            />
            <SquerText type={'label'}>{item.item.name}</SquerText>
          </View>
          <SquerText type={'label'}>
            Expires on: {toDisplayDateFromYyyyMmDd(item.item.expiryDate)}
          </SquerText>
          <SquerText type={'label'}>Balance:{item.item.balance}</SquerText>
        </View>
        <View
          style={{
            width: '30%',
            flexDirection: 'column',
            padding: 10,
            justifyContent: 'flex-start',
          }}>
          <SquerInput
            placeholder={'Qty'}
            value={qty}
            onChangeText={val => setQty(val)}
            keyboardType={'numeric'}
          />
          <SquerButton
            title={'Give'}
            type={'outline'}
            style={{width: 80, height: 40}}
            onPress={() => {
              if (qty !== '' && qty <= item.item.balance) {
                props.distributeItem({input: item.item, qty: qty});
              }
            }}
          />
        </View>
      </View>
    </SquerCard>
  );
};

const mapState = state => {
  const visitId = visitIdSelector(state);
  const inventoryList = inputInventorySelector(state);
  const inputDistributed = inputDistributedSelector(state);
  const visitDetails = visitDetailsSelector(state);
  return {inventoryList, inputDistributed, visitId, visitDetails};
};

const actions = {
  handleInitInputInventoryList: inputInventoryStartAction,
  handleInputDistribution: distributeInputStartAction,
};

export default connect(mapState, actions)(InputEntryComponent);
