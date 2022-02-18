import React, {useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Pressable} from 'react-native';
import {toDisplayDate} from '../../utils/dateUtil';
import {HStack, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const SquerDatePicker = props => {
  const [date, setDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    if (props.defaultDate !== undefined) {
      setDate(props.defaultDate);
    }
  }, [props.defaultDate, date]);
  return (
    <HStack w={300}>
      <HStack>
        <Input
          size={'lg'}
          isDisabled={true}
          value={
            date !== undefined
              ? toDisplayDate(date)
              : toDisplayDate(props.defaultDate)
          }
        />
        <Pressable onPress={() => setShowDatePicker(true)} style={{flex: 0.2}}>
          <Icon name={'md-calendar-sharp'} size={32} />
        </Pressable>
      </HStack>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        minimumDate={props.min}
        maximumDate={props.max}
        onConfirm={date => {
          setDate(date);
          props.onConfirm(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </HStack>
  );
};
export default SquerDatePicker;
