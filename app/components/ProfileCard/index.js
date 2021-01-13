import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import RoundButton from '../RoundButton/index';

export default function ProfileCard(props) {
  return (
    <Card style={{ backgroundColor: '#f0f2f5' }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs>
          <Avatar size={120} gap={4} >
            <h2>{props.icon}</h2>
          </Avatar>
        </Grid>
        <Grid item xs>
          <Link to={`/profile/${props.user}`}>
            <RoundButton title="My Profile" />
          </Link>
        </Grid>

        <Grid item xs>
          <Link to={`/chats/${props.id}`}>
            <RoundButton title="Chat" />
          </Link>
        </Grid>

        <Grid item xs>
          <Link to={`/ureq/${props.id}`}>
            <RoundButton title="My Requests" />
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}
