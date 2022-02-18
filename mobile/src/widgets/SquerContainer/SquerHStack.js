import React from 'react';
import {HStack} from 'native-base';
const SquerHStack = props => {
  return (
    <HStack
      space={props.space || 3}
      mt={2}
      style={props.style}
      justifyContent={props.justifyContent || 'space-between'}>
      {props.children}
    </HStack>
  );
};

export default SquerHStack;
