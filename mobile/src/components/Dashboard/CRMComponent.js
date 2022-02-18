import React, {useEffect, useState} from 'react';
import {SectionGrid} from 'react-native-super-grid';
import {StyleSheet} from 'react-native';
import {View, Text, HStack, VStack, Divider} from 'native-base';
import {employeeSelector} from '../../selectors/commonSelector';
import {
  dashboardYearMonthSelector,
  productStagesSelector,
} from '../../selectors/dashboardSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {cardListSelector} from '../../selectors/configSelector';
import connect from 'react-redux/lib/connect/connect';
import {loadCRMDashboardStartAction} from '../../redux/actions/dashboard/dashboardAction';
import {toYyyyMm} from '../../utils/dateUtil';

const CRMComponent = props => {
  const [stages, setStages] = useState([]);
  useEffect(
    () =>
      props.navigation.addListener('focus', () => {
        props.handleInitCRMDashboard({
          yearMonth: toYyyyMm(Date()),
          certificate: props.certificate,
        });
      }),
    [props.navigation],
  );

  useEffect(() => {
    let data = {};
    props.stages.forEach(stage => {
      let stages = [];
      if (data[stage.product.id] !== undefined) {
        stages = data[stage.product.id];
      }
      stages.push(stage);
      data[stage.product.id] = stages;
    });
    let productStages = [];
    Object.keys(data).forEach(key => {
      productStages.push({title: data[key][0].product.name, data: data[key]});
    });
    setStages(productStages);
  }, [props.stages]);

  const colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
  ];

  return (
    <SectionGrid
      itemDimension={170}
      sections={stages}
      style={styles.gridView}
      renderItem={({item, section, index}) => (
        <View style={[styles.itemContainer, {backgroundColor: colors[index]}]}>
          <HStack style={{justifyContent: 'space-evenly'}}>
            <VStack>
              <Text fontSize={'4xl'} color={'white'}>
                0
              </Text>
              <Text fontSize={'md'} color={'white'}>
                Met
              </Text>
            </VStack>
            <Divider orientation="vertical" mx="3" h={70} />
            <VStack>
              <Text fontSize={'4xl'} color={'white'}>
                0
              </Text>
              <Text fontSize={'md'} color={'white'}>
                Drop
              </Text>
            </VStack>
          </HStack>
          <Text style={styles.itemName}>{item.stage.name}</Text>
        </View>
      )}
      renderSectionHeader={({section}) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});

const mapState = state => {
  const employee = employeeSelector(state);
  const yearMonth = dashboardYearMonthSelector(state);
  const certificate = certificateSelector(state);
  const cardList = cardListSelector(state);
  const stages = productStagesSelector(state);
  return {employee, yearMonth, certificate, cardList, stages};
};

const actions = {
  handleInitCRMDashboard: loadCRMDashboardStartAction,
};

export default connect(mapState, actions)(CRMComponent);
