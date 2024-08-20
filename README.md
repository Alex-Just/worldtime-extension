<div align="center">

<picture>
    <img alt="Logo" src="https://github.com/user-attachments/assets/37de1f93-9494-4848-af25-e66373b3602b" />
</picture>

</div>

This extension allows you to view the time of day in different regions, with the ability to customize region names and add new ones. Worldtime can display the UTC offset in hours for each timeline and indicate whether Daylight Saving Time (DST) is applied.

### Main Features
- Access information from the latest IANA timezone database.
- Obtain details about time adjustments, including DST.
- Compare the time of day across multiple regions that you can select and customize.
- View the UTC offset for various timezones.

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)

![GitHub action badge](https://github.com/Alex-Just/worldtime-extension/actions/workflows/build-zip.yml/badge.svg)
![GitHub action badge](https://github.com/Alex-Just/worldtime-extension/actions/workflows/lint_and_tests.yml/badge.svg)

## Table of Contents

- [Features](#features)
- [Structure](#structure)
    - [ChromeExtension](#chrome-extension)
    - [Packages](#packages)
    - [Pages](#pages)
- [Install](#install)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Reference](#reference)

## Features <a name="features"></a>

- [React18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Turborepo](https://turbo.build/repo)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Custom I18n Package](/packages/i18n/)
- Custom HMR(Hot Module Rebuild) Plugin

## Install <a name="install"></a>

1. Install pnpm globally: `npm install -g pnpm` (check your node version >= 18.12.0)
2. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev`
      - When you run with Windows, you should run as
        administrator. [(Issue#456)](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/456)
    - Prod: `pnpm build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder at root

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox`
    - Prod: `pnpm build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder at root

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Structure <a name="structure"></a>

### ChromeExtension <a name="chrome-extension"></a>

Main app with background script, manifest

- `manifest.js` - manifest for chrome extension
- `lib/background` - [background script](https://developer.chrome.com/docs/extensions/mv3/background_pages/) for chrome
  extension (`background.service_worker` in
  manifest.json)
- `public/content.css` - content css for user's page injection

### Packages <a name="packages"></a>

Some shared packages

- `dev-utils` - utils for chrome extension development (manifest-parser, logger)
- `i18n` - custom i18n package for chrome extension. provide i18n function with type safety and other validation.
- `hmr` - custom HMR plugin for vite, injection script for reload/refresh, hmr dev-server
- `shared` - shared code for entire project. (types, constants, custom hooks, components, etc.)
- `storage` - helpers for [storage](https://developer.chrome.com/docs/extensions/reference/api/storage) easier integration with, e.g local, session storages
- `tailwind-config` - shared tailwind config for entire project
- `tsconfig` - shared tsconfig for entire project
- `ui` - here's a function to merge your tailwind config with global one, and you can save components here
- `vite-config` - shared vite config for entire project
- `zipper` - By ```pnpm zip``` you can pack ```dist``` folder into ```extension.zip``` inside newly created ```dist-zip``` 

### Pages <a name="pages"></a>

- `content` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for chrome
  extension (`content_scripts` in manifest.json)
- `content-ui` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for render UI in
  user's page (`content_scripts` in manifest.json)
- `content-runtime` - [content runtime script](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#functionality)
   this can be inject from `popup` like standard `content`
- `devtools` - [devtools](https://developer.chrome.com/docs/extensions/mv3/devtools/#creating) for chrome
  extension (`devtools_page` in manifest.json)
- `devtools-panel` - devtools panel for [devtools](pages/devtools/src/index.ts)
- `new-tab` - [new tab](https://developer.chrome.com/docs/extensions/mv3/override/) for chrome
extension (`chrome_url_overrides.newtab` in manifest.json)
- `options` - [options](https://developer.chrome.com/docs/extensions/mv3/options/) for chrome extension (`options_page`
  in manifest.json)
- `popup` - [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/) for chrome
  extension (`action.default_popup` in
  manifest.json)
- `side-panel` - [sidepanel(Chrome 114+)](https://developer.chrome.com/docs/extensions/reference/sidePanel/) for chrome
  extension (`side_panel.default_path` in manifest.json)

## Reference <a name="reference"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Turborepo](https://turbo.build/repo/docs)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)
