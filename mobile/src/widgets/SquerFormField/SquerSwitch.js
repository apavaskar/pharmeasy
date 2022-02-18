import React from 'react';
import theme from '../../AppTheme';
import {StyleSheet, View} from 'react-native';
import SquerText from './SquerText';
import {Switch} from 'native-base';

const SquerSwitch = props => {
  return (
    <View style={styles.visitTypeRow}>
      <SquerText type={'label'}>{props.label}</SquerText>
      <Switch
        value={props.value}
        color={theme.primaryColor}
        onValueChange={value => props.onValueChange(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  visitTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SquerSwitch;
