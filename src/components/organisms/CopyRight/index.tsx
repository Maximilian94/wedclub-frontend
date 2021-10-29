import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const CopyRight: React.FC = () => (
  <Box mt={5}>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://maximilian94.github.io/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Maximilian Kaden
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  </Box>
);

export default CopyRight;
