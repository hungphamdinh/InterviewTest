import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {textView} from '../../../ui/textView';
import {buttonStyle} from '../../../ui/button';
const DetailItems = props => {
  const {id, name, amount, type, imageUri} = props.item;
  const setVisible = () => {
    props.dissmiss();
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={setVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.row}>
              <View style={styles.halfColumn}>
                <Image
                  style={styles.imageNewFeed}
                  source={
                    imageUri !== ''
                      ? {uri: imageUri}
                      : require('../../../resources/assets/chooseimage.jpg')
                  }
                  resizeMode="contain"
                />
              </View>
              <View style={styles.halfColumn}>
                <Text style={textView.txtinfoSecond}>Mã hàng: {id}</Text>
                <Text style={textView.txtinfoSecond}>Tên: {name}</Text>
                <Text style={textView.txtinfoSecond}>Số lượng: {amount}</Text>
                <Text style={textView.txtinfoSecond}>Loại: {type}</Text>
              </View>
            </View>

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
  halfColumn: {
    flexDirection: 'column',
    flex: 0.5,
  },
  modalView: {
    padding: 10,
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
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
  imageNewFeed: {
    width: 150,
    height: 150,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailItems;
