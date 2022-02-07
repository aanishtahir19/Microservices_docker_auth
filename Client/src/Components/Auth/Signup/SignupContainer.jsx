import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import SignupUi from './SignupUI';
import * as Yup from 'yup';
import { signupThunk } from '../AuthSlice';
import { useDispatch } from 'react-redux';
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
});
function SignupContainer() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        dispatch(signupThunk(values));
      }}
    >
      <Form>
        <SignupUi ErrorMessage={ErrorMessage} Field={Field} />
      </Form>
    </Formik>
  );
}

export default SignupContainer;
