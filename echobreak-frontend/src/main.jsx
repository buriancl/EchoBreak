import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Customize this as needed
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);