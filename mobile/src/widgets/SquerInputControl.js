import React from 'react';
import {Input} from 'native-base';

const SquerInputControl = props => {
  return (
    <Input
      onChangeText={val => props.valueChanged(val)}
      size={props.size || 'md'}
      placeholder={props.placeholder || ''}
      value={props.value || ''}
      type={props.type || 'text'}
    />
  );
};

export default SquerInputControl;
