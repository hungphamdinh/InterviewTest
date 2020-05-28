import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {textView} from '../../../ui/textView';
import {buttonStyle} from '../../../ui/button';
const DetailItems = props => {
  const {id, name, amount, type} = props.item;
  const setVisible = () => {
    props.dissmiss();
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={setVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={textView.txtinfoSecond}>Mã hàng: {id}</Text>
            <Text style={textView.txtinfoSecond}>Tên: {name}</Text>
            <Text style={textView.txtinfoSecond}>Số lượng: {amount}</Text>
            <Text style={textView.txtinfoSecond}>Loại: {type}</Text>
            <TouchableOpacity
              style={buttonStyle.btnAccept}
              onPress={setVisible}>
              <Text style={styles.textStyle}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  row: {
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailItems;
