import RNFetchBlob from 'react-native-fetch-blob';
import {BASE_URL, BASE_URL_TEST} from './URL';

let upload = (data) => {
  return RNFetchBlob.fetch(
    'POST',
    `${BASE_URL}/api/upload`,
    {
      Authorization: 'Bearer access-token',
      otherHeader: 'foo',
      'Content-Type': 'multipart/form-data',
    },
    data,
  );
};

module.exports = upload;
