import React from 'react';
import SquerVStack from './SquerVStack';
import {VStack} from 'native-base';

const SquerFullScreen = props => {
  return (
    <VStack style={{flex: 1}} bg={'#fff'} space={'xs'} justifyContent={'center'} width={'100%'} px={2}>
      {props.children}
    </VStack>
  );
};

export default SquerFullScreen;
