/* eslint-disable prettier/prettier */
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
import {textView} from '../../ui/textView';
import SearchBar from './SearchItems/index';
import DetailItem from './DetailItems/index';
import * as string from '../../utils/string';
import ItemsType from './itemsType/index';
import * as firebaseService from '../../service/firebaseAPI';
const index = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(string.INITIALIZED_ITEMS);
  const [visible, setVisible] = useState(false);
  const [detailItem, setDetailItem] = useState({});
  const [typeName, setTypeName] = useState('');

  useEffect(() => {
    setLoading(true);
    getItemsByType();
    console.log(limit)
  }, [getItemsByType, limit, typeName]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getItemsByType = async () => {
    if (typeName !== '') {
      const data = await firebaseService.getItemEachType(limit,typeName);
      setItems(data);
      checkMaxLimit(data);
      setLoading(false);
    } else {
      const data = await firebaseService.getItemAllType(limit);
      setItems(data);
      checkMaxLimit(data);
      setLoading(false);
    }
  };

  const getTypeValue = value => {
    setTypeName(value);
  };
  const checkMaxLimit = data => {
    if (limit > data.length) {
      setLimit(data.length);
    }
  };

  const getSearchItemResult = (searchItems, textInput) => {
    setSearchResult(searchItems);
    setInputSearch(textInput);
  };
  console.disableYellowBox = true;
  const retrivedMore = () => {
    setLimit(limit + string.LOAD_MORE_ITEMS);
  };
  console.log(inputSearch)
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
          <Image
            style={styles.imageNewFeed}
            source={
              item.imageUri !== ''
                ? {uri: item.imageUri}
                : require('../../resources/assets/chooseimage.jpg')
            }
            resizeMode="contain"
          />
        </View>
        <View style={styles.columnFlex}>
          <Text style={textView.txtinfoSecond}>Mã hàng: {item.id}</Text>
          <Text style={textView.txtinfoSecond}>Tên hàng: {item.name}</Text>
          <Text style={textView.txtinfoSecond}>Loại: {item.type}</Text>
          <Text style={textView.txtinfoSecond}>Số lượng: {item.amount}</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar callBackSearchResult={getSearchItemResult} typeName ={typeName}/>
      <View>
        <ActivityIndicator animating={loading} />
        <DetailItem
          isVisible={visible}
          item={detailItem}
          dissmiss={dissmissModal}
        />
        <ItemsType setTypeName={getTypeValue} />
        <FlatList
          style={styles.itemList}
          data={
            !(searchResult === undefined || searchResult.length === 0)
              ? searchResult
              : inputSearch !== '' ? [] : items
          }
          keyboardShouldPersistTaps="handled"
          renderItem={renderItems}
          onEndReached={retrivedMore}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default index;
