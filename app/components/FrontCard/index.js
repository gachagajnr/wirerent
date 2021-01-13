import { Button, Divider, Tag, Tooltip, Typography } from 'antd';

import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import React from 'react';
const { Text } = Typography;

function FrontCard(props) {
  return (
    <Paper styles={{ padding: 16, backgroundColor: '#fff' }}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div
          style={{
            marginTop: 16,
            marginLeft: 8,
          }}
        >
          {props.iconComponent}
          <Divider type="vertical" style={{ color: '#001529' }} />

          <Text type="danger"   style={{fontWeight:'bold',fontSize:18}}>
            {props.value}
          </Text>
          <Text type="primary" color="secondary">
            {props.prefix}
          </Text>
        </div>
        <div
          style={{
            alignItems: 'center',
            // backgroundColor: 'red',
            // borderRadius: '50%',
            display: 'inline-flex',

            justifyContent: 'center',
            marginLeft: 'auto',
          }}
        >
          <Tag color="#777">{props.tagTitle}</Tag>
        </div>
      </div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <Tooltip title={props.tooltipTitle} color="cyan">
          <Link to={props.to}>
            <Button size="small" type="link">
              {props.buttonTitle}
            </Button>
          </Link>
        </Tooltip>
      </div>
    </Paper>
  );
}
export default FrontCard;
