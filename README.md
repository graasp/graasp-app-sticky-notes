# Sticky Notes app for Graasp

[![Deploy to development environment](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cintegration-s3-apps-caller.yml/badge.svg)](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cintegration-s3-apps-caller.yml)
[![Deploy to staging environment](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cdelivery-s3-apps-caller.yml/badge.svg)](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cdelivery-s3-apps-caller.yml)
[![Deploy to graasp.org](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cdeployment-s3-apps-caller.yml/badge.svg)](https://github.com/graasp/graasp-app-sticky-notes/actions/workflows/cdeployment-s3-apps-caller.yml)

![Screenshot of the Sticky Notes app in Graasp Builder](docs/assets/screenshot_SN_builder.png)

This app is a virtual board on which you can put sticky notes. The sticky notes may contain rich text and links and their color can be changed. Additionaly, the background of the board can be set by the user.

### Rich notes

You can format the text in the notes and add hyperlinks. You can also change the colors of the notes.

![Edit dialog of the Sticky Notes app](docs/assets/screenshot_dialog_SN_builder.png)

### Collaboration

The app can be used collaboratively on Graasp. At the moment, to be able to modify the notes of the other users, all users need *admin* access to the item. The communication is not exactly realtime. Therefore, a refresh button helps you refresh the app to be sure it displays all the sticky notes that have been added.
