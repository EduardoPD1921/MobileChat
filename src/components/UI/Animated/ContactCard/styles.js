import { StyleSheet } from 'react-native';

export const componentStyles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  contactInfoContainer: {
    flex: 7,
    height: 50,
    borderStyle: 'solid',
    borderBottomWidth: 0.3,
    borderBottomColor: '#cdcdcd'
  },
  image: {
    width: 40,
    height: 40
  },
  contactNameText: {
    fontFamily: 'Roboto-Medium',
    marginLeft: 10
  },
  contactPhoneNumber: {
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
    marginTop: 2,
    color: '#a0a0a0',
    fontSize: 13
  }
});