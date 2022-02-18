import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {SquerBottomSheet} from '../../widgets/SquerContainer';
import {FlatList, StyleSheet, View} from 'react-native';
import {SquerCheckbox} from '../../widgets/SquerFormField';
import {SquerButton} from '../../widgets/SquerButton';
import SquerFlatListSeparator from '../../widgets/SquerContainer/SquerListSeparator';
import {
  initNonCallStartAction,
  saveNonCallActivitiesStartAction,
} from '../../redux/actions/planAction';
import {allNonCallActivitiesSelector} from '../../selectors/planSelector';
import SquerText from "../../widgets/SquerFormField/SquerText";

const NonCallActivitySelectionModal = props => {
  const [selectedNoncallActivities, setSelectedNoncallActivities] = useState(
    [],
  );
  useEffect(() => {
    if (props.isVisible === true) {
      props.handleInitNonCall({locationId: props.locationId});
    }
  }, [props.isVisible]);

  return (
    <SquerBottomSheet
      isVisible={props.isVisible}
      title={'Select NonCall Activities'}
      setVisible={() => props.setVisible()}>
      <View style={{flex: 0.9, padding: 8}}>
        <FlatList
          ItemSeparatorComponent={SquerFlatListSeparator}
          keyExtractor={item => item.id}
          data={props.noncallActivities}
          renderItem={item => {
            return (
              <RenderRow
                key={item.item.id}
                activity={item.item}
                onPress={item => {
                  if (selectedNoncallActivities.includes(item.id)) {
                    const filtered = selectedNoncallActivities.filter(row => {
                      return item.id !== row;
                    });
                    setSelectedNoncallActivities(filtered);
                  } else {
                    const activities = selectedNoncallActivities.concat(
                      item.id,
                    );
                    setSelectedNoncallActivities(activities);
                  }
                }}
                selected={selectedNoncallActivities.includes(item.item.id)}
              />
            );
          }}
        />
      </View>
      <View style={styles.bottom}>
        <SquerButton
          title={'Add'}
          style={{width: 100}}
          onPress={() => {
            const activities = [];
            props.noncallActivities.forEach(activity => {
              if (selectedNoncallActivities.includes(activity.id)) {
                activities.push(activity);
              }
            });
            props.handleAddAction({
              activities: activities,
              isPlanned: 0,
            });
            props.setVisible(false);
          }}
        />
      </View>
    </SquerBottomSheet>
  );
};

const mapState = state => {
  const noncallActivities = allNonCallActivitiesSelector(state);
  return {noncallActivities};
};

const actions = {
  handleInitNonCall: initNonCallStartAction,
  handleSaveNonCall: saveNonCallActivitiesStartAction,
};

const RenderRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <SquerText type={'label'}>{props.activity.name}</SquerText>
      <SquerCheckbox
        onPress={() => props.onPress(props.activity)}
        selected={props.selected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 8,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.1,
    marginRight: 8,
    marginLeft: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default connect(mapState, actions)(NonCallActivitySelectionModal);
