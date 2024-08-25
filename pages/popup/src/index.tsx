import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@src/index.css';
import Popup from '@src/Popup';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const theme = createTheme({
    // Define your theme customization here
  });

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>,
  );
}

init();
