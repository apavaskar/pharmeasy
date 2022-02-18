/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import configureStore from './src/redux/store/configureStore';
import {LoadingSpinner} from './src/widgets/LoadingSpinner';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import AppInitializerComponent from './src/AppInitializerComponent';
import SQLite from 'react-native-sqlite-storage';
import {Alert, BackHandler, Linking, LogBox} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';
import customTheme from './src/customTheme/theme';
import {FileLogger} from 'react-native-file-logger';

LogBox.ignoreAllLogs(true);
FileLogger.configure({
  dailyRolling: false,
  maximumFileSize: 1024 * 1024,
  captureConsole: true,
});
global.db = SQLite.openDatabase(
  {
    name: 'infinity.db',
  },
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

const store = configureStore();

const App: () => Node = () => {
  useEffect(() => {
    checkVersion();
    FileLogger.configure().then(() => console.log('File-logger configured'));
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <LoadingSpinner />
          <AppInitializerComponent />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

const checkVersion = async () => {
  try {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded && updateNeeded.isNeeded) {
      Alert.alert(
        'Upgrade needed',
        'A new version of the app is available. Please update to continue using the app.',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export default App;
