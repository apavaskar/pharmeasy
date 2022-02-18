import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  changeCallStepAction,
  handlePhysicalDigitalSwitchStartAction,
  setJoineeAction,
} from '../../redux/actions/callReportingAction';
import {
  SquerDropdownPicker,
  SquerProgressIndicator,
} from '../../widgets/SquerFormField';
import {
  allJoineesSelector,
  callReportingDateSelector,
  doctorToReportSelector,
  initedVisitPageSelector,
  isPhysicalSelector,
  joineesSelector,
  physicalReportingStepSelector,
  saveCurrentCoordinatesSelector,
} from '../../redux/selectors/callReportingSelector';
import BrandsDetailedComponent from './BrandsDetailedComponent';
import InputEntryComponent from './InputEntryComponent';
import CallCommentsComponent from './CallCommentsComponent';
import {rcpaConfigSelector} from '../../selectors/configSelector';
import {
  initVisitDetailsStartAction,
  resetCallSuccessAction,
  saveDoctorCoordinatesStartAction,
} from '../../redux/actions/callReporting/callReportingAction';
import RNLocation from 'react-native-location';
import {AlertDialog, Button, VStack} from 'native-base';
import SquerCard from '../../widgets/SquerCard';

const DoctorCallReport = props => {
  const [joineeList, setJoineeList] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => {
    props.handleSaveDoctorCoordinates({
      doctorId: props.doctorToReport.id,
      longitude: currentLocation.longitude,
      latitude: currentLocation.latitude,
      isPrimary: true,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      (async () => {
        let permission = await RNLocation.checkPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
          },
        });
        if (permission === false) {
          const perm = await RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
              detail: 'coarse',
              rationale: {
                title: 'We need to access your location',
                message:
                  'We use your location to show where you are on the map',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
              },
            },
          });
          if (perm === 1) {
            permission = true;
          }
        }
        if (permission === true) {
          const location = await RNLocation.getLatestLocation();
          setCurrentLocation(location);
          props.handleInitVisit({
            visitId: props.route.params.visitId,
            doctor: props.route.params.doctor,
            visit: props.route.params.visit,
            visitDate: props.visitDate,
            currentLocation: location,
          });
          setJoineeList(props.joinees);
        }
      })();
    });
    return () => {
      props.handleReset();
    };
  }, [props.navigation]);

  useEffect(() => {
    setIsOpen(props.saveCurrentCoordinates);
    props.handleSetJoinees({joinees: joineeList});
  }, [joineeList]);

  return (
    <VStack p={5} flex={1}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Location Capture</AlertDialog.Header>
          <AlertDialog.Body>
            Your current location will be saved as the Doctors location. If this
            is correct, press "OK" else "Cancel"
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                OK
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <SquerCard
        title={props.route.params.doctor.name}
        cardStyle={'plain'}
        width={'98%'}>
        <SquerDropdownPicker
          zIndex={3000}
          zIndexInverse={1000}
          multiple={true}
          placeholder={'Select Joinee'}
          value={joineeList}
          setValue={value => {
            setJoineeList(value);
          }}
          items={props.allJoinees.map(joinee => {
            return {
              value: joinee.id,
              label: joinee.name,
            };
          })}
        />
      </SquerCard>

      <SquerProgressIndicator
        currentPosition={props.physicalReportingStep}
        labels={['Detailing', 'Inputs', 'Comments']}
        onPress={i => {
          if (i < props.physicalReportingStep) {
            props.handleNavigation({reportingStep: i});
          }
        }}
      />
      {props.physicalReportingStep === 0 && (
        <BrandsDetailedComponent
          handleNavigation={data => {
            return props.handleNavigation({reportingStep: 1});
          }}
        />
      )}
      {props.physicalReportingStep === 1 && (
        <InputEntryComponent
          handleNavigation={() => props.handleNavigation({reportingStep: 2})}
        />
      )}
      {props.physicalReportingStep === 2 && (
        <CallCommentsComponent navigation={props.navigation} />
      )}
    </VStack>
  );
};

const mapState = state => {
  const allJoinees = allJoineesSelector(state);
  const isPhysical = isPhysicalSelector(state);
  const physicalReportingStep = physicalReportingStepSelector(state);
  const visitDate = callReportingDateSelector(state);
  const rcpaConfig = rcpaConfigSelector(state);
  const joinees = joineesSelector(state);
  const initedPage = initedVisitPageSelector(state);
  const doctorToReport = doctorToReportSelector(state);
  const saveCurrentCoordinates = saveCurrentCoordinatesSelector(state);
  return {
    allJoinees,
    isPhysical,
    physicalReportingStep,
    visitDate,
    rcpaConfig,
    joinees,
    initedPage,
    doctorToReport,
    saveCurrentCoordinates,
  };
};

const actions = {
  handleInitVisit: initVisitDetailsStartAction,
  handlePhysicalCall: handlePhysicalDigitalSwitchStartAction,
  handleNavigation: changeCallStepAction,
  handleSetJoinees: setJoineeAction,
  handleSaveDoctorCoordinates: saveDoctorCoordinatesStartAction,
  handleReset: resetCallSuccessAction,
};

export default connect(mapState, actions)(DoctorCallReport);
