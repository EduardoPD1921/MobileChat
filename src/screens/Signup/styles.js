import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  formContainer: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center'
  },
  inputContainer: {
    width: '70%'
  }
});

export const inputStyle = StyleSheet.create({
  defaultSignupInput: {
    marginTop: 30,
    borderBottomColor: '#52B788',
    borderBottomWidth: 1,
    paddingLeft: 50
  }
});

export const imageStyle = StyleSheet.create({
  inputIcon: {
    position: 'absolute',
    bottom: 12,
    left: 15,
    color: '#74C69D'
  }
});