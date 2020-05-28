/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {styles} from './style';
import {db} from '../../configuration/firebase';
import {textView} from '../../ui/textView';
import LoadingDialog from '../../ui/LoadingDialog';
import SearchBar from './SearchItems/index';
const index = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    db.ref('/items').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      setItems(data);
    });
  };

  const getSearchItemResult = searchItems => {
    setSearchResult(searchItems);
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.prevLateVal = value;
    });
    return ref.prevLateVal;
  }

  const prevLateVal = usePrevious(searchResult);
  const renderStoreItems = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.storeItem}
        // onPress={() => onPressStoreItems(item)}
      >
        <View style={styles.columnFlex}>
          <Text style={textView.txtinfoSecond}>Tên hàng: {item.name}</Text>
          <Text style={textView.txtinfoSecond}>Loại: {item.type}</Text>
          <Text style={textView.txtinfoSecond}>Số lượng: {item.amount}</Text>
        </View>
        <View style={styles.columnFlex}>
          <Image
            style={styles.imageNewFeed}
            source={
              item.imageUri !== undefined
                ? {uri: item.imageUri.uri}
                : require('../../resources/assets/chooseimage.jpg')
            }
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar callBackSearchResult={getSearchItemResult} />
      <View>
        <FlatList
          data={
            !(searchResult === undefined || searchResult.length === 0)
              ? searchResult
              : items
          }
          keyboardShouldPersistTaps="handled"
          //renderItem={renderInventory}
          renderItem={renderStoreItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <LoadingDialog loading={loading} />
    </SafeAreaView>
  );
};
export default index;
