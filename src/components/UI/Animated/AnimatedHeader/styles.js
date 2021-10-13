import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: -60,
    width: '100%',
    height: 60,
    backgroundColor: '#52B788',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBackContainer: {
    position: 'absolute',
    left: 15
  },
  searchContainer: {
    position: 'absolute',
    right: 15
  }
});

export const inputStyle = StyleSheet.create({
  search: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white'
  }
});