import React from 'react';
import { Alert } from '@mui/material';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <Alert severity="error">{message}</Alert>
);

export default ErrorMessage;