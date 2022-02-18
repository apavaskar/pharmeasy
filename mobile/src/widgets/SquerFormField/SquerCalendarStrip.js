import React from 'react';
import {StyleSheet} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import theme from '../../AppTheme';
import {Box, View} from 'native-base';
import {Calendar} from 'react-native-calendars';
import {toDbDate} from '../../utils/dateUtil';
const SquerCalendarStrip = props => {
  if (props.full !== true) {
    return (
      <CalendarStrip
        style={styles.container}
        minDate={props.minDate}
        maxDate={props.maxDate}
        selectedDate={moment(props.selectedDate)}
        dateNumberStyle={{color: 'black'}}
        highlightDateNumberStyle={{color: theme.primaryColor}}
        onDateSelected={date => props.onDayPress(date)}
      />
    );
  } else {
    return (
      <Calendar
        style={styles.containeripad}
        onDayPress={date => props.onDayPress(moment(date.dateString))}
        monthFormat={'MMM yyyy'}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={true}
        showWeekNumbers={true}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={true}
        disableArrowRight={true}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={date => {
          /*Return JSX*/
        }}
        enableSwipeMonths={true}
      />
    );
  }
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 400,
  },
  containeripad: {
    width: 400,
  },

});
export default SquerCalendarStrip;
