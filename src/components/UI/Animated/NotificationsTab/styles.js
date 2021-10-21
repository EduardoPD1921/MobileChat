import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  notificationTabContainer: {
    position: 'absolute',
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    bottom: -300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  }
});