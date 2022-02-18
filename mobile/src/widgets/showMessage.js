import React from 'react';
import {Box, Toast} from 'native-base';

export const showSuccessMessage = ({message}) => {
  Toast.show({
    render: () => (
      <Box bg="emerald.600" px="2" py="1" rounded="sm" mb={5}>
        {message}
      </Box>
    ),
    placement: 'bottom',
    title: 'Success',
    duration: 2000,
  });
};

export const showErrorMessage = ({message}) => {
  Toast.show({
    render: () => (
      <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
        {message}
      </Box>
    ),
    placement: 'top',
    title: 'Error',
    duration: 2000,
  });
};
