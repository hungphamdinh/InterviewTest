import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15
  },

  row: {
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  inputView: {
    marginVertical: 10,
    marginRight: 15,
    marginLeft: 10,
    backgroundColor: '#F5FCFF',
    shadowColor: 'rgba(0, 0, 0, 1)',
    elevation: 20,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  inputSearch: {
    flexDirection: 'row',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 0.5,
  },
  toolbar: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 1)',
    elevation: 5,
    shadowRadius: 15,
    shadowOffset: {
      width: 1,
      height: 13,
    },
  },

  searchArea: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageNewFeed: {
    width: 18,
    height: 18,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  btnBack: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  btnDelete: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
