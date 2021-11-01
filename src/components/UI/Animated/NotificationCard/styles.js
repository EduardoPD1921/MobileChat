import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    flex: 1
  },
  notificationTextContainer: {
    flex: 6,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  notificationOptions: {
    position: 'absolute',
    backgroundColor: 'blue',
    width: '100%',
    height: 20,
    left: 10
  }
});

export const imageStyle = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50
  }
});

export const textStyle = StyleSheet.create({
  senderName: {
    color: '#999b9f',
    fontFamily: 'Roboto-Bold'
  },
  notificationDesc: {
    color: '#b5b4b4',
    fontFamily: 'Roboto-Medium'
  },
  notificationTime: {
    color: '#D4CFCF',
    fontFamily: 'Roboto-Regular'
  }
});