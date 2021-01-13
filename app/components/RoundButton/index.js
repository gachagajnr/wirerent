import React from 'react';
import { Button } from 'antd';

export default function RoundButton(props) {
  return (
    <Button
      type={props.type ? props.type : 'primary'}
      size={props.size ? props.size : 'small'}
      shape="round"
      onClick={props.onClick}
      {...props}
    >
      {props.title}
    </Button>
  );
}
