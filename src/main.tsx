import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: red[500],
    },
    info: {
      main: '#ffffff'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
