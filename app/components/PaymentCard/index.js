import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Typography as Typu } from 'antd';
const useStyles = makeStyles({
  root: {
    width: 230,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PaymentCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Paper
      className={classes.root}
      variant="outlined"
      elevation={0}
      square={false}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Payment Details
        </Typography>
        Acc No{bull}
        <Typu.Text type="warning" strong copyable>
          {props.accNo}
        </Typu.Text>
        <Divider variant="fullWidth" />
        <Typography className={classes.pos} color="textSecondary">
          Mode{bull}
          {props.mode}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Acc Name{bull}
          {props.accName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Bank{bull}
          {props.bank}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Branch{bull}
          {props.branch}
        </Typography>
        <Typography variant="body2" component="p">
          Instructions.
          <br />
          {props.instructions}
        </Typography>
      </CardContent>
    </Paper>
  );
}
