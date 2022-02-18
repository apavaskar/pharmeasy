import React from 'react';
import {VStack} from 'native-base';
const SquerVStack = props => {
  return (
    <VStack space={props.space || 3} mt={2} py={props.py || 0}>
      {props.children}
    </VStack>
  );
};

export default SquerVStack;
