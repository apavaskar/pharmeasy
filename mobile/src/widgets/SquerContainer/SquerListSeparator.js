import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../AppTheme';

const SquerFlatListSeparator = props => {
  let style = styles.border;
  if (props.style !== undefined) {
    style = {...style, ...props.style};
  }
  return <View style={style} />;
};

const styles = StyleSheet.create({
  border: {
    height: 1.5,
    width: '100%',
    backgroundColor: theme.borderColor,
  },
});
export default SquerFlatListSeparator;
