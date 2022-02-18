import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {missedCallReportStartAction} from '../../redux/actions/dashboard/effortReportAction';
import {employeeSelector} from '../../selectors/commonSelector';
import {certificateSelector} from '../../selectors/authSelector';
import {toYyyyMm} from '../../utils/dateUtil';
import {
  Button,
  FlatList,
  HStack,
  Popover,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {Dimensions} from 'react-native';
import {effortReportSelector} from '../../redux/selectors/effortReportSelector';
import SquerCard from '../../widgets/SquerCard';

const MissedCallComponent = props => {
  const initialFocusRef = React.useRef(null);
  useEffect(() => {
    props.handleLoadMissedCall({
      locationId: props.employee.locationId,
      yearMonth: toYyyyMm(new Date()),
      designation: props.employee.empDesignation,
      certificate: props.certificate,
    });
  }, [props.reload]);

  if (props.effortReport.loadingEffort === true) {
    return (
      <SquerCard title={'Missed Call'}>
        <HStack space={2} style={{justifyContent: 'center', padding: 10}}>
          <Spinner accessibilityLabel="Loading..." />
        </HStack>
      </SquerCard>
    );
  }

  return (
    <VStack>
      <HStack style={{justifyContent: 'space-between', padding: 5}}>
        <Text fontSize={'md'}>MissedCalls</Text>
        <Text fontSize={'md'}>{props.effortReport.missedCallData.length}</Text>
      </HStack>
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
        <MissedCallDetails data={props.effortReport.missedCallData} />
      </Popover>
    </VStack>
  );
};

const MissedCallDetails = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const data = {};
  props.data.forEach(row => {
    const locationId = row.locat_id;
    if (data[locationId] === undefined) {
      let doctors = [row];
      data[locationId] = {title: row.locat_name, data: doctors};
    } else {
      let rows = data[locationId].data;
      rows.push(row);
      data[locationId] = {title: row.locat_name, data: rows};
    }
  });
  const sections = [];
  Object.entries(data).forEach((key, value) => {
    sections.push(value);
  });
  return (
    <Popover.Content
      width={windowWidth * 0.95}
      height={windowHeight * 0.8}
      bgColor={'coolGray.100'}>
      <Popover.Arrow />
      <Popover.CloseButton />
      {/* @ts-ignore */}
      <Popover.Header>Missed Call Details</Popover.Header>
      <Popover.Body>
        <FlatList
          data={props.data}
          renderItem={item => (
            <VStack borderBottomWidth={1} style={{paddingBottom: 10}}>
              <Text fontSize={'md'}>
                ({item.item.doctr_person_code}) - {item.item.doctr_name}
              </Text>
              <Text fontSize={'sm'} style={{alignSelf: 'flex-end'}}>
                Location: {item.item.locat_name}
              </Text>
              <Text fontSize={'sm'} style={{alignSelf: 'flex-end'}}>
                Beats: {item.item.beats_name}
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

export default connect(mapState, actions)(MissedCallComponent);
