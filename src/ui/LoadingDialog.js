import React from 'react';
import {ProgressDialog} from 'react-native-simple-dialogs';

const loadingDialog = props => {
  return (
    <ProgressDialog
      title="Đang xử lý"
      activityIndicatorColor="blue"
      activityIndicatorSize="large"
      message="Vui lòng đợi trong giây lát"
      visible={props.loading}
    />
  );
};
export default loadingDialog;
