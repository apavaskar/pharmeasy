import React from 'react';
import {Text} from 'native-base';

const SquerText = props => {
  let size = 'xs';
  let fontWeight = 'normal';
  switch (props.type) {
    case 'label':
      size = 'sm';
      fontWeight = 'normal';
      break;
    case 'data':
    case 'row':
      size = 'md';
      fontWeight = 'normal';
      break;
    case 'sub-heading':
      size = 'lg';
      fontWeight = 'bold';
      break;
    case 'sub-heading-light':
      size = 'lg';
      fontWeight = 'normal';
      break;
    default:
      size = 'lg';
  }
  return (
    <Text fontSize={size} fontWeight={fontWeight}>
      {props.children}
    </Text>
  );
};

export default SquerText;
