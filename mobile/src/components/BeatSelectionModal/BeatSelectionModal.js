import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadBeatsStartAction} from '../../redux/actions/comonAction';
import {beatsSelector} from '../../selectors/commonSelector';
import {addBeatsToPlanStartAction} from '../../redux/actions/planAction';
import {Box, Button, FlatList, HStack, Text, View} from 'native-base';
import SquerBottomSheet from '../../widgets/SquerBottomSheet';
import SquerCheckbox from '../../widgets/SquerCheckbox';

const BeatSelectionModal = props => {
  useEffect(() => {
    if (props.isVisible === true) {
      props.handleBeatLoadAction({locationId: props.locationId});
    }
  }, [props.isVisible]);
  useEffect(() => {
    if (props.isVisible === false) {
      setSelectedBeats([]);
    }
  }, [props.isVisible]);

  const [selectedBeats, setSelectedBeats] = useState([]);
  return (
    <SquerBottomSheet
      isVisible={props.isVisible}
      title={'Select Patch'}
      footer={
        <Button
          onPress={() => {
            props.handleAddAction({beats: selectedBeats});
            props.setVisible(false);
          }}>
          Add
        </Button>
      }
      setVisible={() => props.setVisible()}>
      <View style={{flex: 8}}>
        <FlatList
          keyExtractor={item => item.id}
          data={props.beats}
          renderItem={beat => {
            return (
              <BeatSelectionRow
                key={beat.id}
                beat={beat}
                onPress={item => {
                  const beat = item;
                  if (selectedBeats.includes(beat.id)) {
                    const filtered = selectedBeats.filter(row => {
                      return beat.id !== row;
                    });
                    setSelectedBeats(filtered);
                  } else {
                    const beats = selectedBeats.concat(beat.id);
                    setSelectedBeats(beats);
                  }
                }}
                selected={selectedBeats.includes(beat.item.id)}
              />
            );
          }}
        />
      </View>
    </SquerBottomSheet>
  );
};

const mapState = state => {
  const beats = beatsSelector(state);
  return {beats};
};

const actions = {
  handleBeatLoadAction: loadBeatsStartAction,
  handleAddAction: addBeatsToPlanStartAction,
};

const BeatSelectionRow = props => {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      p="2">
      <HStack style={{justifyContent: 'space-between'}}>
        <Text fontSize={'lg'}>{props.beat.item.name}</Text>
        <SquerCheckbox
          onPress={() => props.onPress(props.beat.item)}
          selected={props.selected}
        />
      </HStack>
    </Box>
  );
};

export default connect(mapState, actions)(BeatSelectionModal);
