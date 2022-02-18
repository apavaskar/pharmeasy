import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../../AppTheme';
import {Button} from 'native-base';

const SquerButton = props => {
  const {title, onPress} = props;
  return (
    <Button
      style={props.style || {}}
      onPress={onPress}
      colorScheme={props.color || 'primary'}
      size={props.size || 'md'}
      variant={props.type || 'solid'}>
      {title}
    </Button>
  );
};

export default SquerButton;
