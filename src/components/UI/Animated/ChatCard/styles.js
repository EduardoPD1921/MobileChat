import { StyleSheet } from 'react-native';

export const chatCardStyles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1
  },
  chatInfoContainer: {
    flex: 6,
    height: 50,
    borderStyle: 'solid',
    borderBottomWidth: 0.3,
    borderBottomColor: '#cdcdcd'
  },
  userImage: {
    width: 40,
    height: 40
  },
  chatName: {
    fontFamily: 'Roboto-Medium',
  },
  chatNotification: {
    position: 'absolute',
    width: 6,
    height: 6,
    right: 30,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderRadius: 12
  }
});