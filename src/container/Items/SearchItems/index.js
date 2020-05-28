/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import {styles} from './style';
import {db} from '../../../configuration/firebase';
import LoadingDialog from '../../../ui/LoadingDialog';
const SearchBar = props => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    props.callBackSearchResult(itemsFound);
    console.log(itemsFound);
  }, [itemsFound, input]);

  const getItems = () => {
    db.ref('/items').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      setItems(data);
    });
  };

  const onSearchStoreItems = textInput => {
    setInput(textInput);
  };

  const itemFound = findItemData(input, items);

  const comp = (a, b) => {
    if (a && b !== undefined) {
      a.toLowerCase().trim() === b.toLowerCase().trim();
    }
  };

  var itemsFound =
    itemFound.length === 1 && comp(input, itemFound[0].name) ? [] : itemFound;

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  function findItemData(queryItem, itemList) {
    if (itemList !== undefined || itemList.length > 0) {
      if (queryItem === '') {
        return [];
      }
      var regEscape = escapeRegExp(queryItem);
      const regex = new RegExp(`${regEscape.trim()}`, 'i');
      return itemList.filter(item => item.name.search(regex) >= 0);
    }
  }

  return (
    <SafeAreaView style={styles.toolbar}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btnBack}>
          <Image
            source={
              Platform.OS === 'android'
                ? require('../../../resources/assets/back.png')
                : require('../../../resources/assets/iosback.png')
            }
            style={styles.imageNewFeed}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{flex: 0.9}}>
          <View style={styles.inputView}>
            <View style={styles.inputSearch}>
              <View style={styles.searchArea}>
                <Image
                  source={require('../../../resources/assets/iconsearch.png')}
                  style={styles.imageNewFeed}
                  resizeMode="contain"
                />
                <TextInput
                  style={{fontWeight: 'bold', color: 'black'}}
                  placeholder={'Tìm tên hàng'}
                  placeholderTextColor="gray"
                  onChangeText={onSearchStoreItems}
                  value={input}
                />
              </View>

              <View style={styles.btnDelete}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../resources/assets/icondelete.png')}
                    style={styles.imageNewFeed}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <LoadingDialog loading={loading} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
