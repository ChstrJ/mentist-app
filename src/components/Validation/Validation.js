import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone_number: Yup.string()
    .matches(/^09\d{9}$/, 'Phone number must start with 09 and be 11 digits')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(8)
    .required('Invalid password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const initialValue = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phone_number: '',
  password: '',
  confirmPassword,
 
};
