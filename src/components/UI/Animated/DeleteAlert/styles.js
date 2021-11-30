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
    height: 170,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20
  },
  alertTitle: {
    fontFamily: 'Roboto-Medium',
    color: 'black',
    fontSize: 18
  },
  alertDesc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#7e7e7e',
    marginTop: 5
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  deleteAction: {
    fontFamily: 'Roboto-Medium',
    color: 'red',
    fontSize: 14
  },
  cancelAction: {
    fontFamily: 'Roboto-Medium',
    color: '#4b4b4b'
  }
});