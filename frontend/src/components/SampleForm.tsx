import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

interface FormInputs {
  email: string;
}

const SampleForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email"
        {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  );
};

export default SampleForm;