import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {SquerCard} from '../../widgets/SquerCard';
import {missedCallReportStartAction} from '../../redux/actions/dashboard/effortReportAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {
  Button,
  FlatList,
  HStack,
  Popover,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {effortReportSelector} from '../../selectors/effortReportSelector';
import {Dimensions} from 'react-native';

const MissedWRFEntriesComponent = props => {
  const initialFocusRef = React.useRef(null);
  useEffect(() => {}, [props.reload]);

  if (props.effortReport.loadingEffort === true) {
    return (
      <SquerCard title={'Missed WRF Entries'}>
        <HStack space={2} style={{justifyContent: 'center', padding: 10}}>
          <Spinner accessibilityLabel="Loading..." />
        </HStack>
      </SquerCard>
    );
  }

  return (
    <SquerCard
      title={'Missed WRF Entries'}
      footer={
        <Popover
          style={{width: 400}}
          initialFocusRef={initialFocusRef}
          trigger={triggerProps => {
            return (
              <Button size={'sm'} variant={'link'} {...triggerProps}>
                Details
              </Button>
            );
          }}>
          <MissedEntriesDetails />
        </Popover>
      }>
      <HStack style={{justifyContent: 'space-between', padding: 5}}>
        <Text fontSize={'md'}>Missed Entries</Text>
        <Text fontSize={'md'}>{1}</Text>
      </HStack>
    </SquerCard>
  );
};

const MissedEntriesDetails = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const data = [
    {
      name: 'Test TM',
      locat_name: 'Test Location',
      doctor_name: 'Dr. Abhijit',
    },
  ];
  return (
    <Popover.Content
      width={windowWidth * 0.95}
      height={windowHeight * 0.8}
      bgColor={'coolGray.100'}>
      <Popover.Arrow />
      <Popover.CloseButton />
      {/* @ts-ignore */}
      <Popover.Header>Missed Entries Details</Popover.Header>
      <Popover.Body>
        <FlatList
          data={data}
          renderItem={item => (
            <VStack borderBottomWidth={1} style={{paddingBottom: 10}}>
              <Text fontSize={'md'}>{item.item.doctor_name}</Text>
              <Text fontSize={'sm'} style={{alignSelf: 'flex-end'}}>
                Location: {item.item.locat_name}
              </Text>
            </VStack>
          )}
        />
      </Popover.Body>
    </Popover.Content>
  );
};

const mapState = state => {
  const certificate = certificateSelector(state);
  const employee = employeeSelector(state);
  const effortReport = effortReportSelector(state);
  return {employee, certificate, effortReport};
};

const actions = {
  handleLoadMissedCall: missedCallReportStartAction,
};

export default connect(mapState, actions)(MissedWRFEntriesComponent);
