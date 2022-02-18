import {StyleSheet} from 'react-native';
import theme from '../../AppTheme';

export const commonStyles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 30, backgroundColor: '#088CBC', flexDirection: 'row'},
  textHeader: {margin: 6, color: '#fff', fontSize: 13},
  textData: {margin: 6, color: '#000', fontSize: 13, fontWeight: '300'},
  row: {flexDirection: 'row'},
  dataWrapper: {marginTop: -1},
});
