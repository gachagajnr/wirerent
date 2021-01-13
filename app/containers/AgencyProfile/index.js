/**
 *
 * AgencyProfile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  Divider,
  Typography,
  Col,
  Row,
  Tag,
  Popconfirm,
  Tooltip,
  Button,
  Layout,
} from 'antd';

import {
  DeleteFilled,
  ArrowLeftOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import {
  makeSelectAgency,
  makeSelectBuildings,
  makeSelectUnits,
  makeSelectAdmins,
} from 'containers/Agency/selectors';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectAgencyProfile } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;

const pStyle = {
  fontSize: 16,
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);
export function AgencyProfile({ agency, buildings, admins, units }) {
  useInjectReducer({ key: 'agencyProfile', reducer });
  useInjectSaga({ key: 'agencyProfile', saga });
  const history = useHistory();
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>AgencyProfile</title>
        <meta name="description" content="Description of AgencyProfile" />
      </Helmet>
      <Layout>
         <GlobalHeader
          title={`${agency.name} Info`}
          className="site-page-header"
          extra={[]}
        />

          <Content style={{ marginTop: 55 ,padding:30 }}>
            <p
              className="site-description-item-profile-p"
              style={{ ...pStyle, marginBottom: 24 }}
            >
              <Tag>Agency Info</Tag>
            </p>

            <Row>
              <Col span={12}>
                <DescriptionItem title="Name" content={agency.name} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Email" content={agency.email} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content={agency.city} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content="Kenya" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Phone" content={agency.phone} />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Website"
                  content={<a href={agency.website}>{agency.website}</a>}
                />
              </Col>
            </Row>

            <Divider />
            <p className="site-description-item-profile-p" style={pStyle}>
              <Tag>Company</Tag>
            </p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Address" content={agency.address} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Street" content={agency.street} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Headquarters"
                  content={agency.headquarters}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="City"
                  content={<a href="/#">{agency.city}</a>}
                />
              </Col>
            </Row>

            <Divider />
            <p className="site-description-item-profile-p" style={pStyle}>
              <Tag>Statistics</Tag>
            </p>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Buildings" content={buildings.length} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Rooms" content={units.length} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Admins" content={admins.length} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Popconfirm
                  title="Are you sure delete this Agency?"
                  onConfirm={() => deleteAgency(id)}
                  onCancel={() => alert('mo')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete Agency">
                    <Button
                      danger
                      icon={<DeleteFilled style={{ color: 'red' }} />}
                    >
                      Delete Agency
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </Col>
            </Row>
          </Content>

      </Layout>
    </div>
  );
}

AgencyProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  agency: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  agencyProfile: makeSelectAgencyProfile(),
  agency: makeSelectAgency(),
  buildings: makeSelectBuildings(),
  units: makeSelectUnits(),
  admins: makeSelectAdmins(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyProfile);
