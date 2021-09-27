import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  titleContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export const textStyle = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#52B788',
    letterSpacing: 2
  }
});