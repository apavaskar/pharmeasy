import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {certificateSelector} from '../../selectors/authSelector';
import {Text, VStack} from 'native-base';
import {loadNotificationsStartAction} from '../../redux/actions/dashboard/dashboardAction';
import {notificationsSelector} from '../../selectors/dashboardSelector';

const NotificationsComponent = props => {
  useEffect(() => {
    props.handleLoadNotifications({
      certificate: props.certificate,
    });
  }, [props.reload]);
  if (props.notifications.length === 0) {
    return <Text>No notifications</Text>;
  }
  return (
    <VStack>
      {props.notifications.map(notification => (
        <Text>{notification.text}</Text>
      ))}
    </VStack>
  );
};

const mapState = state => {
  const certificate = certificateSelector(state);
  const notifications = notificationsSelector(state);
  return {certificate, notifications};
};

const actions = {
  handleLoadNotifications: loadNotificationsStartAction,
};

export default connect(mapState, actions)(NotificationsComponent);
