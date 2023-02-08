// import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, Button } from '@mui/material';
import { PATH_AUTH } from '../../../routes/paths';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function TraineeForm() {
  const { signin } = useAuth();

  const defaultValues = {
    traineeId: '',

  };

  const methods = useForm({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      // console.log("hhhhhhhhhh")
      await signin(data.traineeId);
    } catch (error) {
      console.error(error);
      reset();
    }
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="traineeId" label="TraineeId" />
      <br />

      <Link component={RouterLink} variant="h6" to={PATH_AUTH.login}>
        Admin Login Page
      </Link>
      <br />
      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>

    </FormProvider>
  );
}
