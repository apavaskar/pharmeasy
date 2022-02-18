import React from 'react';
import {FormControl, Box, WarningOutlineIcon} from 'native-base';

const SquerFormControl = props => {
  const invalid = props.errorMessage !== undefined ? true : false;
  return (
    <Box w={props.width || '100%'} py={2}>
      <FormControl isInvalid={invalid}>
        {props.label && <FormControl.Label>{props.label}</FormControl.Label>}
        {props.children}
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default SquerFormControl;
