import { StyleSheet } from 'react-native';

export const signupFormStyles = StyleSheet.create({
  formContainer: {
    marginLeft: 20
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10
  },
  input: {
    borderBottomWidth: 1,
    width: '95%',
    borderColor: '#52B788',
    paddingLeft: 40
  },
  eyeIcon: {
    position: 'absolute',
    right: '13%'
  },
  formActionButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20
  },
  buttonTitle: {
    color: 'white',
    fontFamily: 'Poppins-Medium'
  }
});