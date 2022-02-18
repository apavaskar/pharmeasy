import theme from '../../AppTheme';
import React from 'react';
import {Fab} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const SquerFAB = props => {
  return (
    <Fab
      icon={<Icon name={props.icon} size={25} color="white" />}
      color={theme.primaryColor}
      position={'absolute'}
      size="sm"
      onPress={() => props.onPress()}
    />
  );
};

export default SquerFAB;
