import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#52B788',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export const iconStyle = StyleSheet.create({
  menu: {
    marginLeft: 15,
    borderRadius: 30,
    // width: 40
  },
  search: {
    marginRight: 15
  }
});

export const textStyle = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginLeft: 20
  }
});