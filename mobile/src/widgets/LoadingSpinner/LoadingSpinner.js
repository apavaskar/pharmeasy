import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectShowSpinner} from './../../selectors/globalSelector';
import {Center, Heading, HStack, Modal, Spinner} from 'native-base';

const LoadingSpinner = ({showSpinner}) =>
  showSpinner ? (
    <Modal isOpen={showSpinner}>
      <Modal.Content
        maxWidth="100px"
        style={{backgroundColor: 'rgba(256, 256, 256, 0.1)'}}>
        <Modal.Body>
          <Spinner size={'lg'} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  ) : null;

LoadingSpinner.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
};

const mapState = state => {
  const showSpinner = selectShowSpinner(state);
  return {showSpinner};
};

export default connect(mapState)(LoadingSpinner);

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 200,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    top: '30%',
    margin: 'auto',
    left: Dimensions.get('window').width / 2 - 40,
  },
});
