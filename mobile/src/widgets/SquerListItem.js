import React from 'react';
import {Box} from 'native-base';
import {BORDER_COLOR} from './SquerWidgetConstants';

const SquerListItem = props => {
  return (
    <Box
      borderBottomWidth="1"
      borderColor={'coolGray.200'}
      bg={'#fff'}
      px={2}
      py={3}>
      {props.children}
    </Box>
  );
};

export default SquerListItem;
