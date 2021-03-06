import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: 'white'
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
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    left: 10,
    justifyContent: 'center'
  },
  acceptButton: {
    backgroundColor: '#52B788',
    height: 30,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 15
  },
  rejectButton: {
    backgroundColor: '#F34642',
    height: 30,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 15
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