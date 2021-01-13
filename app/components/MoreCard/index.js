import { Button, Col, Divider, Row, Statistic, Tooltip } from 'antd';

import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  cardroot: {
    padding: theme.spacing(1),
  },

  value: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.red,
    display: 'inline-flex',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  icon: {
    backgroundColor: '#87d068',
  },
  footer: {
    padding:2,
    // alignItems: 'right',
  },

}));

function MoreCard(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.cardroot}>
      <Row>
        <Col flex={1}>
          <Statistic
            prefix={props.prefix}
            title={props.statTitle}
            value={props.value}
            precision={props.precision}
            suffix={props.suffix}
          />
        </Col>
        <Col flex="100px">
          <Tooltip title={props.tooltipActionTitle}>
            <Link to={props.to}>
              <Button style={{ alignSelf: 'auto' }}>
                {props.buttonAction}
              </Button>
            </Link>
          </Tooltip>
        </Col>
      </Row>
        <Tooltip title={props.tooltipTitle}>
          <Link to={props.to}>
            <Button size="small" type="link">
              {props.buttonTitle}
            </Button>
          </Link>
        </Tooltip>

    </Paper>
  );
}
export default MoreCard;
