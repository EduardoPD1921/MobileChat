import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 100,
    borderRadius: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: '#575757',
    backgroundColor: '#68c097',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'center'
  },
  userIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 25,
    marginLeft: 15
  },
  userInfo: {
    flex: 2,
    height: 50,
    marginLeft: 10
  },
  addContact: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addContactButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2296f3',
    marginRight: 20,
    borderRadius: 4
  }
});

export const textStyle = StyleSheet.create({
  whiteText: {
    color: 'white'
  },
  userEmail: {
    color: '#ededed',
    marginTop: 3,
    fontSize: 12
  }
});