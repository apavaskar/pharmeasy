import React from 'react';
import {connect} from 'react-redux';
import {SquerFullScreen} from '../../widgets/SquerContainer';

const ApprovalListComponent = props => {
  return <SquerFullScreen />;
};

const mapState = state => {
  return {};
};

const actions = {};

export default connect(mapState, actions)(ApprovalListComponent);
