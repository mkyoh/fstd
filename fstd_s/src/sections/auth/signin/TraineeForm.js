// import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link, Stack, Alert, IconButton, InputAdornment,Button } from '@mui/material';

import Iconify from '../../../components/Iconify';
import { PATH_AUTH } from '../../../routes/paths';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function TraineeForm() {


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
      await login(data.traineeId);
    } catch (error) {
      console.error(error);
      reset();
      }
    }
 

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
     <RHFTextField name="traineeId" label="TraineeId" />
     <br/>
     <br/>
       <Button fullWidth size="large" type="submit" variant="contained">
          Login
       </Button>
    
    </FormProvider>
  );
}
