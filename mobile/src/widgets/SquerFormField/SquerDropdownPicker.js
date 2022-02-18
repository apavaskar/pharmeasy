import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, StyleSheet} from 'react-native';
import theme from '../../AppTheme';
import SquerText from './SquerText';

const SquerDropdownPicker = props => {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <DropDownPicker
        zIndex={props.zIndex || 10000}
        zIndexInverse={props.zIndexInverse || 1000}
        multiple={props.multiple || false}
        placeholder={props.placeholder || 'Select Item'}
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor: theme.borderColor,
        }}
        min={0}
        max={5}
        open={open}
        value={props.value}
        items={props.items}
        setOpen={setOpen}
        disabled={props.disabled || false}
        setValue={props.setValue}
        listMode={props.listMode || 'MODAL'}
        style={{...styles.container, ...props.style}}
        listItemContainerStyle={styles.itemStyle}
        listItemLabelStyle={styles.itemLabelStyle}
      />
      <SquerText type={'data'}>{props.validation}</SquerText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: 8,
    height: 40,
    width: '99%',
    borderColor: theme.borderColor,
  },
  itemStyle: {
    height: 60,
  },
  itemLabelStyle: {
    fontSize: 17,
  },
});
export default SquerDropdownPicker;
