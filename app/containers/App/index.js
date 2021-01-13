// import 'antd/dist/antd.css';

import { Route, Switch } from 'react-router-dom';

import AddBuildingLocation from 'containers/AddBuildingLocation/Loadable';
import AddBuildingPaymentInfo from 'containers/AddBuildingPaymentInfo/Loadable';
import AddNewAgency from 'containers/AddNewAgency/Loadable';
import AddNewAgencyTeam from 'containers/AddNewAgencyTeam/Loadable';
import AddNewBuildingNotice from 'containers/AddNewBuildingNotice/Loadable';
import AddRequests from 'containers/AddRequests/Loadable';
import AddUnitTransaction from 'containers/AddUnitTransaction/Loadable';
import Agencies from 'containers/Agencies/Loadable';
import Agency from 'containers/Agency/Loadable';
import AgencyAdmins from 'containers/AgencyAdmins/Loadable';
import AgencyMassEmails from 'containers/AgencyMassEmails/Loadable';
import AgencyMassSms from 'containers/AgencyMassSms/Loadable';
import AgencyProfile from 'containers/AgencyProfile/Loadable';
import AgencySingleEmails from 'containers/AgencySingleEmails/Loadable';
import AgencySingleSms from 'containers/AgencySingleSms/Loadable'
import AgencyTeams from 'containers/AgencyTeams/Loadable';
import AssignExistingRoom from 'containers/AssignExistingRoom/Loadable';
import AssignRoom from 'containers/AssignRoom/Loadable';
import AssignTenant from 'containers/AssignTenant/Loadable';
import AuthContextProvider from 'utils/AuthContext';
import Building from 'containers/Building/Loadable';
import BuildingAdmins from 'containers/BuildingAdmins/Loadable';
import BuildingBills from  'containers/BuildingBills/Loadable'
import BuildingContacts from 'containers/BuildingContacts/Loadable';
import BuildingMassEmails from 'containers/BuildingMassEmails/Loadable';
import BuildingMassSms from 'containers/BuildingMassSms/Loadable';
import BuildingNotices from 'containers/BuildingNotices/Loadable';
import BuildingPaymentInfo from 'containers/BuildingPaymentInfo/Loadable';
import BuildingProfile from 'containers/BuildingProfile/Loadable';
import BuildingRequests from 'containers/BuildingRequests/Loadable';
import BuildingTenants from 'containers/BuildingTenants/Loadable';
import BuildingTransactions from 'containers/BuildingTransactions/Loadable';
import BuildingUnits from 'containers/BuildingUnits/Loadable';
import Buildings from 'containers/Buildings/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import ForgetPassword from 'containers/ForgetPassword/Loadable';
import GlobalStyle from '../../global-styles';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NewAgencyAdmin from 'containers/NewAgencyAdmin/Loadable';
import NewBuilding from 'containers/NewBuilding/Loadable';
import NewBuildingAdmin from 'containers/NewBuildingAdmin/Loadable';
import NewBuildingContact from 'containers/NewBuildingContact/Loadable';
import NewUnit from 'containers/NewUnit/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'utils/PrivateRoute';
import PropTypes from 'prop-types';
import QuickView from 'containers/QuickView/Loadable';
import React from 'react';
import RegisterSuccess from 'containers/RegisterSuccess/index';
import RequestDetails from 'containers/RequestDetails/Loadable';
import RequestRoom from 'containers/RequestRoom/Loadable';
import Requests from 'containers/Requests/Loadable';
import ResetPassword from 'containers/ResetPassword/index';
import { RoleAbilityProvider } from 'utils/ability';
import SignUpPage from 'containers/SignUpPage/Loadable';
import Tenant from 'containers/Tenant/Loadable';
import Tenants from 'containers/Tenants/Loadable';
import Transactions from 'containers/Transactions/Loadable';
import Unit from 'containers/Unit/Loadable';
import UnitRequests from 'containers/UnitRequests/Loadable';
import UnitTransactions from 'containers/UnitTransactions/Loadable';
import Units from 'containers/Units/Loadable';
import VerifyAccount from 'containers/VerifyAccount/index';
import VerifySignUp from 'containers/VerifySignUp/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selectors';

/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <RoleAbilityProvider>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={SignUpPage} />
            <Route exact path="/verify" component={VerifySignUp} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route
              exact
              path="/registersuccess"
              component={RegisterSuccess}
            />
            <Route exact path="/forget_password" component={ForgetPassword} />

            <PrivateRoute>
              <Dashboard path="/dashboard">
                <Route exact path="/new_age" component={AddNewAgency} />
                <Route
                  exact
                  path="/verifyaccount"
                  component={VerifyAccount}
                />
                <Route exact path="/dashboard" component={QuickView} />
                <Route exact path="/agent" component={Agency} />
                <Route exact path="/agencies" component={Agencies} />
                <Route exact path="/ate" component={AgencyTeams} />
                <Route exact path="/new_ate" component={AddNewAgencyTeam} />
                <Route exact path="/apro" component={AgencyProfile} />
                <Route exact path="/amas" component={AgencyMassEmails} />
                <Route
                  exact
                  path="/single_emails"
                  component={AgencySingleEmails}
                />
                <Route
                  exact
                  path="/single_sms"
                  component={AgencySingleSms}
                />

                <Route exact path="/asms" component={AgencyMassSms} />
                <Route exact path="/aadm" component={AgencyAdmins} />
                <Route exact path="/a_ten/:id" component={AssignTenant} />
                <Route exact path="/buildings" component={Buildings} />
                <Route exact path="/new_building" component={NewBuilding} />
                <Route exact path="/reqroom" component={RequestRoom} />
                <Route exact path="/add_reqs" component={AddRequests} />
                <Route exact path="/assign/:id" component={AssignRoom} />
                <Route exact path="/req_det/:id" component={RequestDetails} />
                <Route exact path="/add_b_loc/:id" component={AddBuildingLocation} />

                <Route
                  exact
                  path="/existing/:id"
                  component={AssignExistingRoom}
                />

                <Route
                  exact
                  path="/new_b_adm/:id"
                  component={NewBuildingAdmin}
                />
                <Route exact path="/new_a_adm" component={NewAgencyAdmin} />
                <Route
                  exact
                  path="/new_b_con/:id"
                  component={NewBuildingContact}
                />
                <Route
                  exact
                  path="/new_b_not/:id"
                  component={AddNewBuildingNotice}
                />
                <Route
                  exact
                  path="/b_loc/:id"
                  component={AddBuildingLocation}
                />
                <Route
                  exact
                  path="/new_b_pay/:id"
                  component={AddBuildingPaymentInfo}
                />
                <Route
                  exact
                  path="/new_u_tra/:id"
                  component={AddUnitTransaction}
                />
                <Route exact path="/new_un/:id" component={NewUnit} />
                <Route exact path="/x/:id" component={Building} />
                <Route exact path="/xun/:id" component={BuildingUnits} />
                <Route exact path="/xte/:id" component={BuildingTenants} />
                <Route exact path="/xbi/:id" component={BuildingBills} />

                <Route
                  exact
                  path="/xtra/:id"
                  component={BuildingTransactions}
                />
                <Route exact path="/xadm/:id" component={BuildingAdmins} />
                <Route exact path="/xcon/:id" component={BuildingContacts} />
                <Route exact path="/xreq/:id" component={BuildingRequests} />
                <Route exact path="/xnot/:id" component={BuildingNotices} />
                <Route
                  exact
                  path="/xpay/:id"
                  component={BuildingPaymentInfo}
                />
                <Route exact path="/xinf/:id" component={BuildingProfile} />
                <Route exact path="/xsms/:id" component={BuildingMassSms} />
                <Route
                  exact
                  path="/xema/:id"
                  component={BuildingMassEmails}
                />
                <Route exact path="/udas/:id" component={Unit} />
                <Route exact path="/utra/:id" component={UnitTransactions} />
                <Route exact path="/ureq/:id" component={UnitRequests} />
                <Route exact path="/uten/:id" component={Tenant} />
                <Route exact path="/units" component={Units} />
                <Route exact path="/moving" component={Tenants} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/requests" component={Requests} />
              </Dashboard>
            </PrivateRoute>
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </RoleAbilityProvider>
      </AuthContextProvider>
     </div>
  );
}
