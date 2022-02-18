import React from 'react';
import theme from '../../AppTheme';
import {Divider} from 'native-base';

const SquerDivider = props => {
  return (
    <Divider
      style={{width: '100%', marginTop: 8, marginBottom: 8}}
      color={theme.borderColor}
      insetType="left"
      width={1}
      orientation="horizontal"
    />
  );
};

export default SquerDivider;
