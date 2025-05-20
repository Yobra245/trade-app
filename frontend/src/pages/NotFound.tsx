import React from 'react';
import { Typography } from '@mui/material';

const NotFound: React.FC = () => (
  <div>
    <Typography variant="h4" color="error" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1">
      Sorry, that page does not exist.
    </Typography>
  </div>
);

export default NotFound;