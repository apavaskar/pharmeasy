import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {FlatList, Linking, StyleSheet, View} from 'react-native';
import {SquerBottomSheet} from '../../../widgets/SquerContainer';
import {SquerButton} from '../../../widgets/SquerButton';
import theme from '../../../AppTheme';
import {RadioButton} from 'react-native-paper';
import {loadDigitalTemplatesStartAction} from '../../../redux/actions/digitalCallReportingAction';
import {
  doctorToReportSelector,
  visitIdSelector,
} from '../../../redux/selectors/callReportingSelector';
import Communications from 'react-native-communications';
import {
  allTemplatesSelector,
  digitalCallBrandsSelector,
} from '../../../redux/selectors/digitalCallSelectors';
import {saveDigitalCallStartAction} from '../../../redux/actions/digitalCall/digicalCallActions';
import SquerText from '../../../widgets/SquerFormField/SquerText';

const DigitalTemplateSelectionModal = props => {
  const [checked, setChecked] = useState(null);
  useEffect(() => {
    props.handleLoadTemplate({brandId: props.brandId, type: props.action});
  }, [props.action, props.brandId]);

  const sendMessage = () => {
    const templates = props.allTemplates.filter(
      template => template.id === checked,
    );
    const number = props.doctor.contacts.filter(
      info => info.typeId === 'syslv00000000000000000000000000000003',
    );
    if (number === undefined || number.length === 0) {
      return;
    }
    if (props.action === 'syslv00000000000000000000000000000019') {
      Communications.textWithoutEncoding(
        props.doctor.contacts.filter(
          info => info.typeId === 'syslv00000000000000000000000000000003',
        )[0].contactDetail,
        templates[0].templateText,
      );
    } else if (props.action === 'syslv00000000000000000000000000000020') {
      //Whatsapp
      let url =
        'whatsapp://send?text=' +
        templates[0].templateText +
        '&phone=' +
        props.doctor.contacts.filter(
          info => info.typeId === 'syslv00000000000000000000000000000003',
        )[0].contactDetail;
      Linking.openURL(url)
        .then(data => {
          console.log('WhatsApp Opened successfully ' + data);
        })
        .catch(() => {
          alert('Make sure WhatsApp installed on your device');
        });
    } else if (props.action === 'syslv00000000000000000000000000000022') {
      Communications.phonecall(
        props.doctor.contacts.filter(
          info => info.typeId === 'syslv00000000000000000000000000000003',
        )[0].contactDetail,
        true,
      );
    }
    props.handleSaveDigitalCall({
      visitId: props.visitId,
      duration: 0,
      templateId: templates[0].id,
      visitModeId: props.action,
    });
  };

  return (
    <SquerBottomSheet
      isVisible={props.isVisible}
      title={'Select Template'}
      setVisible={() => props.setVisible()}>
      <View style={{flex: 8}}>
        <FlatList
          keyExtractor={item => item.id}
          data={props.allTemplates}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.borderColor,
                  margin: 4,
                  padding: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SquerText type={'data'}>{item.templateText}</SquerText>
                <View
                  style={{
                    borderColor: theme.borderColor,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RadioButton
                    color={theme.primaryColor}
                    value={item.id}
                    status={checked === item.id ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(item.id)}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.bottom}>
        <SquerButton
          title={'Send'}
          style={{width: 100}}
          onPress={() => {
            //shareMessage().then();
            sendMessage();
          }}
        />
      </View>
    </SquerBottomSheet>
  );
};

const mapState = state => {
  const allTemplates = allTemplatesSelector(state);
  const doctor = doctorToReportSelector(state);
  const brands = digitalCallBrandsSelector(state);
  const visitId = visitIdSelector(state);
  return {allTemplates, doctor, brands, visitId};
};

const actions = {
  handleLoadTemplate: loadDigitalTemplatesStartAction,
  handleSaveDigitalCall: saveDigitalCallStartAction,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 8,
    height: 50,
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
    marginRight: 8,
    marginLeft: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default connect(mapState, actions)(DigitalTemplateSelectionModal);
