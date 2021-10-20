import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  notificationTabContainer: {
    position: 'absolute',
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    bottom: -300
  },
  modalBackground: {
    position: 'absolute',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    zIndex: -1
  }
});