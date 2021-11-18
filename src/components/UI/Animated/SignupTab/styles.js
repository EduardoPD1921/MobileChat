import { StyleSheet } from 'react-native';

export const signupTabStyles = StyleSheet.create({
  signupTabContainer: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10
  },
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    backgroundColor: 'black',
    zIndex: -1
  },
  closeButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 15
  }
});