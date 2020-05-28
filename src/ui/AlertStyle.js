import {Alert} from 'react-native';
export const deleteAlert = action => {
  Alert.alert(
    'Xóa',
    'Bạn có chắc muốn xóa món hàng này không ?',
    [
      {
        text: 'Không',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: () => {
          action;
        },
      },
    ],
    {cancelable: false},
  );
};
