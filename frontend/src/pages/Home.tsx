import React from 'react';
import { Typography } from '@mui/material';
import SampleForm from '../components/SampleForm';

const Home: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      Welcome to the Home Page!
    </Typography>
    <Typography variant="body1" gutterBottom>
      This is your starting point. Try the form below:
    </Typography>
    <SampleForm />
  </div>
);

export default Home;