import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  downloadDetailingStartAction,
  initBrandListForEdetailingStartAction,
} from '../../redux/actions/edetailing/edetailingActions';
import {
  brandForEdetailingSelector,
  downloadVASelector,
  refreshListSelector,
} from '../../redux/selectors/edetailingBrandListSelector';
import {
  AspectRatio,
  Center,
  Heading,
  Image,
  Pressable,
  Spinner,
  View,
  VStack,
} from 'native-base';
import {certificateSelector} from '../../selectors/authSelector';
import Icon from 'react-native-vector-icons/Ionicons';
import {SectionGrid} from 'react-native-super-grid';
import {BORDER_COLOR} from '../../widgets/SquerWidgetConstants';

const VABrandListingComponent = props => {
  const [vas, setVas] = useState([]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      props.handleInitList({});
    });
  }, [props.navigation]);

  const downloadFile = id => {
    props.handleDownloadVA({fileId: id, certificate: props.certificate});
  };

  useEffect(() => {
    let list = {};
    let brands = {};
    props.brands.forEach(brand => {
      if (list[brand.brandId] !== undefined) {
        let data = list[brand.brandId];
        data.push(brand);
        list[brand.brandId] = data;
      } else {
        let data = [];
        data.push(brand);
        list[brand.brandId] = data;
      }
      brands[brand.brandId] = brand;
    });
    let data = [];
    Object.keys(brands).forEach(brandId => {
      const d = JSON.parse(JSON.stringify(list[brandId]));
      const s = d.sort((a, b) => {
        console.log(
          a.sequence,
          b.sequence,
          parseInt(a.sequence) < parseInt(b.sequence ? -1 : 1),
        );
        return parseInt(a.sequence) < parseInt(b.sequence) ? -1 : 1;
      });
      let section = {
        title: brands[brandId].name,
        data: list[brandId].sort((a, b) => {
          return parseInt(a.sequence) > parseInt(b.sequence) ? 1 : -1;
        }),
      };
      console.log(section);
      data.push(section);
    });
    setVas(data);
  }, [props.refreshList]);
  return (
    <SectionGrid
      extradata={props.refreshList}
      itemDimension={150}
      sections={vas}
      renderItem={({item}) => {
        if (item.thumbnail === null) {
          return (
            <Pressable onPress={() => downloadFile(item.id)}>
              <Center
                borderWidth={1}
                borderRadius={5}
                borderColor={BORDER_COLOR}>
                <Icon name={'cloud-download-outline'} size={50} />
              </Center>
            </Pressable>
          );
        }
        return (
          <AspectRatio>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${item.thumbnail}`,
              }}
              alt={'Thumbnail'}
            />
          </AspectRatio>
        );
      }}
      renderSectionHeader={({section}) => (
        <View p={3}>
          <Heading fontSize={'lg'}>{section.title}</Heading>
        </View>
      )}
    />
  );
};

const mapState = state => {
  const brands = brandForEdetailingSelector(state);
  const certificate = certificateSelector(state);
  const refreshList = refreshListSelector(state);
  return {brands, certificate, refreshList};
};

const actions = {
  handleInitList: initBrandListForEdetailingStartAction,
  handleDownloadVA: downloadDetailingStartAction,
};

export default connect(mapState, actions)(VABrandListingComponent);
