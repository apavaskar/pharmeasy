import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Pressable, StyleSheet} from 'react-native';
import {
  initNonCallStartAction,
  saveNonCallActivitiesStartAction,
} from '../../redux/actions/planAction';
import {
  allNonCallActivitiesSelector,
  planDateSelector,
  plannedNonCallActivitiesSelector,
} from '../../selectors/planSelector';
import {SquerDropdownPicker} from '../../widgets/SquerFormField';
import {employeeSelector} from '../../selectors/commonSelector';
import {Button, FlatList, HStack, Text, View} from 'native-base';
import {ROW_LABEL_TITLE} from '../../widgets/SquerWidgetConstants';
import Icon from 'react-native-vector-icons/Ionicons';

const NonCallPlanComponent = props => {
  useEffect(() => {
    props.handleInitNonCall({
      date: props.planDate,
      locationId: props.employee.locationId,
    });
  }, [props.fromDate]);
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState(props.plannedNonCallActivities);
  return (
    <>
      <HStack
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <View style={{width: '70%'}}>
          <SquerDropdownPicker
            zIndex={3000}
            zIndexInverse={1000}
            multiple={false}
            placeholder={'Non Call Activity'}
            value={activity}
            setValue={value => setActivity(value)}
            items={props.noncallActivities.map(activity => {
              return {
                value: activity.id,
                label: activity.name,
              };
            })}
          />
        </View>
        <Button
          style={{width: 100}}
          onPress={() => {
            const selectedActivities = props.noncallActivities.filter(
              a => a.id === activity,
            );
            setActivities([
              ...activities,
              ...selectedActivities.map(activity => {
                activity.action = 'A';
                return activity;
              }),
            ]);
          }}
          variant={'link'}>
          Add
        </Button>
      </HStack>
      <FlatList
        style={{marginLeft: 12, marginRight: 12}}
        data={activities.filter(activity => activity.action !== 'D')}
        renderItem={item => (
          <RenderRow
            activity={item.item}
            onRemove={id => {
              const selectedActivities = activities.map(activity => {
                if (activity.id === item.item.id) {
                  activity.action = 'D';
                }
                return activity;
              });
              setActivities(selectedActivities);
            }}
          />
        )}
      />
      <HStack
        justifyContent={'flex-end'}
        style={{marginBottom: 12, marginRight: 20}}>
        <Button
          style={{width: 100}}
          onPress={() => {
            return props.handleSaveNonCall({
              activities: activities.map(activity => {
                return {
                  activityId: activity.id,
                  planDate: props.planDate,
                  planned: 1,
                  visited: 0,
                  planLocationId: props.employee.locationId,
                  status: activity.action,
                  employeeId: props.employee.id,
                };
              }),
            });
          }}>
          Save
        </Button>
      </HStack>
    </>
  );
};

const mapState = state => {
  const noncallActivities = allNonCallActivitiesSelector(state);
  const plannedNonCallActivities = plannedNonCallActivitiesSelector(state);
  const planDate = planDateSelector(state);
  const employee = employeeSelector(state);
  return {noncallActivities, plannedNonCallActivities, planDate, employee};
};

const actions = {
  handleInitNonCall: initNonCallStartAction,
  handleSaveNonCall: saveNonCallActivitiesStartAction,
};

const RenderRow = props => {
  return (
    <HStack
      style={{
        justifyContent: 'space-between',
      }}>
      <Text fontSize={ROW_LABEL_TITLE}>{props.activity.name}</Text>
      <Pressable onPress={id => props.onRemove(id)}>
        <Icon name={'md-trash-outline'} size={30} />
      </Pressable>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonStyle: {
    width: 100,
  },
});

export default connect(mapState, actions)(NonCallPlanComponent);
