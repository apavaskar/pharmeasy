import React from 'react';
import {connect} from 'react-redux';
import {Box, Button} from 'native-base';

const SquerButtonGroup = props => {
  return (
    <Button.Group isAttached={true}>
      {props.buttons.map((button, i) => (
        <Button
          variant={'outline'}
          onPress={selectedIdx => props.setSelectedIndex(i)}
          bg={props.selectedIndex === i ? 'primary.500' : 'white'}
          _text={{color: props.selectedIndex === i ? '#fff' : '#000'}}>
          {button}
        </Button>
      ))}
    </Button.Group>
  );
};

const mapState = state => {
  return {};
};

const actions = {};

export default connect(mapState, actions)(SquerButtonGroup);
