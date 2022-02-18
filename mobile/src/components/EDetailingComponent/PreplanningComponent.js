import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  initPrecallPlanningStartAction,
  savePrecallStartAction,
} from '../../redux/actions/edetailing/edetailingActions';
import {edetailingBrandsSelector} from '../../selectors/edetailingSelector';
import {FlatList, Text, VStack, HStack, Button} from 'native-base';
import {Dimensions} from 'react-native';
import SquerListItem from '../../widgets/SquerListItem';
import {ROW_LABEL_TITLE} from '../../widgets/SquerWidgetConstants';
import SquerCheckbox from '../../widgets/SquerCheckbox';

const PreplanningComponent = props => {
  useEffect(() => {
    props.handlePreplanningInit();
  }, [props.navigation]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const savePlan = () => {
    props.handleSavePlan({
      brands: selectedBrands,
      visitId: props.route.params.visitId,
    });
  };
  const ht = Dimensions.get('window').height - 150;
  const checkUncheckBrands = item => {
    let brands = selectedBrands;
    if (brands.includes(item.id)) {
      const filtered = brands.filter(row => {
        return item.id !== row;
      });
      setSelectedBrands(filtered);
    } else {
      setSelectedBrands(selectedBrands.concat(item.id));
    }
  };
  /*
  checkUncheckBrands(value, item)
   */
  return (
    <VStack flex={1}>
      <FlatList
        flex={0.9}
        extraData={selectedBrands.length}
        data={props.brands}
        renderItem={item => (
          <SquerListItem>
            <HStack justifyContent="space-between">
              <Text fontSize={ROW_LABEL_TITLE}>{item.item.name}</Text>
              <SquerCheckbox
                onPress={event => checkUncheckBrands(item.item)}
                selected={selectedBrands.includes(item.item.id)}
              />
            </HStack>
          </SquerListItem>
        )}
      />
      <HStack direction={'row-reverse'} flex={0.1} p={3}>
        <Button style={{width: 100, height: 40}} onPress={savePlan}>
          Save
        </Button>
      </HStack>
    </VStack>
  );
};

const mapState = state => {
  const brands = edetailingBrandsSelector(state);
  return {brands};
};

const actions = {
  handlePreplanningInit: initPrecallPlanningStartAction,
  handleSavePlan: savePrecallStartAction,
};

export default connect(mapState, actions)(PreplanningComponent);
