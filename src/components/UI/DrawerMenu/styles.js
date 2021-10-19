import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  drawerContainer: {
    flex: 1
  },
  headerContainer: {
    margin: 20,
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  userInfoContainer: {
    flexDirection: 'column'
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export const imageStyle = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    marginBottom: 10
  }
});

export const textStyle = StyleSheet.create({
  userName: {
    fontSize: 13,
    marginLeft: 10
  },
  userEmail: {
    fontSize: 11,
    marginLeft: 10,
    marginTop: 2,
    color: '#7b7b7b'
  },
  drawerItemText: {
    marginLeft: 25,
    fontFamily: 'Roboto-Medium'
  }
});