import React, {useEffect, useState} from 'react';
import {SquerListSeparator} from '../../widgets/SquerContainer';
import {SquerCheckbox} from '../../widgets/SquerFormField';
import SquerBottomSheet from '../../widgets/SquerBottomSheet';
import {Button, FlatList, HStack, Text} from 'native-base';

const BrandSelectionModal = props => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  return (
    <SquerBottomSheet
      footer={
        <Button
          style={{width: 100}}
          onPress={() => {
            props.onAdd(
              props.brands.filter(brand => selectedBrands.includes(brand.id)),
            );
            props.setVisible(false);
          }}>
          Add
        </Button>
      }
      isVisible={props.isVisible}
      title={'Select Brands To Detail'}
      setVisible={() => props.setVisible()}>
      <FlatList
        ItemSeparatorComponent={SquerListSeparator}
        keyExtractor={item => item.id}
        data={props.brands}
        renderItem={item => {
          return (
            <BrandRowComponent
              brand={item.item}
              onPress={brand => {
                if (selectedBrands.includes(brand.id)) {
                  const filtered = selectedBrands.filter(row => {
                    return brand.id !== row;
                  });
                  setSelectedBrands(filtered);
                } else {
                  const brands = selectedBrands.concat(brand.id);
                  setSelectedBrands(brands);
                }
              }}
              selected={selectedBrands.includes(item.item.id)}
            />
          );
        }}
      />
    </SquerBottomSheet>
  );
};

const BrandRowComponent = props => {
  return (
    <HStack>
      <Text size={'md'}>{props.brand.name}</Text>
      <SquerCheckbox
        enabled={props.brand.enabled}
        onPress={() => props.onPress(props.brand)}
        selected={props.selected}
      />
    </HStack>
  );
};

export default BrandSelectionModal;
