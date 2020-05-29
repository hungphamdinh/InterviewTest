/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  Picker,
} from 'react-native';
import {styles} from './style';
import * as string from '../../../resources/string';
import * as firebaseService from '../../../service/firebaseAPI';
const SearchBar = props => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(string.NAME);

  useEffect(() => {
    props.callBackSearchResult(itemsFound, input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsFound, input]);

  useEffect(() => {
    setLoading(true);
    getItemsByType();
  }, [getItemsByType, props.typeName]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getItemsByType = async () => {
    if (props.typeName !== '') {
      const data = await firebaseService.getItemToSearchByTypes(props.typeName);
      setItems(data);
    } else {
      const data = await firebaseService.getItemToSearch();
      setItems(data);
    }
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
    itemFound.length === 1 &&
    comp(
      input,
      selectedValue === string.NAME ? itemFound[0].name : itemFound[0].id,
    )
      ? []
      : itemFound;

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
      if (selectedValue === string.NAME) {
        return itemList.filter(item => item.name.search(regex) >= 0);
      }
      return itemList.filter(item => item.id.search(regex) >= 0);
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
                  placeholder={'Tìm theo ' + selectedValue}
                  placeholderTextColor="gray"
                  onChangeText={onSearchStoreItems}
                  value={input}
                />
              </View>

              <View style={styles.btnDelete}>
                <Picker
                  selectedValue={selectedValue}
                  style={{height: 50, width: 50}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Tên" value={string.NAME} />
                  <Picker.Item label="Mã" value={string.ID} />
                </Picker>
              </View>
              {/* <LoadingDialog loading={loading} /> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
