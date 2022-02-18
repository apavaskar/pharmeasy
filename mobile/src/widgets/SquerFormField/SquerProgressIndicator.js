import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import theme from '../../AppTheme';
import {View} from 'native-base';

const SquerProgressIndicator = props => {
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.primaryColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.primaryColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.primaryColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: theme.primaryColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.primaryColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: theme.primaryColor,
  };
  return (
    <View py={5}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={props.currentPosition}
        labels={props.labels}
        stepCount={props.labels.length}
        onPress={i => props.onPress(i)}
      />
    </View>
  );
};

export default SquerProgressIndicator;
