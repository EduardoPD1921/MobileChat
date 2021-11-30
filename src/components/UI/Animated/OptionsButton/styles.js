import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  mainIconContainer: {
    position: 'absolute',
    backgroundColor: '#52B788',
    width: 60,
    height: 60,
    bottom: 15,
    right: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15
  },
  contactIconContainer: {
    position: 'absolute',
    backgroundColor: '#0EABF4',
    width: 40,
    height: 40,
    bottom: 20,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  pressableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});