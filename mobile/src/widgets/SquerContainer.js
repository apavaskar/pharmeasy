import React from 'react';
import {KeyboardAvoidingView} from 'native-base';
import {Platform} from 'react-native';
const SquerContainer = props => {
  return (
    <KeyboardAvoidingView
      h={{
        base: '400px',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default SquerContainer;
