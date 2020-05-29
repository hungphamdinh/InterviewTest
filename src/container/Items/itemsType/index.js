import React, {useState} from 'react';
import {Picker} from 'react-native';
import {styles} from './style';
const ItemsType = props => {
  const [value, setValue] = useState('');
  const types = [
    {Id: 0, Name: 'Tất cả', Value: ''},
    {Id: 1, Name: 'Áo', Value: 'Áo'},
    {Id: 2, Name: 'Quần', Value: 'Quần'},
  ];

  const setType = item => {
    setValue(item);
    props.setTypeName(item);
  };
  return (
    <Picker style={styles.picker} selectedValue={value} onValueChange={setType}>
      {types.map((s, i) => {
        return <Picker.Item key={i} value={s.Value} label={s.Name} />;
      })}
    </Picker>
  );
};

export default ItemsType;
