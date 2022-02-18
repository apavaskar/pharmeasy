import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';

const SquerCheckbox = props => {
  if (props.enabled === false) {
    return <Icon name="square" color={'gray'} size={25} />;
  }
  if (!props.selected) {
    return (
      <Pressable onPress={props.onPress}>
        <Icon name="square-outline" color={'green'} size={25} />
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={props.onPress}>
        <Icon name="square" color={'green'} size={25} />
      </Pressable>
    );
  }
};

export default SquerCheckbox;
