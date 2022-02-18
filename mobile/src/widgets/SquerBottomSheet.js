import React from 'react';
import {Heading, HStack, Modal, View, VStack} from 'native-base';

const SquerBottomSheet = props => {
  return (
    <Modal
      flex={1}
      isOpen={props.isVisible}
      onClose={() => props.setVisible(false)}
      size={'lg'}>
      <VStack bg={'white'} w={'95%'} h={'75%'}>
        <Heading size={'md'} px={5} flex={0.1} py={10}>
          {props.title}
        </Heading>
        <View flex={0.8} px={5}>
          {props.children}
        </View>
        {props.footer && (
          <HStack flex={0.1} py={10} px={5} direction={'row-reverse'}>
            {props.footer}
          </HStack>
        )}
      </VStack>
    </Modal>
  );
};

export default SquerBottomSheet;
