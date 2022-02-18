import React from 'react';
import {Box, Heading, Spacer, View} from 'native-base';

const SquerCard = props => {
  return (
    <Box
      width={props.width || 500}
      maxW="98%"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}>
      {props.title && (
        <Heading fontSize={'md'} p={3}>
          {props.title}
        </Heading>
      )}
      <View p={3}>{props.children}</View>
    </Box>
  );
};

export default SquerCard;
