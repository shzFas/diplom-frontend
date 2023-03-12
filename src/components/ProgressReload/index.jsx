import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './ProgressReload.module.scss';

export default function ProgressReload() {
  return (
    <Box className={styles.renderPage}>
      <CircularProgress />
    </Box>
  );
}