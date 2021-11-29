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
    alignItems: 'center'
  },
  alertContainer: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    // top: '35%'
  }
});