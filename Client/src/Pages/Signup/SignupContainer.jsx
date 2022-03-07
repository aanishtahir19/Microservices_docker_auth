import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import SignupUi from './SignupUI';
import * as Yup from 'yup';
import { googleLogin, signupThunk } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import useScript from '../../Hooks/useScript';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
});
function SignupContainer() {
  const navigate = useNavigate();
  const { authorized } = useSelector((state) => state.auth);
  useScript('https://accounts.google.com/gsi/client');
  const dispatch = useDispatch();
  const handleCredentialResponse = async (response) => {
    dispatch(googleLogin(response.credential));
  };
  if (authorized) {
    navigate('/');
  }
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
