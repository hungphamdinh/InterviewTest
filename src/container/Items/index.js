/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {db} from '../../configuration/firebase';
import {textView} from '../../ui/textView';
import SearchBar from './SearchItems/index';
import DetailItem from './DetailItems/index';
import * as string from '../../utils/string';
const index = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(string.INITIALIZED_ITEMS);
  const [visible, setVisible] = useState(false);
  const [detailItem, setDetailItem] = useState({});

  useEffect(() => {
    setLoading(true);
    getItemsAndCheckLimit();
  }, [getItemsAndCheckLimit, limit]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getItemsAndCheckLimit = () => {
    console.log(limit);
    db.ref('/items')
      .orderByChild('id')
      .limitToFirst(limit)
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setItems(data);
        checkMaxLimit(data);
        setLoading(false);
      });
  };

  const checkMaxLimit = data => {
    if (limit > data.length) {
      setLimit(data.length);
    }
  };

  const getSearchItemResult = searchItems => {
    setSearchResult(searchItems);
  };

  const retrivedMore = () => {
    setLimit(limit + string.LOAD_MORE_ITEMS);
  };

  const renderFooter = () => {
    try {
      if (loading) {
        return <ActivityIndicator animating={loading} />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = item => {
    setVisible(true);
    setDetailItem(item);
  };
  const dissmissModal = () => {
    setVisible(false);
  };
  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.storeItem}
        onPress={() => openModal(item)}>
        <View style={styles.columnFlex}>
          <Text style={textView.txtinfoSecond}>Mã hàng: {item.id}</Text>
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
        <DetailItem
          isVisible={visible}
          item={detailItem}
          dissmiss={dissmissModal}
        />
        <FlatList
          data={
            !(searchResult === undefined || searchResult.length === 0)
              ? searchResult
              : items
          }
          keyboardShouldPersistTaps="handled"
          //renderItem={renderInventory}
          renderItem={renderItems}
          onScrollEndDrag={retrivedMore}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default index;
