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
    left: 10,
    color: '#52B788'
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
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  buttonTitle: {
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    position: 'absolute',
    color: 'red',
    bottom: -25
  }
});