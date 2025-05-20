import React from 'react';
import { Typography } from '@mui/material';

const About: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      About
    </Typography>
    <Typography variant="body1" gutterBottom>
      This is an example React + FastAPI project with a modern UI and best practices.
    </Typography>
  </div>
);

export default About;