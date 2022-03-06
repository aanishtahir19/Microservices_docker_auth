import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import SignupUi from './SignupUI';
import * as Yup from 'yup';
import { signupThunk } from '../AuthSlice';
import { useDispatch } from 'react-redux';
import useScript from '../../../Hooks/useScript';
import GoogleLogin from '../../../Services/GoogleLogin';
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
});
function SignupContainer() {
  useScript('https://accounts.google.com/gsi/client');
  const dispatch = useDispatch();
  const handleCredentialResponse = async (response) => {
    try {
      const { data, error } = await GoogleLogin({
        id_token: response.credential,
      });
      if (error) throw new Error(error.message);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          dispatch(signupThunk(values));
        }}
      >
        <Form>
          <SignupUi
            ErrorMessage={ErrorMessage}
            Field={Field}
            handleCredentialResponse={handleCredentialResponse}
          />
        </Form>
      </Formik>
    </>
  );
}

export default SignupContainer;
