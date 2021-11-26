import { StyleSheet } from 'react-native';

export const deleteAlertStyles = StyleSheet.create({
  backdropContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10
  },
  alertContainer: {
    width: 200,
    height: 100,
    backgroundColor: 'blue'
  }
});