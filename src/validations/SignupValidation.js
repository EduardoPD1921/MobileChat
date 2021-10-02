import * as Yup from 'yup';
import api from '../api';

Yup.addMethod(Yup.string, 'uniqueEmail', function() {
  return this.test({
    name: 'checkUniqueEmail',
    message: 'E-mail já cadastrado.',
    test: function(value) {
      return new Promise((resolve, reject) => {
        api.get(`/user/checkUniqueEmail/${value}`)
          .then(resp => {
            if (resp.data) {
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch(error => console.log(error));
      });
    }
  });
});

Yup.addMethod(Yup.string, 'uniquePhone', function() {
  return this.test({
    name: 'checkUniquePhone',
    message: 'Número já cadastrado.',
    test: function(value) {
      return new Promise((resolve, reject) => {
        api.get(`/user/checkUniquePhone/${value}`)
          .then(resp => {
            if (resp.data) {
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch(error => console.log(error));
      });
    }
  });
});

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Insira seu nome.'),
  userEmail: Yup.string()
    .email('E-mail inválido.')
    .uniqueEmail()
    .required('Insira um e-mail.'),
  userPhone: Yup.string()
    .uniquePhone()
    .min(15, 'Número inválido.')
    .max(15, 'Número inválido.')
    .required('Insira um número.'),
  userPassword: Yup.string()
    .min(8, 'Senha muito curta.')
    .required('Insira uma senha.')
});

export default SignupSchema;