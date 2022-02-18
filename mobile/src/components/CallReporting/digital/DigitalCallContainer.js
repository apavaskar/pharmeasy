import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {SquerButton, SquerButtonGroup} from '../../../widgets/SquerButton';
import SquerFlatListSeparator from '../../../widgets/SquerContainer/SquerListSeparator';
import {RadioButton} from 'react-native-paper';
import theme from '../../../AppTheme';
import {SquerDivider} from '../../../widgets/SquerDivider';
import {doctorToReportSelector} from '../../../redux/selectors/callReportingSelector';
import DigitalTemplateSelectionModal from './DigitalTemplateSelectionModal';
import Communications from 'react-native-communications';
import {employeeSelector} from '../../../selectors/commonSelector';
import {initDigitalCallStartAction} from '../../../redux/actions/digitalCall/digicalCallActions';
import {digitalCallBrandsSelector} from '../../../redux/selectors/digitalCallSelectors';
import {FlatList, Modal} from 'native-base';
import SquerText from '../../../widgets/SquerFormField/SquerText';

const DigitalCallContainer = props => {
  const actions = [
    'syslv00000000000000000000000000000019',
    'syslv00000000000000000000000000000020',
    'syslv00000000000000000000000000000022',
    'syslv00000000000000000000000000000023',
    'syslv00000000000000000000000000000021',
  ];
  const [checked, setChecked] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showVCOverlay, setShowVCOverlay] = useState(false);
  const [vcInviteSent, setVCInviteSent] = useState(false);

  const [action, setAction] = useState('');
  let digitalType = {};

  useEffect(() => props.handleInitDigitalCall({}), [props.visitId]);

  const showTemplateSelection = (brandId, action) => {
    const type = actions[action];
    if (type === 'syslv00000000000000000000000000000023') {
      setAction(type);
      setShowVCOverlay(true);
    } else {
      setAction(type);
      setShowTemplateSelector(true);
    }
  };

  const sendVCInvite = () => {
    Communications.textWithoutEncoding(
      /*props.doctor.contacts.filter(
        info => info.typeId === 'syslv00000000000000000000000000000003',
      )[0].contactDetail */
      '9930614995',
      `Dear Doctor, Lets have a call on https://meet-ionos.seahagen.in/${props.doctor.id}-${props.employee.id}`,
    );
    setVCInviteSent(true);
  };
  return (
    <View style={{flexGrow: 1}}>
      <View style={{flex: 0.8}}>
        <SquerDivider />
        <SquerText type={'sub-heading'}>Brands to Detail</SquerText>
        <SquerDivider />
        <FlatList
          ItemSeparatorComponent={SquerFlatListSeparator}
          data={props.allBrands.filter(brand => brand.ownBrandId === undefined)}
          renderItem={item => (
            <View style={styles.brandRow}>
              <SquerText type={'label'}>{item.item.name}</SquerText>
              <View
                style={{
                  borderColor: theme.borderColor,
                  borderRadius: 16,
                  borderWidth: 1,
                  height: 32,
                  width: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <RadioButton
                  color={theme.primaryColor}
                  value={item.item.id}
                  status={checked === item.item.id ? 'checked' : 'unchecked'}
                  onPress={() => {
                    return setChecked(item.item.id);
                  }}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          width: '98%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SquerButtonGroup
          selectedIndex={-1}
          buttons={[
            <ActionButton
              digitalType={digitalType}
              id="syslv00000000000000000000000000000019"
              text={'SMS'}
            />,
            <ActionButton
              digitalType={digitalType}
              id="syslv00000000000000000000000000000020"
              text={'Whatsapp'}
            />,
            <ActionButton
              digitalType={digitalType}
              id="syslv00000000000000000000000000000022"
              text={'Call'}
            />,
          ]}
          setSelectedIndex={i => showTemplateSelection(checked, i)}
        />
      </View>
      {showTemplateSelector && (
        <DigitalTemplateSelectionModal
          isVisible={showTemplateSelector}
          brandId={checked}
          action={action}
          setVisible={val => setShowTemplateSelector(val)}
        />
      )}
      {showVCOverlay && (
        <Modal
          isCentered
          isOpen={showVCOverlay}
          onBackdropPress={() => setShowVCOverlay(!showVCOverlay)}>
          <View>
            <SquerButton
              type={'outline'}
              title={'Send Invite'}
              onPress={() => sendVCInvite()}
            />
            <SquerButton
              title={'Start Call'}
              onPress={() => {
                setShowVCOverlay(false);
                setVCInviteSent(false);
                props.navigation.navigate('VideoCallComponent');
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const ActionButton = props => {
  return (
    <SquerText
      style={{
        color:
          props.digitalType[props.id] !== undefined
            ? theme.primaryColor
            : 'black',
      }}>
      {props.text}
    </SquerText>
  );
};

const mapState = state => {
  const allBrands = digitalCallBrandsSelector(state);
  const doctor = doctorToReportSelector(state);
  const employee = employeeSelector(state);
  return {allBrands, doctor, employee};
};

const actions = {
  handleInitDigitalCall: initDigitalCallStartAction,
};
const styles = StyleSheet.create({
  brandTitle: {
    fontSize: 18,
  },
  brandRow: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default connect(mapState, actions)(DigitalCallContainer);
