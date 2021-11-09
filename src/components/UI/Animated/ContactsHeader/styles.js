import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#52B788',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  otherOptionsContainer: {
    flex: 1,
    alignItems: 'flex-end'
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

export const iconStyle = StyleSheet.create({
  search: {
    marginRight: 15
  }
});