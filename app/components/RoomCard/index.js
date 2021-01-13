import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { Tag, Button, Typography, Divider, Tooltip, Card } from 'antd';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    // padding: theme.spacing(2),
    // display: 'flex',
    // overflow: 'auto',
    flexDirection: 'column',
  },
  cardroot: {
    padding: theme.spacing(1),
    // paddingRight: theme.spacing(1)
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },

  details: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
  },

  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.red,
    // borderRadius: '50%',
    display: 'inline-flex',

    justifyContent: 'center',
    marginLeft: 'auto',
  },
  icon: {
    backgroundColor: '#87d068',

    // fontSize: '2rem',
    // height: '2rem',
    // width: '2rem'
  },
  footer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  actions: {
    color: theme.palette.text.primary,
  },
}));

function RoomCard(props) {
  const classes = useStyles();

  return (
    <Card bordered={false}>
      <div className={classes.content}>
        <div className={classes.details}>
          {props.iconComponent}
          <Divider type="vertical" style={{ color: '#001529' }} />

          <Typography
            className={classes.value}
            variant="h6"
            component="span"
            color="secondary"
          >
            {props.value}
          </Typography>
        </div>
        <div className={classes.iconWrapper}>
          <Tag color="#001529">{props.tagTitle}</Tag>
          {props.tagTop}
        </div>
      </div>
      <div className={classes.footer}>
        <Tooltip title={props.tooltipTitle}>
          <Link to={props.to} disabled={props.disabled}>
            <Button size="small" type="link">
              {props.buttonTitle}
            </Button>
          </Link>
        </Tooltip>
      </div>
    </Card>
    //  <Paper className={classes.cardroot}>
    //
    //     <div className={classes.iconWrapper}>
    //       <Tag color="#001529">{props.tagTitle}</Tag>
    //     </div>
    //   </div>
    //   <div className={classes.footer}>
    //     <Tooltip title={props.tooltipTitle}>
    //       <Link to={props.to}>
    //         <Button size="small" type="link">
    //           {props.buttonTitle}
    //         </Button>
    //       </Link>
    //     </Tooltip>
    //   </div>
    // </Paper>
  );
}
export default RoomCard;
