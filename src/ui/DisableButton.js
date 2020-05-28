/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {buttonStyle} from './button';
import {textView} from './textView';
const disableButton = props => {
  const [onDisable, setOnDisable] = useState(props.checkDisable);
  useEffect(() => {
    setOnDisable(props.checkDisable);
  }, [props.checkDisable]);
  return (
    <TouchableOpacity
      style={!onDisable ? buttonStyle.btnAccept : buttonStyle.btnAcceptDisable}
      onPress={props.handleAcceptBtn}
      disabled={onDisable}>
      <Text style={textView.txtAccept}>XÁC NHẬN</Text>
    </TouchableOpacity>
  );
};
export default disableButton;
