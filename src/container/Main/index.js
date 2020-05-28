/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {View, Text, CheckBox} from 'react-native';
import {styles} from './style';
const index = props => {
  const [doneState, setDone] = useState(false);
  const {name} = props.todoItem;

  const onCheck = () => {
    setDone(!doneState);
  };
  return (
    <View style={styles.todoItem}>
      <CheckBox
        onValueChange={onCheck}
        value={doneState}
        // disabled={doneState}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        {name}
      </Text>
    </View>
  );
};
export default index;
