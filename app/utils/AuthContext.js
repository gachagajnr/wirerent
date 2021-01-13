import React, { createContext, useEffect, useReducer } from 'react';
import app, { authManagement, users } from './api';
import { globalReducer, initialState } from 'containers/App/reducer';
import { loginSuccess, logout } from 'containers/App/actions';
import { useHistory, useLocation } from 'react-router-dom';

import { messsage } from 'antd';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' } };

  const [user, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUser = async () => {
      await app
        .reAuthenticate()
        .then(res => {
          dispatch(
            loginSuccess({
              email: res.user.email,
              id: res.user._id,
              role: res.user.role,
              organization: res.user.organization,
              resetPassword: res.user.resetPassword,
              isAuthenticated: true,
              isVerified: res.user.isVerified,
              hasOrganization: res.user.hasOrganization,
              organization_name: res.user.organization_name,
            }),
          );

          history.replace(from);
          // toast.success('Logged In');
        })
        .catch(e => {
          //  dispatch({ type: 'AUTH_ERROR' });
          if (!abortController.signal.aborted) {
            //  dispatch({ type: 'AUTH_ERROR' });
          }
        });
    };

    fetchUser();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [user.user.email]);

  // signup user
  async function signup(user) {
    try {
      const res = await users.create(user);

      history.push({
        pathname: '/registersuccess',
        state: { detail: res.email },
      });
      message.success('Account has been created Successsfully ');
    } catch (error) {
      console.log(error);
      message.error('Account Creation Failed ');
    }
  }
  // verify signup
  async function verifySignup(token) {
    try {
      await authManagement.create({
        action: 'verifySignupLong',
        value: token,
      });
      history.push('/');
      message.success('Account Verified Successfully ');
    } catch (error) {
      console.log(error);
      message.error('Account Verification Failed ');
    }
  }
  // forgot password
  async function forgetPassword(data) {
    try {
      await authManagement.create({
        action: 'sendResetPwd',
        value: { email: data.email },
      });
      message.success('Password Request Submitted Successfully ');
    } catch (error) {
      console.log(error);
      message.error('Action Failed ');
    }
  }

  // reset password
  async function resetPassword(data) {
    try {
      await authManagement.create({
        action: 'resetPwdLong',
        value: {
          token: data.token, // compares to .resetToken
          password: data.password, // new password
        },
      });
      history.push('/login');
      message.success('Account Password Reset ');
    } catch (error) {
      message.error('Account Reset Password Failed ');
    }
  }

  // login user
  async function login(user) {
    await app
      .authenticate({
        strategy: 'local',
        email: user.email,
        password: user.password,
      })
      .then(res => {
        dispatch(
          loginSuccess({
            email: res.user.email,
            id: res.user._id,
            role: res.user.role,
            organization: res.user.organization,
            resetPassword: res.user.resetPassword,
            isAuthenticated: true,
            isVerified: res.user.isVerified,
            hasOrganization: res.user.hasOrganization,
            organization_name: res.user.organization_name,
          }),
        );

        history.replace(from);
        message.success('Logged In Successfully ');
      })
      .catch(e => {
        console.log(e);
        // dispatch({ type: 'AUTH_ERROR' });
        message.error('Login Failed, Check Details ');
      });
  }
  // logout user
  async function logout() {
    try {
      app.logout();
      // dispatch(logout({user:''}));

      history.push('/login');
      message.success('Logged Out Successfully ');
    } catch (error) {
      message.error('Logging Out Failed');
    }
  }
  // change password
  async function changePassword(data) {
    console.log(data);
    try {
      const res = await authManagement.create({
        action: 'passwordChange',
        value: {
          user: { email: data.email }, // identify user, e.g. {email: 'a@a.com'}. See options.identifyUserProps.
          oldPassword: data.oldPassword, // old password for verification
          password: data.password, // new password
        },
      });
      console.log(res);
      if (res.email) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifySignup,
        changePassword,
        forgetPassword,
        resetPassword,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

// const { user } = await app.get('authentication');
// console.log(user);
