import React from 'react';

import { Tabs } from 'antd';
import  Grid  from '@material-ui/core/Grid';

import { NotificationOutlined, PaperClipOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
export default function UnitTabs(props) {
  return (
    <Tabs type="card" tabBarGutter={2}>
      <TabPane
        tab={
          <span>
            <NotificationOutlined /> Alerts
          </span>
        }
        key="1"
      >
        {props.child0}
      </TabPane>
      <TabPane
        tab={
          <span>
            <PaperClipOutlined />
            Notices
          </span>
        }
        key="4"
      >
           {props.child1}

      </TabPane>
      <TabPane
        tab={
          <span>
            <PaperClipOutlined />
            Contacts
          </span>
        }
        key="5"
      >
        {props.child2}
      </TabPane>
      <TabPane
        tab={
          <span>
            <PaperClipOutlined />
            Emails/Sms
          </span>
        }
        key="6"
      >
        {props.child3}
      </TabPane>
    </Tabs>
  );
}
