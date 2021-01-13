import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Button, Space, Typography, Card } from 'antd';
import Chip from '@material-ui/core/Chip';
import Can from 'utils/Can';
import RoundButton from '../RoundButton/index';
const { Title, Text } = Typography;

export default function ContentCard(props) {
  return (
    <Card style={{ backgroundColor: '#f0f2f5' }}>
      <Grid container direction="column">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Space align="start" direction="horizontal">
            <RoundButton type="dashed" size="default" title={props.floor} />
            <Link to={`/utra/${props.id}`}>
              <RoundButton size="default" title="My Transactions" />
            </Link>
          </Space>
          <Title level={3}> {props.type}</Title>
          <Space align="end" direction="vertical">
            <Title level={4}> {props.rent}</Title>
            {'Mtr No'}
            <Text strong copyable>
              {props.meterNo}
            </Text>
          </Space>
        </Grid>
        <Title level={4}>Features</Title>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Space>{props.features}</Space>
        </Grid>
        <Title level={4}>Bills</Title>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Space align="baseline">{props.bills}</Space>
        </Grid>
        <Title level={4}>Actions</Title>
        <Can do="read" on="TenantMenu" field="tenant">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Space align="baseline">
              {props.moveoutRequested ? (
                <RoundButton
                  onClick={props.cancelRequestMoveOut}
                  danger
                  title="Cancel Moving Out"
                />
              ) : (
                <RoundButton
                  onClick={props.requestMoveOut}
                  title="Request Moving Out"
                />
              )}

              <RoundButton title="Make A Request" />
            </Space>
          </Grid>
        </Can>
        <Can do="read" on="SpecialMenu" field="special">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Space align="baseline">
              <RoundButton title="Send Email" onClick={props.sendEmail} />

              <RoundButton onClick={props.sendSms} title="  Send Sms" />
              <RoundButton
                onClick={props.sendSpecialNotice}
                danger
                title="Special Notice"
              />
              <RoundButton
                onClick={props.removeUser}
                danger
                title="Remove User"
              />
            </Space>
          </Grid>
        </Can>
      </Grid>
    </Card>
  );
}
