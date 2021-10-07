import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    width: '100%',
    bottom: -40,
    alignItems: 'center'
  },
  snackbarContainer: {
    backgroundColor: '#3BBD9F',
    width: '90%',
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export const iconStyle = StyleSheet.create({
  verifiedIcon: {
    color: '#B7E4C7',
    marginLeft: 20,
    marginRight: 10
  },
  closeIcon: {
    color: '#B7E4C7',
    marginLeft: '20%'
  }
});

export const textStyle = StyleSheet.create({
  snackbarText: {
    color: '#B7E4C7',
    fontFamily: 'Poppins-Regular'
  }
});