import React from 'react';
import {FormControl} from 'native-base';

const SquerFormControl = props => {
  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={props.field in props.errors}>
      <FormControl.Label _text={{bold: true}}>{props.label}</FormControl.Label>
      {props.children}
      <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
        {props.errors[props.field]}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default SquerFormControl;
