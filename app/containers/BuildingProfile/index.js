/**
 *
 * BuildingProfile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory } from 'react-router-dom';
import {
  PageHeader,
  Divider,
  Col,
  Row,
  Typography,
  Tag,
  Popconfirm,
  Tooltip,
  Button,
} from 'antd';
import { DeleteFilled } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectBuilding } from 'containers/Building/selectors';
import makeSelectBuildingProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

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
export function BuildingProfile({ building }) {
  useInjectReducer({ key: 'buildingProfile', reducer });
  useInjectSaga({ key: 'buildingProfile', saga });
  const history = useHistory();
  return (
    <div>
      <Helmet>
        <title>BuildingProfile</title>
        <meta name="description" content="Description of BuildingProfile" />
      </Helmet>
      <div>
        <PageHeader
          // style={{ backgroundColor: '#2db7f5', marginBottom: 10 }}
          className="site-page-header"
          onBack={() => history.goBack()}
          title={<Typography variant="h6">{building.name} Profile</Typography>}
          // breadcrumb={{ routes }}
        />
        <p
          className="site-description-item-profile-p"
          style={{ ...pStyle, marginBottom: 24 }}
        >
          <Tag>Building Info</Tag>
        </p>

        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={building.name} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Location" content={building.location} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Street Name" content={building.street} />
          </Col>

          <Col span={12}>
            <DescriptionItem title="Country" content="Kenya" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Description"
              content={building.description}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Total Units" content={building.total} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Floors" content={building.floors} />
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p" style={pStyle}>
          <Tag>Company</Tag>
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Caretaker Name"
              content={building.caretaker1Name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Caretaker Tel 1"
              content={building.caretaker1Phone1}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Caretaker Tel 2"
              content={building.caretaker1Phone2}
            />
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p" style={pStyle}>
          <Tag>Statistics</Tag>
        </p>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Units" content={building.units.length} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="miscellaneous"
              content={building.miscellaneous.map(item => (
                <Tag color="magenta">{item}</Tag>
              ))}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Admins" content={building.admins.length} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Popconfirm
              title="Are you sure delete this Building?"
              onConfirm={() => deleteBuilding(id)}
              onCancel={() => console.log()}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Building">
                <Button danger icon={<DeleteFilled style={{ color: 'red' }} />}>
                  Delete Building
                </Button>
              </Tooltip>
            </Popconfirm>
            ,
          </Col>
        </Row>
      </div>
    </div>
  );
}

BuildingProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  building: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  buildingProfile: makeSelectBuildingProfile(),
  building: makeSelectBuilding(),
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
)(BuildingProfile);
