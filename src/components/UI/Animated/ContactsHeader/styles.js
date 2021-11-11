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
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export const textStyle = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginLeft: 60
  }
});

export const iconStyle = StyleSheet.create({
  search: {
    position: 'absolute',
    right: 15,
  },
  menu: {
    position: 'absolute',
    marginLeft: 15,
    borderRadius: 30,
    width: 25
  }
});