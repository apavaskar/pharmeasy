import React from 'react';
import {Input} from 'native-base';

const SquerInput = ({
  label,
  placeholder,
  secureText,
  valueChanged,
  value,
  style,
  disabled = false,
  keyboardType = 'default',
  errorMessage = '',
}) => {
  const isSecure = secureText || false;
  return (
    <Input
      isDisabled={disabled}
      value={value}
      size="md"
      placeholder={placeholder}
      onChangeText={value => valueChanged(value)}
      type={isSecure ? 'password' : 'text'}
    />
  );
};

export default SquerInput;
