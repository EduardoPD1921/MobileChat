import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  notificationTabContainer: {
    position: 'absolute',
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    bottom: -400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 20
  },
  modalBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  gestureIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  gestureIndicator: {
    width: 35,
    height: 5,
    backgroundColor: '#c6c6c6',
    borderRadius: 30
  }
});

export const textStyle = StyleSheet.create({
  notificationTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    margin: 20
  }
});