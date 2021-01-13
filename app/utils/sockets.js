import { GET_AGENCY } from 'containers/Agency/constants';
import app from './api';
import { createEmailSuccess } from 'containers/AgencyMassEmails/actions';
import { getAgency } from 'containers/Agency/actions';
import {message} from 'antd'

const setupSocket = dispatch => {
  const socket = app;
  socket.on('disconnect', reason => {
    // Show offline message
    // console.log('DISCONNECT', reason);
    message.info('You have disconnected from server');
  });
  socket.on('authenticated', login => {
    // Get all users and messages
    message.success('You are authenticated with server' );
  });
  socket.on('connect', login => {
    socket.emit(
      'create',
      'authentication',
      {
        strategy: 'jwt',
        accessToken: authResult.accessToken,
      },
      function(error, newAuthResult) {
        console.log(newAuthResult);
      },
    );
    message.info('You are connected to server');
  });

  socket.io.on('mass-emails created', event => {
    dispatch(getAgency(event.organization));
    //  break;

    //  case types.ADD_USER:
    //    //dispatch(addUser(data.name));
    //    break;
    //  case types.USERS_LIST:
    //    //dispatch(populateUsersList(data.users));
    //    break;
    //  default:
    //    break;
    // }
  });

  return socket;
};

export default setupSocket;
