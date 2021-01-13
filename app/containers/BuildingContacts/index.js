/**
 *
 * BuildingContacts
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
 import { Button, Layout, Table, Tooltip, Typography,Tag,Space } from 'antd';

import { ArrowLeftOutlined, PlusCircleFilled } from '@ant-design/icons';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import { makeSelectBuildingContacts } from './selectors';
import { getB_Contacts } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Text } = Typography;


export function BuildingContacts({ name, b_contacts, doGetB_Contacts }) {
  useInjectReducer({ key: 'buildingContacts', reducer });
  useInjectSaga({ key: 'buildingContacts', saga });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    doGetB_Contacts(id);
  }, [id]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a href="/#">{text}</a>,
    },
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
    },

    {
      title: 'Action',
      key: 'x',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small" style={{ marginRight: 16 }}>
            Edit
          </Button>
          <Button type="danger" size="small">
            Delete
          </Button>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>BuildingContacts</title>
        <meta name="description" content="Description of BuildingContacts" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Building Contacts`}
          // role={user.user.role}

          className="site-page-header"
          extra={[
            <Tooltip title="Create New Contact">
              <Link to={`/new_b_con/${id}`}>
                <Button
                  type="default"
                  size="small"
                  // icon={<PlusCircleFilled color="#fff" />}
                >
                  Add Contact
                </Button>
              </Link>
            </Tooltip>,
          ]}
        />
        <Layout className="site-layout">


          <Content style={{ marginTop: 55 }}>

                  <Table
                    rowKey="name"
                    columns={columns}
                    expandable={{
                      expandedRowRender: record => (
                        <>
                          <div style={{ margin: 0 }}>
                            {record.contacts.map(
                              re => `${re.name} ${re.phone}`,
                            )}
                          </div>
                        </>
                      ),
                    }}
                    dataSource={b_contacts}
                  />

          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

BuildingContacts.propTypes = {
  doGetB_Contacts: PropTypes.func,
  name: PropTypes.string,
  b_contacts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  b_contacts: makeSelectBuildingContacts(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetB_Contacts: id => dispatch(getB_Contacts(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingContacts);
