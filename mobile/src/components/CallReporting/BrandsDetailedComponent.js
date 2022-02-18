import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {SquerDivider} from '../../widgets/SquerDivider';
import {bdBrandsDetailedSelector} from '../../redux/selectors/brandDetailingSelectors';
import {
  Modal,
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  FlatList,
  IconButton,
  ArrowBackIcon,
  ArrowForwardIcon,
  Center,
} from 'native-base';
import {bdSaveStateStartAction} from '../../redux/actions/brandDetailing/brandDetailingAction';
import {
  locationTagErrorSelector,
  visitDetailsSelector,
  visitIdSelector,
} from '../../redux/selectors/callReportingSelector';
import {
  edetailingBrandsSelector,
  filesSelector,
  showDetailingSelector,
} from '../../selectors/edetailingSelector';
import {
  closeDetailingStartAction,
  initPrecallPlanningStartAction,
  loadVAToDetailStartAction,
} from '../../redux/actions/edetailing/edetailingActions';
import WebView from 'react-native-webview';
import {ROW_LABEL_TITLE} from '../../widgets/SquerWidgetConstants';
import {Colors} from 'react-native-paper';

const BrandsDetailedComponent = props => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [webContent, setWebContent] = useState('');
  let webViewRef = useRef();
  useEffect(() => props.handlePreplanningInit(), [props.visitId]);

  useEffect(() => {
    if (props.showDetailing === true) {
      setCurrentSlide(0);
      setTotalSlides(props.files.length);
      setWebContent(props.files[0]);
    }
  }, [props.showDetailing]);

  const onSwipeRight = () => {
    const length = props.files.length;
    const newIndex = currentSlide + 1;
    if (newIndex === length) {
      return;
    }
    setCurrentSlide(newIndex);
    setWebContent(props.files[newIndex]);
  };

  const onSwipeLeft = () => {
    const newIndex = currentSlide - 1;
    if (newIndex < 0) {
      return;
    }
    setCurrentSlide(newIndex);
    setWebContent(props.files[newIndex]);
  };

  const handleLoadVA = brandId => {
    props.handleInitBrandDetailing({brandId: brandId});
  };

  return (
    <VStack style={{flex: 1}}>
      <View style={{flex: 1}}>
        <SquerDivider />
        <Heading size={'sm'}>Brand Listing</Heading>
        <SquerDivider />
        <FlatList
          flex={0.9}
          extraData={props.brandsToDetail.length}
          data={props.brandsToDetail}
          renderItem={item => (
            <HStack
              justifyContent="space-between"
              p={2}
              borderBottomWidth={1}
              borderBottomColor={Colors.grey500}>
              <Text fontSize={ROW_LABEL_TITLE}>{item.item.name}</Text>
              <Button
                isDisabled={props.visitDetails.visited === 1}
                size={'md'}
                variant={'outline'}
                onPress={() => handleLoadVA(item.item.id)}>
                Start
              </Button>
            </HStack>
          )}
        />
      </View>
      <SquerDivider />
      <HStack
        style={{justifyContent: 'flex-end'}}
        height={60}
        paddingBottom={5}>
        {props.visitDetails.visited === 1 && <View />}
        <Button
          isDisabled={props.locationTagError === true}
          style={{width: 100}}
          onPress={data => {
            props.handleNextClicked({brandsDetailed: []});
            return props.handleNavigation();
          }}>
          Next
        </Button>
      </HStack>
      {props.showDetailing === true && (
        <Modal
          isOpen={props.showDetailing}
          onClose={props.handleCloseDetailing}
          size={'full'}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              <Center>
                <Heading fontSize={'md'}>
                  {currentSlide + 1}/{totalSlides}
                </Heading>
              </Center>
            </Modal.Header>
            <Modal.Body>
              {props.files.length === 0 && (
                <Heading>Please download the VAs from the settings</Heading>
              )}
              {props.files.length !== 0 && (
                <WebView
                  ref={ref => (webViewRef.current = ref)}
                  originWhitelist={['*']}
                  source={{html: webContent.htmlContent}}
                  style={{height: 600}}
                />
              )}
            </Modal.Body>
          </Modal.Content>
          <Modal.Footer>
            <HStack flex={1} style={{justifyContent: 'space-between'}}>
              <IconButton
                variant="solid"
                icon={<ArrowBackIcon />}
                onPress={() => onSwipeLeft()}
              />
              <IconButton
                variant="solid"
                icon={<ArrowForwardIcon />}
                onPress={() => onSwipeRight()}
              />
            </HStack>
          </Modal.Footer>
        </Modal>
      )}
    </VStack>
  );
};

const mapState = state => {
  const brandsDetailed = bdBrandsDetailedSelector(state);
  const brandsToDetail = edetailingBrandsSelector(state);
  const visitId = visitIdSelector(state);
  const visitDetails = visitDetailsSelector(state);
  const files = filesSelector(state);
  const locationTagError = locationTagErrorSelector(state);
  const showDetailing = showDetailingSelector(state);
  return {
    brandsDetailed,
    brandsToDetail,
    visitId,
    visitDetails,
    files,
    locationTagError,
    showDetailing,
  };
};

const actions = {
  handlePreplanningInit: initPrecallPlanningStartAction,
  handleInitBrandDetailing: loadVAToDetailStartAction,
  handleNextClicked: bdSaveStateStartAction,
  handleCloseDetailing: closeDetailingStartAction,
};

export default connect(mapState, actions)(BrandsDetailedComponent);
