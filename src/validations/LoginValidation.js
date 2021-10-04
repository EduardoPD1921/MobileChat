import * as Yup from 'yup';
// import api from '../api';

const LoginSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('E-mail inválido.')
    .required('Insira seu e-mail.'),
  userPassword: Yup.string()
    .required('Insira sua senha.')
});

export default LoginSchema;