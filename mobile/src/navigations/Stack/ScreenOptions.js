import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import { StackActions } from "react-navigation";

export const ScreenOptions = () => {
  const options = {
    headerStyle: {
      elevation: 0,
      backgroundColor: 'white',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: '500',
    },
  };
  return options;
};

export const LeftNavigation = ({navigation, back, params, pop}) => {
  return (
    <Pressable
      onPress={props => {
        if (pop) {
          navigation.goBack();
        } else {
          navigation.navigate(back, params || {});
        }
      }}
      style={{height: 40}}>
      <Icon name={'chevron-back-outline'} color={'black'} size={32} />
    </Pressable>
  );
};
