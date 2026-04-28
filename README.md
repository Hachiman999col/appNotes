# appNotes

A React Native application for taking and managing notes.

## Prerequisites

- Node.js >= 18
- Java JDK 17
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

## Installation

1. Install dependencies:
```sh
npm install
```

2. For iOS (macOS only):
```sh
bundle install
bundle exec pod install
```

## Running the App

### Development

Start Metro bundler:
```sh
npm start
```

Run on Android:
```sh
npm run android
```

Run on iOS:
```sh
npm run ios
```

### Build APK (Android)

```sh
cd android
./gradlew assembleRelease
```

The APK will be in `android/app/build/outputs/apk/release/`

## Features

- Create, edit, and delete notes
- Persistent local storage
- Simple and intuitive interface