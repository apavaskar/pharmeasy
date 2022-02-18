import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {SquerProgressIndicator} from '../../widgets/SquerFormField';
import {SquerDivider} from '../../widgets/SquerDivider';
import {
  callSelector,
  saveVisitSelector,
  stagesSelector,
  visitDetailsSelector,
} from '../../redux/selectors/callReportingSelector';
import {Button, FlatList, Heading, HStack, Text, VStack} from 'native-base';
import {
  initVisitCommentsStartAction,
  saveVisitToLocalStartAction,
} from '../../redux/actions/callReporting/callReportingAction';
import SquerDatePicker from '../../widgets/SquerFormField/SquerDatePicker';
import SquerCard from '../../widgets/SquerCard';
import SquerCheckbox from '../../widgets/SquerCheckbox';

const CallCommentsComponent = props => {
  const [stages, setStages] = useState([]);
  const [selectStage, setSelectStage] = useState({});
  const [selectEngagement, setSelectEngagement] = useState({});
  const [selectDrop, setSelectDrop] = useState({});
  const [refresh, setRefresh] = useState(new Date());
  const [stageByProduct, setStageByProduct] = useState({});

  useEffect(() => props.handleInitVisitComments(), [props.navigation]);

  useEffect(() => {
    let data = {};
    props.stages.forEach(stage => {
      let stages = [];
      if (data[stage.PRODUCT_ID] !== undefined) {
        stages = data[stage.PRODUCT_ID];
      }
      stages.push(stage);
      data[stage.PRODUCT_ID] = stages;
    });
    let productStages = [];
    Object.keys(data).forEach(key => {
      productStages.push(data[key]);
    });
    setStages(productStages);
  }, [props.stages.length]);

  const stageSelect = (products, stage) => {
    let productId = products[0].PRODUCT_ID;
    let obj = JSON.parse(JSON.stringify(selectStage));
    obj[productId] = stage;
    setSelectStage(obj);
    stageByProduct[productId] = products[stage].STAGE_ID;
    setStageByProduct(stageByProduct);
  };

  const engagementSelect = (products, engagement) => {
    let productId = products[0].PRODUCT_ID;
    if (selectEngagement[productId] === undefined) {
      selectEngagement[productId] = true;
    } else {
      selectEngagement[productId] = !selectEngagement[productId];
    }
    setSelectEngagement(selectEngagement);
    setRefresh(new Date());
  };

  const dropSelect = (products, drop) => {
    let productId = products[0].PRODUCT_ID;
    if (selectDrop[productId] === undefined) {
      selectDrop[productId] = true;
    } else {
      selectDrop[productId] = !selectDrop[productId];
    }
    setSelectDrop(selectDrop);
    setRefresh(new Date());
  };

  return (
    <View style={{flex: 1}}>
      <SquerDivider />
      <HStack style={{justifyContent: 'space-between'}}>
        <Text fontSize={'lg'}>Comments</Text>
        <HStack style={{width: 300}}>
          <Text fontSize={'md'} py={2} px={3}>
            Followup On
          </Text>
          <SquerDatePicker
            min={new Date('2021-10-01')}
            max={new Date()}
            defaultDate={new Date()}
            onConfirm={() => console.log('')}
            placeholder={'From'}
          />
        </HStack>
      </HStack>
      <SquerDivider />
      <View style={{flex: 0.85, justifyContent: 'flex-end'}}>
        {props.visitDetails.visited === 0 && (
          <FlatList
            extraData={refresh}
            data={stages}
            renderItem={stage => {
              return (
                <StagesView
                  key={stage.item.id}
                  product={stage.item}
                  selectedStage={selectStage}
                  onSelectStage={o => stageSelect(stage.item, o)}
                  selectedEngagement={selectEngagement}
                  onEngagementSelect={o => engagementSelect(stage.item, o)}
                  selectedDrop={selectDrop}
                  onDropSelect={o => dropSelect(stage.item, o)}
                />
              );
            }}
          />
        )}
        <SquerDivider />
      </View>
      <View style={styles.buttonBar}>
        {props.visitDetails.visited === 0 && (
          <Button
            style={{width: 150}}
            onPress={() => {
              props.handleSaveVisit({
                visitId: props.call.visitId,
                joinees: props.joinees,
                rcpa: props.rcpas,
                brands: props.brandDetailing,
                inputs: props.inputs,
                comments: '',
                crm: {
                  stages: stageByProduct,
                  engagement: selectEngagement,
                  drop: selectDrop,
                },
                saveCoordinates: props.call.saveCurrentCoordinates,
                coordinates: props.call.doctorCoordinates,
              });
            }}>
            Save
          </Button>
        )}
        {props.visitDetails.visited === 1 && (
          <Button
            style={{width: 150}}
            onPress={() => {
              props.navigation.navigate('CallReportingListComponent');
            }}>
            Done
          </Button>
        )}
      </View>
    </View>
  );
};

const StagesView = ({
  product,
  selectedEngagement,
  selectedDrop,
  onSelectStage,
  selectedStage,
  onEngagementSelect,
  onDropSelect,
}) => {
  return (
    <VStack>
      <SquerCard width={'100%'}>
        <Heading size={'md'}>{product[0].PRODUCT_NAME}</Heading>
        <SquerProgressIndicator
          labels={product.map(stage => stage.STAGE_NAME)}
          currentPosition={selectedStage[product[0].PRODUCT_ID] || 0}
          onPress={stage => onSelectStage(stage)}
        />
        <SquerDivider />
        <HStack style={{justifyContent: 'flex-end', marginRight: 20}}>
          <SquerCheckbox
            selected={selectedEngagement[product[0].PRODUCT_ID] || false}
            onPress={value => onEngagementSelect(value)}
          />
          <Text fontSize={'md'} paddingRight={4}>
            Engagement call
          </Text>
          <SquerCheckbox
            selected={selectedDrop[product[0].PRODUCT_ID] || false}
            onPress={value => onDropSelect(value)}
          />
          <Text fontSize={'md'}>Dropped out</Text>
        </HStack>
      </SquerCard>
    </VStack>
  );
};

const mapState = state => {
  const saveVisit = saveVisitSelector(state);
  const visitDetails = visitDetailsSelector(state);
  const stages = stagesSelector(state);
  const call = callSelector(state);
  return {
    saveVisit,
    visitDetails,
    stages,
    call,
  };
};

const actions = {
  handleInitVisitComments: initVisitCommentsStartAction,
  handleSaveVisit: saveVisitToLocalStartAction,
};

const styles = StyleSheet.create({
  buttonBar: {
    alignItems: 'flex-end',
    flex: 0.15,
  },
});

export default connect(mapState, actions)(CallCommentsComponent);
