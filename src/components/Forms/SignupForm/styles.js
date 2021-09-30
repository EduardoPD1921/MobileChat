import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
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
    marginTop: 45,
    borderBottomColor: '#52B788',
    borderBottomWidth: 1,
    paddingLeft: 50
  },
  submitSignupForm: {
    width: '70%',
    height: 50,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: '#52B788',
    justifyContent: 'center',
    borderRadius: 14
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

export const textStyle = StyleSheet.create({
  submitText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 17
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    position: 'absolute',
    bottom: -25,
    color: 'red'
  }
});