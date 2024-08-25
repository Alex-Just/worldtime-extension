import 'webextension-polyfill';

import { useDarkIconStorage } from '@extension/storage';

function updateIcon(theme: 'light' | 'dark') {
  const icons = {
    light: {
      '34': 'icon-light-34.png',
      '128': 'icon-light-128.png',
    },
    dark: {
      '34': 'icon-34.png',
      '128': 'icon-128.png',
    },
  };

  void chrome.action.setIcon({ path: icons[theme] });
}

// Function to get and update the icon based on the stored theme preference
function setIconFromStoredTheme() {
  useDarkIconStorage.get().then(theme => {
    updateIcon(theme ? 'dark' : 'light');
  });
}

// Set icon when the extension starts
chrome.runtime.onStartup.addListener(() => {
  setIconFromStoredTheme();
});

// Set icon when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  setIconFromStoredTheme();
});

// Update icon whenever the stored theme changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes['useDarkIcon']) {
    const newValue = changes['useDarkIcon'].newValue;
    updateIcon(newValue ? 'dark' : 'light');
  }
});
