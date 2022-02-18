import React from 'react';
import {Box} from 'native-base';

const SquerListItem = props => {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2">
      {props.children}
    </Box>
  );
};

export default SquerListItem;
