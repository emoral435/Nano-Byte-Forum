import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
