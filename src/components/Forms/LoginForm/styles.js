import { StyleSheet } from 'react-native';

export const containerStyle = StyleSheet.create({
  formContainer: {
    display: 'flex',
    width: '70%',
    justifyContent: 'flex-end'
  },
  formInfoContainer: {
    marginTop: 30,
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%'
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitContainer: {
    marginTop: 40,
    alignItems: 'center',
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

export const inputStyle = StyleSheet.create({
  defaultLoginInput: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#74C69D',
    paddingLeft: 50,
    color: 'black'
  },
  submitButton: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52B788',
    borderRadius: 16
  }
});

export const textStyle = StyleSheet.create({
  rememberMeText: {
    color: '#696969',
    fontSize: 13,
    fontFamily: 'Poppins-Regular'
  },
  submitButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'white'
  },
  dividerText: {
    marginTop: 20,
    fontFamily: 'Poppins-Regular'
  },
  registerText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#52B788'
  }
});